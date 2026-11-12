import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1280, 720
FPS = 24
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION) # 288 frames

PHONE_W = 300
PHONE_H = 666
PHONE_X = (W - PHONE_W) // 2 # 490
PHONE_Y = (H - PHONE_H) // 2 # 27
CORNER_RADIUS = 36

SCREEN_W = 292
SCREEN_H = 648
SCREEN_X = PHONE_X + 4 # 494
SCREEN_Y = PHONE_Y + 9 # 36
SCREEN_RADIUS = 26

# Load the authentic emulator screens
SCREENS_DIR = "public/images/projects/playit_real_screens"
img_map = Image.open(f"{SCREENS_DIR}/map.png").convert("RGBA").resize((SCREEN_W, SCREEN_H), Image.Resampling.LANCZOS)
img_hearit = Image.open(f"{SCREENS_DIR}/hearit.png").convert("RGBA").resize((SCREEN_W, SCREEN_H), Image.Resampling.LANCZOS)
img_sayit = Image.open(f"{SCREENS_DIR}/sayit.png").convert("RGBA").resize((SCREEN_W, SCREEN_H), Image.Resampling.LANCZOS)
img_findit = Image.open(f"{SCREENS_DIR}/findit.png").convert("RGBA").resize((SCREEN_W, SCREEN_H), Image.Resampling.LANCZOS)

# Create mask for rounded screen
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
    outline=(58, 68, 88, 255),
    width=2
)

