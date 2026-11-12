import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const FFMPEG_BIN = "/home/zendrix/.local/bin/ffmpeg";
const ROOT = "/home/zendrix/projects/portfolio";
const ARTIFACTS_DIR =
  "/home/zendrix/.gemini/antigravity-cli/brain/7d0ace39-b7a2-4086-984e-1e0a3f644c31";
const OUT_VIDEOS_DIR = path.join(ROOT, "public", "videos");
const OUT_IMAGES_DIR = path.join(ROOT, "public", "images", "projects");
const TMP_DIR = "/tmp/portfolio_lively_6beat_videos";

fs.mkdirSync(OUT_VIDEOS_DIR, { recursive: true });
fs.mkdirSync(OUT_IMAGES_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

// 16:9 widescreen (1280x720), 30-second loop (6 beats × 5.0s) @ 24fps for lively fluid motion
const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 24;
const DURATION_SEC = 30;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 720 frames (120 frames per 5.0s beat)
const FRAMES_PER_BEAT = 120;

const STD_6_PANELS = [
  { left: 6, top: 6, width: 446, height: 372 },
  { left: 465, top: 6, width: 446, height: 372 },
  { left: 924, top: 6, width: 446, height: 372 },
  { left: 6, top: 390, width: 446, height: 372 },
  { left: 465, top: 390, width: 446, height: 372 },
  { left: 924, top: 390, width: 446, height: 372 },
];

const PROJECTS = [
  {
    slug: "playit",
    title: "PlayIT (BasaTrack)",
    sourceImage: path.join(
      ARTIFACTS_DIR,
      "playit_hybrid_6beat_storyboard_1794052604251.jpg"
    ),
    panels: STD_6_PANELS,
    beats: [
      {
        beat: "BEAT 1 (00:00 – 00:05)",
        stage: "PROBLEM & CONSTRAINT",
        role: "Curious Wonder • Classroom Dead-Zone",
        badge: "PROBLEM: 0% INTERNET • 6 PROFILES/TABLET",
        accent: "#f43f5e",
        secondary: "#f59e0b",
      },
      {
        beat: "BEAT 2 (00:05 – 00:10)",
        stage: "STAGE 01 // INPUT CONTRACT",
        role: "On-Device Audio Capture",
        badge: "STAGE 01 // 16kHz PCM -> RING BUFFER",
        accent: "#06b6d4",
        secondary: "#0ea5e9",
      },
      {
        beat: "BEAT 3 (00:10 – 00:15)",
        stage: "STAGE 02 // CORE ENGINE",
        role: "Edge Speech Recognition (ASR)",
        badge: "STAGE 02 // OFFLINE VOSK ASR DECODING",
        accent: "#0ea5e9",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 4 (00:15 – 00:20)",
        stage: "STAGE 03 // DOMAIN EVALUATION",
        role: "Marungko Syllable Scorer",
        badge: "STAGE 03 // MARUNGKO SCORER -> STATEFLOW",
        accent: "#10b981",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 5 (00:20 – 00:25)",
        stage: "STAGE 04 // PERSISTENCE",
        role: "Multi-Learner Room SQLite",
        badge: "STAGE 04 // ACID ROOM SQLITE (6 PROFILES)",
        accent: "#10b981",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 6 (00:25 – 00:30)",
        stage: "ENGINEERING TRADE-OFF",
        role: "100% Offline • Zero Cloud Cost",
        badge: "TRADE-OFF // 100% OFFLINE • ZERO CLOUD COST",
        accent: "#06b6d4",
        secondary: "#f59e0b",
      },
    ],
  },
  {
    slug: "readhub",
    title: "ReadHub",
    sourceImage: path.join(
      ARTIFACTS_DIR,
      "readhub_hybrid_6beat_storyboard_1794052659317.jpg"
    ),
    panels: [
      { left: 6, top: 6, width: 446, height: 248 },
      { left: 465, top: 6, width: 446, height: 372 },
      { left: 924, top: 6, width: 446, height: 372 },
      { left: 6, top: 390, width: 446, height: 372 },
      { left: 465, top: 390, width: 446, height: 372 },
      { left: 924, top: 390, width: 446, height: 372 },
    ],
    beats: [
      {
        beat: "BEAT 1 (00:00 – 00:05)",
        stage: "PROBLEM & CONSTRAINT",
        role: "Fragile Manual Spreadsheets",
        badge: "PROBLEM: FRAGILE SPREADSHEETS & LOST BOOKS",
        accent: "#f43f5e",
        secondary: "#f59e0b",
      },
      {
        beat: "BEAT 2 (00:05 – 00:10)",
        stage: "STAGE 01 // INPUT CONTRACT",
        role: "Client Gateway & Reverse Proxy",
        badge: "STAGE 01 // DOCKER NGINX REVERSE PROXY",
        accent: "#06b6d4",
        secondary: "#0ea5e9",
      },
      {
        beat: "BEAT 3 (00:10 – 00:15)",
        stage: "STAGE 02 // SECURITY LAYER",
        role: "Stateless JWT Filter Chain",
        badge: "STAGE 02 // STATELESS JWT ROLE GUARD",
        accent: "#0ea5e9",
        secondary: "#10b981",
      },
      {
        beat: "BEAT 4 (00:15 – 00:20)",
        stage: "STAGE 03 // DOMAIN EVALUATION",
        role: "State Lifecycle & ShedLock Cron",
        badge: "STAGE 03 // STATE LIFECYCLE + SHEDLOCK CRON",
        accent: "#06b6d4",
        secondary: "#f59e0b",
      },
      {
        beat: "BEAT 5 (00:20 – 00:25)",
        stage: "STAGE 04 // PERSISTENCE",
        role: "ACID MySQL & Cloudinary CDN",
        badge: "STAGE 04 // ACID MYSQL + CLOUDINARY CDN",
        accent: "#10b981",
        secondary: "#0ea5e9",
      },
      {
        beat: "BEAT 6 (00:25 – 00:30)",
        stage: "ENGINEERING TRADE-OFF",
        role: "Stateless Scale & Zero DB Bloat",
        badge: "TRADE-OFF // STATELESS SCALE + ZERO DB BLOAT",
        accent: "#06b6d4",
        secondary: "#10b981",
      },
    ],
  },
  {
    slug: "daloyaqua",
    title: "DaloyAqua",
    sourceImage: path.join(
      ARTIFACTS_DIR,
      "daloyaqua_hybrid_6beat_storyboard_1794052688479.jpg"
    ),
    panels: STD_6_PANELS,
    beats: [
      {
        beat: "BEAT 1 (00:00 – 00:05)",
        stage: "PROBLEM & CONSTRAINT",
        role: "Microclimate Swing & No Field 4G",
        badge: "PROBLEM: CROP CRACKING • NO FIELD INTERNET",
        accent: "#f43f5e",
        secondary: "#f59e0b",
      },
      {
        beat: "BEAT 2 (00:05 – 00:10)",
        stage: "STAGE 01 // INPUT CONTRACT",
        role: "FastAPI & Pydantic Validation",
        badge: "STAGE 01 // FASTAPI + PYDANTIC SCHEMA GUARD",
        accent: "#06b6d4",
        secondary: "#f43f5e",
      },
      {
        beat: "BEAT 3 (00:10 – 00:15)",
        stage: "STAGE 02 // ASYNC LAYER",
        role: "Non-Blocking APScheduler Cron",
        badge: "STAGE 02 // NON-BLOCKING APSCHEDULER CRON",
        accent: "#0ea5e9",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 4 (00:15 – 00:20)",
        stage: "STAGE 03 // DOMAIN EVALUATION",
        role: "Agronomy Phenology Rule Matrix",
        badge: "STAGE 03 // PHENOLOGY RISK MATRIX ENGINE",
        accent: "#f59e0b",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 5 (00:20 – 00:25)",
        stage: "STAGE 04 // DISPATCH OUTPUT",
        role: "Rate-Limited Cellular SMS Alert",
        badge: "STAGE 04 // RATE-LIMITED CELLULAR SMS ALERT",
        accent: "#10b981",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 6 (00:25 – 00:30)",
        stage: "ENGINEERING TRADE-OFF",
        role: "Cellular SMS Beats 4G Dead-Zones",
        badge: "TRADE-OFF // CELLULAR SMS BEATS 4G DEAD-ZONES",
        accent: "#06b6d4",
        secondary: "#f59e0b",
      },
    ],
  },
  {
    slug: "gordon-ramsai",
    title: "Gordon RamsAi",
    sourceImage: path.join(
      ARTIFACTS_DIR,
      "gordon_ramsai_hybrid_6beat_storyboard_1794052714163.jpg"
    ),
    panels: STD_6_PANELS,
    beats: [
      {
        beat: "BEAT 1 (00:00 – 00:05)",
        stage: "PROBLEM & CONSTRAINT",
        role: "Untethered LLM Diet Hallucinations",
        badge: "PROBLEM: UNGROUNDED LLM DIET HALLUCINATIONS",
        accent: "#f43f5e",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 2 (00:05 – 00:10)",
        stage: "STAGE 01 // INPUT CONTRACT",
        role: "Streamlit Session State Context",
        badge: "STAGE 01 // STREAMLIT SESSION STATE CONTEXT",
        accent: "#06b6d4",
        secondary: "#0ea5e9",
      },
      {
        beat: "BEAT 3 (00:10 – 00:15)",
        stage: "STAGE 02 // CORE RETRIEVAL",
        role: "Local ChromaDB Vector Search",
        badge: "STAGE 02 // LOCAL CHROMADB VECTOR SEARCH",
        accent: "#0ea5e9",
        secondary: "#10b981",
      },
      {
        beat: "BEAT 4 (00:15 – 00:20)",
        stage: "STAGE 03 // DOMAIN SYNTHESIS",
        role: "Gemini Grounded by RAG Context",
        badge: "STAGE 03 // GEMINI GROUNDED BY RAG CONTEXT",
        accent: "#10b981",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 5 (00:20 – 00:25)",
        stage: "STAGE 04 // TELEMETRY OUTPUT",
        role: "Langfuse Prompt & Token Tracing",
        badge: "STAGE 04 // LANGFUSE PROMPT & TOKEN TRACING",
        accent: "#10b981",
        secondary: "#06b6d4",
      },
      {
        beat: "BEAT 6 (00:25 – 00:30)",
        stage: "ENGINEERING TRADE-OFF",
        role: "Zero Hallucinations • Local RAG",
        badge: "TRADE-OFF // ZERO HALLUCINATIONS • LOCAL RAG",
        accent: "#06b6d4",
        secondary: "#f59e0b",
      },
    ],
  },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildGearPath(cx, cy, rOuter, rInner, teeth, angleDeg) {
  const pts = [];
  const step = (Math.PI * 2) / (teeth * 2);
  const radOffset = (angleDeg * Math.PI) / 180;
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = i * step + radOffset;
    pts.push(
      `${i === 0 ? "M" : "L"} ${(cx + Math.cos(a) * r).toFixed(1)} ${(
        cy +
        Math.sin(a) * r
      ).toFixed(1)}`
    );
  }
  return pts.join(" ") + " Z";
}

// Rich, domain-specific animated 2D foregrounds for every single project & beat!
function buildKineticSceneExtras(slug, beatIdx, p, t) {
  const items = [];

  if (slug === "playit") {
    if (beatIdx === 0) {
      // Beat 1: Pulsing red NO-WIFI shockwaves & popping 6 avatar rings
      for (let r = 0; r < 3; r++) {
        const rad = 28 + ((p * 120 + r * 35) % 95);
        const op = Math.max(0, 0.85 - rad / 120);
        items.push(
          `<circle cx="980" cy="195" r="${rad.toFixed(1)}" fill="none" stroke="#f43f5e" stroke-width="3" stroke-opacity="${op.toFixed(2)}" stroke-dasharray="10 6" />`
        );
      }
      // 6 profile badges animating in with lively bounce
      for (let i = 0; i < 6; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = 680 + col * 68;
        const by = 370 + row * 68;
        const bounce = Math.sin(t * 6 + i * 1.1) * 5;
        items.push(
          `<circle cx="${bx}" cy="${(by + bounce).toFixed(1)}" r="22" fill="#09090b" fill-opacity="0.65" stroke="#06b6d4" stroke-width="2.5" />`,
          `<circle cx="${bx}" cy="${(by + bounce - 4).toFixed(1)}" r="6" fill="#7CE8DD" />`,
          `<path d="M ${bx - 11} ${(by + bounce + 12).toFixed(1)} Q ${bx} ${(by + bounce + 2).toFixed(1)} ${bx + 11} ${(by + bounce + 12).toFixed(1)}" fill="none" stroke="#7CE8DD" stroke-width="2.5" stroke-linecap="round" />`
        );
      }
    } else if (beatIdx === 1) {
      // Beat 2: Live 16kHz PCM audio wave ribbons + spinning ring buffer
      const wavePts1 = [];
      const wavePts2 = [];
      for (let x = 480; x <= 830; x += 10) {
        const norm = (x - 480) / 350;
        const env = Math.sin(norm * Math.PI);
        const y1 =
          360 +
          Math.sin(norm * 14 - t * 18) * 48 * env +
          Math.cos(norm * 7 - t * 10) * 18 * env;
        const y2 = 360 + Math.cos(norm * 12 - t * 15) * 34 * env;
        wavePts1.push(`${x === 480 ? "M" : "L"} ${x} ${y1.toFixed(1)}`);
        wavePts2.push(`${x === 480 ? "M" : "L"} ${x} ${y2.toFixed(1)}`);
      }
      items.push(
        `<path d="${wavePts1.join(" ")}" fill="none" stroke="#06b6d4" stroke-width="5" stroke-linecap="round" />`,
        `<path d="${wavePts2.join(" ")}" fill="none" stroke="#7CE8DD" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round" />`,
        `<g transform="translate(855, 390) rotate(${(t * 140) % 360})">
          <circle cx="0" cy="0" r="68" fill="none" stroke="#06b6d4" stroke-width="6" stroke-dasharray="28 14" />
          <circle cx="0" cy="0" r="50" fill="none" stroke="#7CE8DD" stroke-width="3" stroke-dasharray="12 10" />
          <circle cx="68" cy="0" r="8" fill="#10b981" />
        </g>`
      );
      // Floating syllable callout
      const sy = 250 + Math.sin(t * 8) * 10;
      items.push(
        `<g transform="translate(560, ${sy.toFixed(1)})">
          <rect x="0" y="0" width="120" height="40" rx="20" fill="#09090b" fill-opacity="0.88" stroke="#06b6d4" stroke-width="2.5" />
          <text x="60" y="26" text-anchor="middle" font-family="monospace" font-size="20" font-weight="800" fill="#7CE8DD">"BA - BA"</text>
        </g>`
      );
    } else if (beatIdx === 2) {
      // Beat 3: Acoustic waveform bars + flying phoneme orbs ['b', 'a']
      for (let i = 0; i < 18; i++) {
        const bx = 340 + i * 16;
        const bh = 16 + Math.abs(Math.sin(t * 12 + i * 0.7)) * 75;
        items.push(
          `<rect x="${bx}" y="${(430 - bh / 2).toFixed(1)}" width="8" height="${bh.toFixed(1)}" rx="4" fill="#06b6d4" fill-opacity="0.85" />`
        );
      }
      const phonemes = ["b", "a", "s", "a"];
      for (let i = 0; i < 4; i++) {
        const prog = (p * 1.6 + i * 0.25) % 1;
        const ox = 640 + prog * 360;
        const oy = 320 - prog * 160 + Math.sin(prog * Math.PI * 3 + t * 8) * 18;
        items.push(
          `<g transform="translate(${ox.toFixed(1)}, ${oy.toFixed(1)})">
            <circle cx="0" cy="0" r="24" fill="#09090b" fill-opacity="0.9" stroke="#0ea5e9" stroke-width="3" />
            <text x="0" y="7" text-anchor="middle" font-family="monospace" font-size="20" font-weight="800" fill="#7CE8DD">${phonemes[i]}</text>
          </g>`
        );
      }
    } else if (beatIdx === 3) {
      // Beat 4: StateFlow orbs racing through the Marungko gate and turning Emerald
      for (let i = 0; i < 6; i++) {
        const prog = (p * 1.5 + i * 0.16) % 1;
        const ox = 160 + prog * 960;
        const oy = 540 - prog * 380;
        const passed = prog > 0.5;
        const col = passed ? "#10b981" : "#06b6d4";
        items.push(
          `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="18" fill="${col}" fill-opacity="0.9" stroke="#ffffff" stroke-width="2" />`
        );
      }
      items.push(
        `<g transform="translate(640, 350) rotate(${(t * 90) % 360})">
          <circle cx="0" cy="0" r="76" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="22 12" />
        </g>`
      );
    } else if (beatIdx === 4) {
      // Beat 5: Rotating emerald star rays + capsule locking into Room SQLite slot 3
      items.push(
        `<g transform="translate(640, 215) rotate(${(t * 50) % 360})">
          <circle cx="0" cy="0" r="88" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="14 14" />
        </g>`
      );
      const dropY = 310 + Math.min(1, p * 1.8) * 180;
      items.push(
        `<rect x="612" y="${dropY.toFixed(1)}" width="56" height="92" rx="28" fill="#06b6d4" fill-opacity="0.45" stroke="#7CE8DD" stroke-width="3" />`
      );
    } else {
      // Beat 6: Celebration sparkles & Offline vs Cloud badge
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + t * 2.2;
        const rad = 140 + Math.sin(t * 5 + i) * 35;
        const sx = 820 + Math.cos(angle) * rad;
        const sy = 340 + Math.sin(angle) * rad * 0.65;
        items.push(
          `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="6" fill="${i % 2 === 0 ? "#f59e0b" : "#06b6d4"}" />`
        );
      }
    }
  } else if (slug === "readhub") {
    if (beatIdx === 0) {
      // Beat 1: Flying paper spreadsheets & red error sparks
      for (let i = 0; i < 5; i++) {
        const fx = 160 + ((i * 220 + p * 260) % 960);
        const fy = 180 + Math.sin(t * 4 + i * 1.5) * 90 + (i % 2) * 120;
        const rot = Math.sin(t * 3 + i) * 28;
        items.push(
          `<g transform="translate(${fx.toFixed(1)}, ${fy.toFixed(1)}) rotate(${rot.toFixed(1)})">
            <rect x="-28" y="-36" width="56" height="72" rx="4" fill="#18181b" fill-opacity="0.85" stroke="#f43f5e" stroke-width="2" />
            <line x1="-18" y1="-18" x2="18" y2="-18" stroke="#f43f5e" stroke-width="2" />
            <line x1="-18" y1="-4" x2="18" y2="-4" stroke="#71717a" stroke-width="2" />
            <line x1="-18" y1="10" x2="12" y2="10" stroke="#71717a" stroke-width="2" />
          </g>`
        );
      }
    } else if (beatIdx === 1) {
      // Beat 2: High-speed packets routing through Nginx Gateway into UI & API streams
      for (let i = 0; i < 6; i++) {
        const prog = (p * 1.8 + i * 0.16) % 1;
        if (prog < 0.45) {
          const k = prog / 0.45;
          const px = 220 + k * 420;
          const py = 270 - k * 80;
          items.push(
            `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="9" fill="#06b6d4" />`
          );
        } else {
          const k = (prog - 0.45) / 0.55;
          const isUi = i % 2 === 0;
          const px = 640 + k * 240;
          const py = isUi ? 190 - k * 95 : 190 + k * 115;
          items.push(
            `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="8" fill="${isUi ? "#0ea5e9" : "#10b981"}" />`
          );
        }
      }
    } else if (beatIdx === 2) {
      // Beat 3: Counter-rotating JWT Security Filter Rings
      for (let r = 0; r < 3; r++) {
        const rx = 560 + r * 145;
        const dir = r % 2 === 0 ? 1 : -1;
        items.push(
          `<g transform="translate(${rx}, 320) rotate(${((t * 110 * dir) % 360).toFixed(1)})">
            <ellipse cx="0" cy="0" rx="48" ry="125" fill="none" stroke="${r === 2 ? "#10b981" : "#06b6d4"}" stroke-width="4" stroke-dasharray="24 14" />
          </g>`
        );
      }
    } else if (beatIdx === 3) {
      // Beat 4: Rotating ShedLock clockwork gears & moving state token
      const gear1 = buildGearPath(415, 290, 88, 72, 12, (t * 45) % 360);
      const gear2 = buildGearPath(535, 195, 52, 40, 8, -(t * 67.5) % 360);
      items.push(
        `<path d="${gear1}" fill="none" stroke="#06b6d4" stroke-width="3" stroke-opacity="0.85" />`,
        `<path d="${gear2}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-opacity="0.85" />`
      );
      const tx = 180 + p * 820;
      const ty = 430 + p * 170;
      items.push(
        `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="16" fill="#7CE8DD" stroke="#06b6d4" stroke-width="4" />`
      );
    } else if (beatIdx === 4) {
      // Beat 5: Streaming Cloudinary covers + pulsing MySQL ACID rings
      for (let i = 0; i < 4; i++) {
        const cy = 480 + ((i * 45 + p * 160) % 160);
        items.push(
          `<ellipse cx="755" cy="${cy.toFixed(1)}" rx="92" ry="22" fill="none" stroke="#10b981" stroke-width="3" stroke-opacity="0.8" />`
        );
      }
    } else {
      // Beat 6: Verified emerald status pulses on the catalog laptop
      for (let i = 0; i < 4; i++) {
        const bx = 460 + i * 62;
        const r = 8 + Math.sin(t * 8 + i) * 3;
        items.push(
          `<circle cx="${bx}" cy="515" r="${r.toFixed(1)}" fill="#10b981" />`
        );
      }
    }
  } else if (slug === "daloyaqua") {
    if (beatIdx === 0 || beatIdx === 1) {
      // Beats 1 & 2: Animated diagonal storm rain streaks across the frame
      for (let i = 0; i < 32; i++) {
        const rx = ((i * 97 + Math.floor(t * 520)) % (WIDTH + 200)) - 100;
        const ry = (i * 67 + Math.floor(t * 780)) % HEIGHT;
        items.push(
          `<line x1="${rx}" y1="${ry}" x2="${rx - 22}" y2="${ry + 46}" stroke="#0ea5e9" stroke-width="2" stroke-opacity="0.55" stroke-linecap="round" />`
        );
      }
      if (beatIdx === 0) {
        // Pulsing Rose fracture ring on the splitting tomato
        const r = 36 + Math.sin(t * 10) * 12;
        items.push(
          `<circle cx="335" cy="315" r="${r.toFixed(1)}" fill="none" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="10 6" />`
        );
      } else {
        // Beat 2: Telemetry orbs passing shield while red glitch sparks shatter
        for (let i = 0; i < 7; i++) {
          const prog = (p * 1.7 + i * 0.14) % 1;
          const ox = 420 + prog * 340;
          const oy = 310 + Math.sin(prog * Math.PI * 2 + i) * 55;
          items.push(
            `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="10" fill="#06b6d4" stroke="#7CE8DD" stroke-width="2" />`
          );
        }
        const sparkR = 18 + ((p * 140) % 75);
        items.push(
          `<circle cx="765" cy="245" r="${sparkR.toFixed(1)}" fill="none" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="6 8" />`
        );
      }
    } else if (beatIdx === 2) {
      // Beat 3: Fast upper FastAPI stream + spinning APScheduler async gear wheel
      for (let i = 0; i < 10; i++) {
        const ox = (i * 130 + p * 720) % WIDTH;
        const oy = 185 + Math.sin(t * 6 + i) * 22;
        items.push(
          `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="11" fill="#06b6d4" />`
        );
      }
      const gear = buildGearPath(640, 470, 118, 96, 14, (t * 60) % 360);
      items.push(
        `<path d="${gear}" fill="none" stroke="#0ea5e9" stroke-width="4" />`
      );
    } else if (beatIdx === 3) {
      // Beat 4: Scanning phenology laser line + rising moisture curve
      const scanY = 160 + ((Math.sin(t * 4) + 1) / 2) * 380;
      items.push(
        `<line x1="340" y1="${scanY.toFixed(1)}" x2="940" y2="${scanY.toFixed(1)}" stroke="#f59e0b" stroke-width="3.5" stroke-dasharray="14 8" />`,
        `<circle cx="885" cy="345" r="${(18 + Math.sin(t * 12) * 8).toFixed(1)}" fill="#f59e0b" fill-opacity="0.45" stroke="#f43f5e" stroke-width="3" />`
      );
    } else if (beatIdx === 4) {
      // Beat 5: SMS envelopes arcing along the parabolic tower-to-phone trajectory
      for (let i = 0; i < 5; i++) {
        const prog = (p * 1.4 + i * 0.2) % 1;
        const x = 350 + prog * 540;
        const y = 470 - Math.sin(prog * Math.PI) * 290;
        items.push(
          `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
            <rect x="-20" y="-13" width="40" height="26" rx="5" fill="#09090b" stroke="#10b981" stroke-width="2.5" />
            <polyline points="-18,-11 0,3 18,-11" fill="none" stroke="#7CE8DD" stroke-width="2" />
          </g>`
        );
      }
    } else {
      // Beat 6: Rotating irrigation valve wheel + warm sun rays
      items.push(
        `<g transform="translate(925, 545) rotate(${(-t * 95) % 360})">
          <circle cx="0" cy="0" r="46" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="16 10" />
        </g>`
      );
    }
  } else if (slug === "gordon-ramsai") {
    if (beatIdx === 0) {
      // Beat 1: Jittering Rose hallucination glitch bars & static warnings
      const jx = Math.sin(t * 28) * 9;
      const jy = Math.cos(t * 22) * 6;
      items.push(
        `<g transform="translate(${(780 + jx).toFixed(1)}, ${(235 + jy).toFixed(1)})">
          <rect x="-130" y="-45" width="260" height="90" rx="12" fill="none" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="18 8" />
          <text x="0" y="8" text-anchor="middle" font-family="monospace" font-size="22" font-weight="800" fill="#f43f5e">9,999 KCAL?!</text>
        </g>`
      );
    } else if (beatIdx === 1) {
      // Beat 2: 3 interlocking 3D orbital session rings spinning above the keyboard
      for (let i = 0; i < 3; i++) {
        const ang = (t * 85 + i * 60) % 360;
        items.push(
          `<g transform="translate(755, 295) rotate(${ang.toFixed(1)})">
            <ellipse cx="0" cy="0" rx="115" ry="44" fill="none" stroke="${i === 0 ? "#06b6d4" : i === 1 ? "#0ea5e9" : "#10b981"}" stroke-width="3.5" stroke-dasharray="26 12" />
          </g>`
        );
      }
    } else if (beatIdx === 2) {
      // Beat 3: Sweeping ChromaDB vector search laser + levitating Emerald RAG cards
      const beamX = 520 + Math.sin(t * 5) * 180;
      items.push(
        `<polygon points="480,190 ${beamX - 90},520 ${beamX + 90},520" fill="#06b6d4" fill-opacity="0.22" stroke="#06b6d4" stroke-width="2" />`
      );
    } else if (beatIdx === 3) {
      // Beat 4: Dynamic anime chef blade slash arc slicing away red hallucination smoke
      const slashAng = -40 + Math.sin(t * 10) * 55;
      items.push(
        `<g transform="translate(710, 445) rotate(${slashAng.toFixed(1)})">
          <path d="M -180 0 Q 0 -130 180 0 Q 0 -75 -180 0 Z" fill="#06b6d4" fill-opacity="0.75" stroke="#ffffff" stroke-width="2" />
        </g>`,
        `<g transform="translate(365, 415) rotate(${(t * 110) % 360})">
          <circle cx="0" cy="0" r="68" fill="none" stroke="#06b6d4" stroke-width="4" stroke-dasharray="18 10" />
        </g>`
      );
    } else if (beatIdx === 4) {
      // Beat 5: Animated Langfuse waterfall telemetry bars growing in real time
      for (let i = 0; i < 6; i++) {
        const bw = 60 + ((Math.sin(t * 5 + i * 0.9) + 1) / 2) * 190;
        const by = 245 + i * 44;
        items.push(
          `<rect x="740" y="${by}" width="${bw.toFixed(1)}" height="22" rx="5" fill="${i % 2 === 0 ? "#10b981" : "#06b6d4"}" fill-opacity="0.85" />`
        );
      }
    } else {
      // Beat 6: Glowing Michelin-style accountability rings around the meal bowl
      items.push(
        `<g transform="translate(650, 560) rotate(${(t * 60) % 360})">
          <ellipse cx="0" cy="0" rx="135" ry="52" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="20 12" />
        </g>`
      );
    }
  }

  return items.join("\n");
}

