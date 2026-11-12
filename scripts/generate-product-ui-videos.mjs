import sharp from 'sharp';
import fs from 'fs';
import { spawn } from 'child_process';

const FFMPEG_BIN = fs.existsSync('/home/zendrix/.local/bin/ffmpeg')
  ? '/home/zendrix/.local/bin/ffmpeg'
  : 'ffmpeg';

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 24;
const DURATION_SEC = 12.0;
const TOTAL_FRAMES = Math.round(FPS * DURATION_SEC); // 288 frames

// Helper for smooth easing
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(val, min = 0, max = 1) {
  return Math.min(max, Math.max(min, val));
}

// ---------------------------------------------------------------------------
// 1. PlayIT (BasaTrack) UI Generator
// ---------------------------------------------------------------------------
function renderPlayItFrame(frameIndex) {
  const t = frameIndex / FPS; // 0.0 to 12.0s

  // Interaction timing
  // Phase 1 (0..3.5s): Card selection & mic preparation
  // Phase 2 (3.5..8.0s): Voice recording with live 16kHz audio waveform
  // Phase 3 (8.0..12.0s): Vosk ASR evaluation, 98% score reveal, profile sync
  
  const isListening = t >= 3.5 && t < 8.0;
  const isEvaluated = t >= 8.0;

  // Waveform heights
  const bars = [];
  const barCount = 28;
  for (let i = 0; i < barCount; i++) {
    if (isListening) {
      const freq = Math.sin((t * 8) + i * 0.45) * Math.cos(t * 14 - i * 0.3);
      const h = Math.max(8, Math.min(76, Math.abs(freq) * 70 + 12));
      bars.push(h);
    } else {
      bars.push(6);
    }
  }

  // Score progression (8.0s to 10.0s leaps from 0% to 98%)
  const scoreProgress = isEvaluated ? clamp((t - 8.0) / 1.5) : 0;
  const displayedScore = Math.round(easeInOutQuad(scoreProgress) * 98);

  // Active card selection scale
  const cardScale = t > 1.5 ? 1.04 : 1.0;
  const cardBorder = t > 1.5 ? '#06b6d4' : '#334155';

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)" />

  <!-- Tablet Bezel & Screen Outer Frame -->
  <rect x="36" y="24" width="1208" height="672" rx="28" fill="#0f172a" stroke="#1e293b" stroke-width="3" />
  
  <!-- Android Tablet Status Bar -->
  <rect x="36" y="24" width="1208" height="38" rx="28" fill="#1e293b" fill-opacity="0.6" />
  <text x="68" y="48" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">09:41</text>
  <rect x="180" y="34" width="280" height="20" rx="10" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-opacity="0.4" stroke-width="1" />
  <text x="320" y="48" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">OFFLINE MODE • EDGE VOSK ASR ACTIVE</text>
  <text x="1170" y="48" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="bold" text-anchor="end">100% [BATTERY]</text>

  <!-- App Header -->
  <g transform="translate(68, 80)">
    <rect x="0" y="0" width="1144" height="64" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <circle cx="36" cy="32" r="18" fill="#06b6d4" />
    <polygon points="32,24 44,32 32,40" fill="#0f172a" />
    <text x="68" y="28" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="bold">BasaTrack // Mobile Phonics &amp; Literacy System</text>
    <text x="68" y="48" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Grade 1 Marungko Literacy • On-Device Speech Recognition</text>
    
    <!-- Profile Sync Pill -->
    <rect x="940" y="14" width="180" height="36" rx="18" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <circle cx="958" cy="32" r="10" fill="#10b981" />
    <text x="978" y="36" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Learner: Carl (Gr. 1)</text>
  </g>

  <!-- Main Phonics Card Deck Stage -->
  <g transform="translate(68, 164)">
    <!-- Lesson Title -->
    <text x="0" y="24" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="1">LESSON 01 // TITIK M AT A (MARUNGKO APPROACH)</text>
    <text x="0" y="52" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="bold">Pagsasanay sa Pagbasa ng Pantig (Syllable Reading)</text>

    <!-- Center Interactive Phonics Card -->
    <g transform="translate(412, 80)">
      <rect x="0" y="0" width="320" height="340" rx="24" fill="#1e293b" stroke="${cardBorder}" stroke-width="${cardScale > 1 ? 3 : 1.5}" />
      
      <!-- Syllable Typography -->
      <rect x="20" y="20" width="280" height="180" rx="16" fill="#0f172a" />
      <text x="160" y="135" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="96" font-weight="900" text-anchor="middle" letter-spacing="2">BA</text>
      <text x="160" y="175" fill="#06b6d4" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">/ba/ • Marungko Syllable 01</text>

      <!-- Record & Listening Button -->
      <g transform="translate(40, 220)">
        <rect x="0" y="0" width="240" height="54" rx="27" fill="${isListening ? '#ef4444' : '#0284c7'}" />
        <circle cx="32" cy="27" r="12" fill="#ffffff" fill-opacity="0.25" />
        <circle cx="32" cy="27" r="6" fill="#ffffff" />
        <text x="135" y="33" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
          ${isListening ? 'NAKIKINIG... (16kHz PCM)' : (isEvaluated ? 'SUBUKAN MULI (RETRY)' : 'MAGSALITA (RECORD)')}
        </text>
      </g>

      <!-- Vosk Offline Engine Badge -->
      <text x="160" y="308" fill="#64748b" font-family="monospace" font-size="10" text-anchor="middle">ASR ENGINE: ~68MB VOSK OFFLINE MODEL</text>
    </g>

    <!-- Side Deck Cards -->
    <g transform="translate(60, 110)">
      <rect x="0" y="0" width="140" height="120" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="70" y="65" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="bold" text-anchor="middle">BE</text>
      <text x="70" y="95" fill="#475569" font-family="monospace" font-size="11" text-anchor="middle">/be/</text>
    </g>

    <g transform="translate(60, 250)">
      <rect x="0" y="0" width="140" height="120" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="70" y="65" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="bold" text-anchor="middle">BI</text>
      <text x="70" y="95" fill="#475569" font-family="monospace" font-size="11" text-anchor="middle">/bi/</text>
    </g>

    <!-- Right Evaluation & Score Panel -->
    <g transform="translate(800, 80)">
      <rect x="0" y="0" width="344" height="340" rx="20" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="24" y="36" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">OFFLINE SPEECH EVALUATION</text>
      
      <!-- Score Circle Gauge -->
      <g transform="translate(172, 130)">
        <circle cx="0" cy="0" r="64" fill="none" stroke="#334155" stroke-width="12" />
        <circle cx="0" cy="0" r="64" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="402" stroke-dashoffset="${402 - (402 * (displayedScore / 100))}" stroke-linecap="round" transform="rotate(-90)" />
        <text x="0" y="10" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="bold" text-anchor="middle">${displayedScore}%</text>
        <text x="0" y="32" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">PHONETIC MATCH</text>
      </g>

      ${isEvaluated ? `
      <!-- Success Badge -->
      <rect x="36" y="215" width="272" height="42" rx="10" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1" />
      <text x="172" y="241" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">MAHUSAY! TUMPAK ANG BIGKAS</text>
      
      <!-- Metrics Breakdown -->
      <text x="36" y="285" fill="#94a3b8" font-family="monospace" font-size="11">Vosk Acoustic Latency: <tspan fill="#f8fafc" font-weight="bold">142ms</tspan></text>
      <text x="36" y="305" fill="#94a3b8" font-family="monospace" font-size="11">Room SQLite Sync: <tspan fill="#34d399" font-weight="bold">Saved to Local DB</tspan></text>
      ` : `
      <rect x="36" y="225" width="272" height="36" rx="8" fill="#0f172a" />
      <text x="172" y="248" fill="#64748b" font-family="monospace" font-size="12" text-anchor="middle">Waiting for learner speech...</text>
      `}
    </g>
  </g>

  <!-- Live 16kHz Audio Waveform Bar across bottom -->
  <g transform="translate(180, 615)">
    <rect x="-20" y="-12" width="960" height="54" rx="14" fill="#0b1120" stroke="#334155" stroke-width="1" />
    <text x="0" y="20" fill="#06b6d4" font-family="monospace" font-size="11" font-weight="bold">16kHz PCM MONO</text>
    <g transform="translate(160, 16)">
      ${bars.map((h, i) => `
        <rect x="${i * 24}" y="${-h / 2}" width="8" height="${h}" rx="4" fill="${isListening ? '#38bdf8' : '#334155'}" />
      `).join('')}
    </g>
    <text x="910" y="20" fill="#64748b" font-family="monospace" font-size="10" text-anchor="end">BUFFER: 3200 SAMPLES</text>
  </g>