# Ear speaker slit
draw_base.rounded_rectangle(
    [W // 2 - 25, PHONE_Y + 4, W // 2 + 25, PHONE_Y + 7],
    radius=2,
    fill=(40, 48, 64, 255)
)

def get_ambient_glow(t):
    # Dynamic ambient color based on beat
    if t < 3.0: # Map: Sky blue
        color = (30, 80, 160)
    elif t < 6.0: # HearIt: Sunshine warm amber
        color = (180, 110, 20)
    elif t < 9.0: # SayIt: Violet / purple
        color = (110, 40, 180)
    else: # FindIt: Mint emerald
        color = (20, 140, 90)
    return color

def render_frame(frame_idx):
    t = frame_idx / FPS # seconds

    # 1. Base dark background (#0B0F19)
    frame = Image.new("RGBA", (W, H), (11, 15, 25, 255))
    draw = ImageDraw.Draw(frame)

    # Ambient radial backlight behind phone
    glow_col = get_ambient_glow(t)
    glow_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    glow_radius = 260
    glow_draw.ellipse(
        [W // 2 - glow_radius, H // 2 - glow_radius, W // 2 + glow_radius, H // 2 + glow_radius],
        fill=(glow_col[0], glow_col[1], glow_col[2], 38)
    )
    glow_overlay = glow_overlay.filter(ImageFilter.GaussianBlur(80))
    frame.alpha_composite(glow_overlay)

    # 2. Determine current screen & transition
    # Beats:
    # 0.0 - 2.8: Map
    # 2.8 - 3.2: Transition Map -> HearIt
    # 3.2 - 5.8: HearIt
    # 5.8 - 6.2: Transition HearIt -> SayIt
    # 6.2 - 8.8: SayIt
    # 8.8 - 9.2: Transition SayIt -> FindIt
    # 9.2 - 12.0: FindIt
    if t < 2.8:
        screen_content = img_map.copy()
    elif t < 3.2:
        prog = (t - 2.8) / 0.4
        screen_content = Image.blend(img_map, img_hearit, prog)
    elif t < 5.8:
        screen_content = img_hearit.copy()
        # In HearIt, animate subtle pulsing sound waves on speaker FAB
        if 3.5 <= t <= 5.5:
            wave_draw = ImageDraw.Draw(screen_content)
            pulse = math.sin((t - 3.5) * 6.0) * 0.5 + 0.5
            # Center of FAB on scaled screen: X=146, Y=518
            fab_x, fab_y = 146, 518
            r = int(24 + pulse * 14)
            wave_draw.ellipse([fab_x - r, fab_y - r, fab_x + r, fab_y + r], outline=(67, 198, 172, int(180 * (1 - pulse))), width=2)
    elif t < 6.2:
        prog = (t - 5.8) / 0.4
        screen_content = Image.blend(img_hearit, img_sayit, prog)
    elif t < 8.8:
        screen_content = img_sayit.copy()
        # In SayIt, animate mic listening ripple
        if 6.8 <= t <= 8.5:
            wave_draw = ImageDraw.Draw(screen_content)
            ripple = math.sin((t - 6.8) * 8.0) * 0.5 + 0.5
            fab_x, fab_y = 146, 518
            r = int(24 + ripple * 16)
            wave_draw.ellipse([fab_x - r, fab_y - r, fab_x + r, fab_y + r], outline=(255, 75, 110, int(200 * (1 - ripple))), width=2)
    elif t < 9.2:
        prog = (t - 8.8) / 0.4
        screen_content = Image.blend(img_sayit, img_findit, prog)
    else:
        screen_content = img_findit.copy()
        # In FindIt, matching tile glow effect
        if t >= 10.4:
            tile_draw = ImageDraw.Draw(screen_content)
            glow_prog = min(1.0, (t - 10.4) * 2.0)
            # Matching tile area roughly around X: 110-180, Y: 300-360
            tile_draw.rounded_rectangle([110, 305, 182, 365], radius=16, outline=(67, 233, 123, int(220 * glow_prog)), width=3)

    # 3. Composite Phone Chassis Base
    frame.alpha_composite(phone_base)

    # 4. Composite Screen Content with rounded screen mask
    frame.paste(screen_content, (SCREEN_X, SCREEN_Y), screen_mask)

    # 5. Dynamic Island / Pill Camera Notch on top of screen
    notch_w = 64
    notch_h = 16
    notch_x = W // 2 - notch_w // 2
    notch_y = SCREEN_Y + 8
    draw.rounded_rectangle(
        [notch_x, notch_y, notch_x + notch_w, notch_y + notch_h],
        radius=8,
        fill=(10, 13, 20, 255)
    )
    # Camera sensor dot
    draw.ellipse([notch_x + notch_w - 18, notch_y + 4, notch_x + notch_w - 10, notch_y + 12], fill=(24, 32, 48, 255))

    # 6. Smooth Animated Touch Cursor / Ring
    # Define keyframe positions for cursor (in canvas coords)
    # Center X = 640
    # Map node M: (640, 340) -> Tap at 2.2s
    # HearIt speaker: (640, 554) -> Tap at 4.2s
    # HearIt next: (640, 638) -> Tap at 5.4s
    # SayIt mic: (640, 554) -> Tap at 7.2s
    # SayIt next: (640, 638) -> Tap at 8.4s
    # FindIt tile: (640, 370) -> Tap at 10.4s
    cursor_active = False
    cur_x, cur_y = 640, 340
    tap_progress = 0.0

    if t < 0.6: # Entering
        p = t / 0.6
        cur_x, cur_y = 720 - 80 * (1 - (1 - p)**2), 420 - 80 * (1 - (1 - p)**2)
        cursor_active = True
    elif t < 2.5: # On Node M
        cur_x, cur_y = 640, 340
        cursor_active = True
        if 2.1 <= t <= 2.4:
            tap_progress = (t - 2.1) / 0.3
    elif t < 3.2: # Floating away during transition
        p = (t - 2.5) / 0.7
        cur_x = 640 + math.sin(p * math.pi) * 20
        cur_y = 340 + p * 120
        cursor_active = True
    elif t < 4.6: # Moving to Speaker FAB
        p = min(1.0, (t - 3.2) / 0.8)
        smooth_p = 3*p*p - 2*p*p*p
        cur_x = 640
        cur_y = 460 + smooth_p * (554 - 460)
        cursor_active = True
        if 4.1 <= t <= 4.4:
            tap_progress = (t - 4.1) / 0.3
    elif t < 5.6: # Moving to Next button
        p = min(1.0, (t - 4.6) / 0.6)
        smooth_p = 3*p*p - 2*p*p*p
        cur_x = 640
        cur_y = 554 + smooth_p * (638 - 554)
        cursor_active = True
        if 5.3 <= t <= 5.6:
            tap_progress = (t - 5.3) / 0.3
    elif t < 6.4: # Transition to SayIt
        cursor_active = True
        cur_x, cur_y = 640, 638 - (t - 5.6) * 40
    elif t < 7.6: # Moving to Mic FAB
        p = min(1.0, (t - 6.4) / 0.6)
        smooth_p = 3*p*p - 2*p*p*p
        cur_x = 640
        cur_y = 600 - smooth_p * (600 - 554)
        cursor_active = True
        if 7.1 <= t <= 7.4:
            tap_progress = (t - 7.1) / 0.3
    elif t < 8.6: # Moving to Next button
        p = min(1.0, (t - 7.6) / 0.6)
        smooth_p = 3*p*p - 2*p*p*p
        cur_x = 640
        cur_y = 554 + smooth_p * (638 - 554)
        cursor_active = True
        if 8.3 <= t <= 8.6:
            tap_progress = (t - 8.3) / 0.3
    elif t < 10.6: # Moving to FindIt tile
        p = min(1.0, (t - 8.6) / 1.0)
        smooth_p = 3*p*p - 2*p*p*p
        cur_x = 640 - smooth_p * 5
        cur_y = 638 - smooth_p * (638 - 370)
        cursor_active = True
        if 10.2 <= t <= 10.5:
            tap_progress = (t - 10.2) / 0.3
    elif t < 11.5:
        cur_x, cur_y = 635, 370
        cursor_active = True
    else: # Fading out
        cursor_active = False

    if cursor_active:
        # Draw translucent touch point with specular rim
        c_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(c_overlay)
        base_r = 14
        if tap_progress > 0: # Tap expanding ripple
            ripple_r = int(base_r + tap_progress * 18)
            alpha = int(220 * (1 - tap_progress))
            c_draw.ellipse([cur_x - ripple_r, cur_y - ripple_r, cur_x + ripple_r, cur_y + ripple_r], outline=(255, 255, 255, alpha), width=2)
            c_draw.ellipse([cur_x - base_r, cur_y - base_r, cur_x + base_r, cur_y + base_r], fill=(255, 255, 255, 140))
        else:
            c_draw.ellipse([cur_x - base_r, cur_y - base_r, cur_x + base_r, cur_y + base_r], fill=(255, 255, 255, 70), outline=(255, 255, 255, 200), width=2)
            c_draw.ellipse([cur_x - 3, cur_y - 3, cur_x + 3, cur_y + 3], fill=(255, 255, 255, 230))
        frame.alpha_composite(c_overlay)

    return frame.convert("RGB")

def main():
    print(f"Generating pure PlayIT video ({TOTAL_FRAMES} frames @ {FPS} fps)...")
    ffmpeg_cmd = [
        "/home/zendrix/.local/bin/ffmpeg",
        "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-preset", "medium",
        "-movflags", "+faststart",
        "public/videos/playit.mp4"
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    poster_saved = False
    for i in range(TOTAL_FRAMES):
        f = render_frame(i)
        if not poster_saved and i == 20: # 0.83s, clear view of map
            f.save("public/images/projects/playit-poster.webp", "WEBP", quality=92)
            poster_saved = True
        proc.stdin.write(f.tobytes())

    proc.stdin.close()
    proc.wait()

    size = os.path.getsize("public/videos/playit.mp4")
    print(f"SUCCESS! Rendered public/videos/playit.mp4 ({size} bytes, {size/1024:.1f} KB)")

if __name__ == "__main__":
    main()
