import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
FPS = 24
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION) # 288 frames

def get_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

font_title = get_font(18, bold=True)
font_subtitle = get_font(12, bold=False)
font_badge = get_font(11, bold=True)
font_metric_lbl = get_font(11, bold=False)
font_metric_val = get_font(20, bold=True)
font_mono = get_font(11, bold=False)
font_card_bold = get_font(13, bold=True)
font_sms = get_font(12, bold=False)

# Theme tokens for DaloyAqua Architectural Blueprint
BG_CANVAS = (8, 26, 31, 255)       # Deep blueprint #081A1F
BG_HEADER = (4, 27, 32, 255)       # #041B20
BG_PANEL = (11, 38, 45, 255)       # #0B262D
BG_PANEL_ALT = (14, 48, 56, 255)   # #0E3038
LINE_TEAL = (20, 184, 166, 255)    # #14B8A6
GLOW_TEAL = (94, 234, 212, 255)    # #5EEAD4
ACCENT_AMBER = (245, 158, 11, 255) # #F59E0B
ACCENT_GREEN = (16, 185, 129, 255) # #10B981
TEXT_MAIN = (242, 251, 250, 255)   # #F2FBFA
TEXT_MUTED = (165, 243, 252, 180)  # #A5F3FC muted
BORDER_BLUEPRINT = (20, 184, 166, 90)