</svg>
  `;
}

// ---------------------------------------------------------------------------
// 2. ReadHub Full-Stack Web Application Generator
// ---------------------------------------------------------------------------
function renderReadHubFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Interaction timing:
  // 0..4s: Browse catalog, cursor glides to "Clean Architecture"
  // 4..8s: Click "Borrow", JWT Auth Modal appears & verifies
  // 8..12s: State transitions from AVAILABLE to BORROWED, ShedLock cron confirmed
  
  const isModalOpen = t >= 4.0 && t < 8.2;
  const isBorrowed = t >= 8.2;

  // Simulated cursor coordinates
  let cursorX = 850;
  let cursorY = 120;
  if (t < 3.5) {
    const cp = easeInOutQuad(t / 3.5);
    cursorX = 850 - cp * 480; // moves to book card
    cursorY = 120 + cp * 260;
  } else if (t < 4.5) {
    cursorX = 370;
    cursorY = 380;
  } else if (t < 7.5) {
    cursorX = 640;
    cursorY = 460; // Confirm button in modal
  } else {
    cursorX = 980;
    cursorY = 240;
  }

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="readhubBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#18181b" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#readhubBg)" />

  <!-- Modern Browser Window Chrome -->
  <g transform="translate(36, 24)">
    <rect x="0" y="0" width="1208" height="672" rx="20" fill="#09090b" stroke="#27272a" stroke-width="2" />
    
    <!-- Titlebar & Traffic Lights -->
    <rect x="0" y="0" width="1208" height="48" rx="20" fill="#18181b" />
    <circle cx="28" cy="24" r="6" fill="#ef4444" />
    <circle cx="48" cy="24" r="6" fill="#f59e0b" />
    <circle cx="68" cy="24" r="6" fill="#10b981" />

    <!-- Browser URL Bar -->
    <rect x="240" y="10" width="728" height="28" rx="8" fill="#09090b" stroke="#3f3f46" stroke-width="1" />
    <text x="260" y="28" fill="#10b981" font-family="monospace" font-size="11">https://</text>
    <text x="315" y="28" fill="#f4f4f5" font-family="monospace" font-size="11">readhub-three.vercel.app/catalog</text>
    <text x="940" y="28" fill="#71717a" font-family="monospace" font-size="11" text-anchor="end">SSL 256-BIT</text>

    <!-- Application Navigation Bar -->
    <g transform="translate(32, 68)">
      <rect x="0" y="0" width="1144" height="56" rx="12" fill="#18181b" stroke="#27272a" stroke-width="1" />
      <text x="24" y="34" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold">ReadHub</text>
      <text x="110" y="34" fill="#71717a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">Library Management System</text>

      <!-- Search Box -->
      <rect x="360" y="12" width="400" height="32" rx="8" fill="#09090b" stroke="#3f3f46" stroke-width="1" />
      <text x="380" y="32" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Search catalog by title, author, ISBN...</text>

      <!-- User Role Pill -->
      <rect x="910" y="12" width="210" height="32" rx="8" fill="#0369a1" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1" />
      <text x="1015" y="32" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">ROLE: STUDENT • JWT VALID</text>
    </g>

    <!-- Main Catalog View -->
    <g transform="translate(32, 144)">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <!-- SVG Native Grid -->
      </div>
      <text x="0" y="24" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="bold">Campus Textbook Reserves</text>
      <text x="0" y="46" fill="#71717a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">Spring Boot 3 REST API + MySQL + ShedLock Synchronization</text>

      <!-- 3 Book Cards -->
      <!-- Book Card 1: Clean Architecture (Target) -->
      <g transform="translate(0, 70)">
        <rect x="0" y="0" width="360" height="380" rx="16" fill="#18181b" stroke="${t > 1.5 && t < 4.5 ? '#38bdf8' : '#27272a'}" stroke-width="${t > 1.5 && t < 4.5 ? 2.5 : 1}" />
        <rect x="20" y="20" width="320" height="180" rx="10" fill="#09090b" />
        <text x="180" y="100" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">Clean Architecture</text>
        <text x="180" y="128" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" text-anchor="middle">Robert C. Martin</text>

        <!-- Status Badge -->
        <rect x="20" y="220" width="130" height="28" rx="6" fill="${isBorrowed ? '#f59e0b' : '#10b981'}" fill-opacity="0.2" stroke="${isBorrowed ? '#f59e0b' : '#10b981'}" stroke-width="1" />
        <text x="85" y="238" fill="${isBorrowed ? '#fbbf24' : '#34d399'}" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">
          ${isBorrowed ? 'BORROWED (14D)' : 'AVAILABLE'}
        </text>
        <text x="170" y="238" fill="#71717a" font-family="monospace" font-size="11">ISBN: 978-0134494166</text>

        <!-- Action Button -->
        <rect x="20" y="270" width="320" height="44" rx="8" fill="${isBorrowed ? '#27272a' : '#0284c7'}" />
        <text x="180" y="297" fill="${isBorrowed ? '#71717a' : '#ffffff'}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
          ${isBorrowed ? 'Currently Checked Out' : 'Borrow Book'}
        </text>

        <text x="20" y="345" fill="#71717a" font-family="monospace" font-size="10">API: POST /api/v1/borrows (JWT Auth)</text>
      </g>

      <!-- Book Card 2: Designing Data-Intensive Applications -->
      <g transform="translate(390, 70)">
        <rect x="0" y="0" width="360" height="380" rx="16" fill="#18181b" stroke="#27272a" stroke-width="1" />
        <rect x="20" y="20" width="320" height="180" rx="10" fill="#09090b" />
        <text x="180" y="90" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Designing Data-Intensive</text>
        <text x="180" y="114" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Applications</text>
        <text x="180" y="140" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" text-anchor="middle">Martin Kleppmann</text>

        <rect x="20" y="220" width="130" height="28" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1" />
        <text x="85" y="238" fill="#34d399" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">AVAILABLE</text>
        
        <rect x="20" y="270" width="320" height="44" rx="8" fill="#0284c7" />
        <text x="180" y="297" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Borrow Book</text>
      </g>

      <!-- Right Dashboard Analytics Sidebar -->
      <g transform="translate(780, 70)">
        <rect x="0" y="0" width="364" height="380" rx="16" fill="#18181b" stroke="#27272a" stroke-width="1" />
        <text x="24" y="36" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="bold">System Health &amp; Analytics</text>
        
        <g transform="translate(24, 60)">
          <rect x="0" y="0" width="316" height="56" rx="8" fill="#09090b" stroke="#27272a" stroke-width="1" />
          <text x="16" y="24" fill="#a1a1aa" font-family="monospace" font-size="11">ACTIVE CHECKOUTS</text>
          <text x="16" y="46" fill="#38bdf8" font-family="monospace" font-size="18" font-weight="bold">${isBorrowed ? '13 Books' : '12 Books'}</text>
        </g>

        <g transform="translate(24, 130)">
          <rect x="0" y="0" width="316" height="56" rx="8" fill="#09090b" stroke="#27272a" stroke-width="1" />
          <text x="16" y="24" fill="#a1a1aa" font-family="monospace" font-size="11">DATABASE STORAGE</text>
          <text x="16" y="46" fill="#10b981" font-family="monospace" font-size="18" font-weight="bold">MySQL 8.0 Connected</text>
        </g>

        <g transform="translate(24, 200)">
          <rect x="0" y="0" width="316" height="56" rx="8" fill="#09090b" stroke="#27272a" stroke-width="1" />
          <text x="16" y="24" fill="#a1a1aa" font-family="monospace" font-size="11">SHEDLOCK CRON SYNC</text>
          <text x="16" y="46" fill="#f59e0b" font-family="monospace" font-size="18" font-weight="bold">Lock: 0 Replicas Duplicated</text>
        </g>

        <g transform="translate(24, 270)">
          <rect x="0" y="0" width="316" height="85" rx="8" fill="#09090b" stroke="#27272a" stroke-width="1" />
          <text x="16" y="24" fill="#a1a1aa" font-family="monospace" font-size="11">DEPLOYMENT RUNTIME</text>
          <text x="16" y="46" fill="#f4f4f5" font-family="monospace" font-size="13">Docker Compose • Nginx Proxy</text>
          <text x="16" y="68" fill="#38bdf8" font-family="monospace" font-size="11">Spring Boot 3.2 • Java 17</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Borrowing Confirmation Modal Pop-Up (Phase 2: 4.0s - 8.2s) -->
  ${isModalOpen ? `
  <g transform="translate(390, 180)">
    <rect x="-10" y="-10" width="520" height="340" rx="20" fill="#09090b" fill-opacity="0.95" stroke="#38bdf8" stroke-width="2" filter="url(#glow)" />
    <text x="250" y="40" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Confirm Book Checkout</text>
    <text x="250" y="70" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" text-anchor="middle">Verifying JWT Bearer Token Signature...</text>

    <!-- Token Verification Box -->
    <rect x="40" y="95" width="420" height="70" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1" />
    <text x="60" y="125" fill="#38bdf8" font-family="monospace" font-size="12">AUTH: Bearer eyJhbGciOiJIUzI1NiJ9...</text>
    <text x="60" y="148" fill="#34d399" font-family="monospace" font-size="12">STATUS: ROLE_STUDENT VALIDATED (200 OK)</text>

    <text x="250" y="205" fill="#f4f4f5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" text-anchor="middle">Checkout "Clean Architecture" for 14 Days?</text>

    <!-- Confirm Button -->
    <rect x="130" y="235" width="240" height="48" rx="10" fill="#0284c7" />
    <text x="250" y="265" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Confirm Checkout</text>
  </g>
  ` : ''}

  <!-- Simulated Animated Cursor -->
  <g transform="translate(${cursorX}, ${cursorY})">
    <polygon points="0,0 0,22 6,17 12,28 16,26 10,15 18,15" fill="#f4f4f5" stroke="#09090b" stroke-width="1.5" />
  </g>
</svg>
  `;
}

