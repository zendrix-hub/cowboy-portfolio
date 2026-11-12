import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
FPS = 24
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION) # 288 frames

# Font helper
def get_font(size, bold=False):
    # Try system fonts, fall back to default
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
font_metric_lbl = get_font(11, bold=False)
font_metric_val = get_font(15, bold=True)
font_chat_bold = get_font(13, bold=True)
font_chat_body = get_font(12, bold=False)
font_badge = get_font(11, bold=True)
font_mono = get_font(11, bold=False)

# Theme tokens (Bianco Fuji Dark)
BG_MAIN = (5, 5, 5, 255)         # #050505
BG_SIDEBAR = (12, 12, 14, 255)   # #0C0C0E
BG_CARD = (18, 18, 20, 255)      # #121214
BG_ROAST = (28, 8, 10, 255)      # #1C080A
ACCENT_RED = (227, 38, 54, 255)  # Ferrari Red #E32636
ACCENT_GOLD = (255, 215, 0, 255) # Gold #FFD700
TEXT_MAIN = (250, 250, 250, 255)
TEXT_MUTED = (160, 160, 160, 255)
BORDER_COLOR = (42, 42, 48, 255)

def render_frame(frame_idx):
    t = frame_idx / FPS # seconds

    # Base frame
    frame = Image.new("RGBA", (W, H), BG_MAIN)
    draw = ImageDraw.Draw(frame)

    # 1. Left Sidebar (Streamlit Sidebar: 300px width)
    SIDEBAR_W = 310
    draw.rectangle([0, 0, SIDEBAR_W, H], fill=BG_SIDEBAR)
    draw.line([SIDEBAR_W, 0, SIDEBAR_W, H], fill=BORDER_COLOR, width=1)

    # Sidebar Header
    draw.text((24, 24), "Chef Zendrix", font=font_title, fill=ACCENT_RED)
    draw.text((24, 48), "KITCHEN ACTIVE", font=font_badge, fill=TEXT_MUTED)

    # Sidebar Inputs Mockup
    sb_y = 80
    items = [
        ("The Objective", "Focus (BJJ / Martial Arts)"),
        ("The Discipline", "High Protein"),
        ("Heat Level", "Hell's Kitchen (Inferno)"),
        ("Grind Days", "4 Days / Week"),
        ("Weight / Height", "70 kg • 170 cm")
    ]
    for lbl, val in items:
        draw.text((24, sb_y), lbl.upper(), font=font_metric_lbl, fill=TEXT_MUTED)
        # Selectbox box
        draw.rounded_rectangle([24, sb_y + 16, SIDEBAR_W - 24, sb_y + 44], radius=6, fill=BG_CARD, outline=BORDER_COLOR)
        # Highlight Inferno in red
        val_color = ACCENT_RED if "Inferno" in val else TEXT_MAIN
        draw.text((34, sb_y + 23), val, font=font_subtitle, fill=val_color)
        sb_y += 56

    # 2. Main Content Area (x: 340 .. 1240)
    CONTENT_X = SIDEBAR_W + 36
    CONTENT_W = W - CONTENT_X - 36

    # App Title Bar
    draw.text((CONTENT_X, 24), "GORDON RAMSAI", font=font_title, fill=TEXT_MAIN)
    draw.text((CONTENT_X + 175, 26), "• UTILITARIAN NUTRITION & RAG AGENT", font=font_subtitle, fill=TEXT_MUTED)

    # 3-Phase Term Badge at Top Right (Minimal, 0 unnecessary text)
    # Phase 1 (0.0s - 4.0s): MICHELIN ACCOUNTABILITY
    # Phase 2 (4.0s - 8.0s): CHROMADB VECTOR RAG
    # Phase 3 (8.0s - 12.0s): GEMINI INFERNO AGENT
    if t < 4.0:
        badge_text = "TERM 1 // MICHELIN ACCOUNTABILITY"
        badge_col = ACCENT_GOLD
    elif t < 8.0:
        badge_text = "TERM 2 // CHROMADB VECTOR RAG"
        badge_col = (147, 197, 253, 255) # Sky blue
    else:
        badge_text = "TERM 3 // GEMINI INFERNO AGENT"
        badge_col = ACCENT_RED

    badge_w = 260
    badge_x = W - badge_w - 36
    draw.rounded_rectangle([badge_x, 20, badge_x + badge_w, 48], radius=14, fill=(20, 20, 26, 255), outline=badge_col, width=1)
    draw.ellipse([badge_x + 12, 31, badge_x + 18, 37], fill=badge_col)
    draw.text((badge_x + 26, 27), badge_text, font=font_badge, fill=badge_col)

    # SECTION 1: Michelin Star Kitchen Rating Card
    CARD_Y = 64
    rating_border = ACCENT_GOLD if t < 8.0 else ACCENT_RED
    draw.rounded_rectangle([CONTENT_X, CARD_Y, CONTENT_X + CONTENT_W, CARD_Y + 76], radius=8, fill=BG_CARD, outline=BORDER_COLOR)
    # Left vertical accent line
    draw.rounded_rectangle([CONTENT_X, CARD_Y, CONTENT_X + 6, CARD_Y + 76], radius=3, fill=rating_border)

    draw.text((CONTENT_X + 22, CARD_Y + 12), "CHEF'S KITCHEN RATING", font=font_metric_lbl, fill=TEXT_MUTED)
    rating_title = "*** RATING (MICHELIN STANDARD)" if t < 8.0 else "INFERNO MODE // HIGH HEAT COACHING"
    draw.text((CONTENT_X + 22, CARD_Y + 28), rating_title, font=font_metric_val, fill=rating_border)
    rating_quote = '"Perfect execution. Daily macro intake aligned with athletic performance."' if t < 8.0 else '"Right, let\'s see if you actually have discipline or if you\'re just pretending!"'
    draw.text((CONTENT_X + 22, CARD_Y + 50), rating_quote, font=font_chat_body, fill=TEXT_MAIN)

    # SECTION 2: Macro Nutrients Dashboard (4 Columns)
    METRIC_Y = CARD_Y + 92
    METRIC_W = (CONTENT_W - 36) // 4
    metrics = [
        ("CALORIES", "1,850 / 2,310 kcal", "460 left"),
        ("PROTEIN", "142 / 154 g", "12g left"),
        ("CARBS", "215 / 260 g", "45g left"),
        ("FAT", "55 / 64 g", "9g left")
    ]
    for m_idx, (m_lbl, m_val, m_sub) in enumerate(metrics):
        mx = CONTENT_X + m_idx * (METRIC_W + 12)
        draw.rounded_rectangle([mx, METRIC_Y, mx + METRIC_W, METRIC_Y + 58], radius=6, fill=BG_CARD, outline=BORDER_COLOR)
        draw.text((mx + 12, METRIC_Y + 8), m_lbl, font=font_metric_lbl, fill=TEXT_MUTED)
        draw.text((mx + 12, METRIC_Y + 23), m_val, font=font_metric_val, fill=TEXT_MAIN)
        draw.text((mx + 12, METRIC_Y + 41), m_sub, font=font_metric_lbl, fill=(67, 233, 123, 255))

    # SECTION 3: Calorie Progress Bar
    PROG_Y = METRIC_Y + 68
    draw.rounded_rectangle([CONTENT_X, PROG_Y, CONTENT_X + CONTENT_W, PROG_Y + 8], radius=4, fill=(30, 30, 36, 255))
    bar_fill = int(CONTENT_W * 0.80)
    draw.rounded_rectangle([CONTENT_X, PROG_Y, CONTENT_X + bar_fill, PROG_Y + 8], radius=4, fill=ACCENT_RED)

    # SECTION 4: Chat Window & RAG Retrieval
    CHAT_Y = PROG_Y + 22
    CHAT_H = 360

    # User Chat Bubble
    draw.rounded_rectangle([CONTENT_X, CHAT_Y, CONTENT_X + CONTENT_W, CHAT_Y + 62], radius=8, fill=BG_CARD, outline=BORDER_COLOR)
    draw.text((CONTENT_X + 16, CHAT_Y + 12), "CHEF ZENDRIX", font=font_chat_bold, fill=(147, 197, 253, 255))
    
    # Animated user query typing
    full_query = "Cheap high-protein dinner after BJJ training?"
    if t < 1.0:
        q_len = 0
    elif t < 3.2:
        q_len = int(((t - 1.0) / 2.2) * len(full_query))
    else:
        q_len = len(full_query)
    curr_q = full_query[:q_len]
    draw.text((CONTENT_X + 16, CHAT_Y + 34), curr_q, font=font_chat_body, fill=TEXT_MAIN)

    # Phase 2: ChromaDB Vector RAG Pulse Box (t >= 3.8s)
    if t >= 3.8:
        rag_alpha = min(1.0, (t - 3.8) / 0.5)
        RAG_Y = CHAT_Y + 74
        draw.rounded_rectangle([CONTENT_X, RAG_Y, CONTENT_X + CONTENT_W, RAG_Y + 54], radius=6, fill=(15, 23, 42, 255), outline=(56, 189, 248, int(220 * rag_alpha)))
        draw.text((CONTENT_X + 16, RAG_Y + 10), "CHROMADB EMBEDDING RETRIEVAL // COSINE SIMILARITY 0.94", font=font_badge, fill=(56, 189, 248, 255))
        draw.text((CONTENT_X + 16, RAG_Y + 28), "Matched knowledge.txt chunk: 'RULE 3: BROKE STUDENT NUTRITION (Eggs, Tuna, Kangkong)'", font=font_mono, fill=(203, 213, 225, 255))

    # Phase 3: Gordon's Signature Roast Box Response (t >= 6.8s)
    if t >= 6.8:
        ROAST_Y = CHAT_Y + 140
        ROAST_H = 175
        draw.rounded_rectangle([CONTENT_X, ROAST_Y, CONTENT_X + CONTENT_W, ROAST_Y + ROAST_H], radius=8, fill=BG_ROAST, outline=BORDER_COLOR)
        # Ferrari Red solid left border (Roast Box feature)
        draw.rounded_rectangle([CONTENT_X, ROAST_Y, CONTENT_X + 6, ROAST_Y + ROAST_H], radius=3, fill=ACCENT_RED)

        draw.text((CONTENT_X + 22, ROAST_Y + 14), "GORDON RAMSAI (HELL'S KITCHEN INFERNO)", font=font_chat_bold, fill=ACCENT_RED)
        
        # Streaming response tokens
        full_roast = [
            "Right, wake up! You just rolled on the mats for two hours and you want cheap fuel?",
            "Eggs, canned tuna, and fresh kangkong stir-fry. High-protein, zero excuses!",
            "Delivers 46g of clean protein for under 110 pesos (420 kcal | 46g P | 12g F | 8g C).",
            "Do NOT drown it in instant sodium rubbish or I'll throw you out of my kitchen. Proper food!"
        ]
        
        stream_prog = min(1.0, (t - 6.8) / 4.6)
        total_lines = len(full_roast)
        active_lines = int(stream_prog * total_lines) + 1
        
        for l_idx in range(min(active_lines, total_lines)):
            draw.text((CONTENT_X + 22, ROAST_Y + 42 + l_idx * 24), full_roast[l_idx], font=font_chat_body, fill=TEXT_MAIN)

        # Telemetry footer
        draw.line([CONTENT_X + 22, ROAST_Y + ROAST_H - 30, CONTENT_X + CONTENT_W - 22, ROAST_Y + ROAST_H - 30], fill=(50, 20, 24, 255), width=1)
        draw.text((CONTENT_X + 22, ROAST_Y + ROAST_H - 22), "GOOGLE GEMINI 1.5 PRO • 280ms LATENCY • LOCAL RAG GROUNDED • LANGFUSE TRACED", font=font_metric_lbl, fill=TEXT_MUTED)

    # 4. Animated Touch / Mouse Cursor Demonstration
    # Coordinates for cursor interaction
    def get_cursor_pos(time_sec):
        if time_sec < 1.0:
            # Entering to chat input
            p = time_sec / 1.0
            return (CONTENT_X + 300 * p, CHAT_Y + 34)
        elif time_sec < 3.5:
            # Over chat input
            return (CONTENT_X + 320, CHAT_Y + 34)
        elif time_sec < 5.0:
            # Glide to RAG Box
            p = (time_sec - 3.5) / 1.5
            return (CONTENT_X + 320 + p * 80, CHAT_Y + 100)
        elif time_sec < 7.5:
            # Over RAG result
            return (CONTENT_X + 400, CHAT_Y + 100)
        elif time_sec < 9.5:
            # Glide to Roast Box
            p = (time_sec - 7.5) / 2.0
            return (CONTENT_X + 400 - p * 150, CHAT_Y + 190)
        else:
            return (CONTENT_X + 250, CHAT_Y + 230)

    cur_x, cur_y = get_cursor_pos(t)
    cur_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(cur_layer)
    # Cursor dot & ring
    c_draw.ellipse([cur_x - 12, cur_y - 12, cur_x + 12, cur_y + 12], outline=(255, 255, 255, 160), width=2)
    c_draw.ellipse([cur_x - 4, cur_y - 4, cur_x + 4, cur_y + 4], fill=(255, 255, 255, 220))
    frame.alpha_composite(cur_layer)

    return frame.convert("RGB")

def main():
    print(f"Rendering Gordon RamsAI authentic video ({TOTAL_FRAMES} frames @ {FPS}fps)...")
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
        "public/videos/gordon-ramsai.mp4"
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        proc.stdin.write(frame.tobytes())
        if i % 48 == 0 or i == TOTAL_FRAMES - 1:
            print(f"  Frame {i+1}/{TOTAL_FRAMES} ({(i+1)/TOTAL_FRAMES*100:.1f}%) rendered...")

    proc.stdin.close()
    proc.wait()
    print("Video encoding complete: public/videos/gordon-ramsai.mp4")

    # Generate matching poster
    poster_frame = render_frame(int(FPS * 8.5)) # Roast Box active
    poster_frame.save("public/images/projects/gordon-ramsai-poster.webp", "WEBP", quality=92)
    print("Poster saved: public/images/projects/gordon-ramsai-poster.webp")

if __name__ == "__main__":
    main()
