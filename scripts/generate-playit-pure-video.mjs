import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import sharp from "sharp";

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 24;
const DURATION_SEC = 12.0;
const TOTAL_FRAMES = Math.round(FPS * DURATION_SEC); // 288 frames

const FFMPEG_PATH = "/home/zendrix/.local/bin/ffmpeg";
const OUT_VIDEOS_DIR = path.resolve("public/videos");
const OUT_IMAGES_DIR = path.resolve("public/images/projects");

if (!fs.existsSync(OUT_VIDEOS_DIR)) fs.mkdirSync(OUT_VIDEOS_DIR, { recursive: true });
if (!fs.existsSync(OUT_IMAGES_DIR)) fs.mkdirSync(OUT_IMAGES_DIR, { recursive: true });

const SCREENSHOTS_DIR =
  "/mnt/c/Users/Zendrix/Desktop/thesis/playIT-v2-workspace/dist/PlayIT/docs/screenshots";

// Phone Screen inside the canvas
const SCREEN_W = 320;
const SCREEN_H = 658;
const SCREEN_X = Math.round((WIDTH - SCREEN_W) / 2); // 480
const SCREEN_Y = Math.round((HEIGHT - SCREEN_H) / 2); // 31
const SCREEN_RADIUS = 28;

// Easing helpers
function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}
function easeInOutCubic(t) {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}
function easeOutQuad(t) {
  const c = clamp(t);
  return 1 - (1 - c) * (1 - c);
}
function easeOutBack(t) {
  const c = clamp(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(c - 1, 3) + c1 * Math.pow(c - 1, 2);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Pre-load and resize all 8 screenshots
async function loadScreenshots() {
  const files = {
    splash: "splash.png",
    nameprompt: "nameprompt.png",
    map: "map.png",
    hearit: "hearit.png",
    sayit: "sayit.png",
    sayit_cue: "sayit_cue.png",
    findit: "findit.png",
    blendit: "blendit.png",
  };

  const buffers = {};
  for (const [key, filename] of Object.entries(files)) {
    const p = path.join(SCREENSHOTS_DIR, filename);
    if (!fs.existsSync(p)) {
      throw new Error(`Screenshot not found: ${p}`);
    }
    const buf = await sharp(p)
      .resize(SCREEN_W, SCREEN_H, { fit: "cover" })
      .png({ quality: 90 })
      .toBuffer();
    buffers[key] = buf.toString("base64");
  }

  // Also prepare a cropped mouth cue thumbnail from sayit_cue for the pop-up
  // In sayit_cue.png (720x1480), the mouth cue is on the left side near mic
  const cueBuf = await sharp(path.join(SCREENSHOTS_DIR, "sayit_cue.png"))
    .extract({ left: 40, top: 820, width: 280, height: 280 })
    .resize(76, 76)
    .png()
    .toBuffer();
  buffers.mouth_cue_thumb = cueBuf.toString("base64");

  return buffers;
}

// Generate static deterministic confetti particles
const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const colors = [
    "#F59E0B", "#10B981", "#38BDF8", "#EC4899", "#A855F7", "#FBBF24", "#34D399"
  ];
  const angle = (i / 48) * Math.PI * 2 + (i * 0.3);
  const dist = 50 + ((i * 37) % 110);
  return {
    startX: 160 + ((i % 5) - 2) * 20,
    startY: 280,
    targetX: 160 + Math.cos(angle) * dist * 1.3,
    targetY: 280 + Math.sin(angle) * dist * 0.9 - 60 - ((i * 13) % 80),
    color: colors[i % colors.length],
    size: 4 + (i % 5),
    rotation: (i * 45) % 360,
    rotSpeed: ((i % 2 === 0 ? 1 : -1) * (180 + (i * 20))),
    shape: i % 3 === 0 ? "star" : i % 3 === 1 ? "rect" : "circle"
  };
});