// ---------------------------------------------------------------------------
// 3. DaloyAqua Agricultural Telemetry Dashboard Generator
// ---------------------------------------------------------------------------
function renderDaloyAquaFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Timing:
  // 0..4s: Telemetry ingestion (moisture, temp, rain)
  // 4..8s: Threshold breach & Pydantic validation -> Crop Risk Alert
  // 8..12s: Outbound SMS broadcast to 142 Baleno farmers
  
  const isAlertState = t >= 4.0;
  const isDispatching = t >= 7.5;

  const moisture = Math.round(62 + Math.sin(t * 3) * 6);
  const rain = (14.2 + (isAlertState ? Math.sin(t * 4) * 4 + 4 : Math.sin(t * 2) * 2)).toFixed(1);
  const smsCount = isDispatching ? Math.min(142, Math.round((t - 7.5) * 45)) : 0;

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="daloyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#04131d" />
      <stop offset="100%" stop-color="#082333" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#daloyBg)" />

  <g transform="translate(36, 24)">
    <rect x="0" y="0" width="1208" height="672" rx="20" fill="#071b26" stroke="#0e374d" stroke-width="2" />
    
    <!-- Top Telemetry Header -->
    <rect x="0" y="0" width="1208" height="60" rx="20" fill="#0a2636" />
    <circle cx="36" cy="30" r="10" fill="#14b8a6" />
    <text x="60" y="36" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold">DALOYAQUA // BALENO AGRI-TELEMETRY CONSOLE</text>
    <text x="520" y="36" fill="#5eead4" font-family="monospace" font-size="12">STATION 04: BALENO, MASBATE (12.448°N, 123.487°E)</text>
    
    <rect x="1010" y="16" width="160" height="28" rx="6" fill="#042f2e" stroke="#14b8a6" stroke-width="1" />
    <circle cx="1025" cy="30" r="4" fill="#2dd4bf" />
    <text x="1038" y="34" fill="#2dd4bf" font-family="monospace" font-size="11" font-weight="bold">TELEMETRY LIVE</text>

    <!-- Main Dashboard Grid -->
    <g transform="translate(28, 80)">
      <!-- Metric Card 1: Soil Moisture -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="360" height="210" rx="14" fill="#092230" stroke="#0e374d" stroke-width="1.5" />
        <text x="24" y="34" fill="#99f6e4" font-family="monospace" font-size="12">SOIL MOISTURE (10CM DEPTH)</text>
        <text x="24" y="90" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="bold">${moisture}%</text>
        <text x="160" y="90" fill="#2dd4bf" font-family="monospace" font-size="14">SATURATED</text>
        
        <!-- Wave Spline -->
        <path d="M 24 160 Q 90 ${130 + Math.sin(t*3)*20}, 160 150 T 260 145 T 336 155" fill="none" stroke="#2dd4bf" stroke-width="3" />
        <text x="24" y="190" fill="#5eead4" font-family="monospace" font-size="10">PYDANTIC VALIDATED • APSCHEDULER CRON</text>
      </g>

      <!-- Metric Card 2: Rainfall Rate -->
      <g transform="translate(390, 0)">
        <rect x="0" y="0" width="360" height="210" rx="14" fill="#092230" stroke="${isAlertState ? '#f59e0b' : '#0e374d'}" stroke-width="${isAlertState ? 2.5 : 1.5}" />
        <text x="24" y="34" fill="${isAlertState ? '#fbbf24' : '#99f6e4'}" font-family="monospace" font-size="12">HOURLY PRECIPITATION (MONSOON)</text>
        <text x="24" y="90" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="bold">${rain} <tspan font-size="24">mm/h</tspan></text>
        <text x="24" y="125" fill="${isAlertState ? '#fbbf24' : '#2dd4bf'}" font-family="monospace" font-size="13" font-weight="bold">
          ${isAlertState ? 'CRITICAL THRESHOLD EXCEEDED (>15mm)' : 'NORMAL OPERATIONAL RANGE'}
        </text>

        <!-- Bar chart -->
        <g transform="translate(24, 145)">
          ${[12, 14, 15, 18, 22, 26, 28, 30].map((h, i) => `
            <rect x="${i * 38}" y="${40 - h}" width="24" height="${h}" rx="3" fill="${i > 4 && isAlertState ? '#f59e0b' : '#2dd4bf'}" />
          `).join('')}
        </g>
      </g>

      <!-- Metric Card 3: Crop Phenology Stage -->
      <g transform="translate(780, 0)">
        <rect x="0" y="0" width="372" height="210" rx="14" fill="#092230" stroke="#0e374d" stroke-width="1.5" />
        <text x="24" y="34" fill="#99f6e4" font-family="monospace" font-size="12">CROP PHENOLOGICAL MATRIX</text>
        <text x="24" y="70" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="bold">Rice (Oryza sativa)</text>
        <text x="24" y="95" fill="#5eead4" font-family="monospace" font-size="13">Flowering &amp; Grain Filling Stage</text>
        
        <rect x="24" y="120" width="324" height="60" rx="8" fill="#071b26" stroke="#0e374d" stroke-width="1" />
        <text x="40" y="145" fill="#99f6e4" font-family="monospace" font-size="11">WATERLOGGING TOLERANCE: <tspan fill="#f87171" font-weight="bold">LOW (CRITICAL)</tspan></text>
        <text x="40" y="165" fill="#94a3b8" font-family="monospace" font-size="11">Automated advisory triggered for farmers</text>
      </g>

      <!-- Bottom Panel: Outbound SMS Dispatch Engine (Twilio / SMS Gateway) -->
      <g transform="translate(0, 230)">
        <rect x="0" y="0" width="1152" height="320" rx="16" fill="#092230" stroke="#0e374d" stroke-width="1.5" />
        <text x="28" y="38" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="bold">
          Automated Emergency Farmer SMS Broadcast Pipeline
        </text>
        <text x="28" y="62" fill="#5eead4" font-family="monospace" font-size="12">
          FastAPI Async Task Queue • 20 SMS/sec High-Throughput Dispatch
        </text>

        <!-- Message Preview Box -->
        <rect x="28" y="86" width="680" height="190" rx="12" fill="#04131d" stroke="#0e374d" stroke-width="1" />
        <text x="48" y="120" fill="#fbbf24" font-family="monospace" font-size="13" font-weight="bold">
          [DALOYAQUA ADVISORY - BALENO, MASBATE]
        </text>
        <text x="48" y="150" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15">
          "PABALITA SA MAGSASAKA: Mataas ang banta ng pagbaha dahil sa tuloy-tuloy
        </text>
        <text x="48" y="174" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15">
          na ulan (18mm/h). Buksan agad ang drainage canals sa palayan upang
        </text>
        <text x="48" y="198" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15">
          maiwasan ang pagkasira ng namumulaklak na palay."
        </text>
        <text x="48" y="245" fill="#5eead4" font-family="monospace" font-size="11">
          ENCODING: GSM 7-BIT (148 CHARACTERS) • PRIORITY: URGENT
        </text>

        <!-- Real-Time Dispatch Counter Gauge -->
        <g transform="translate(740, 86)">
          <rect x="0" y="0" width="384" height="190" rx="12" fill="#04131d" stroke="#0e374d" stroke-width="1" />
          <text x="24" y="34" fill="#99f6e4" font-family="monospace" font-size="12">OUTBOUND SMS QUEUE DISPATCH</text>
          
          <text x="24" y="85" fill="#f0fdfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="bold">
            ${smsCount} <tspan font-size="20" fill="#94a3b8">/ 142 Sent</tspan>
          </text>

          <!-- Progress Bar -->
          <rect x="24" y="110" width="336" height="12" rx="6" fill="#0e374d" />
          <rect x="24" y="110" width="${(smsCount / 142) * 336}" height="12" rx="6" fill="#10b981" />

          <text x="24" y="155" fill="${smsCount === 142 ? '#34d399' : '#38bdf8'}" font-family="monospace" font-size="12" font-weight="bold">
            ${smsCount === 142 ? 'BROADCAST COMPLETE (100% DELIVERED)' : (isDispatching ? 'STREAMING AT 20 SMS/SEC...' : 'QUEUE READY')}
          </text>
        </g>
      </g>
    </g>
  </g>
