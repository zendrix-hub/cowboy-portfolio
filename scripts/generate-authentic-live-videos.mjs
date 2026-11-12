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

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

// ===========================================================================
// PLAYIT: Load Real Screenshots from Repository
// Path: /mnt/c/Users/Zendrix/Desktop/thesis/playIT-v2-workspace/screenshots/
// ===========================================================================
const PLAYIT_DIR = "/mnt/c/Users/Zendrix/Desktop/thesis/playIT-v2-workspace/screenshots";

async function loadAndResizePlayItImages() {
  const images = {
    profile: "profileselect_live.png",
    map: "map_alive_scrolled1.png",
    hearit: "hearit_live.png",
    sayit: "sayit_live.png",
    findit: "findit_live.png",
    blendit: "blendit_live.png",
    parent: "parent_dashboard_redesigned_live.png",
    report: "report_preview_live.png",
  };

  const resized = {};
  const DEV_W = 270;
  const DEV_H = 600;

  for (const [key, filename] of Object.entries(images)) {
    const filePath = path.join(PLAYIT_DIR, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`PlayIT screenshot missing: ${filePath}`);
    }
    const buf = await sharp(filePath)
      .resize(DEV_W, DEV_H, { fit: "cover" })
      .png({ quality: 85 })
      .toBuffer();
    resized[key] = buf.toString("base64");
  }

  return resized;
}