function buildHudOverlaySvg(project, beatIdx, beatProgress, globalTimeSec) {
  const b = project.beats[beatIdx];
  const pulseR = 5.5 + Math.sin(globalTimeSec * Math.PI * 4) * 2.2;

  // Drifting atmospheric bokeh blobs + fast kinetic energy particles
  const bokeh = Array.from({ length: 14 }).map((_, i) => {
    const speed = 45 + (i % 4) * 25;
    const px = (i * 137 + Math.floor(globalTimeSec * speed)) % WIDTH;
    const py =
      95 +
      ((i * 83 + Math.floor(Math.sin(globalTimeSec * 2.5 + i) * 48)) %
        (HEIGHT - 190));
    const r = i % 4 === 0 ? 18 : 3.5 + (i % 3) * 2;
    const op = i % 4 === 0 ? 0.14 : 0.78;
    const fill = i % 2 === 0 ? b.accent : b.secondary;
    return `<circle cx="${px}" cy="${py}" r="${r}" fill="${fill}" fill-opacity="${op}" />`;
  });

  // Transition flash / light-leak whip at the start and end of each 5s beat
  let transitionFlashOp = 0;
  if (beatProgress < 0.08) {
    transitionFlashOp = (1 - beatProgress / 0.08) * 0.38;
  } else if (beatProgress > 0.94) {
    transitionFlashOp = ((beatProgress - 0.94) / 0.06) * 0.32;
  }

  const beatLabels = [
    "B1: PROBLEM",
    "B2: STAGE 01",
    "B3: STAGE 02",
    "B4: STAGE 03",
    "B5: STAGE 04",
    "B6: TRADE-OFF",
  ];

  const pills = beatLabels
    .map((label, idx) => {
      const isCurrent = idx === beatIdx;
      const x = 32 + idx * 116;
      const y = 654;
      const bg = isCurrent ? b.accent : "#09090b";
      const fg = isCurrent ? "#09090b" : "#a1a1aa";
      const border = isCurrent ? "#f4f4f5" : b.accent;
      return `
      <g transform="translate(${x}, ${y})">
        <rect x="0" y="0" width="108" height="28" rx="6" fill="${bg}" fill-opacity="${
        isCurrent ? "0.96" : "0.85"
      }" stroke="${border}" stroke-width="1.5" stroke-opacity="${
        isCurrent ? "0.95" : "0.35"
      }" />
        <text x="54" y="18" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700" fill="${fg}" letter-spacing="0.4">${label}</text>
      </g>
    `;
    })
    .join("");

  const totalProgressWidth = Math.round(
    ((beatIdx + beatProgress) / 6) * (WIDTH - 64)
  );

  const kineticExtras = buildKineticSceneExtras(
    project.slug,
    beatIdx,
    beatProgress,
    globalTimeSec
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <radialGradient id="spotlightRim" cx="90%" cy="10%" r="60%">
        <stop offset="0%" stop-color="${b.accent}" stop-opacity="0.28" />
        <stop offset="50%" stop-color="${b.secondary}" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#09090b" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="topBottomZinc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#09090b" stop-opacity="0.58" />
        <stop offset="15%" stop-color="#09090b" stop-opacity="0.0" />
        <stop offset="76%" stop-color="#09090b" stop-opacity="0.0" />
        <stop offset="100%" stop-color="#09090b" stop-opacity="0.90" />
      </linearGradient>
    </defs>

    <!-- Directional Top-Right Spotlight Rim & Dark Zinc Vignette -->
    <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#spotlightRim)" />
    ${bokeh.join("\n")}

    <!-- Domain-Specific Live 2D Animated Foregrounds -->
    ${kineticExtras}

    <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#topBottomZinc)" />
    <rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" rx="14" fill="none" stroke="${b.accent}" stroke-opacity="0.38" stroke-width="2" />

    <!-- Top-Left Beat & Stage Pill (Geist Mono HUD) -->
    <g transform="translate(32, 24)">
      <rect x="0" y="0" width="470" height="46" rx="10" fill="#09090b" fill-opacity="0.90" stroke="${b.accent}" stroke-width="2" stroke-opacity="0.85" />
      <circle cx="22" cy="23" r="${pulseR.toFixed(1)}" fill="${b.accent}" />
      <text x="42" y="19" font-family="monospace" font-size="11" font-weight="700" fill="${b.accent}" letter-spacing="1.1">${escapeXml(
    b.beat
  )} // ${escapeXml(b.stage)}</text>
      <text x="42" y="36" font-family="sans-serif" font-size="13" font-weight="700" fill="#f4f4f5" letter-spacing="0.4">${escapeXml(
    b.role.toUpperCase()
  )}</text>
    </g>

    <!-- Bottom-Right Geist Mono HUD Callout Badge -->
    <g transform="translate(736, 644)">
      <rect x="0" y="0" width="512" height="42" rx="10" fill="#09090b" fill-opacity="0.94" stroke="${b.accent}" stroke-width="2" />
      <rect x="0" y="0" width="10" height="42" rx="4" fill="${b.accent}" />
      <text x="260" y="26" text-anchor="middle" font-family="monospace" font-size="13.5" font-weight="700" fill="#f4f4f5" letter-spacing="1.0">${escapeXml(
    b.badge
  )}</text>
    </g>

    <!-- Bottom-Left 6-Beat Scrubber Pills -->
    ${pills}

    <!-- 30-Second Timeline Progress Bar -->
    <rect x="32" y="696" width="${WIDTH - 64}" height="6" rx="3" fill="#18181b" />
    <rect x="32" y="696" width="${Math.max(
      14,
      totalProgressWidth
    )}" height="6" rx="3" fill="${b.accent}" />

    ${
      transitionFlashOp > 0.01
        ? `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="${b.accent}" fill-opacity="${transitionFlashOp.toFixed(2)}" />`
        : ""
    }
  </svg>`;
}

async function processProject(project) {
  console.log(
    `Rendering Lively 24fps 30s (6-Beat) Hybrid Ghibli × Pixar Video for ${project.title}...`
  );
  const projectTmpDir = path.join(TMP_DIR, project.slug);
  fs.rmSync(projectTmpDir, { recursive: true, force: true });
  fs.mkdirSync(projectTmpDir, { recursive: true });

  // Upscale each of the 6 panels to 1560x878 for dynamic zoom + pan + whip motion
  const panelBuffers = [];
  for (let i = 0; i < 6; i++) {
    const rect = project.panels[i];
    const hiResBuf = await sharp(project.sourceImage)
      .extract(rect)
      .resize(1560, 878, { fit: "cover", kernel: sharp.kernel.lanczos3 })
      .toBuffer();
    panelBuffers.push(hiResBuf);
  }

  // Save < 80 KB static WebP poster frame
  const posterSvg = Buffer.from(buildHudOverlaySvg(project, 0, 0.25, 1.2));
  const posterOut = path.join(OUT_IMAGES_DIR, `${project.slug}-poster.webp`);
  await sharp(panelBuffers[0])
    .extract({ left: 140, top: 79, width: WIDTH, height: HEIGHT })
    .composite([{ input: posterSvg, top: 0, left: 0 }])
    .webp({ quality: 72, effort: 6 })
    .toFile(posterOut);

  // Render 720 frames @ 24fps (stepped on twos = 360 unique composites for authentic anime timing + fast encoding)
  const maxPanX = 1560 - WIDTH; // 280
  const maxPanY = 878 - HEIGHT; // 158

  for (let f = 0; f < TOTAL_FRAMES; f += 2) {
    const beatIdx = Math.min(5, Math.floor(f / FRAMES_PER_BEAT));
    const frameInBeat = f % FRAMES_PER_BEAT;
    const p = frameInBeat / FRAMES_PER_BEAT; // 0.0 -> 1.0
    const globalTimeSec = f / FPS;

    // Ease-out + whip-pan acceleration at beat boundaries
    const ease = 0.5 - Math.cos(p * Math.PI) / 2;
    const whip = p > 0.9 ? Math.pow((p - 0.9) / 0.1, 2) * 55 : 0;

    let cropLeft = 140;
    let cropTop = 79;
    if (beatIdx % 3 === 0) {
      cropLeft = Math.min(
        maxPanX,
        Math.max(0, Math.round(15 + ease * (maxPanX - 75) + whip))
      );
      cropTop = Math.min(
        maxPanY,
        Math.max(0, Math.round(20 + Math.sin(p * Math.PI) * 95))
      );
    } else if (beatIdx % 3 === 1) {
      cropLeft = Math.min(
        maxPanX,
        Math.max(0, Math.round(maxPanX - 15 - ease * (maxPanX - 75) - whip))
      );
      cropTop = Math.min(
        maxPanY,
        Math.max(0, Math.round(15 + ease * (maxPanY - 35)))
      );
    } else {
      cropLeft = Math.min(
        maxPanX,
        Math.max(0, Math.round(50 + Math.sin(p * Math.PI * 2) * 85 + whip))
      );
      cropTop = Math.min(
        maxPanY,
        Math.max(0, Math.round(maxPanY - 15 - ease * (maxPanY - 35)))
      );
    }

    const hudSvg = Buffer.from(
      buildHudOverlaySvg(project, beatIdx, p, globalTimeSec)
    );

    const frameBuffer = await sharp(panelBuffers[beatIdx])
      .extract({ left: cropLeft, top: cropTop, width: WIDTH, height: HEIGHT })
      .composite([{ input: hudSvg, top: 0, left: 0 }])
      .jpeg({ quality: 88 })
      .toBuffer();

    const framePath1 = path.join(
      projectTmpDir,
      `frame-${String(f).padStart(4, "0")}.jpg`
    );
    const framePath2 = path.join(
      projectTmpDir,
      `frame-${String(f + 1).padStart(4, "0")}.jpg`
    );
    fs.writeFileSync(framePath1, frameBuffer);
    fs.writeFileSync(framePath2, frameBuffer);
  }

  const outMp4 = path.join(OUT_VIDEOS_DIR, `${project.slug}.mp4`);
  execFileSync(
    FFMPEG_BIN,
    [
      "-y",
      "-framerate",
      String(FPS),
      "-i",
      path.join(projectTmpDir, "frame-%04d.jpg"),
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "22",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      outMp4,
    ],
    { stdio: "ignore" }
  );

  const mp4Stat = fs.statSync(outMp4);
  console.log(
    `  Video saved:  ${outMp4} (${Math.round(
      mp4Stat.size / 1024
    )} KB, 30.0s @ 24fps)`
  );
}

for (const proj of PROJECTS) {
  await processProject(proj);
}
console.log("All 4 lively 24fps 30s videos rendered!");