</svg>
  `;
}

// ---------------------------------------------------------------------------
// 4. Gordon RamsAi Nutrition Chatbot Generator
// ---------------------------------------------------------------------------
function renderGordonRamsAiFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Timing:
  // 0..3.5s: User prompt typed character by character
  // 3.5..7.0s: ChromaDB vector retrieval chunks
  // 7.0..12.0s: Gemini streaming meal recipe & Gordon Ramsay critique

  const fullPrompt = "High-protein Filipino dinner under 600 calories.";
  const typedLen = Math.min(fullPrompt.length, Math.round((t / 3.2) * fullPrompt.length));
  const currentPrompt = fullPrompt.substring(0, typedLen);

  const isRetrieving = t >= 3.2 && t < 6.8;
  const isStreaming = t >= 6.8;

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ramsaiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ramsaiBg)" />

  <g transform="translate(36, 24)">
    <rect x="0" y="0" width="1208" height="672" rx="20" fill="#0e1117" stroke="#30363d" stroke-width="2" />
    
    <!-- Browser Header with Streamlit Crown -->
    <rect x="0" y="0" width="1208" height="48" rx="20" fill="#161b22" />
    <circle cx="28" cy="24" r="6" fill="#ff4b4b" />
    <circle cx="48" cy="24" r="6" fill="#f59e0b" />
    <circle cx="68" cy="24" r="6" fill="#10b981" />

    <rect x="240" y="10" width="728" height="28" rx="8" fill="#0e1117" stroke="#30363d" stroke-width="1" />
    <polygon points="260,17 266,28 254,28" fill="#ff4b4b" />
    <text x="274" y="28" fill="#f0f6fc" font-family="monospace" font-size="11">gordon-ramsai.streamlit.app</text>
    <text x="940" y="28" fill="#8b949e" font-family="monospace" font-size="11" text-anchor="end">STREAMLIT • GEMINI 1.5 PRO</text>

    <!-- App Body: Left Sidebar (Streamlit Sidebar) & Main Chat Container -->
    <!-- Left Sidebar -->
    <g transform="translate(24, 68)">
      <rect x="0" y="0" width="280" height="580" rx="14" fill="#161b22" stroke="#30363d" stroke-width="1" />
      <text x="20" y="32" fill="#ff4b4b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold">Gordon RamsAi</text>
      <text x="20" y="52" fill="#8b949e" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">AI Nutritionist &amp; Macro Coach</text>

      <!-- Sidebar Controls -->
      <g transform="translate(20, 80)">
        <text x="0" y="16" fill="#f0f6fc" font-family="monospace" font-size="11">TARGET DAILY CALORIES</text>
        <rect x="0" y="26" width="240" height="34" rx="6" fill="#0e1117" stroke="#30363d" stroke-width="1" />
        <text x="16" y="48" fill="#58a6ff" font-family="monospace" font-size="14" font-weight="bold">2,200 kcal</text>
      </g>

      <g transform="translate(20, 160)">
        <text x="0" y="16" fill="#f0f6fc" font-family="monospace" font-size="11">DIETARY PREFERENCE</text>
        <rect x="0" y="26" width="240" height="34" rx="6" fill="#0e1117" stroke="#30363d" stroke-width="1" />
        <text x="16" y="48" fill="#f0f6fc" font-family="monospace" font-size="13">High Protein (Filipino)</text>
      </g>

      <g transform="translate(20, 240)">
        <text x="0" y="16" fill="#f0f6fc" font-family="monospace" font-size="11">CHROMADB VECTOR STORE</text>
        <rect x="0" y="26" width="240" height="54" rx="6" fill="#0e1117" stroke="#30363d" stroke-width="1" />
        <text x="16" y="46" fill="#3fb950" font-family="monospace" font-size="12" font-weight="bold">2,400 Food Items</text>
        <text x="16" y="66" fill="#8b949e" font-family="monospace" font-size="10">Cosine Similarity Index: OK</text>
      </g>

      <g transform="translate(20, 330)">
        <text x="0" y="16" fill="#f0f6fc" font-family="monospace" font-size="11">LANGFUSE OBSERVABILITY</text>
        <rect x="0" y="26" width="240" height="54" rx="6" fill="#0e1117" stroke="#30363d" stroke-width="1" />
        <text x="16" y="46" fill="#d29922" font-family="monospace" font-size="12" font-weight="bold">Latency: 84ms</text>
        <text x="16" y="66" fill="#8b949e" font-family="monospace" font-size="10">Traced: 1.2k generation tokens</text>
      </g>
    </g>

    <!-- Main Chat Window Area -->
    <g transform="translate(328, 68)">
      <rect x="0" y="0" width="856" height="500" rx="14" fill="#0e1117" stroke="#30363d" stroke-width="1" />

      <!-- User Chat Bubble -->
      <g transform="translate(240, 24)">
        <rect x="0" y="0" width="590" height="50" rx="14" fill="#1f6feb" />
        <text x="20" y="31" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500">
          ${currentPrompt}
        </text>
      </g>

      ${isRetrieving ? `
      <!-- ChromaDB Retrieval Animation -->
      <g transform="translate(30, 95)">
        <rect x="0" y="0" width="600" height="85" rx="12" fill="#161b22" stroke="#58a6ff" stroke-width="1" />
        <circle cx="28" cy="24" r="8" fill="#58a6ff" />
        <text x="46" y="28" fill="#58a6ff" font-family="monospace" font-size="12" font-weight="bold">QUERYING CHROMADB LOCAL RAG VECTOR DB...</text>
        <text x="28" y="55" fill="#f0f6fc" font-family="monospace" font-size="11">Retrieved: [1] Bangus Belly Inihaw (94%)  [2] Pinakbet Tagalog (91%)  [3] Brown Rice (89%)</text>
        <text x="28" y="72" fill="#8b949e" font-family="monospace" font-size="10">Grounding response against custom nutritional vector chunks...</text>
      </g>
      ` : ''}

      ${isStreaming ? `
      <!-- Gordon RamsAi Response Card -->
      <g transform="translate(30, 95)">
        <rect x="0" y="0" width="800" height="380" rx="16" fill="#161b22" stroke="#30363d" stroke-width="1" />
        
        <!-- Chef Avatar & Header -->
        <circle cx="36" cy="36" r="18" fill="#ff4b4b" />
        <text x="36" y="42" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">GR</text>
        <text x="68" y="32" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold">Gordon RamsAi</text>
        <text x="68" y="48" fill="#3fb950" font-family="monospace" font-size="11">GROUNDED WITH CHROMADB RAG • GOOGLE GEMINI 1.5</text>

        <!-- Macro Breakdown Badges -->
        <g transform="translate(24, 75)">
          <rect x="0" y="0" width="170" height="42" rx="8" fill="#238636" fill-opacity="0.2" stroke="#2ea043" stroke-width="1" />
          <text x="14" y="26" fill="#3fb950" font-family="monospace" font-size="13" font-weight="bold">PROTEIN: 48g</text>

          <rect x="185" y="0" width="170" height="42" rx="8" fill="#1f6feb" fill-opacity="0.2" stroke="#388bfd" stroke-width="1" />
          <text x="200" y="26" fill="#58a6ff" font-family="monospace" font-size="13" font-weight="bold">CARBS: 52g</text>

          <rect x="370" y="0" width="170" height="42" rx="8" fill="#d29922" fill-opacity="0.2" stroke="#e3b341" stroke-width="1" />
          <text x="385" y="26" fill="#d29922" font-family="monospace" font-size="13" font-weight="bold">FAT: 12g</text>

          <rect x="555" y="0" width="190" height="42" rx="8" fill="#da3633" fill-opacity="0.2" stroke="#f85149" stroke-width="1" />
          <text x="570" y="26" fill="#f85149" font-family="monospace" font-size="13" font-weight="bold">TOTAL: 508 KCAL</text>
        </g>

        <!-- Recommended Meal Plan -->
        <g transform="translate(24, 140)">
          <text x="0" y="20" fill="#f0f6fc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="bold">Grounded Meal Recommendation:</text>
          <text x="0" y="48" fill="#e6edf3" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">• Inihaw na Bangus (Grilled Milkfish, 200g) — Clean omega-3 and 40g lean protein</text>
          <text x="0" y="72" fill="#e6edf3" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">• Steamed Pinakbet Tagalog (Bittermelon, Squash, Okra) — Micronutrients &amp; dietary fiber</text>
          <text x="0" y="96" fill="#e6edf3" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">• 1 cup Steamed Brown Rice — Complex low-glycemic glycogen replenishment</text>

          <!-- Ramsay Critique Quote -->
          <rect x="0" y="125" width="750" height="85" rx="10" fill="#0e1117" stroke="#ff4b4b" stroke-opacity="0.5" stroke-width="1" />
          <text x="20" y="155" fill="#f0f6fc" font-family="Georgia, serif" font-style="italic" font-size="14">
            "Listen to me! Inihaw na Bangus with Pinakbet gives you 48 grams of pure, honest protein
          </text>
          <text x="20" y="177" fill="#f0f0fc" font-family="Georgia, serif" font-style="italic" font-size="14">
            without drowning in heavy takeaway oil. Absolutely spot-on nutrition. Now go eat!"
          </text>
          <text x="20" y="198" fill="#ff4b4b" font-family="monospace" font-size="10" font-weight="bold">— CHEF RAMSAY NUTRITION VERDICT</text>
        </g>
      </g>
      ` : ''}

      <!-- Bottom Chat Input Field -->
      <g transform="translate(24, 515)">
        <rect x="0" y="0" width="808" height="44" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" />
        <text x="20" y="27" fill="${t < 3.2 ? '#f0f6fc' : '#8b949e'}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">
          ${t < 3.2 ? currentPrompt + (Math.floor(t * 3) % 2 === 0 ? '|' : '') : 'Ask Gordon RamsAi about meal prep, macros, or recipes...'}
        </text>
        <circle cx="780" cy="22" r="14" fill="#ff4b4b" />
        <polygon points="776,16 786,22 776,28" fill="#ffffff" />
      </g>
    </g>
  </g>
</svg>
  `;
}