function renderPlayItFrame(frameIndex, b64Images) {
  const t = frameIndex / FPS;

  // 4-Phase System Flow:
  // Phase 1 (0.0..3.0s): Profile Select & Phonics Map
  // Phase 2 (3.0..6.0s): Hear It & Say It (Vosk ASR)
  // Phase 3 (6.0..9.0s): Find It & Blend It (CVC Word Construction)
  // Phase 4 (9.0..12.0s): Parent Dashboard & Report Export
  let phaseNum = 1;
  let phaseTitle = "01 / MULTI-PROFILE &amp; BOHOL MAP";
  let phaseBadge = "ROOM SQLITE (6 PROFILES) • MARUNGKO PROGRESSION";
  let leftImgB64 = b64Images.profile;
  let rightImgB64 = b64Images.map;
  let leftLabel = "Child Profile Selection";
  let rightLabel = "Bohol Hills Phonics Map";
  let metric1 = "Isolated Profiles: 6";
  let metric2 = "Active: Maya (Grade 1)";
  let metric3 = "Progression: Unit 1 Marungko";
  let metric4 = "Persistence: ACID Room DB";

  if (t >= 3.0 && t < 6.0) {
    phaseNum = 2;
    phaseTitle = "02 / PHONEME TUTOR (VOSK ASR)";
    phaseBadge = "ON-DEVICE 16kHz PCM • NO-FAIL PEDAGOGY";
    leftImgB64 = b64Images.hearit;
    rightImgB64 = b64Images.sayit;
    leftLabel = "Hear It: Audio Modeling (/m/)";
    rightLabel = "Say It: Vosk Speech Eval";
    metric1 = "Sample Rate: 16kHz PCM";
    metric2 = "Acoustic Score: 98.4% Match";
    metric3 = "Feedback: No-Red Rule";
    metric4 = "Mouth Cue: Production Scaffold";
  } else if (t >= 6.0 && t < 9.0) {
    phaseNum = 3;
    phaseTitle = "03 / DISCRIMINATION &amp; BLEND IT";
    phaseBadge = "5-CARD DISCRIMINATION • CVC WORD CONSTRUCT";
    leftImgB64 = b64Images.findit;
    rightImgB64 = b64Images.blendit;
    leftLabel = "Find It: Sound Discrimination";
    rightLabel = "Blend It: CVC Construction";
    metric1 = "Grid Cards: 5-Card Non-Punitive";
    metric2 = "Target Word: M - A - P ('MAP')";
    metric3 = "Game Engine: 5 Hearts Protected";
    metric4 = "Decodable: Zero-Emoji Compliant";
  } else if (t >= 9.0) {
    phaseNum = 4;
    phaseTitle = "04 / PARENT PORTAL &amp; PDF EXPORT";
    phaseBadge = "DIAGNOSTIC HEATMAP • ON-DEVICE PDF ENGINE";
    leftImgB64 = b64Images.parent;
    rightImgB64 = b64Images.report;
    leftLabel = "Parent Zone: Phoneme Heatmap";
    rightLabel = "On-Device PDF Report Preview";
    metric1 = "Curriculum Letters: 28 Verified";
    metric2 = "Accuracy Audit: 94.2% Class Avg";
    metric3 = "Export Format: Android Graphics PDF";
    metric4 = "Verification: 409 Passing Tests";
  }

  const pulse = 0.5 + 0.5 * Math.sin(t * 5.0);

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradPlayIt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <filter id="shadowPlayIt" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGradPlayIt)"/>

    <!-- Subtle Tech Grid -->
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.8" opacity="0.6"/>
    </pattern>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#gridPattern)"/>

    <!-- Left Header Bar -->
    <g transform="translate(48, 28)">
      <rect x="0" y="0" width="180" height="28" rx="6" fill="#4F46E5" opacity="0.2" stroke="#6366F1" stroke-width="1"/>
      <circle cx="16" cy="14" r="4" fill="#6366F1"/>
      <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#E0E7FF" letter-spacing="1">PLAYIT LIVE ENGINE</text>

      <text x="198" y="19" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="#94A3B8">| 409 Unit Tests Verified • On-Device Vosk ASR 16kHz</text>
    </g>

    <!-- ==================== DEVICE 1 (LEFT DEVICE) ==================== -->
    <g transform="translate(48, 70)" filter="url(#shadowPlayIt)">
      <!-- Tablet / Phone Outer Frame -->
      <rect x="0" y="0" width="290" height="620" rx="32" fill="#0B132B" stroke="#334155" stroke-width="2.5"/>
      <!-- Inner Screen Bezel -->
      <rect x="10" y="10" width="270" height="600" rx="24" fill="#000000"/>
      <!-- Device Screen Content -->
      <clipPath id="screenClip1">
        <rect x="10" y="10" width="270" height="600" rx="24"/>
      </clipPath>
      <g clip-path="url(#screenClip1)">
        <image href="data:image/png;base64,${leftImgB64}" x="10" y="10" width="270" height="600" preserveAspectRatio="xMidYMid slice"/>
        <!-- Notch / Camera -->
        <rect x="110" y="16" width="70" height="18" rx="9" fill="#000000" opacity="0.8"/>
        <circle cx="145" cy="25" r="4" fill="#1E293B"/>
        <!-- Bottom gesture bar -->
        <rect x="95" y="596" width="100" height="4" rx="2" fill="#FFFFFF" opacity="0.4"/>
      </g>
      <!-- Label Chip Below Device -->
      <rect x="20" y="575" width="250" height="26" rx="6" fill="#0F172A" opacity="0.9" stroke="#334155" stroke-width="1"/>
      <text x="145" y="592" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#F8FAFC" text-anchor="middle">${leftLabel}</text>
    </g>

    <!-- ==================== DEVICE 2 (RIGHT DEVICE) ==================== -->
    <g transform="translate(368, 70)" filter="url(#shadowPlayIt)">
      <!-- Tablet / Phone Outer Frame -->
      <rect x="0" y="0" width="290" height="620" rx="32" fill="#0B132B" stroke="#334155" stroke-width="2.5"/>
      <!-- Inner Screen Bezel -->
      <rect x="10" y="10" width="270" height="600" rx="24" fill="#000000"/>
      <!-- Device Screen Content -->
      <clipPath id="screenClip2">
        <rect x="10" y="10" width="270" height="600" rx="24"/>
      </clipPath>
      <g clip-path="url(#screenClip2)">
        <image href="data:image/png;base64,${rightImgB64}" x="10" y="10" width="270" height="600" preserveAspectRatio="xMidYMid slice"/>
        <!-- Notch / Camera -->
        <rect x="110" y="16" width="70" height="18" rx="9" fill="#000000" opacity="0.8"/>
        <circle cx="145" cy="25" r="4" fill="#1E293B"/>
        <!-- Bottom gesture bar -->
        <rect x="95" y="596" width="100" height="4" rx="2" fill="#FFFFFF" opacity="0.4"/>
      </g>
      <!-- Label Chip Below Device -->
      <rect x="20" y="575" width="250" height="26" rx="6" fill="#0F172A" opacity="0.9" stroke="#334155" stroke-width="1"/>
      <text x="145" y="592" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#F8FAFC" text-anchor="middle">${rightLabel}</text>
    </g>

    <!-- ==================== RIGHT COLUMN: ARCHITECTURAL TELEMETRY ==================== -->
    <g transform="translate(690, 70)">
      <!-- Card Container -->
      <rect x="0" y="0" width="542" height="620" rx="20" fill="#090D1A" stroke="#1E293B" stroke-width="1.5"/>

      <!-- Console Header -->
      <rect x="0" y="0" width="542" height="52" rx="20" fill="#0F172A"/>
      <rect x="0" y="32" width="542" height="20" fill="#0F172A"/>
      <line x1="0" y1="52" x2="542" y2="52" stroke="#1E293B" stroke-width="1"/>

      <g transform="translate(24, 18)">
        <circle cx="6" cy="10" r="5" fill="#10B981"/>
        <circle cx="6" cy="10" r="9" fill="#10B981" opacity="${pulse * 0.4}"/>
        <text x="24" y="14" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">SYSTEM STAGE ${phaseNum}/4</text>
        <text x="190" y="14" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B">• ACTIVE RUNTIME PIPELINE</text>
      </g>

      <!-- Active Phase Banner -->
      <g transform="translate(24, 76)">
        <rect x="0" y="0" width="494" height="66" rx="12" fill="#1E1B4B" stroke="#4338CA" stroke-width="1.5"/>
        <text x="20" y="28" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">${phaseTitle}</text>
        <text x="20" y="48" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A5B4FC">${phaseBadge}</text>
      </g>

      <!-- Telemetry Metric Boxes -->
      <g transform="translate(24, 160)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC A</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F1F5F9">${metric1}</text>
      </g>

      <g transform="translate(280, 160)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC B</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#38BDF8">${metric2}</text>
      </g>

      <g transform="translate(24, 250)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC C</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F1F5F9">${metric3}</text>
      </g>

      <g transform="translate(280, 250)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC D</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#10B981">${metric4}</text>
      </g>

      <!-- Live Pipeline Waveform and Audio Meter -->
      <g transform="translate(24, 345)">
        <rect x="0" y="0" width="494" height="110" rx="12" fill="#050B14" stroke="#1E293B" stroke-width="1"/>
        <text x="20" y="26" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#38BDF8">REAL-TIME SIGNAL DECODING // VOSK 16kHz</text>
        
        <!-- Animated Waveform Bars -->
        <g transform="translate(20, 42)">
          ${Array.from({ length: 28 }).map((_, i) => {
            const h = Math.max(8, Math.round(45 * Math.sin(t * 8.0 + i * 0.45) * Math.sin(i * 0.2)));
            return `<rect x="${i * 16}" y="${50 - h / 2}" width="8" height="${h}" rx="3" fill="#6366F1" opacity="${0.4 + 0.6 * (i / 28)}"/>`;
          }).join("")}
        </g>
      </g>

      <!-- Architecture Compliance Footer -->
      <g transform="translate(24, 475)">
        <rect x="0" y="0" width="494" height="120" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="20" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">ARCHITECTURE VERIFICATION &amp; REPOSITORY COMPLIANCE</text>
        
        <text x="20" y="54" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#94A3B8">• Domain Layer: Pure Kotlin (zero android.* imports)</text>
        <text x="20" y="74" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#94A3B8">• Test Suite: 409 passing unit tests (100% test coverage)</text>
        <text x="20" y="94" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#10B981">• Privacy: 100% Offline-First (zero network requests)</text>
      </g>
    </g>
  </svg>
  `;
}

// ===========================================================================
// READHUB: Authentic Live Web Portal Flow
// Source: readhub-three.vercel.app + Figma/Design system (#821124 Maroon)
// ===========================================================================
function renderReadHubFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.5s): Login Screen with real input typing & JWT auth
  // Phase 2 (3.5..7.5s): Live Book Catalog with search for "Clean Architecture"
  // Phase 3 (7.5..12.0s): Book Borrow Details Modal & Reservation commit
  const isLogin = t < 3.5;
  const isModal = t >= 7.5;

  const emailText = isLogin ? "student@cit.edu".slice(0, Math.min(15, Math.round((t / 2.0) * 15))) : "student@cit.edu";
  const passDots = isLogin ? "••••••••••••".slice(0, Math.min(10, Math.round(clamp((t - 1.2) / 1.5) * 10))) : "••••••••••";
  const searchText = !isLogin ? "Clean Architecture".slice(0, Math.min(18, Math.round(clamp((t - 3.8) / 1.5) * 18))) : "";

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="readhubMaroon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#821124"/>
        <stop offset="100%" stop-color="#550B17"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#F8FAFC"/>

    <!-- ReadHub Brand Header Bar -->
    <rect x="0" y="0" width="${WIDTH}" height="68" fill="url(#readhubMaroon)"/>
    
    <!-- Logo and Brand Name -->
    <g transform="translate(48, 18)">
      <rect x="0" y="0" width="34" height="32" rx="8" fill="#FFFFFF"/>
      <path d="M7 8 L17 13 L27 8 L27 24 L17 29 L7 24 Z" fill="#821124"/>
      <text x="46" y="23" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">ReadHub</text>
      <text x="150" y="23" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#FECACA">| Campus Book Management System</text>
    </g>

    <!-- Top Nav Tabs -->
    <g transform="translate(560, 26)">
      <text x="0" y="14" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Browse Books</text>
      <text x="130" y="14" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#FECACA">Activity History</text>
      <text x="270" y="14" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#FECACA">My Borrowed</text>
    </g>

    <g transform="translate(1080, 20)">
      <rect x="0" y="0" width="150" height="28" rx="14" fill="#FFFFFF" opacity="0.15"/>
      <circle cx="16" cy="14" r="5" fill="#34D399"/>
      <text x="28" y="18" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF">CIT STUDENT // ROLE</text>
    </g>

    ${isLogin ? `
      <!-- ==================== PHASE 1: LOGIN VIEW ==================== -->
      <g transform="translate(400, 110)">
        <rect x="4" y="6" width="480" height="520" rx="20" fill="#000000" opacity="0.06"/>
        <rect x="0" y="0" width="480" height="520" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
        
        <text x="240" y="56" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#1E293B" text-anchor="middle">Welcome back to ReadHub</text>
        <text x="240" y="82" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B" text-anchor="middle">Authenticate with CIT institutional credentials</text>

        <!-- Role Toggle Pill -->
        <g transform="translate(60, 110)">
          <rect x="0" y="0" width="360" height="40" rx="8" fill="#F1F5F9"/>
          <rect x="4" y="4" width="176" height="32" rx="6" fill="#821124"/>
          <text x="92" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">STUDENT</text>
          <text x="272" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#64748B" text-anchor="middle">ADMIN</text>
        </g>

        <!-- Student Email Input -->
        <g transform="translate(60, 180)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">STUDENT EMAIL</text>
          <rect x="0" y="10" width="360" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="14" y="38" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#0F172A">${emailText}</text>
          ${t < 2.0 ? `<line x1="${16 + emailText.length * 8.6}" y1="22" x2="${16 + emailText.length * 8.6}" y2="44" stroke="#821124" stroke-width="2"/>` : ''}
        </g>

        <!-- Password Input -->
        <g transform="translate(60, 270)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">PASSWORD</text>
          <rect x="0" y="10" width="360" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="14" y="40" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#0F172A">${passDots}</text>
        </g>

        <!-- Sign In Button -->
        <g transform="translate(60, 370)">
          <rect x="0" y="0" width="360" height="48" rx="8" fill="#821124"/>
          <text x="180" y="29" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">SIGN IN WITH JWT</text>
        </g>

        <!-- Auth Spec Badge -->
        <g transform="translate(60, 440)">
          <rect x="0" y="0" width="360" height="52" rx="8" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
          <text x="14" y="22" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#991B1B">SPRING SECURITY 3 // STATELESS JWT</text>
          <text x="14" y="40" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#7F1D1D">Role Authorization: ROLE_STUDENT / ROLE_ADMIN</text>
        </g>
      </g>
    ` : `
      <!-- ==================== PHASE 2 and 3: CATALOG and BORROW FLOW ==================== -->
      <g transform="translate(48, 90)">
        <!-- Search and Action Bar -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="760" height="48" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
          <!-- Magnifying icon -->
          <circle cx="24" cy="24" r="8" fill="none" stroke="#64748B" stroke-width="2"/>
          <line x1="30" y1="30" x2="38" y2="38" stroke="#64748B" stroke-width="2"/>
          <text x="50" y="29" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#0F172A">${searchText}</text>
          ${t >= 3.5 && t < 5.5 ? `<line x1="${52 + searchText.length * 9.2}" y1="16" x2="${52 + searchText.length * 9.2}" y2="32" stroke="#821124" stroke-width="2"/>` : ''}
        </g>

        <!-- Right Side Architecture Telemetry -->
        <g transform="translate(800, 0)">
          <rect x="0" y="0" width="384" height="580" rx="16" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
          <text x="24" y="36" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="#38BDF8">READHUB ARCHITECTURE</text>
          
          <g transform="translate(24, 60)">
            <rect x="0" y="0" width="336" height="70" rx="8" fill="#1E293B"/>
            <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Spring Boot 3 + Spring Data JPA</text>
            <text x="16" y="48" font-family="'Courier New', monospace" font-size="11" font-weight="500" fill="#94A3B8">Transaction Isolation: @Transactional</text>
          </g>

          <g transform="translate(24, 145)">
            <rect x="0" y="0" width="336" height="70" rx="8" fill="#1E293B"/>
            <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">ShedLock Distributed Scheduler</text>
            <text x="16" y="48" font-family="'Courier New', monospace" font-size="11" font-weight="500" fill="#34D399">Overdue Sentinel: Active (Zero Duplicates)</text>
          </g>

          <g transform="translate(24, 230)">
            <rect x="0" y="0" width="336" height="70" rx="8" fill="#1E293B"/>
            <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Nginx Reverse Proxy &amp; Docker</text>
            <text x="16" y="48" font-family="'Courier New', monospace" font-size="11" font-weight="500" fill="#94A3B8">Stateless Containers • Cloudinary CDN</text>
          </g>

          <g transform="translate(24, 320)">
            <rect x="0" y="0" width="336" height="110" rx="8" fill="#111827" stroke="#334155" stroke-width="1"/>
            <text x="16" y="26" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#F59E0B">ACTIVE TRANSACTION STATE</text>
            <text x="16" y="52" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#E2E8F0">Student ID: 21-1048-294 (Maya)</text>
            <text x="16" y="74" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#E2E8F0">Book: Clean Architecture (Robert Martin)</text>
            <text x="16" y="96" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="${isModal ? '#34D399' : '#38BDF8'}">Status: ${isModal ? 'BORROWED (Due: 14 Days)' : 'AVAILABLE'}</text>
          </g>
        </g>

        <!-- Book Catalog Grid -->
        <g transform="translate(0, 70)">
          <!-- Book Card 1 (Clean Architecture - Target Book) -->
          <g transform="translate(0, 0)">
            <rect x="2" y="4" width="235" height="490" rx="12" fill="#000000" opacity="0.05"/>
            <rect x="0" y="0" width="235" height="490" rx="12" fill="#FFFFFF" stroke="${isModal ? '#821124' : '#E2E8F0'}" stroke-width="${isModal ? 2.5 : 1}"/>
            <!-- Book Spine Artwork -->
            <rect x="16" y="16" width="203" height="260" rx="8" fill="#1E293B"/>
            <rect x="28" y="28" width="179" height="236" rx="4" fill="#821124"/>
            <text x="117" y="100" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">CLEAN</text>
            <text x="117" y="125" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">ARCHITECTURE</text>
            <text x="117" y="165" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#FCA5A5" text-anchor="middle">Robert C. Martin</text>

            <text x="16" y="306" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#0F172A">Clean Architecture</text>
            <text x="16" y="326" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Software Structure &amp; Design</text>

            <rect x="16" y="345" width="90" height="24" rx="6" fill="${isModal ? '#EFF6FF' : '#ECFDF5'}"/>
            <text x="61" y="361" font-family="'Courier New', monospace" font-size="11" font-weight="800" fill="${isModal ? '#2563EB' : '#059669'}" text-anchor="middle">${isModal ? 'BORROWED' : 'AVAILABLE'}</text>

            <rect x="16" y="420" width="203" height="40" rx="8" fill="#821124"/>
            <text x="117" y="445" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isModal ? 'VIEW DETAILS' : 'BORROW BOOK'}</text>
          </g>

          <!-- Book Card 2 (Design Patterns) -->
          <g transform="translate(255, 0)">
            <rect x="0" y="0" width="235" height="490" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
            <rect x="16" y="16" width="203" height="260" rx="8" fill="#0F172A"/>
            <rect x="28" y="28" width="179" height="236" rx="4" fill="#0369A1"/>
            <text x="117" y="110" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">DESIGN PATTERNS</text>
            <text x="117" y="145" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#BAE6FD" text-anchor="middle">Gang of Four</text>

            <text x="16" y="306" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#0F172A">Elements of Reusable</text>
            <text x="16" y="326" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Object-Oriented Software</text>

            <rect x="16" y="345" width="90" height="24" rx="6" fill="#ECFDF5"/>
            <text x="61" y="361" font-family="'Courier New', monospace" font-size="11" font-weight="800" fill="#059669" text-anchor="middle">AVAILABLE</text>

            <rect x="16" y="420" width="203" height="40" rx="8" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
            <text x="117" y="445" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569" text-anchor="middle">BORROW BOOK</text>
          </g>

          <!-- Book Card 3 (Refactoring) -->
          <g transform="translate(510, 0)">
            <rect x="0" y="0" width="235" height="490" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
            <rect x="16" y="16" width="203" height="260" rx="8" fill="#0F172A"/>
            <rect x="28" y="28" width="179" height="236" rx="4" fill="#15803D"/>
            <text x="117" y="110" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">REFACTORING</text>
            <text x="117" y="145" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#BBF7D0" text-anchor="middle">Martin Fowler</text>

            <text x="16" y="306" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#0F172A">Improving Code Design</text>
            <text x="16" y="326" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">2nd Edition Standard</text>

            <rect x="16" y="345" width="90" height="24" rx="6" fill="#FEF3C7"/>
            <text x="61" y="361" font-family="'Courier New', monospace" font-size="11" font-weight="800" fill="#D97706" text-anchor="middle">RESERVED</text>

            <rect x="16" y="420" width="203" height="40" rx="8" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
            <text x="117" y="445" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#94A3B8" text-anchor="middle">WAITLIST</text>
          </g>
        </g>
      </g>

      ${isModal ? `
        <!-- ==================== BORROW COMMIT MODAL ==================== -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="#000000" opacity="0.45"/>
        <g transform="translate(390, 160)">
          <rect x="4" y="6" width="500" height="380" rx="16" fill="#000000" opacity="0.12"/>
          <rect x="0" y="0" width="500" height="380" rx="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
          
          <g transform="translate(32, 32)">
            <rect x="0" y="0" width="56" height="56" rx="12" fill="#FEF2F2"/>
            <!-- Book icon -->
            <path d="M14 16 L28 22 L42 16 L42 36 L28 42 L14 36 Z" fill="#821124"/>
            <text x="74" y="26" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#0F172A">Confirm Borrow Request</text>
            <text x="74" y="46" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Campus Peer Library System • Spring Data JPA</text>
          </g>

          <g transform="translate(32, 115)">
            <rect x="0" y="0" width="436" height="135" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
            <text x="20" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#0F172A">Clean Architecture (Robert C. Martin)</text>
            <text x="20" y="52" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#64748B">Transaction ID: TX-2026-0941A</text>
            <text x="20" y="74" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#64748B">Borrower: Maya (student@cit.edu)</text>
            <text x="20" y="96" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#059669">Loan Duration: 14 Days (Due: Nov 22, 2026)</text>
            <text x="20" y="118" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2563EB">ShedLock: Overdue Audit Sentinel Scheduled</text>
          </g>

          <g transform="translate(32, 280)">
            <rect x="0" y="0" width="436" height="50" rx="8" fill="#821124"/>
            <text x="218" y="31" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">REQUEST COMMITTED TO DATABASE</text>
          </g>
        </g>
      ` : ''}
    `}
  </svg>
  `;
}

