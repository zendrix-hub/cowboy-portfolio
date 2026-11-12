import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1280, 720
FPS = 24
DURATION = 13.5
TOTAL_FRAMES = int(FPS * DURATION) # 324 frames

PHONE_W = 326
PHONE_H = 668
PHONE_X = (W - PHONE_W) // 2 # 477
PHONE_Y = (H - PHONE_H) // 2 # 26
CORNER_RADIUS = 38

SCREEN_W = 314
SCREEN_H = 650
SCREEN_X = PHONE_X + 6 # 483
SCREEN_Y = PHONE_Y + 9 # 35
SCREEN_RADIUS = 28

SCREENS_DIR = "public/images/projects/playit_current_v2"

# Helper to load and prepare screen
def load_screen(name):
    path = os.path.join(SCREENS_DIR, f"{name}.png")
    im = Image.open(path).convert("RGBA")
    return im.resize((SCREEN_W, SCREEN_H), Image.Resampling.LANCZOS)

img_splash = load_screen("splash")
img_map = load_screen("map")
img_hearit = load_screen("hearit")
img_sayit = load_screen("sayit")
img_sayit_cue = load_screen("sayit_cue")
img_findit = load_screen("findit")
img_blendit = load_screen("blendit")

# Pre-render rounded screen mask
screen_mask = Image.new("L", (SCREEN_W, SCREEN_H), 0)
draw_mask = ImageDraw.Draw(screen_mask)
draw_mask.rounded_rectangle([0, 0, SCREEN_W, SCREEN_H], radius=SCREEN_RADIUS, fill=255)

# Pre-render phone chassis base
phone_base = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw_base = ImageDraw.Draw(phone_base)

# Outer phone chassis (Titanium dark border with rounded corners)
draw_base.rounded_rectangle(
    [PHONE_X - 1, PHONE_Y - 1, PHONE_X + PHONE_W + 1, PHONE_Y + PHONE_H + 1],
    radius=CORNER_RADIUS + 1,
    fill=(22, 27, 38, 255)
)
draw_base.rounded_rectangle(
    [PHONE_X, PHONE_Y, PHONE_X + PHONE_W, PHONE_Y + PHONE_H],
    radius=CORNER_RADIUS,
    fill=(14, 18, 26, 255),
    outline=(60, 72, 94, 255),
    width=2
)