// ---------------------------------------------------------------------------
// Encoding Engine: sharp SVG -> PNG buffer piped into ffmpeg stdin
// ---------------------------------------------------------------------------
async function encodeVideo(slug, frameRenderer, outputVideoPath, outputPosterPath) {
  console.log(`\n======================================================`);
  console.log(`Generating Realistic UI Walkthrough Video for: ${slug}`);
  console.log(`Resolution: ${WIDTH}x${HEIGHT} @ ${FPS}fps (${DURATION_SEC}s = ${TOTAL_FRAMES} frames)`);
  console.log(`Output Video: ${outputVideoPath}`);

  // 1. Generate & Save Poster Image (< 80 KB WebP) from frame at 2.0s
  const posterSvg = frameRenderer(Math.round(FPS * 2.0));
  await sharp(Buffer.from(posterSvg))
    .webp({ quality: 85 })
    .toFile(outputPosterPath);
  console.log(`  Saved Poster: ${outputPosterPath} (${fs.statSync(outputPosterPath).size} bytes)`);

  // 2. Spawn ffmpeg with stdin pipe
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(FFMPEG_BIN, [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'png',
      '-r', String(FPS),
      '-i', '-',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '22',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      outputVideoPath
    ]);

    ffmpeg.stderr.on('data', () => {
      // suppress verbose logs, keep stderr quiet unless error
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        const stats = fs.statSync(outputVideoPath);
        console.log(`  Rendered MP4: ${outputVideoPath} (${(stats.size / 1024).toFixed(1)} KB)`);
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });

    ffmpeg.stdin.on('error', (err) => {
      console.error('ffmpeg stdin error:', err);
    });

    // Write all frames sequentially
    (async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const svg = frameRenderer(i);
        const pngBuf = await sharp(Buffer.from(svg)).png().toBuffer();
        if (!ffmpeg.stdin.write(pngBuf)) {
          await new Promise((r) => ffmpeg.stdin.once('drain', r));
        }
      }
      ffmpeg.stdin.end();
    })().catch(reject);
  });
}

// ---------------------------------------------------------------------------
// Main Pipeline
// ---------------------------------------------------------------------------
async function main() {
  fs.mkdirSync('public/videos', { recursive: true });
  fs.mkdirSync('public/images/projects', { recursive: true });

  await encodeVideo(
    'playit',
    renderPlayItFrame,
    'public/videos/playit.mp4',
    'public/images/projects/playit-poster.webp'
  );

  await encodeVideo(
    'readhub',
    renderReadHubFrame,
    'public/videos/readhub.mp4',
    'public/images/projects/readhub-poster.webp'
  );

  await encodeVideo(
    'daloyaqua',
    renderDaloyAquaFrame,
    'public/videos/daloyaqua.mp4',
    'public/images/projects/daloyaqua-poster.webp'
  );

  await encodeVideo(
    'gordon-ramsai',
    renderGordonRamsAiFrame,
    'public/videos/gordon-ramsai.mp4',
    'public/images/projects/gordon-ramsai-poster.webp'
  );

  console.log('\nAll 4 Realistic UI Product Walkthrough Videos generated successfully!');
}

main().catch((err) => {
  console.error('Video generation failed:', err);
  process.exit(1);
});