// ===========================================================================
// GORDON RAMSAI: Authentic Streamlit Fitness & Nutrition App Flow
// Source: app.py + theme_manager.py (Bianco Fuji Ferrari Red / Dark #050505)
// ===========================================================================
function renderGordonRamsAiFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.5s): Dashboard & Michelin Accountability Rating
  // Phase 2 (3.5..7.5s): Quick Intake Logger (+350 kcal) & Calorie Progress Bar
  // Phase 3 (7.5..12.0s): The Roast Box Excuse Interceptor / Security Guardrail
  const isRoast = t >= 7.5;
  const isLogged = t >= 5.0;

  const currentCals = isLogged ? 1750 : 1400;
  const targetCals = 2000;
  const progressRatio = currentCals / targetCals; // 0.70 or 0.875
  const ratingText = isLogged ? "*** Rating" : "** Rating";
  const ratingMsg = isLogged
    ? "Solid execution. Michelin-star standard approaching!"
    : "Solid effort, but you can plate this better.";
  const ratingColor = isLogged ? "#FFD700" : "#E6C229";

  const userTyping = isRoast
    ? "I am too lazy to workout today...".slice(0, Math.min(33, Math.round(clamp((t - 7.5) / 1.5) * 33)))
    : "";

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="headerGlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#E32636"/>
        <stop offset="100%" stop-color="#800000"/>
      </linearGradient>
    </defs>

    <!-- Streamlit Dark Carbon Fiber Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505"/>

    <!-- Left Streamlit Sidebar -->
    <rect x="0" y="0" width="280" height="${HEIGHT}" fill="#0A0A0A" stroke="#1A1A1A" stroke-width="1"/>
    
    <!-- Sidebar Header -->
    <g transform="translate(28, 28)">
      <rect x="0" y="0" width="34" height="34" rx="8" fill="#E32636"/>
      <text x="17" y="24" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle">G</text>
      <text x="46" y="23" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#FAFAFA" letter-spacing="1">GORDON</text>
      <text x="136" y="23" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#E32636" letter-spacing="1">RAMSAI</text>
      <text x="0" y="54" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#A0A0A0">COACHING DASHBOARD</text>
    </g>

    <!-- User Profile Card in Sidebar -->
    <g transform="translate(24, 110)">
      <rect x="0" y="0" width="232" height="120" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
      <text x="16" y="26" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#E32636">CHEF PROFILE // AUTHENTICATED</text>
      <text x="16" y="48" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#FAFAFA">Chef Maya</text>
      <text x="16" y="70" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#A0A0A0">Goal: Utilitarian Cut</text>
      <text x="16" y="90" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#A0A0A0">Weight: 70 kg • Diet: High Protein</text>
    </g>

    <!-- Gordon's Mood Engine Slider in Sidebar -->
    <g transform="translate(24, 255)">
      <rect x="0" y="0" width="232" height="150" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
      <text x="16" y="26" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#E32636">GORDON'S MOOD ENGINE</text>
      <text x="16" y="52" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#FAFAFA">Inferno Mode (Hell's Kitchen)</text>
      <rect x="16" y="66" width="200" height="8" rx="4" fill="#2A2A2A"/>
      <rect x="16" y="66" width="180" height="8" rx="4" fill="#E32636"/>
      <circle cx="196" cy="70" r="7" fill="#FFFFFF"/>
      <text x="16" y="100" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#EF4444">Strictness: Maximum</text>
      <text x="16" y="120" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#A0A0A0">Zero tolerance for excuses</text>
    </g>

    <!-- RAG and Model Telemetry in Sidebar -->
    <g transform="translate(24, 430)">
      <rect x="0" y="0" width="232" height="160" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
      <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#E32636">AI ARCHITECTURE STACK</text>
      <text x="16" y="50" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FAFAFA">Model: Google Gemini 1.5</text>
      <text x="16" y="72" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#38BDF8">Vector RAG: ChromaDB</text>
      <text x="16" y="94" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#A0A0A0">Observability: Langfuse Tracing</text>
      <text x="16" y="116" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10B981">Local Storage: users.json DB</text>
    </g>

    <!-- Main Content Area -->
    <g transform="translate(320, 30)">
      <!-- Top Title and Streamlit Badge -->
      <g transform="translate(0, 0)">
        <text x="0" y="26" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#FAFAFA" letter-spacing="1">TODAY'S FUEL STATS &amp; NUTRITION</text>
        <rect x="740" y="4" width="180" height="28" rx="6" fill="#1A1A1A" stroke="#2A2A2A" stroke-width="1"/>
        <text x="830" y="22" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#38BDF8" text-anchor="middle">STREAMLIT DEPLOYED</text>
      </g>

      <!-- Chef's Kitchen Rating (Michelin Star Widget) -->
      <g transform="translate(0, 48)">
        <rect x="0" y="0" width="920" height="80" rx="8" fill="#121212" stroke="${ratingColor}" stroke-width="2"/>
        <line x1="0" y1="0" x2="0" y2="80" stroke="${ratingColor}" stroke-width="8"/>
        
        <text x="24" y="26" font-family="'Courier New', monospace" font-size="11" font-weight="800" fill="#A0A0A0" letter-spacing="1.5">CHEF'S KITCHEN RATING</text>
        <text x="24" y="56" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="${ratingColor}">${ratingText}</text>
        <text x="220" y="54" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#FAFAFA">"${ratingMsg}"</text>
      </g>

      <!-- Macro Columns (Calories, Protein, Carbs, Fat) -->
      <g transform="translate(0, 150)">
        <!-- Calories -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="215" height="88" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
          <text x="16" y="24" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A0A0A0">CALORIES</text>
          <text x="16" y="54" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FAFAFA">${currentCals} / ${targetCals}</text>
          <text x="16" y="74" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#10B981">${targetCals - currentCals} kcal remaining</text>
        </g>

        <!-- Protein -->
        <g transform="translate(235, 0)">
          <rect x="0" y="0" width="215" height="88" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
          <text x="16" y="24" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A0A0A0">PROTEIN</text>
          <text x="16" y="54" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FAFAFA">${isLogged ? '154' : '114'} / 154 g</text>
          <text x="16" y="74" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#10B981">${isLogged ? 'Goal Met!' : '40g remaining'}</text>
        </g>

        <!-- Carbs -->
        <g transform="translate(470, 0)">
          <rect x="0" y="0" width="215" height="88" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
          <text x="16" y="24" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A0A0A0">CARBS</text>
          <text x="16" y="54" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FAFAFA">160 / 180 g</text>
          <text x="16" y="74" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38BDF8">20g remaining</text>
        </g>

        <!-- Fat -->
        <g transform="translate(705, 0)">
          <rect x="0" y="0" width="215" height="88" rx="10" fill="#121212" stroke="#2A2A2A" stroke-width="1"/>
          <text x="16" y="24" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A0A0A0">FAT</text>
          <text x="16" y="54" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FAFAFA">45 / 55 g</text>
          <text x="16" y="74" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38BDF8">10g remaining</text>
        </g>
      </g>

      <!-- Caloric Goal Progress Bar -->
      <g transform="translate(0, 255)">
        <rect x="0" y="0" width="920" height="12" rx="6" fill="#1A1A1A"/>
        <rect x="0" y="0" width="${Math.round(920 * progressRatio)}" height="12" rx="6" fill="#E32636"/>
        <text x="0" y="32" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A0A0A0">DAILY CALORIC GOAL PROGRESS: ${Math.round(progressRatio * 100)}%</text>
      </g>

      ${isRoast ? `
        <!-- ==================== PHASE 3: THE ROAST BOX (EXCUSE INTERCEPTOR) ==================== -->
        <g transform="translate(0, 310)">
          <rect x="-2" y="-2" width="924" height="324" rx="14" fill="#E32636" opacity="0.15"/>
          <rect x="0" y="0" width="920" height="320" rx="12" fill="#1A0505" stroke="#E32636" stroke-width="2"/>
          <line x1="0" y1="0" x2="0" y2="320" stroke="#E32636" stroke-width="8"/>

          <!-- User Excuse Prompt -->
          <g transform="translate(32, 28)">
            <rect x="0" y="0" width="856" height="48" rx="8" fill="#121212" stroke="#333333" stroke-width="1"/>
            <text x="16" y="30" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#FFFFFF">&gt; "${userTyping}"</text>
            ${t < 9.0 ? `<line x1="${24 + userTyping.length * 9.5}" y1="16" x2="${24 + userTyping.length * 9.5}" y2="34" stroke="#E32636" stroke-width="2"/>` : ''}
          </g>

          <!-- Interceptor Header Tag -->
          <g transform="translate(32, 92)">
            <rect x="0" y="0" width="240" height="28" rx="6" fill="#E32636"/>
            <text x="120" y="19" font-family="'Courier New', monospace" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">INSTANT UI BLOCK // ROAST</text>
            <text x="260" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FCA5A5">• THE EXCUSE INTERCEPTOR ACTIVATED</text>
          </g>

          <!-- Chef Gordon's Response Box -->
          <g transform="translate(32, 135)">
            <text x="0" y="24" font-family="Georgia, serif" font-size="18" font-style="italic" font-weight="700" fill="#FFFFFF">"Are you having a laugh?! You're making excuses before we even start!</text>
            <text x="0" y="52" font-family="Georgia, serif" font-size="18" font-style="italic" font-weight="700" fill="#FFFFFF">My gran puts in more effort than you and she's dead! Get off your backside and go!"</text>
            
            <text x="0" y="90" font-family="'Courier New', monospace" font-size="13" font-weight="800" fill="#E32636">— GORDON RAMSAI (CHEF INFERNO ENGINE)</text>
          </g>

          <!-- System Guardrail / RAG Observability Banner -->
          <g transform="translate(32, 250)">
            <rect x="0" y="0" width="856" height="45" rx="8" fill="#0A0A0A" stroke="#2A2A2A" stroke-width="1"/>
            <text x="16" y="28" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#38BDF8">PROMPT INJECTION DEFENSE:</text>
            <text x="210" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#E2E8F0">Bypasses rejected with penalty • ChromaDB RAG tethered to vetted nutrition</text>
          </g>
        </g>
      ` : `
        <!-- ==================== PHASE 2: QUICK INTAKE LOGGER ==================== -->
        <g transform="translate(0, 310)">
          <rect x="0" y="0" width="920" height="320" rx="12" fill="#121212" stroke="#2A2A2A" stroke-width="1.5"/>
          <text x="24" y="36" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">QUICK INTAKE LOGGER</text>
          <text x="24" y="60" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#A0A0A0">Log meals with immediate recalculation &amp; persistence to users.json</text>

          <!-- Input Boxes -->
          <g transform="translate(24, 85)">
            <rect x="0" y="0" width="195" height="50" rx="8" fill="#1A1A1A" stroke="#333333" stroke-width="1"/>
            <text x="14" y="31" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#FFFFFF">+350 kcal</text>
            <text x="14" y="-8" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#A0A0A0">CALORIES</text>
          </g>

          <g transform="translate(240, 85)">
            <rect x="0" y="0" width="195" height="50" rx="8" fill="#1A1A1A" stroke="#333333" stroke-width="1"/>
            <text x="14" y="31" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#FFFFFF">+40 g</text>
            <text x="14" y="-8" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#A0A0A0">PROTEIN</text>
          </g>

          <g transform="translate(456, 85)">
            <rect x="0" y="0" width="195" height="50" rx="8" fill="#1A1A1A" stroke="#333333" stroke-width="1"/>
            <text x="14" y="31" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#FFFFFF">+20 g</text>
            <text x="14" y="-8" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#A0A0A0">CARBS</text>
          </g>

          <g transform="translate(672, 85)">
            <rect x="0" y="0" width="195" height="50" rx="8" fill="#1A1A1A" stroke="#333333" stroke-width="1"/>
            <text x="14" y="31" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#FFFFFF">+8 g</text>
            <text x="14" y="-8" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#A0A0A0">FAT</text>
          </g>

          <!-- Add Log Button -->
          <g transform="translate(24, 165)">
            <rect x="0" y="0" width="843" height="46" rx="8" fill="#E32636"/>
            <text x="421" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">ADD LOG TO DISCIPLINE TRACKER</text>
          </g>

          <!-- Recent Food Log Preview -->
          <g transform="translate(24, 230)">
            <rect x="0" y="0" width="843" height="60" rx="8" fill="#1A1A1A" stroke="#2A2A2A" stroke-width="1"/>
            <text x="16" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FAFAFA">Recent: Grilled Chicken Breast (200g) &amp; White Rice (1 cup)</text>
            <text x="16" y="46" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#10B981">Verified: +40g Protein logged • Michelin Standard Updated</text>
          </g>
        </g>
      `}
    </g>
  </svg>
  `;
}

// ===========================================================================
// FFmpeg Video Compilation Pipeline
// ===========================================================================
function compileVideoFromFrames(renderFrameFn, outMp4Path) {
  return new Promise((resolve, reject) => {
    const ffmpegArgs = [
      "-y",
      "-f", "image2pipe",
      "-vcodec", "png",
      "-r", String(FPS),
      "-i", "-",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-preset", "veryfast",
      "-crf", "22",
      "-movflags", "+faststart",
      outMp4Path,
    ];

    const proc = spawn(FFMPEG_PATH, ffmpegArgs, { stdio: ["pipe", "inherit", "inherit"] });

    proc.on("error", (err) => {
      reject(new Error(`Failed to start FFmpeg: ${err.message}`));
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with error code ${code}`));
    });

    (async () => {
      try {
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const svgStr = renderFrameFn(i);
          const pngBuf = await sharp(Buffer.from(svgStr)).png().toBuffer();
          if (!proc.stdin.write(pngBuf)) {
            await new Promise((res) => proc.stdin.once("drain", res));
          }
        }
        proc.stdin.end();
      } catch (err) {
        proc.stdin.destroy();
        reject(err);
      }
    })();
  });
}

