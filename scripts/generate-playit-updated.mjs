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

const PLAYIT_SCREENSHOTS_DIR =
  "/mnt/c/Users/Zendrix/Desktop/thesis/playIT-v2-workspace/dist/PlayIT/docs/screenshots";

// Pre-resize each screenshot to fit device frame (width 270, height 555)
const DEV_W = 270;
const DEV_H = 555;

async function prepareScreenshots() {
  const fileMap = {
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
  for (const [key, filename] of Object.entries(fileMap)) {
    const p = path.join(PLAYIT_SCREENSHOTS_DIR, filename);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing screenshot: ${p}`);
    }
    const buf = await sharp(p)
      .resize(DEV_W, DEV_H, { fit: "cover" })
      .png()
      .toBuffer();
    buffers[key] = buf;
  }
  return buffers;
}

// Generate the 4 SVG backgrounds (one per phase) without base64 images
function getPhaseSvg(phaseNum, t) {
  let phaseTitle = "01 / ONBOARDING &amp; PROFILE SETUP";
  let phaseBadge = "AVATAR-ONLY • ZERO INTERNET PERMISSION";
  let leftLabel = "Splash: Lily Tarsier Guide";
  let rightLabel = "Onboarding: Avatar-Only (No Typing)";
  let metric1 = "Platform: Android 8.0+ (API 26)";
  let metric2 = "Network: Zero INTERNET Permission";
  let metric3 = "Mascot: Lily (Tarsier Guide)";
  let metric4 = "Unit Tests: 691 Passed (0 Failed)";

  if (phaseNum === 2) {
    phaseTitle = "02 / MARUNGKO PROGRESSION &amp; HEAR IT";
    phaseBadge = "26 LETTERS / 7 CHAPTERS • NATIVE 16kHz PCM";
    leftLabel = "Map: Chapter 1 Bohol Trail";
    rightLabel = "Hear It: Auditory Modeling (/m/)";
    metric1 = "Curriculum: Marungko Approach";
    metric2 = "Audio: Native 16kHz PCM Modeling";
    metric3 = "Chapter 1: M (Mouse), S (Sun), A, I";
    metric4 = "Decodable: SAM, SIS, AM";
  } else if (phaseNum === 3) {
    phaseTitle = "03 / ON-DEVICE ASR &amp; SPEECH SCAFFOLD";
    phaseBadge = "VOSK 0.3.47 ASR • ACOUSTIC FOIL GRAMMAR";
    leftLabel = "Say It: Vosk Speech Recognizer";
    rightLabel = "Say It: Mouth Articulation Cue";
    metric1 = "ASR Engine: On-Device Vosk 0.3.47";
    metric2 = "Target Word: 'mouse' (/m/)";
    metric3 = "Foil Grammar: Letter Name &amp; Vowel";
    metric4 = "Pedagogy: Non-Punitive (No Hearts Lost)";
  } else if (phaseNum === 4) {
    phaseTitle = "04 / PHONEMIC SYNTHESIS (BLEND IT)";
    phaseBadge = "5-CARD GRID • CVC TILES (SAM) • 5 HEARTS";
    leftLabel = "Find It: Sound Discrimination";
    rightLabel = "Blend It: CVC Word Synthesis";
    metric1 = "Discrimination: 5-Card Grid (3 targets)";
    metric2 = "Word Synthesis: S - A - M ('SAM')";
    metric3 = "Shuffle Guard: Deal Never Answers Order";
    metric4 = "Clean Arch: Pure Kotlin domain/ Layer";
  }

  const pulse = 0.5 + 0.5 * Math.sin(t * 5.0);

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
    </defs>

    <!-- Canvas Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>

    <!-- Subtle Grid -->
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.8" opacity="0.6"/>
    </pattern>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#gridPattern)"/>

    <!-- Top Left Header Bar -->
    <g transform="translate(48, 24)">
      <rect x="0" y="0" width="220" height="28" rx="6" fill="#4F46E5" opacity="0.25" stroke="#6366F1" stroke-width="1"/>
      <circle cx="16" cy="14" r="4" fill="#6366F1"/>
      <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#E0E7FF" letter-spacing="1">PLAYIT UPDATED REPO</text>
      <text x="236" y="19" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="#94A3B8">| 691 Unit Tests Passed • Vosk 0.3.47 Offline ASR</text>
    </g>

    <!-- ==================== LEFT DEVICE SHELL ==================== -->
    <g transform="translate(48, 62)">
      <!-- Drop shadow rect -->
      <rect x="4" y="8" width="290" height="630" rx="32" fill="#000000" opacity="0.4"/>
      <!-- Tablet Outer Frame -->
      <rect x="0" y="0" width="290" height="630" rx="32" fill="#0B132B" stroke="#334155" stroke-width="2.5"/>
      <!-- Inner Screen Bezel Window (Content composites at x=10, y=36, w=270, h=555) -->
      <rect x="10" y="36" width="270" height="555" rx="16" fill="#000000"/>
      <!-- Top Speaker & Camera -->
      <circle cx="145" cy="20" r="5" fill="#1E293B"/>
      <!-- Bottom gesture bar -->
      <rect x="95" y="608" width="100" height="4" rx="2" fill="#FFFFFF" opacity="0.4"/>
      <!-- Label Chip Below Device -->
      <rect x="20" y="586" width="250" height="24" rx="6" fill="#0F172A" opacity="0.95" stroke="#334155" stroke-width="1"/>
      <text x="145" y="602" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#F8FAFC" text-anchor="middle">${leftLabel}</text>
    </g>

    <!-- ==================== RIGHT DEVICE SHELL ==================== -->
    <g transform="translate(368, 62)">
      <!-- Drop shadow rect -->
      <rect x="4" y="8" width="290" height="630" rx="32" fill="#000000" opacity="0.4"/>
      <!-- Tablet Outer Frame -->
      <rect x="0" y="0" width="290" height="630" rx="32" fill="#0B132B" stroke="#334155" stroke-width="2.5"/>
      <!-- Inner Screen Bezel Window (Content composites at x=10, y=36, w=270, h=555) -->
      <rect x="10" y="36" width="270" height="555" rx="16" fill="#000000"/>
      <!-- Top Speaker & Camera -->
      <circle cx="145" cy="20" r="5" fill="#1E293B"/>
      <!-- Bottom gesture bar -->
      <rect x="95" y="608" width="100" height="4" rx="2" fill="#FFFFFF" opacity="0.4"/>
      <!-- Label Chip Below Device -->
      <rect x="20" y="586" width="250" height="24" rx="6" fill="#0F172A" opacity="0.95" stroke="#334155" stroke-width="1"/>
      <text x="145" y="602" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#F8FAFC" text-anchor="middle">${rightLabel}</text>
    </g>

    <!-- ==================== RIGHT COLUMN: ARCHITECTURAL TELEMETRY ==================== -->
    <g transform="translate(690, 62)">
      <!-- Card Container -->
      <rect x="0" y="0" width="542" height="630" rx="20" fill="#090D1A" stroke="#1E293B" stroke-width="1.5"/>

      <!-- Console Header -->
      <rect x="0" y="0" width="542" height="52" rx="20" fill="#0F172A"/>
      <rect x="0" y="32" width="542" height="20" fill="#0F172A"/>
      <line x1="0" y1="52" x2="542" y2="52" stroke="#1E293B" stroke-width="1"/>

      <g transform="translate(24, 18)">
        <circle cx="6" cy="10" r="5" fill="#10B981"/>
        <circle cx="6" cy="10" r="9" fill="#10B981" opacity="${pulse * 0.4}"/>
        <text x="24" y="14" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">PLAYIT STAGE ${phaseNum}/4</text>
        <text x="190" y="14" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B">• ACADEMIC RESEARCH BASELINE</text>
      </g>

      <!-- Active Phase Banner -->
      <g transform="translate(24, 74)">
        <rect x="0" y="0" width="494" height="66" rx="12" fill="#1E1B4B" stroke="#4338CA" stroke-width="1.5"/>
        <text x="20" y="28" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">${phaseTitle}</text>
        <text x="20" y="48" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A5B4FC">${phaseBadge}</text>
      </g>

      <!-- Telemetry Metric Boxes -->
      <g transform="translate(24, 156)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC A</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#F1F5F9">${metric1}</text>
      </g>

      <g transform="translate(280, 156)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC B</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#38BDF8">${metric2}</text>
      </g>

      <g transform="translate(24, 246)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC C</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#F1F5F9">${metric3}</text>
      </g>

      <g transform="translate(280, 246)">
        <rect x="0" y="0" width="238" height="74" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="16" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#64748B">METRIC // SPEC D</text>
        <text x="16" y="50" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#10B981">${metric4}</text>
      </g>

      <!-- Live Pipeline Waveform -->
      <g transform="translate(24, 338)">
        <rect x="0" y="0" width="494" height="114" rx="12" fill="#050B14" stroke="#1E293B" stroke-width="1"/>
        <text x="20" y="26" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#38BDF8">REAL-TIME SIGNAL DECODING // VOSK 16kHz PCM</text>
        
        <!-- Animated Waveform Bars -->
        <g transform="translate(20, 44)">
          ${Array.from({ length: 28 }).map((_, i) => {
            const h = Math.max(8, Math.round(48 * Math.sin(t * 8.0 + i * 0.45) * Math.sin(i * 0.2)));
            return `<rect x="${i * 16}" y="${52 - h / 2}" width="8" height="${h}" rx="3" fill="#6366F1" opacity="${0.4 + 0.6 * (i / 28)}"/>`;
          }).join("")}
        </g>
      </g>

      <!-- Architecture Compliance Footer -->
      <g transform="translate(24, 470)">
        <rect x="0" y="0" width="494" height="136" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="20" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">REPOSITORY SPECIFICATIONS // IT411 CIT-U</text>
        
        <text x="20" y="52" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#94A3B8">• Architecture: Clean Architecture + MVVM + Hilt DI</text>
        <text x="20" y="72" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#94A3B8">• Domain Rules: Pure Kotlin (zero android.* imports)</text>
        <text x="20" y="92" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#10B981">• Test Suite: 691 passed, 6 skipped by design, 0 failed</text>
        <text x="20" y="112" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#38BDF8">• Submission: APK H (STD v1.0, Joemarie C. Amparo)</text>
      </g>
    </g>
  </svg>
  `;
}

async function renderPlayItCompositeFrame(frameIndex, screenshotBuffers) {
  const t = frameIndex / FPS;

  let phaseNum = 1;
  let leftBuf = screenshotBuffers.splash;
  let rightBuf = screenshotBuffers.nameprompt;

  if (t >= 3.0 && t < 6.0) {
    phaseNum = 2;
    leftBuf = screenshotBuffers.map;
    rightBuf = screenshotBuffers.hearit;
  } else if (t >= 6.0 && t < 9.0) {
    phaseNum = 3;
    leftBuf = screenshotBuffers.sayit;
    rightBuf = screenshotBuffers.sayit_cue;
  } else if (t >= 9.0) {
    phaseNum = 4;
    leftBuf = screenshotBuffers.findit;
    rightBuf = screenshotBuffers.blendit;
  }

  const svgStr = getPhaseSvg(phaseNum, t);
  const baseBuf = await sharp(Buffer.from(svgStr)).png().toBuffer();

  // Composite left screenshot at x=58, y=98 (within left device shell: frame x=48, y=62, inner x=10, y=36)
  // Composite right screenshot at x=378, y=98 (within right device shell: frame x=368, y=62, inner x=10, y=36)
  return sharp(baseBuf)
    .composite([
      { input: leftBuf, top: 98, left: 58 },
      { input: rightBuf, top: 98, left: 378 },
    ])
    .png()
    .toBuffer();
}

async function main() {
  console.log("=== Loading Updated PlayIT Screenshots ===");
  const screenshotBuffers = await prepareScreenshots();
  console.log("Loaded all 8 screenshots successfully!");

  const outMp4Path = path.join(OUT_VIDEOS_DIR, "playit.mp4");
  const outPosterPath = path.join(OUT_IMAGES_DIR, "playit-poster.webp");

  console.log("\n=== Compiling Updated playit.mp4 with FFmpeg ===");
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

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const pngBuf = await renderPlayItCompositeFrame(i, screenshotBuffers);
    if (!proc.stdin.write(pngBuf)) {
      await new Promise((res) => proc.stdin.once("drain", res));
    }
  }
  proc.stdin.end();

  await new Promise((resolve, reject) => {
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
    proc.on("error", reject);
  });

  console.log("\n=== Generating playit-poster.webp ===");
  const posterFrameBuf = await renderPlayItCompositeFrame(80, screenshotBuffers);
  await sharp(posterFrameBuf)
    .webp({ quality: 82, effort: 6 })
    .toFile(outPosterPath);

  console.log("\n=== Done! Successfully Recreated PlayIT Video & Poster! ===");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