def render_frame(frame_idx):
    t = frame_idx / FPS

    frame = Image.new("RGBA", (W, H), BG_CANVAS)
    draw = ImageDraw.Draw(frame)

    # 1. Subtle Architectural Grid Lines
    for gx in range(0, W, 40):
        draw.line([gx, 0, gx, H], fill=(20, 184, 166, 12), width=1)
    for gy in range(0, H, 40):
        draw.line([0, gy, W, gy], fill=(20, 184, 166, 12), width=1)

    # 2. Top Navigation Bar
    draw.rectangle([0, 0, W, 56], fill=BG_HEADER)
    draw.line([0, 56, W, 56], fill=LINE_TEAL, width=1)

    draw.text((36, 18), "DALOYAQUA", font=font_title, fill=GLOW_TEAL)
    draw.text((170, 20), "• SDLC PHASE 0 ARCHITECTURE SPEC", font=font_subtitle, fill=TEXT_MUTED)

    # 3-Phase Term Badge at Top Right (Minimal, 0 unnecessary text)
    # Phase 1 (0.0s - 4.0s): TELEMETRY INGESTION
    # Phase 2 (4.0s - 8.0s): AGRONOMY RULE ENGINE
    # Phase 3 (8.0s - 12.0s): OUTBOUND SMS DISPATCH
    if t < 4.0:
        badge_text = "TERM 1 // TELEMETRY INGESTION"
        badge_col = GLOW_TEAL
    elif t < 8.0:
        badge_text = "TERM 2 // AGRONOMY RULE ENGINE"
        badge_col = ACCENT_GREEN
    else:
        badge_text = "TERM 3 // OUTBOUND SMS DISPATCH"
        badge_col = ACCENT_AMBER

    badge_w = 260
    badge_x = W - badge_w - 36
    draw.rounded_rectangle([badge_x, 14, badge_x + badge_w, 42], radius=14, fill=BG_PANEL, outline=badge_col, width=1)
    draw.ellipse([badge_x + 12, 25, badge_x + 18, 31], fill=badge_col)
    draw.text((badge_x + 26, 21), badge_text, font=font_badge, fill=badge_col)

    # 3. Main Split Architecture Layout:
    # Left Column (580px): Telemetry Sensor Stream & Gateways
    # Right Column (600px): Rule Engine / Valuation & Outbound Dispatch
    LEFT_X = 36
    LEFT_W = 560
    RIGHT_X = LEFT_X + LEFT_W + 36
    RIGHT_W = W - RIGHT_X - 36
    MAIN_Y = 76

    # SECTION A: Field Sensor Nodes (3 Gauges)
    GAUGE_PANEL_H = 260
    draw.rounded_rectangle([LEFT_X, MAIN_Y, LEFT_X + LEFT_W, MAIN_Y + GAUGE_PANEL_H], radius=10, fill=BG_PANEL, outline=BORDER_BLUEPRINT)
    draw.text((LEFT_X + 20, MAIN_Y + 16), "LORA / CELLULAR FIELD SENSORS // BALENO, MASBATE", font=font_card_bold, fill=GLOW_TEAL)

    # 3 Gauges inside Panel
    GAUGE_W = (LEFT_W - 48) // 3
    gauges = [
        ("SOIL MOISTURE", "38.2%", "VWC (Root Zone)", GLOW_TEAL),
        ("WATER LEVEL", "6.4 cm", "Canal Irrigation", (56, 189, 248, 255)),
        ("SOIL pH", "6.4 pH", "Nutrient Window", (167, 243, 208, 255))
    ]

    for g_idx, (g_lbl, g_val, g_sub, g_color) in enumerate(gauges):
        gx = LEFT_X + 16 + g_idx * (GAUGE_W + 8)
        gy = MAIN_Y + 48
        draw.rounded_rectangle([gx, gy, gx + GAUGE_W, gy + 188], radius=8, fill=BG_PANEL_ALT, outline=BORDER_BLUEPRINT)
        draw.text((gx + 12, gy + 12), g_lbl, font=font_metric_lbl, fill=TEXT_MUTED)

        # Dynamic dial gauge visualization
        dial_cx = gx + GAUGE_W // 2
        dial_cy = gy + 85
        dial_r = 38
        draw.ellipse([dial_cx - dial_r, dial_cy - dial_r, dial_cx + dial_r, dial_cy + dial_r], outline=(30, 70, 80, 255), width=6)
        
        # Animated dial arc
        angle_prog = min(1.0, 0.4 + 0.3 * math.sin(t * 2.0 + g_idx * 1.5))
        end_deg = int(135 + angle_prog * 270)
        draw.arc([dial_cx - dial_r, dial_cy - dial_r, dial_cx + dial_r, dial_cy + dial_r], start=135, end=end_deg, fill=g_color, width=6)

        draw.text((gx + 16, gy + 138), g_val, font=font_metric_val, fill=g_color)
        draw.text((gx + 16, gy + 164), g_sub, font=font_mono, fill=TEXT_MUTED)

    # SECTION B: Solar Edge Gateway Telemetry Stream (Bottom Left)
    GW_Y = MAIN_Y + GAUGE_PANEL_H + 16
    GW_H = H - GW_Y - 24
    draw.rounded_rectangle([LEFT_X, GW_Y, LEFT_X + LEFT_W, GW_Y + GW_H], radius=10, fill=BG_PANEL, outline=BORDER_BLUEPRINT)
    draw.text((LEFT_X + 20, GW_Y + 16), "SOLAR EDGE GATEWAY INGESTION PIPELINE", font=font_card_bold, fill=TEXT_MAIN)

    # Ingestion Stream Telemetry rows
    stream_rows = [
        ("0x4A1F", "PLOT-03", "16B Payload", "CRC OK", "14ms Latency"),
        ("0x4A20", "PLOT-03", "16B Payload", "CRC OK", "12ms Latency"),
        ("0x4A21", "CANAL-1", "16B Payload", "CRC OK", "16ms Latency"),
        ("0x4A22", "PLOT-03", "16B Payload", "CRC OK", "15ms Latency"),
    ]
    for r_idx, (r_pkt, r_node, r_size, r_crc, r_lat) in enumerate(stream_rows):
        ry = GW_Y + 44 + r_idx * 40
        draw.rounded_rectangle([LEFT_X + 16, ry, LEFT_X + LEFT_W - 16, ry + 32], radius=6, fill=BG_PANEL_ALT, outline=BORDER_BLUEPRINT)
        draw.text((LEFT_X + 28, ry + 8), f"PKT {r_pkt}", font=font_mono, fill=GLOW_TEAL)
        draw.text((LEFT_X + 120, ry + 8), r_node, font=font_mono, fill=TEXT_MAIN)
        draw.text((LEFT_X + 220, ry + 8), r_size, font=font_mono, fill=TEXT_MUTED)
        draw.text((LEFT_X + 340, ry + 8), r_crc, font=font_mono, fill=ACCENT_GREEN)
        draw.text((LEFT_X + 440, ry + 8), r_lat, font=font_mono, fill=TEXT_MUTED)

    # SECTION C: Right Column – Rule Engine & SMS Dispatch
    # Top Right: Agronomy Rule Engine (Spec 001 & Spec 003)
    ENG_H = 260
    draw.rounded_rectangle([RIGHT_X, MAIN_Y, RIGHT_X + RIGHT_W, MAIN_Y + ENG_H], radius=10, fill=BG_PANEL, outline=BORDER_BLUEPRINT)
    draw.text((RIGHT_X + 20, MAIN_Y + 16), "AGRONOMY RULE ENGINE (SPEC 001 – 003)", font=font_card_bold, fill=GLOW_TEAL)

    # Rule 1: Moisture Threshold Check
    r1_active = t >= 3.8
    r1_col = ACCENT_AMBER if r1_active else BORDER_BLUEPRINT
    draw.rounded_rectangle([RIGHT_X + 16, MAIN_Y + 48, RIGHT_X + RIGHT_W - 16, MAIN_Y + 124], radius=8, fill=BG_PANEL_ALT, outline=r1_col)
    draw.text((RIGHT_X + 28, MAIN_Y + 58), "SPEC 001 // PHENOLOGICAL IRRIGATION TRIGGER", font=font_card_bold, fill=TEXT_MAIN)
    draw.text((RIGHT_X + 28, MAIN_Y + 76), "Target Stage: Vegetative Rice (Optimum 35% - 45% VWC)", font=font_mono, fill=TEXT_MUTED)
    eval_text = "STATUS: CRITICAL THRESHOLD REACHED (38.2%) -> IRRIGATION CYCLE RECOMMENDED" if r1_active else "STATUS: MONITORING SOIL MOISTURE PROFILE..."
    eval_col = ACCENT_AMBER if r1_active else (56, 189, 248, 255)
    draw.text((RIGHT_X + 28, MAIN_Y + 98), eval_text, font=font_badge, fill=eval_col)

    # Rule 2: Copra Moisture Valuation Formula
    draw.rounded_rectangle([RIGHT_X + 16, MAIN_Y + 136, RIGHT_X + RIGHT_W - 16, MAIN_Y + 236], radius=8, fill=BG_PANEL_ALT, outline=BORDER_BLUEPRINT)
    draw.text((RIGHT_X + 28, MAIN_Y + 146), "SPEC 003 // COPRA MOISTURE VALUATION ENGINE", font=font_card_bold, fill=TEXT_MAIN)
    draw.text((RIGHT_X + 28, MAIN_Y + 164), "Transparent Price Curve: Deduct % based on moisture content above 6%", font=font_mono, fill=TEXT_MUTED)
    draw.text((RIGHT_X + 28, MAIN_Y + 184), "Formula: Net Price = Base Rate (₱32/kg) * (1 - (Moisture - 6%) * Factor)", font=font_mono, fill=GLOW_TEAL)
    draw.text((RIGHT_X + 28, MAIN_Y + 208), "RESULT: Batch #82 Est. Grade A @ ₱28.40/kg (Zero Middleman Gouging)", font=font_badge, fill=ACCENT_GREEN)

    # Bottom Right: Outbound SMS Alert Dispatch (Phase 3 active at t >= 7.5s)
    SMS_Y = MAIN_Y + ENG_H + 16
    SMS_H = H - SMS_Y - 24
    draw.rounded_rectangle([RIGHT_X, SMS_Y, RIGHT_X + RIGHT_W, SMS_Y + SMS_H], radius=10, fill=BG_PANEL, outline=BORDER_BLUEPRINT)
    draw.text((RIGHT_X + 20, SMS_Y + 16), "ACTIONABLE FARMER ALERT // OUTBOUND SMS DISPATCH", font=font_card_bold, fill=TEXT_MAIN)

    if t < 7.5:
        # Standby queue
        draw.rounded_rectangle([RIGHT_X + 16, SMS_Y + 48, RIGHT_X + RIGHT_W - 16, SMS_Y + SMS_H - 16], radius=8, fill=BG_PANEL_ALT, outline=BORDER_BLUEPRINT)
        draw.text((RIGHT_X + 28, SMS_Y + 70), "OUTBOUND SMS QUEUE: IDLE (AWAITING AGRI-RULE TRIGGER)", font=font_mono, fill=TEXT_MUTED)
        draw.text((RIGHT_X + 28, SMS_Y + 110), "Target Delivery Channel: GSM SMS (No Internet Required for Farmers)", font=font_mono, fill=(56, 189, 248, 255))
    else:
        # Active SMS Delivery Card Mockup
        sms_anim = min(1.0, (t - 7.5) / 0.8)
        draw.rounded_rectangle([RIGHT_X + 16, SMS_Y + 44, RIGHT_X + RIGHT_W - 16, SMS_Y + SMS_H - 16], radius=8, fill=(16, 50, 40, 255), outline=ACCENT_GREEN, width=2)
        draw.text((RIGHT_X + 28, SMS_Y + 56), "MESSAGE DISPATCHED // 0.8s LATENCY // TO: +63 917 552 ****", font=font_badge, fill=ACCENT_GREEN)
        
        # Message bubble
        draw.rounded_rectangle([RIGHT_X + 28, SMS_Y + 80, RIGHT_X + RIGHT_W - 28, SMS_Y + SMS_H - 28], radius=6, fill=(10, 32, 28, 255), outline=ACCENT_GREEN)
        sms_text_1 = "DALOYAQUA ALERT [Plot 3]: Soil moisture at 38.2%. Critical threshold."
        sms_text_2 = "Recommended action: Open Canal Gate 2 for 45-min irrigation cycle."
        sms_text_3 = "Copra Batch #82: Ready for weighing. Est. Grade Premium A (₱28.40/kg)."
        draw.text((RIGHT_X + 38, SMS_Y + 92), sms_text_1, font=font_sms, fill=TEXT_MAIN)
        draw.text((RIGHT_X + 38, SMS_Y + 116), sms_text_2, font=font_sms, fill=GLOW_TEAL)
        draw.text((RIGHT_X + 38, SMS_Y + 140), sms_text_3, font=font_sms, fill=ACCENT_AMBER)

    # 4. Moving Scanner / Data Flow Pulse Line
    pulse_x = (int(t * 180) % W)
    draw.line([pulse_x, 56, pulse_x, H], fill=(20, 184, 166, 45), width=2)

    return frame.convert("RGB")

def main():
    print(f"Rendering DaloyAqua authentic video ({TOTAL_FRAMES} frames @ {FPS}fps)...")
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
        "public/videos/daloyaqua.mp4"
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        proc.stdin.write(frame.tobytes())
        if i % 48 == 0 or i == TOTAL_FRAMES - 1:
            print(f"  Frame {i+1}/{TOTAL_FRAMES} ({(i+1)/TOTAL_FRAMES*100:.1f}%) rendered...")

    proc.stdin.close()
    proc.wait()
    print("Video encoding complete: public/videos/daloyaqua.mp4")

    # Generate matching poster
    poster_frame = render_frame(int(FPS * 8.0)) # SMS dispatch active
    poster_frame.save("public/images/projects/daloyaqua-poster.webp", "WEBP", quality=92)
    print("Poster saved: public/images/projects/daloyaqua-poster.webp")

if __name__ == "__main__":
    main()