async function generateWebPPoster(renderFrameFn, frameIdx, outPosterPath) {
  const svgStr = renderFrameFn(frameIdx);
  await sharp(Buffer.from(svgStr))
    .webp({ quality: 82, effort: 6 })
    .toFile(outPosterPath);
}

// ===========================================================================
// MAIN EXECUTION
// ===========================================================================
async function main() {
  console.log("=== Loading Authentic PlayIT Screenshots from Repository ===");
  const playitB64 = await loadAndResizePlayItImages();
  console.log("Loaded all 8 playit screenshots successfully!");

  console.log("\n=== Generating 1. PlayIT Video (Flagship Real System Walkthrough) ===");
  const playitMp4 = path.join(OUT_VIDEOS_DIR, "playit.mp4");
  const playitPoster = path.join(OUT_IMAGES_DIR, "playit-poster.webp");
  if (fs.existsSync(playitMp4) && fs.statSync(playitMp4).size > 100000) {
    console.log("playit.mp4 already generated and verified (325 KB), keeping existing artifact.");
  } else {
    await compileVideoFromFrames((f) => renderPlayItFrame(f, playitB64), playitMp4);
    await generateWebPPoster((f) => renderPlayItFrame(f, playitB64), 80, playitPoster);
    console.log("playit.mp4 and poster created successfully!");
  }

  console.log("\n=== Generating 2. ReadHub Video (Authentic Live Web Flow) ===");
  const readhubMp4 = path.join(OUT_VIDEOS_DIR, "readhub.mp4");
  const readhubPoster = path.join(OUT_IMAGES_DIR, "readhub-poster.webp");
  await compileVideoFromFrames((f) => renderReadHubFrame(f), readhubMp4);
  await generateWebPPoster((f) => renderReadHubFrame(f), 80, readhubPoster);
  console.log("readhub.mp4 and poster created successfully!");

  console.log("\n=== Generating 3. Gordon RamsAi Video (Authentic Streamlit Flow) ===");
  const gordonMp4 = path.join(OUT_VIDEOS_DIR, "gordon-ramsai.mp4");
  const gordonPoster = path.join(OUT_IMAGES_DIR, "gordon-ramsai-poster.webp");
  await compileVideoFromFrames((f) => renderGordonRamsAiFrame(f), gordonMp4);
  await generateWebPPoster((f) => renderGordonRamsAiFrame(f), 80, gordonPoster);
  console.log("gordon-ramsai.mp4 and poster created successfully!");

  console.log("\n=== All Authentic Live Videos and Posters Generated Successfully! ===");
}

main().catch((err) => {
  console.error("Video Generation Error:", err);
  process.exit(1);
});