# Ear speaker slit
draw_base.rounded_rectangle(
    [W // 2 - 28, PHONE_Y + 4, W // 2 + 28, PHONE_Y + 7],
    radius=2,
    fill=(42, 50, 68, 255)
)

def get_ambient_glow(t):
    # Dynamic ambient color based on beat
    # Splash (0-2.4): Emerald-blue
    # Map (2.4-4.8): Forest green
    # HearIt (4.8-7.4): Golden amber
    # SayIt (7.4-8.8): Sunset coral
    # SayIt Cue (8.8-9.8): Rose
    # FindIt (9.8-11.4): Mint emerald
    # BlendIt (11.4-13.5): Star gold
    if t < 2.4:
        return (16, 160, 140)
    elif t < 4.8:
        return (22, 140, 70)
    elif t < 7.4:
        return (210, 140, 20)
    elif t < 8.8:
        return (210, 50, 80)
    elif t < 9.8:
        return (220, 70, 120)
    elif t < 11.4:
        return (16, 170, 100)
    else:
        return (200, 160, 20)

def ease_in_out(p):
    return 3 * p * p - 2 * p * p * p

def render_frame(frame_idx):
    t = frame_idx / FPS # seconds

    # 1. Base dark background (#0B0F19)
    frame = Image.new("RGBA", (W, H), (11, 15, 25, 255))

    # Ambient radial backlight behind phone
    glow_col = get_ambient_glow(t)
    glow_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    glow_radius = 280
    glow_draw.ellipse(
        [W // 2 - glow_radius, H // 2 - glow_radius, W // 2 + glow_radius, H // 2 + glow_radius],
        fill=(glow_col[0], glow_col[1], glow_col[2], 42)
    )
    glow_overlay = glow_overlay.filter(ImageFilter.GaussianBlur(90))
    frame.alpha_composite(glow_overlay)

    # 2. Determine current screen & transition animation
    # Native Android mobile slide navigation
    # Screen transitions:
    # 0.0 - 2.1: Splash
    # 2.1 - 2.5: Slide Splash -> Map
    # 2.5 - 4.5: Map
    # 4.5 - 4.9: Slide Map -> HearIt
    # 4.9 - 7.1: HearIt
    # 7.1 - 7.5: Slide HearIt -> SayIt
    # 7.5 - 8.8: SayIt
    # 8.8 - 9.1: Fade SayIt -> SayIt Cue (mouth shape cue appears beside mic)
    # 9.1 - 9.7: SayIt Cue
    # 9.7 - 10.1: Slide SayIt Cue -> FindIt
    # 10.1 - 11.4: FindIt
    # 11.4 - 11.8: Slide FindIt -> BlendIt
    # 11.8 - 13.5: BlendIt

    screen_canvas = Image.new("RGBA", (SCREEN_W, SCREEN_H), (0, 0, 0, 255))

    def compose_slide(img_out, img_in, progress):
        p = ease_in_out(progress)
        offset_out = int(-SCREEN_W * 0.35 * p)
        offset_in = int(SCREEN_W * (1.0 - p))
        
        # Dim outgoing slightly
        dim = Image.new("RGBA", (SCREEN_W, SCREEN_H), (0, 0, 0, int(120 * p)))
        out_dimmed = Image.alpha_composite(img_out, dim)
        
        slide = Image.new("RGBA", (SCREEN_W, SCREEN_H), (0, 0, 0, 255))
        slide.paste(out_dimmed, (offset_out, 0))
        slide.paste(img_in, (offset_in, 0))
        return slide

    tap_target_x = SCREEN_W // 2
    tap_target_y = int(SCREEN_H * 0.93)
    is_tapping = False
    tap_progress = 0.0

    if t < 2.1:
        screen_canvas.paste(img_splash, (0, 0))
        # Tap Start button at t=1.7s (x=157, y=595 in 314x650)
        start_x, start_y = SCREEN_W // 2, int(SCREEN_H * 0.925)
        if 1.6 <= t <= 1.95:
            is_tapping = True
            tap_progress = (t - 1.6) / 0.35
            # Button press feedback ring on Start
            pr_draw = ImageDraw.Draw(screen_canvas)
            r = int(18 + tap_progress * 26)
            alpha = int(220 * (1.0 - tap_progress))
            pr_draw.rounded_rectangle([start_x - 90, start_y - 20, start_x + 90, start_y + 20], radius=14, outline=(255, 255, 255, alpha), width=2)
            pr_draw.ellipse([start_x - r, start_y - r, start_x + r, start_y + r], outline=(67, 233, 123, alpha), width=3)
    elif t < 2.5:
        prog = (t - 2.1) / 0.4
        screen_canvas = compose_slide(img_splash, img_map, prog)
    elif t < 4.5:
        screen_canvas.paste(img_map, (0, 0))
        # Node M is at center x = SCREEN_W//2, y = int(SCREEN_H * 0.47) -> (157, 305)
        node_m_x, node_m_y = SCREEN_W // 2, int(SCREEN_H * 0.47)
        # Pulsing active node ring
        pulse = math.sin((t - 2.5) * 5.0) * 0.5 + 0.5
        pr_draw = ImageDraw.Draw(screen_canvas)
        r = int(24 + pulse * 10)
        pr_draw.ellipse([node_m_x - r, node_m_y - r, node_m_x + r, node_m_y + r], outline=(255, 230, 80, int(160 * (1.0 - pulse))), width=2)
        if 4.0 <= t <= 4.4:
            is_tapping = True
            tap_progress = (t - 4.0) / 0.4
            r_tap = int(22 + tap_progress * 24)
            pr_draw.ellipse([node_m_x - r_tap, node_m_y - r_tap, node_m_x + r_tap, node_m_y + r_tap], outline=(67, 233, 123, int(220 * (1.0 - tap_progress))), width=3)
    elif t < 4.9:
        prog = (t - 4.5) / 0.4
        screen_canvas = compose_slide(img_map, img_hearit, prog)
    elif t < 7.1:
        screen_canvas.paste(img_hearit, (0, 0))
        # Speaker FAB at x = SCREEN_W // 2, y = int(SCREEN_H * 0.745) -> (157, 484)
        spk_x, spk_y = SCREEN_W // 2, int(SCREEN_H * 0.745)
        h_draw = ImageDraw.Draw(screen_canvas)
        # Tap speaker at 5.5s
        if 5.3 <= t <= 5.7:
            is_tapping = True
            tap_progress = (t - 5.3) / 0.4
            r_tap = int(20 + tap_progress * 22)
            h_draw.ellipse([spk_x - r_tap, spk_y - r_tap, spk_x + r_tap, spk_y + r_tap], outline=(255, 255, 255, int(200 * (1.0 - tap_progress))), width=2)
        # Dynamic sound waves from speaker during audio playback
        if 5.7 <= t <= 6.8:
            wave_time = (t - 5.7) * 4.0
            for wave_idx in range(3):
                w_phase = (wave_time - wave_idx * 0.4) % 1.2
                if 0 <= w_phase <= 1.0:
                    r_wave = int(28 + w_phase * 34)
                    w_alpha = int(220 * (1.0 - w_phase))
                    h_draw.ellipse([spk_x - r_wave, spk_y - r_wave, spk_x + r_wave, spk_y + r_wave], outline=(255, 200, 60, w_alpha), width=2)
        # Tap Next: Say It at 6.8s
        next_x, next_y = SCREEN_W // 2, int(SCREEN_H * 0.925)
        if 6.8 <= t <= 7.1:
            is_tapping = True
            tap_progress = (t - 6.8) / 0.3
            r_tap = int(18 + tap_progress * 20)
            h_draw.ellipse([next_x - r_tap, next_y - r_tap, next_x + r_tap, next_y + r_tap], outline=(67, 233, 123, int(200 * (1.0 - tap_progress))), width=3)
    elif t < 7.5:
        prog = (t - 7.1) / 0.4
        screen_canvas = compose_slide(img_hearit, img_sayit, prog)
    elif t < 8.8:
        screen_canvas.paste(img_sayit, (0, 0))
        mic_x, mic_y = SCREEN_W // 2, int(SCREEN_H * 0.686)
        s_draw = ImageDraw.Draw(screen_canvas)
        # Tap mic at 7.9s
        if 7.8 <= t <= 8.2:
            is_tapping = True
            tap_progress = (t - 7.8) / 0.4
            r_tap = int(22 + tap_progress * 24)
            s_draw.ellipse([mic_x - r_tap, mic_y - r_tap, mic_x + r_tap, mic_y + r_tap], outline=(255, 80, 120, int(220 * (1.0 - tap_progress))), width=3)
        # Voice recognition ripples
        if 8.2 <= t <= 8.8:
            ripple = math.sin((t - 8.2) * 10.0) * 0.5 + 0.5
            r_rip = int(32 + ripple * 20)
            s_draw.ellipse([mic_x - r_rip, mic_y - r_rip, mic_x + r_rip, mic_y + r_rip], outline=(255, 90, 130, int(180 * (1.0 - ripple))), width=2)
    elif t < 9.1:
        prog = (t - 8.8) / 0.3
        screen_canvas = Image.blend(img_sayit, img_sayit_cue, prog)
        mic_x, mic_y = SCREEN_W // 2, int(SCREEN_H * 0.686)
        s_draw = ImageDraw.Draw(screen_canvas)
        # Speech accepted feedback ring
        s_draw.ellipse([mic_x - 36, mic_y - 36, mic_x + 36, mic_y + 36], outline=(67, 233, 123, int(220 * (1.0 - prog))), width=3)
    elif t < 9.7:
        screen_canvas.paste(img_sayit_cue, (0, 0))
        # Tap Next: Find It at 9.4s
        next_x, next_y = SCREEN_W // 2, int(SCREEN_H * 0.925)
        s_draw = ImageDraw.Draw(screen_canvas)
        if 9.3 <= t <= 9.65:
            is_tapping = True
            tap_progress = (t - 9.3) / 0.35
            r_tap = int(18 + tap_progress * 22)
            s_draw.ellipse([next_x - r_tap, next_y - r_tap, next_x + r_tap, next_y + r_tap], outline=(67, 233, 123, int(220 * (1.0 - tap_progress))), width=3)
    elif t < 10.1:
        prog = (t - 9.7) / 0.4
        screen_canvas = compose_slide(img_sayit_cue, img_findit, prog)
    elif t < 11.4:
        screen_canvas.paste(img_findit, (0, 0))
        f_draw = ImageDraw.Draw(screen_canvas)
        # Tap matching picture card 1 at x = int(SCREEN_W * 0.30), y = int(SCREEN_H * 0.46)
        card_x, card_y = int(SCREEN_W * 0.30), int(SCREEN_H * 0.46)
        if 10.5 <= t <= 10.9:
            is_tapping = True
            tap_progress = (t - 10.5) / 0.4
            r_tap = int(22 + tap_progress * 26)
            f_draw.ellipse([card_x - r_tap, card_y - r_tap, card_x + r_tap, card_y + r_tap], outline=(67, 233, 123, int(220 * (1.0 - tap_progress))), width=3)
        # Selection highlight border on matched card
        if t >= 10.8:
            sel_prog = min(1.0, (t - 10.8) / 0.3)
            f_draw.rounded_rectangle([card_x - 38, card_y - 48, card_x + 38, card_y + 48], radius=10, outline=(67, 233, 123, int(240 * sel_prog)), width=3)
    elif t < 11.8:
        prog = (t - 11.4) / 0.4
        screen_canvas = compose_slide(img_findit, img_blendit, prog)
    else:
        screen_canvas.paste(img_blendit, (0, 0))
        b_draw = ImageDraw.Draw(screen_canvas)
        # Subtle celebratory sparkle shimmer around built SAM word
        if t >= 12.0:
            sparkle_t = (t - 12.0)
            star_pulse = math.sin(sparkle_t * 6.0) * 0.5 + 0.5
            sam_y = int(SCREEN_H * 0.38)
            b_draw.ellipse([SCREEN_W // 2 - 60 - int(star_pulse*4), sam_y - int(star_pulse*4), SCREEN_W // 2 - 60 + int(star_pulse*4), sam_y + int(star_pulse*4)], fill=(255, 235, 100, int(180 * star_pulse)))
            b_draw.ellipse([SCREEN_W // 2 + 60 - int(star_pulse*4), sam_y - int(star_pulse*4), SCREEN_W // 2 + 60 + int(star_pulse*4), sam_y + int(star_pulse*4)], fill=(255, 235, 100, int(180 * star_pulse)))

    # 3. Composite Phone Chassis Base
    frame.alpha_composite(phone_base)

    # 4. Composite Screen Content with rounded screen mask
    frame.paste(screen_canvas, (SCREEN_X, SCREEN_Y), screen_mask)

    # 5. Dynamic Island / Pill Camera Notch on top of screen
    notch_w = 68
    notch_h = 16
    notch_x = W // 2 - notch_w // 2
    notch_y = SCREEN_Y + 7
    draw_frame = ImageDraw.Draw(frame)
    draw_frame.rounded_rectangle(
        [notch_x, notch_y, notch_x + notch_w, notch_y + notch_h],
        radius=8,
        fill=(10, 14, 22, 255)
    )
    # Camera sensor dot
    draw_frame.ellipse([notch_x + notch_w - 18, notch_y + 4, notch_x + notch_w - 10, notch_y + 12], fill=(26, 36, 52, 255))

    # 6. Smooth Animated Touch Cursor / Ring
    # Dynamic cursor pathing across beats
    def get_cursor_pos(time_sec):
        # Coordinates in screen local coordinates (0..SCREEN_W, 0..SCREEN_H)
        start_btn = (SCREEN_W // 2, int(SCREEN_H * 0.925))
        node_m = (SCREEN_W // 2, int(SCREEN_H * 0.47))
        speaker_btn = (SCREEN_W // 2, int(SCREEN_H * 0.745))
        next_sayit = (SCREEN_W // 2, int(SCREEN_H * 0.925))
        mic_btn = (SCREEN_W // 2, int(SCREEN_H * 0.686))
        next_findit = (SCREEN_W // 2, int(SCREEN_H * 0.925))
        card_btn = (int(SCREEN_W * 0.30), int(SCREEN_H * 0.46))
        blend_slot = (SCREEN_W // 2, int(SCREEN_H * 0.68))

        if time_sec < 0.8:
            # Entering from bottom right
            p = ease_in_out(time_sec / 0.8)
            return (SCREEN_W + 40 - p * (SCREEN_W + 40 - start_btn[0]), SCREEN_H + 40 - p * (SCREEN_H + 40 - start_btn[1]))
        elif time_sec < 2.0:
            return start_btn
        elif time_sec < 2.8:
            # Transition to Node M
            p = ease_in_out((time_sec - 2.0) / 0.8)
            return (start_btn[0] + (node_m[0] - start_btn[0]) * p, start_btn[1] + (node_m[1] - start_btn[1]) * p)
        elif time_sec < 4.4:
            return node_m
        elif time_sec < 5.2:
            # Transition to Speaker
            p = ease_in_out((time_sec - 4.4) / 0.8)
            return (node_m[0] + (speaker_btn[0] - node_m[0]) * p, node_m[1] + (speaker_btn[1] - node_m[1]) * p)
        elif time_sec < 6.2:
            return speaker_btn
        elif time_sec < 6.9:
            # Move to Next: Say It
            p = ease_in_out((time_sec - 6.2) / 0.7)
            return (speaker_btn[0] + (next_sayit[0] - speaker_btn[0]) * p, speaker_btn[1] + (next_sayit[1] - speaker_btn[1]) * p)
        elif time_sec < 7.3:
            return next_sayit
        elif time_sec < 8.0:
            # Move to Mic
            p = ease_in_out((time_sec - 7.3) / 0.7)
            return (next_sayit[0] + (mic_btn[0] - next_sayit[0]) * p, next_sayit[1] + (mic_btn[1] - next_sayit[1]) * p)
        elif time_sec < 8.8:
            return mic_btn
        elif time_sec < 9.4:
            # Move to Next: Find It
            p = ease_in_out((time_sec - 8.8) / 0.6)
            return (mic_btn[0] + (next_findit[0] - mic_btn[0]) * p, mic_btn[1] + (next_findit[1] - mic_btn[1]) * p)
        elif time_sec < 9.8:
            return next_findit
        elif time_sec < 10.6:
            # Move to Picture Card 1
            p = ease_in_out((time_sec - 9.8) / 0.8)
            return (next_findit[0] + (card_btn[0] - next_findit[0]) * p, next_findit[1] + (card_btn[1] - next_findit[1]) * p)
        elif time_sec < 11.2:
            return card_btn
        elif time_sec < 12.0:
            # Glide toward BlendIt tile center
            p = ease_in_out((time_sec - 11.2) / 0.8)
            return (card_btn[0] + (blend_slot[0] - card_btn[0]) * p, card_btn[1] + (blend_slot[1] - card_btn[1]) * p)
        else:
            # Rest at bottom right
            p = ease_in_out(min(1.0, (time_sec - 12.0) / 0.8))
            return (blend_slot[0] + p * 80, blend_slot[1] + p * 120)

    cur_local_x, cur_local_y = get_cursor_pos(t)
    cur_x = SCREEN_X + cur_local_x
    cur_y = SCREEN_Y + cur_local_y

    # Only show cursor within active bounds
    if t < 12.8:
        cursor_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        cur_draw = ImageDraw.Draw(cursor_layer)
        r_outer = 18
        if is_tapping:
            r_outer = int(18 + 4 * math.sin(tap_progress * math.pi))
        # Outer translucent ring
        cur_draw.ellipse([cur_x - r_outer, cur_y - r_outer, cur_x + r_outer, cur_y + r_outer], outline=(255, 255, 255, 175), width=2)
        # Inner glow dot
        r_inner = 5
        cur_draw.ellipse([cur_x - r_inner, cur_y - r_inner, cur_x + r_inner, cur_y + r_inner], fill=(255, 255, 255, 230))
        frame.alpha_composite(cursor_layer)

    return frame.convert("RGB")

def main():
    print(f"Rendering PlayIT authentic demonstration video ({TOTAL_FRAMES} frames @ {FPS}fps)...")
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{W}x{H}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-profile:v", "high",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "public/videos/playit.mp4"
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        proc.stdin.write(frame.tobytes())
        if i % 48 == 0 or i == TOTAL_FRAMES - 1:
            print(f"  Frame {i+1}/{TOTAL_FRAMES} ({(i+1)/TOTAL_FRAMES*100:.1f}%) rendered...")

    proc.stdin.close()
    proc.wait()
    print("Video encoding complete: public/videos/playit.mp4")

    # Generate matching poster image from Splash / Map
    poster_frame = render_frame(int(FPS * 1.2)) # Splash screen frame
    poster_frame.save("public/images/projects/playit-poster.webp", "WEBP", quality=92)
    print("Poster saved: public/images/projects/playit-poster.webp")

if __name__ == "__main__":
    main()