// Render SVG frame for frameIndex
function renderFrameSvg(frameIndex, b64) {
  const t = frameIndex / FPS; // 0.0 to 12.0s

  // Determine active beat and background ambient glow
  // Beat 1: Splash (0.0s - 2.0s) -> warm amber glow
  // Beat 2: Avatar Setup (2.0s - 4.0s) -> soft violet/purple glow
  // Beat 3: Bohol Map Trail (4.0s - 6.0s) -> emerald nature glow
  // Beat 4: Hear It (6.0s - 8.0s) -> cyan sky glow
  // Beat 5: Say It (8.0s - 10.0s) -> cyan to emerald glow
  // Beat 6: Blend It & Victory (10.0s - 12.0s) -> warm gold victory glow

  let glowColor = "#F59E0B";
  let glowOpacity = 0.14;

  if (t >= 2.0 && t < 4.0) {
    glowColor = "#8B5CF6";
    glowOpacity = 0.15;
  } else if (t >= 4.0 && t < 6.0) {
    glowColor = "#10B981";
    glowOpacity = 0.16;
  } else if (t >= 6.0 && t < 8.0) {
    glowColor = "#06B6D4";
    glowOpacity = 0.16;
  } else if (t >= 8.0 && t < 10.0) {
    glowColor = t > 9.4 ? "#10B981" : "#38BDF8";
    glowOpacity = 0.18;
  } else if (t >= 10.0) {
    glowColor = "#EAB308";
    glowOpacity = 0.22;
  }

  // Inside screen content layers
  let screenContentSvg = "";
  let cursorSvg = "";

  // -------------------------------------------------------------
  // BEAT 1: SPLASH (0.0s - 2.0s)
  // -------------------------------------------------------------
  if (t < 2.0) {
    if (t < 1.6) {
      // Steady splash screen
      screenContentSvg = `
        <image href="data:image/png;base64,${b64.splash}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
      `;
    } else {
      // Transition 1 -> 2 (1.6s - 2.0s): Slide left
      const p = easeInOutCubic((t - 1.6) / 0.4);
      const offSplash = Math.round(-p * SCREEN_W);
      const offPrompt = Math.round((1 - p) * SCREEN_W);
      screenContentSvg = `
        <g transform="translate(${offSplash}, 0)">
          <image href="data:image/png;base64,${b64.splash}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
        <g transform="translate(${offPrompt}, 0)">
          <image href="data:image/png;base64,${b64.nameprompt}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
      `;
    }

    // Touch Cursor motion
    // 0.0 - 0.7: cursor hovers into view from bottom right
    // 0.7 - 1.3: cursor moves to Start button (160, 615)
    // 1.3 - 1.6: cursor taps (down at 1.35, ripple expands 1.35 - 1.6)
    if (t >= 0.3 && t < 1.65) {
      let cx = 250;
      let cy = 645;
      let cScale = 1.0;
      let rippleSvg = "";

      if (t < 1.3) {
        const p = easeInOutCubic(clamp((t - 0.3) / 1.0));
        cx = lerp(250, 160, p);
        cy = lerp(645, 615, p);
      } else {
        // At button
        cx = 160;
        cy = 615;
        const tapT = (t - 1.3) / 0.35;
        if (tapT < 0.3) {
          cScale = 0.82;
        } else {
          cScale = 0.82 + (tapT - 0.3) * 0.25;
        }
        // Expanding gold ripple
        const ripR = 14 + tapT * 42;
        const ripOp = Math.max(0, 0.85 * (1 - tapT));
        rippleSvg = `
          <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#FCD34D" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
          <circle cx="${cx}" cy="${cy}" r="${ripR * 0.6}" stroke="#F59E0B" stroke-width="1.5" fill="none" opacity="${ripOp * 0.7}"/>
        `;
      }

      cursorSvg = `
        ${rippleSvg}
        <g transform="translate(${cx}, ${cy}) scale(${cScale})">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
        </g>
      `;
    }
  }

  // -------------------------------------------------------------
  // BEAT 2: AVATAR / ONBOARDING (2.0s - 4.0s)
  // -------------------------------------------------------------
  else if (t >= 2.0 && t < 4.0) {
    if (t < 3.6) {
      screenContentSvg = `
        <image href="data:image/png;base64,${b64.nameprompt}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
      `;
    } else {
      // Transition 2 -> 3 (3.6s - 4.0s): Slide left into Map
      const p = easeInOutCubic((t - 3.6) / 0.4);
      const offPrompt = Math.round(-p * SCREEN_W);
      const offMap = Math.round((1 - p) * SCREEN_W);
      screenContentSvg = `
        <g transform="translate(${offPrompt}, 0)">
          <image href="data:image/png;base64,${b64.nameprompt}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
        <g transform="translate(${offMap}, 0)">
          <image href="data:image/png;base64,${b64.map}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
      `;
    }

    // Micro-interactions:
    // 2.0 - 2.5: Cursor moves to center animal avatar card at (160, 360)
    // 2.5 - 2.9: Tap avatar! Golden card selection ring & star burst
    // 2.9 - 3.3: Cursor moves to "Let's Play" button at (160, 615)
    // 3.3 - 3.6: Tap "Let's Play"! Emerald ripple expands
    let avatarHighlightSvg = "";
    let rippleSvg = "";
    let cx = 160;
    let cy = 360;
    let cScale = 1.0;

    if (t >= 2.5) {
      // Selection ring stays around chosen avatar
      avatarHighlightSvg = `
        <rect x="110" y="310" width="100" height="100" rx="20" fill="none" stroke="#FBBF24" stroke-width="3" opacity="0.9"/>
      `;
    }

    if (t >= 2.0 && t < 2.9) {
      const p = easeInOutCubic(clamp((t - 2.0) / 0.5));
      cx = lerp(160, 160, p);
      cy = lerp(500, 360, p);

      if (t >= 2.5) {
        const tapT = (t - 2.5) / 0.4;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 12 + tapT * 35;
        const ripOp = Math.max(0, 0.9 * (1 - tapT));
        rippleSvg = `
          <circle cx="160" cy="360" r="${ripR}" stroke="#FBBF24" stroke-width="2" fill="none" opacity="${ripOp}"/>
        `;
      }
    } else if (t >= 2.9 && t < 3.7) {
      const p = easeInOutCubic(clamp((t - 2.9) / 0.4));
      cx = lerp(160, 160, p);
      cy = lerp(360, 615, p);

      if (t >= 3.3) {
        const tapT = (t - 3.3) / 0.35;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 14 + tapT * 40;
        const ripOp = Math.max(0, 0.85 * (1 - tapT));
        rippleSvg = `
          <circle cx="160" cy="615" r="${ripR}" stroke="#10B981" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
        `;
      }
    }

    cursorSvg = `
      ${avatarHighlightSvg}
      ${rippleSvg}
      <g transform="translate(${cx}, ${cy}) scale(${cScale})">
        <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
      </g>
    `;
  }

  // -------------------------------------------------------------
  // BEAT 3: BOHOL MAP TRAIL (4.0s - 6.0s)
  // -------------------------------------------------------------
  else if (t >= 4.0 && t < 6.0) {
    const nodeX = 160;
    const nodeY = 470;

    // Simulate map scrolling upward slightly (0 to -35px) between 4.0s and 5.0s
    let scrollY = 0;
    if (t >= 4.0 && t < 5.0) {
      scrollY = Math.round(-30 * easeInOutCubic((t - 4.0) / 1.0));
    } else {
      scrollY = -30;
    }

    if (t < 5.6) {
      // Map screen with active scrolling and pulsing node
      const pulse1 = (t * 4.0) % 1.0;
      const pulse2 = ((t * 4.0) + 0.5) % 1.0;
      const haloR1 = 22 + pulse1 * 26;
      const haloOp1 = 0.8 * (1 - pulse1);
      const haloR2 = 22 + pulse2 * 26;
      const haloOp2 = 0.8 * (1 - pulse2);

      screenContentSvg = `
        <g transform="translate(0, ${scrollY})">
          <image href="data:image/png;base64,${b64.map}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
          <!-- Active Pulsing Beacon Halo on Level Node M -->
          <circle cx="${nodeX}" cy="${nodeY}" r="${haloR1}" stroke="#F59E0B" stroke-width="2" fill="none" opacity="${haloOp1}"/>
          <circle cx="${nodeX}" cy="${nodeY}" r="${haloR2}" stroke="#FCD34D" stroke-width="1.5" fill="none" opacity="${haloOp2}"/>
        </g>
      `;
    } else {
      // Transition 3 -> 4 (5.6s - 6.0s): Zoom-fade into Hear It
      const p = easeInOutCubic((t - 5.6) / 0.4);
      const scale = 1.0 + p * 0.15;
      const transX = -(SCREEN_W * (scale - 1)) / 2;
      const transY = -(SCREEN_H * (scale - 1)) / 2;
      screenContentSvg = `
        <g transform="translate(${transX}, ${transY}) scale(${scale})" opacity="${1 - p}">
          <image href="data:image/png;base64,${b64.map}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
        <g opacity="${p}">
          <image href="data:image/png;base64,${b64.hearit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
      `;
    }

    // Touch Cursor to tap Node M
    if (t >= 4.5 && t < 5.7) {
      let cx = 220;
      let cy = 560;
      let cScale = 1.0;
      let rippleSvg = "";

      const currentTargetY = nodeY + scrollY;

      if (t < 5.2) {
        const p = easeInOutCubic((t - 4.5) / 0.7);
        cx = lerp(220, nodeX, p);
        cy = lerp(560, currentTargetY, p);
      } else {
        cx = nodeX;
        cy = currentTargetY;
        const tapT = (t - 5.2) / 0.4;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 14 + tapT * 40;
        const ripOp = Math.max(0, 0.9 * (1 - tapT));
        rippleSvg = `
          <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#F59E0B" stroke-width="3" fill="none" opacity="${ripOp}"/>
        `;
      }

      cursorSvg = `
        ${rippleSvg}
        <g transform="translate(${cx}, ${cy}) scale(${cScale})">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
        </g>
      `;
    }
  }

  // -------------------------------------------------------------
  // BEAT 4: HEAR IT (6.0s - 8.0s) - Auditory Modeling (/m/ /m/ /m/ mouse)
  // -------------------------------------------------------------
  else if (t >= 6.0 && t < 8.0) {
    if (t < 7.6) {
      // Hear It screen with dynamic soundwave radiation arcs from Lily / speaker
      const speakerX = 160;
      const speakerY = 285;

      // 3 Rhythmic soundwave beats (simulating: /m/... /m/... mouse!)
      const soundT = t - 6.0;
      let waveSvg = "";

      // Wave 1 (0.2s - 0.7s)
      if (soundT >= 0.2 && soundT < 0.8) {
        const wP = (soundT - 0.2) / 0.6;
        const r = 25 + wP * 55;
        const op = Math.max(0, 0.8 * (1 - wP));
        waveSvg += `
          <circle cx="${speakerX}" cy="${speakerY}" r="${r}" stroke="#38BDF8" stroke-width="2.5" fill="none" opacity="${op}"/>
        `;
      }
      // Wave 2 (0.7s - 1.2s)
      if (soundT >= 0.7 && soundT < 1.3) {
        const wP = (soundT - 0.7) / 0.6;
        const r = 25 + wP * 55;
        const op = Math.max(0, 0.8 * (1 - wP));
        waveSvg += `
          <circle cx="${speakerX}" cy="${speakerY}" r="${r}" stroke="#06B6D4" stroke-width="2.5" fill="none" opacity="${op}"/>
        `;
      }
      // Wave 3 (1.2s - 1.7s) - "mouse!" with wider halo
      if (soundT >= 1.2 && soundT < 1.8) {
        const wP = (soundT - 1.2) / 0.6;
        const r = 25 + wP * 70;
        const op = Math.max(0, 0.9 * (1 - wP));
        waveSvg += `
          <circle cx="${speakerX}" cy="${speakerY}" r="${r}" stroke="#67E8F9" stroke-width="3" fill="none" opacity="${op}"/>
          <circle cx="${speakerX}" cy="${speakerY}" r="${r * 0.7}" stroke="#38BDF8" stroke-width="2" fill="none" opacity="${op * 0.8}"/>
        `;
      }

      screenContentSvg = `
        <image href="data:image/png;base64,${b64.hearit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        ${waveSvg}
      `;
    } else {
      // Transition 4 -> 5 (7.6s - 8.0s): Slide left into Say It
      const p = easeInOutCubic((t - 7.6) / 0.4);
      const offHear = Math.round(-p * SCREEN_W);
      const offSay = Math.round((1 - p) * SCREEN_W);
      screenContentSvg = `
        <g transform="translate(${offHear}, 0)">
          <image href="data:image/png;base64,${b64.hearit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
        <g transform="translate(${offSay}, 0)">
          <image href="data:image/png;base64,${b64.sayit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
      `;
    }

    // Cursor glides to Next arrow at bottom right (275, 615)
    if (t >= 7.0 && t < 7.8) {
      let cx = 200;
      let cy = 550;
      let cScale = 1.0;
      let rippleSvg = "";

      if (t < 7.4) {
        const p = easeInOutCubic((t - 7.0) / 0.4);
        cx = lerp(200, 275, p);
        cy = lerp(550, 615, p);
      } else {
        cx = 275;
        cy = 615;
        const tapT = (t - 7.4) / 0.35;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 12 + tapT * 35;
        const ripOp = Math.max(0, 0.85 * (1 - tapT));
        rippleSvg = `
          <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#38BDF8" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
        `;
      }

      cursorSvg = `
        ${rippleSvg}
        <g transform="translate(${cx}, ${cy}) scale(${cScale})">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
        </g>
      `;
    }
  }

  // -------------------------------------------------------------
  // BEAT 5: SAY IT (8.0s - 10.0s) - Vosk ASR Evaluation & Waveforms
  // -------------------------------------------------------------
  else if (t >= 8.0 && t < 10.0) {
    const micX = 160;
    const micY = 460;

    let micAuraSvg = "";
    let waveBarsSvg = "";
    let cueOverlaySvg = "";
    let victoryStarsSvg = "";

    // 8.0 - 8.5: Cursor moves to Mic at (160, 460)
    // 8.5: Tap mic!
    // 8.5 - 9.4: Recording active! Voice waveform bars dancing + mouth cue popup
    // 9.4 - 10.0: Success! Emerald flash + 3 stars float up

    if (t >= 8.5 && t < 9.4) {
      // Active speech recording
      const recT = t - 8.5;
      const pulseRec = 0.5 + 0.5 * Math.sin(recT * 12.0);
      micAuraSvg = `
        <circle cx="${micX}" cy="${micY}" r="46" fill="none" stroke="#38BDF8" stroke-width="3" opacity="${0.4 + pulseRec * 0.5}"/>
        <circle cx="${micX}" cy="${micY}" r="${46 + pulseRec * 14}" fill="none" stroke="#818CF8" stroke-width="1.5" opacity="${0.7 * (1 - pulseRec)}"/>
      `;

      // 7 dancing voice waveform bars below mic (centered at y: 535)
      const heights = [
        12 + Math.sin(recT * 14 + 0) * 10,
        18 + Math.sin(recT * 18 + 1) * 14,
        28 + Math.sin(recT * 22 + 2) * 20,
        34 + Math.sin(recT * 25 + 3) * 22,
        28 + Math.sin(recT * 20 + 4) * 18,
        16 + Math.sin(recT * 16 + 5) * 12,
        10 + Math.sin(recT * 12 + 6) * 8
      ];
      waveBarsSvg = `
        <g transform="translate(${micX - 42}, 535)">
          <rect x="-8" y="-30" width="100" height="50" rx="12" fill="#0B132B" opacity="0.85"/>
          ${heights.map((h, i) => `
            <rect x="${i * 12}" y="${-h / 2}" width="6" height="${h}" rx="3" fill="#38BDF8"/>
          `).join("")}
        </g>
      `;

      // Mouth cue thumbnail pops in smoothly beside mic at 8.8s - 9.4s
      if (t >= 8.8) {
        const cuePop = easeOutBack(clamp((t - 8.8) / 0.25));
        cueOverlaySvg = `
          <g transform="translate(68, ${micY - 38}) scale(${cuePop})">
            <rect x="-4" y="-4" width="84" height="84" rx="16" fill="#1E293B" stroke="#F59E0B" stroke-width="2.5"/>
            <clipPath id="cueClip">
              <rect width="76" height="76" rx="12"/>
            </clipPath>
            <image href="data:image/png;base64,${b64.mouth_cue_thumb}" width="76" height="76" clip-path="url(#cueClip)"/>
          </g>
        `;
      }
    } else if (t >= 9.4 && t < 9.7) {
      // 9.4 - 9.7: Vosk ASR Success! Vibrant emerald ring & checkmark glow
      const succT = (t - 9.4) / 0.3;
      micAuraSvg = `
        <circle cx="${micX}" cy="${micY}" r="48" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="4"/>
        <circle cx="${micX}" cy="${micY}" r="${48 + succT * 35}" fill="none" stroke="#34D399" stroke-width="2" opacity="${1 - succT}"/>
      `;

      // Stars floating upward
      const starLift = succT * 60;
      victoryStarsSvg = `
        <g transform="translate(0, ${-starLift})" opacity="${1 - succT * 0.3}">
          <circle cx="${micX - 35}" cy="${micY - 20}" r="8" fill="#FBBF24"/>
          <circle cx="${micX}" cy="${micY - 40}" r="11" fill="#F59E0B"/>
          <circle cx="${micX + 35}" cy="${micY - 20}" r="8" fill="#FBBF24"/>
        </g>
      `;
    }

    if (t < 9.6) {
      screenContentSvg = `
        <image href="data:image/png;base64,${b64.sayit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        ${micAuraSvg}
        ${waveBarsSvg}
        ${cueOverlaySvg}
        ${victoryStarsSvg}
      `;
    } else {
      // Transition 5 -> 6 (9.6s - 10.0s): Slide left into Blend It
      const p = easeInOutCubic((t - 9.6) / 0.4);
      const offSay = Math.round(-p * SCREEN_W);
      const offBlend = Math.round((1 - p) * SCREEN_W);
      screenContentSvg = `
        <g transform="translate(${offSay}, 0)">
          <image href="data:image/png;base64,${b64.sayit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
          ${micAuraSvg}
        </g>
        <g transform="translate(${offBlend}, 0)">
          <image href="data:image/png;base64,${b64.blendit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
        </g>
      `;
    }

    // Cursor taps the Mic at 8.5
    if (t >= 8.1 && t < 8.9) {
      let cx = 160;
      let cy = 560;
      let cScale = 1.0;
      let rippleSvg = "";

      if (t < 8.5) {
        const p = easeInOutCubic((t - 8.1) / 0.4);
        cx = 160;
        cy = lerp(560, micY, p);
      } else {
        cx = 160;
        cy = micY;
        const tapT = (t - 8.5) / 0.35;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 14 + tapT * 40;
        const ripOp = Math.max(0, 0.85 * (1 - tapT));
        rippleSvg = `
          <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#38BDF8" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
        `;
      }

      cursorSvg = `
        ${rippleSvg}
        <g transform="translate(${cx}, ${cy}) scale(${cScale})">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
        </g>
      `;
    }
  }

  // -------------------------------------------------------------
  // BEAT 6: BLEND IT (10.0s - 12.0s) - CVC Word Synthesis & Celebration
  // Target Word: "S A M"
  // Slots at (95, 260), (160, 260), (225, 260)
  // Dealt tiles in tray at (95, 480), (160, 480), (225, 480)
  // -------------------------------------------------------------
  else if (t >= 10.0) {
    const slotY = 260;
    const trayY = 480;
    const slotX = [95, 160, 225];

    let tileSvg = "";
    let celebrationSvg = "";

    // Drag sequence:
    // 10.0 - 10.45: Pick up 'S', drag from (95, trayY) to slot 1 (slotX[0], slotY)
    // 10.45 - 10.9: Pick up 'A', drag from (160, trayY) to slot 2 (slotX[1], slotY)
    // 10.9 - 11.35: Pick up 'M', drag from (225, trayY) to slot 3 (slotX[2], slotY)
    // 11.35 - 12.0: Word "SAM" locks, golden glow, confetti shower!

    let sPos = { x: slotX[0], y: trayY, placed: false };
    let aPos = { x: slotX[1], y: trayY, placed: false };
    let mPos = { x: slotX[2], y: trayY, placed: false };

    let curX = 160;
    let curY = 400;
    let showCursor = true;

    // Tile S
    if (t < 10.45) {
      const p = easeInOutCubic(clamp((t - 10.0) / 0.45));
      sPos.x = slotX[0];
      sPos.y = lerp(trayY, slotY, p);
      curX = sPos.x;
      curY = sPos.y;
    } else {
      sPos.x = slotX[0];
      sPos.y = slotY;
      sPos.placed = true;
    }

    // Tile A
    if (t >= 10.45 && t < 10.9) {
      const p = easeInOutCubic(clamp((t - 10.45) / 0.45));
      aPos.x = slotX[1];
      aPos.y = lerp(trayY, slotY, p);
      curX = aPos.x;
      curY = aPos.y;
    } else if (t >= 10.9) {
      aPos.x = slotX[1];
      aPos.y = slotY;
      aPos.placed = true;
    }

    // Tile M
    if (t >= 10.9 && t < 11.35) {
      const p = easeInOutCubic(clamp((t - 10.9) / 0.45));
      mPos.x = slotX[2];
      mPos.y = lerp(trayY, slotY, p);
      curX = mPos.x;
      curY = mPos.y;
    } else if (t >= 11.35) {
      mPos.x = slotX[2];
      mPos.y = slotY;
      mPos.placed = true;
      showCursor = false;
    }

    function renderLetterTile(letter, pos, color = "#FFFBEB", textColor = "#1E293B") {
      const isDragging = !pos.placed && pos.y < trayY;
      const shadow = isDragging ? `filter="drop-shadow(0 8px 12px rgba(0,0,0,0.35))"` : "";
      const scale = isDragging ? "1.08" : "1.0";
      return `
        <g transform="translate(${pos.x}, ${pos.y}) scale(${scale})" ${shadow}>
          <rect x="-26" y="-30" width="52" height="60" rx="12" fill="${color}" stroke="#D97706" stroke-width="2.5"/>
          <rect x="-22" y="-26" width="44" height="24" rx="6" fill="#FFFFFF" opacity="0.3"/>
          <text x="0" y="11" font-family="system-ui, sans-serif" font-size="32" font-weight="900" fill="${textColor}" text-anchor="middle">${letter}</text>
        </g>
      `;
    }

    tileSvg = `
      ${renderLetterTile("S", sPos, sPos.placed ? "#FEF3C7" : "#FFFFFF")}
      ${renderLetterTile("A", aPos, aPos.placed ? "#FEF3C7" : "#FFFFFF")}
      ${renderLetterTile("M", mPos, mPos.placed ? "#FEF3C7" : "#FFFFFF")}
    `;

    // 11.35 - 12.0: VICTORY CELEBRATION!
    if (t >= 11.35) {
      const vicT = (t - 11.35) / 0.65;
      const pulse = 0.5 + 0.5 * Math.sin(vicT * 16.0);

      // Gold connecting frame around "SAM"
      const frameSvg = `
        <rect x="60" y="222" width="200" height="76" rx="16" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" stroke-width="3"/>
        <rect x="56" y="218" width="208" height="84" rx="20" fill="none" stroke="#FDE68A" stroke-width="2" opacity="${pulse * 0.8}"/>
      `;

      // Confetti burst
      const confettiSvg = CONFETTI.map((c) => {
        const p = easeOutQuad(clamp(vicT * 1.4));
        const px = lerp(c.startX, c.targetX, p);
        const py = lerp(c.startY, c.targetY, p) + (p * p * 80); // gravity
        const rot = c.rotation + p * c.rotSpeed;
        const op = Math.max(0, 1 - p * 0.7);

        if (c.shape === "rect") {
          return `
            <rect x="${px - c.size}" y="${py - c.size / 2}" width="${c.size * 2}" height="${c.size}" rx="1" fill="${c.color}" opacity="${op}" transform="rotate(${rot} ${px} ${py})"/>
          `;
        } else if (c.shape === "circle") {
          return `
            <circle cx="${px}" cy="${py}" r="${c.size}" fill="${c.color}" opacity="${op}"/>
          `;
        } else {
          return `
            <polygon points="${px},${py - c.size * 1.3} ${px + c.size * 0.4},${py - c.size * 0.4} ${px + c.size * 1.3},${py} ${px + c.size * 0.4},${py + c.size * 0.4} ${px},${py + c.size * 1.3} ${px - c.size * 0.4},${py + c.size * 0.4} ${px - c.size * 1.3},${py} ${px - c.size * 0.4},${py - c.size * 0.4}" fill="${c.color}" opacity="${op}"/>
          `;
        }
      }).join("");

      // 3 Victory Stars at top
      const starScale = easeOutBack(clamp(vicT * 2.0));
      const starsTopSvg = `
        <g transform="translate(160, 150) scale(${starScale})">
          <!-- Left Star -->
          <polygon points="-50,-10 -40,-4 -42,8 -50,2 -58,8 -60,-4" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" transform="scale(1.3) translate(12, 0)"/>
          <!-- Center Star (Larger) -->
          <polygon points="0,-18 5,-5 18,-3 8,6 11,19 0,12 -11,19 -8,6 -18,-3 -5,-5" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
          <!-- Right Star -->
          <polygon points="50,-10 60,-4 58,8 50,2 42,8 40,-4" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" transform="scale(1.3) translate(-12, 0)"/>
        </g>
      `;

      celebrationSvg = `
        ${frameSvg}
        ${confettiSvg}
        ${starsTopSvg}
      `;
    }

    screenContentSvg = `
      <image href="data:image/png;base64,${b64.blendit}" width="${SCREEN_W}" height="${SCREEN_H}" preserveAspectRatio="none"/>
      ${tileSvg}
      ${celebrationSvg}
    `;

    if (showCursor) {
      cursorSvg = `
        <g transform="translate(${curX}, ${curY}) scale(0.9)">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
        </g>
      `;
    }
  }

  // =============================================================
  // PHONE HARDWARE FRAME (Sleek Modern Device Mockup)
  // Outer Bezel: X: SCREEN_X - 12 = 468, Y: SCREEN_Y - 12 = 19
  // Width: SCREEN_W + 24 = 344, Height: SCREEN_H + 24 = 682
  // Screen Display Area: X: SCREEN_X = 480, Y: SCREEN_Y = 31
  // =============================================================
  const BEZEL_X = SCREEN_X - 12;
  const BEZEL_Y = SCREEN_Y - 12;
  const BEZEL_W = SCREEN_W + 24;
  const BEZEL_H = SCREEN_H + 24;
  const BEZEL_R = 36;

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background studio gradient -->
      <radialGradient id="studioBg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0E1626"/>
        <stop offset="100%" stop-color="#04070E"/>
      </radialGradient>

      <!-- Dynamic ambient glow behind device -->
      <radialGradient id="ambientAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="${glowOpacity}"/>
        <stop offset="60%" stop-color="${glowColor}" stop-opacity="${glowOpacity * 0.3}"/>
        <stop offset="100%" stop-color="${glowColor}" stop-opacity="0"/>
      </radialGradient>

      <!-- Screen clipping path -->
      <clipPath id="screenViewport">
        <rect x="0" y="0" width="${SCREEN_W}" height="${SCREEN_H}" rx="${SCREEN_RADIUS}"/>
      </clipPath>
    </defs>

    <!-- Studio Backdrop -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#studioBg)"/>

    <!-- Soft Ground Shadow -->
    <ellipse cx="640" cy="704" rx="200" ry="14" fill="#000000" opacity="0.6"/>

    <!-- Ambient Glow behind Phone -->
    <ellipse cx="640" cy="360" rx="380" ry="340" fill="url(#ambientAura)"/>

    <!-- ========================================================= -->
    <!-- PHONE HARDWARE CHASSIS -->
    <!-- ========================================================= -->
    <g id="phoneChassis">
      <!-- Side Buttons (Volume Rocker & Power) -->
      <!-- Left: Volume Rocker -->
      <rect x="${BEZEL_X - 3}" y="${BEZEL_Y + 130}" width="4" height="64" rx="2" fill="#334155"/>
      <!-- Right: Power Button -->
      <rect x="${BEZEL_X + BEZEL_W - 1}" y="${BEZEL_Y + 160}" width="4" height="48" rx="2" fill="#334155"/>

      <!-- Phone Outer Shadow (semi-transparent rects, 0 ms cost) -->
      <rect x="${BEZEL_X - 10}" y="${BEZEL_Y - 4}" width="${BEZEL_W + 20}" height="${BEZEL_H + 20}" rx="${BEZEL_R + 8}" fill="#000000" opacity="0.25"/>
      <rect x="${BEZEL_X - 5}" y="${BEZEL_Y - 2}" width="${BEZEL_W + 10}" height="${BEZEL_H + 12}" rx="${BEZEL_R + 4}" fill="#000000" opacity="0.35"/>

      <!-- Phone Outer Body / Titanium Frame -->
      <rect x="${BEZEL_X}" y="${BEZEL_Y}" width="${BEZEL_W}" height="${BEZEL_H}" rx="${BEZEL_R}" fill="#0F172A" stroke="#334155" stroke-width="2.5"/>

      <!-- Metallic Specular Edge Inset -->
      <rect x="${BEZEL_X + 2}" y="${BEZEL_Y + 2}" width="${BEZEL_W - 4}" height="${BEZEL_H - 4}" rx="${BEZEL_R - 2}" fill="none" stroke="#1E293B" stroke-width="2"/>

      <!-- ======================================================= -->
      <!-- PHONE SCREEN DISPLAY AREA -->
      <!-- ======================================================= -->
      <g transform="translate(${SCREEN_X}, ${SCREEN_Y})">
        <!-- Screen Clip Container -->
        <g clip-path="url(#screenViewport)">
          ${screenContentSvg}
          ${cursorSvg}
        </g>

        <!-- Screen Inner Bezel Glass Border -->
        <rect x="0" y="0" width="${SCREEN_W}" height="${SCREEN_H}" rx="${SCREEN_RADIUS}" fill="none" stroke="#000000" stroke-width="1.5" opacity="0.4"/>

        <!-- Top Dynamic Island / Camera Punch Hole -->
        <g transform="translate(${SCREEN_W / 2}, 14)">
          <rect x="-24" y="-6" width="48" height="12" rx="6" fill="#000000"/>
          <!-- Tiny Lens Glint -->
          <circle cx="8" cy="0" r="2.5" fill="#1E293B"/>
          <circle cx="8.5" cy="-0.5" r="0.8" fill="#38BDF8" opacity="0.6"/>
        </g>
      </g>
    </g>
  </svg>
  `;
}

async function main() {
  console.log("Loading and pre-processing PlayIT screenshots...");
  const b64Images = await loadScreenshots();
  console.log("Screenshots loaded successfully.");

  const outVideoPath = path.join(OUT_VIDEOS_DIR, "playit.mp4");
  const outPosterPath = path.join(OUT_IMAGES_DIR, "playit-poster.webp");

  console.log(`Spawning FFmpeg to encode ${TOTAL_FRAMES} frames into ${outVideoPath}...`);

  const ffmpeg = spawn(
    FFMPEG_PATH,
    [
      "-y",
      "-f", "rawvideo",
      "-vcodec", "rawvideo",
      "-s", `${WIDTH}x${HEIGHT}`,
      "-pix_fmt", "rgba",
      "-r", `${FPS}`,
      "-i", "-",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-crf", "18",
      "-preset", "medium",
      outVideoPath,
    ],
    { stdio: ["pipe", "inherit", "inherit"] }
  );

  ffmpeg.on("error", (err) => {
    console.error("FFmpeg error:", err);
    process.exit(1);
  });

  const t0 = Date.now();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const svgStr = renderFrameSvg(i, b64Images);
    const rawRgba = await sharp(Buffer.from(svgStr)).raw().toBuffer();

    // If frame 120 (5.0s, Bohol Map node selection), save as poster image
    if (i === 120) {
      await sharp(rawRgba, {
        raw: { width: WIDTH, height: HEIGHT, channels: 4 }
      })
        .webp({ quality: 90 })
        .toFile(outPosterPath);
      console.log(`Saved poster image: ${outPosterPath}`);
    }

    const canWrite = ffmpeg.stdin.write(rawRgba);
    if (!canWrite) {
      await new Promise((resolve) => ffmpeg.stdin.once("drain", resolve));
    }

    if (i % 48 === 0 || i === TOTAL_FRAMES - 1) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      const fpsReal = (i / Math.max(0.01, (Date.now() - t0) / 1000)).toFixed(1);
      console.log(`Rendered frame ${i}/${TOTAL_FRAMES} (${elapsed}s elapsed, ${fpsReal} fps)`);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log(`FFmpeg encoding complete! Output: ${outVideoPath}`);
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  const stat = fs.statSync(outVideoPath);
  console.log(`Generated video size: ${(stat.size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
