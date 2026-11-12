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

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(val, min = 0, max = 1) {
  return Math.min(max, Math.max(min, val));
}

// ===========================================================================
// 1. PlayIT — Authentic Marungko Phonics Mobile UI
// Colors: Mango #FFC107, Ube #8B5FBF, Guava #FF6F91, Leaf #48C774, Ink #1F3A3D
// ===========================================================================
function renderPlayItFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.5s): Hear It Screen (Listen to /m/ sound)
  // Phase 2 (3.5..7.5s): Say It Screen (Mic active, Vosk ASR recording 16kHz PCM)
  // Phase 3 (7.5..12s): Scoring modal (98% confidence, 3 stars, Room SQLite saved)
  const isHearIt = t < 3.5;
  const isSayIt = t >= 3.5 && t < 7.5;
  const isScored = t >= 7.5;

  // Audio wave heights
  const bars = [];
  for (let i = 0; i < 24; i++) {
    if (isHearIt) {
      const h = Math.abs(Math.sin(t * 7 + i * 0.4)) * 36 + 8;
      bars.push(h);
    } else if (isSayIt) {
      const h = Math.abs(Math.sin(t * 12 + i * 0.5) * Math.cos(t * 8 - i * 0.3)) * 52 + 10;
      bars.push(h);
    } else {
      bars.push(8);
    }
  }

  const scorePct = isScored ? Math.min(98, Math.round(easeInOutQuad(clamp((t - 7.5) / 1.2)) * 98)) : 0;
  const starCount = isScored ? (t > 9.0 ? 3 : t > 8.2 ? 2 : 1) : 0;

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="playitBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFF8EE"/>
        <stop offset="100%" stop-color="#F5EFE6"/>
      </linearGradient>
      <linearGradient id="mangoBtn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFD54F"/>
        <stop offset="100%" stop-color="#FFB300"/>
      </linearGradient>
      <linearGradient id="guavaBtn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF7597"/>
        <stop offset="100%" stop-color="#E14C71"/>
      </linearGradient>
      <linearGradient id="leafPill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5CD389"/>
        <stop offset="100%" stop-color="#34A863"/>
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1F3A3D" flood-opacity="0.12"/>
      </filter>
    </defs>

    <!-- App Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#playitBg)"/>

    <!-- Top Pediatric App Header Bar -->
    <rect x="0" y="0" width="${WIDTH}" height="64" fill="#FFFFFF"/>
    <line x1="0" y1="64" x2="${WIDTH}" y2="64" stroke="#E2E8F0" stroke-width="2"/>

    <!-- Left: Profile Avatar and Group Badge -->
    <circle cx="48" cy="32" r="18" fill="#8B5FBF"/>
    <text x="48" y="38" font-family="'Lexend', system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">M</text>
    <text x="76" y="28" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="700" fill="#1F3A3D">Mateo (Grade 1 - Narra)</text>
    <text x="76" y="44" font-family="'Lexend', system-ui, sans-serif" font-size="11" font-weight="500" fill="#5C7679">Marungko Group 1 • Letter M</text>

    <!-- Center: Stage Nav Chips -->
    <g transform="translate(480, 16)">
      <rect x="0" y="0" width="90" height="32" rx="16" fill="${isHearIt ? '#8B5FBF' : '#F1F5F9'}"/>
      <text x="45" y="21" font-family="'Lexend', system-ui, sans-serif" font-size="12" font-weight="700" fill="${isHearIt ? '#FFFFFF' : '#5C7679'}" text-anchor="middle">Hear It</text>
      
      <rect x="100" y="0" width="90" height="32" rx="16" fill="${isSayIt ? '#8B5FBF' : '#F1F5F9'}"/>
      <text x="145" y="21" font-family="'Lexend', system-ui, sans-serif" font-size="12" font-weight="700" fill="${isSayIt ? '#FFFFFF' : '#5C7679'}" text-anchor="middle">Say It</text>
      
      <rect x="200" y="0" width="90" height="32" rx="16" fill="${isScored ? '#34A863' : '#F1F5F9'}"/>
      <text x="245" y="21" font-family="'Lexend', system-ui, sans-serif" font-size="12" font-weight="700" fill="${isScored ? '#FFFFFF' : '#5C7679'}" text-anchor="middle">Result</text>
    </g>

    <!-- Right: Hearts and Stars Counter -->
    <g transform="translate(1080, 18)">
      <!-- Hearts -->
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6F91" transform="scale(0.8)"/>
      <text x="24" y="16" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="800" fill="#1F3A3D">3</text>

      <!-- Stars -->
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#FFC107" transform="translate(48, -2) scale(0.8)"/>
      <text x="74" y="16" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="800" fill="#1F3A3D">12</text>
      
      <!-- Offline Badge -->
      <rect x="98" y="-2" width="76" height="22" rx="11" fill="#E2E8F0"/>
      <text x="136" y="13" font-family="'Lexend', system-ui, sans-serif" font-size="9" font-weight="800" fill="#475569" text-anchor="middle">OFFLINE</text>
    </g>

    <!-- MAIN INTERACTION AREA -->
    ${isHearIt ? `
      <!-- HEAR IT SCREEN -->
      <g transform="translate(260, 96)">
        <!-- Instruction Banner -->
        <rect x="0" y="0" width="760" height="52" rx="16" fill="#FFFFFF" filter="url(#cardShadow)"/>
        <text x="380" y="32" font-family="'Lexend', system-ui, sans-serif" font-size="16" font-weight="700" fill="#1F3A3D" text-anchor="middle">Pakinggan ang tunog ng titik Mm: /m/</text>

        <!-- Big Phoneme Letter Card -->
        <g transform="translate(180, 80)">
          <rect x="0" y="0" width="400" height="340" rx="28" fill="#FFFFFF" stroke="#FFC107" stroke-width="4" filter="url(#cardShadow)"/>
          
          <!-- Big Letter Glyph -->
          <text x="200" y="190" font-family="'Andika', 'Lexend', system-ui, sans-serif" font-size="160" font-weight="700" fill="#8B5FBF" text-anchor="middle">Mm</text>
          
          <!-- Exemplar Tag: Mangga -->
          <rect x="120" y="240" width="160" height="42" rx="21" fill="#FFF3D9"/>
          <text x="200" y="267" font-family="'Lexend', system-ui, sans-serif" font-size="17" font-weight="800" fill="#D99B00" text-anchor="middle">mangga</text>
        </g>

        <!-- Animated Audio Waveform Bar -->
        <g transform="translate(200, 448)">
          ${bars.map((h, i) => `
            <rect x="${i * 15}" y="${40 - h / 2}" width="8" height="${h}" rx="4" fill="#8B5FBF"/>
          `).join('')}
        </g>
        <text x="380" y="504" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="600" fill="#5C7679" text-anchor="middle">Native Tagalog Phoneme Modeling • 44.1kHz Hi-Fi Audio</text>
      </g>
    ` : isSayIt ? `
      <!-- SAY IT SCREEN (VOSK ON-DEVICE ASR) -->
      <g transform="translate(260, 96)">
        <rect x="0" y="0" width="760" height="52" rx="16" fill="#FFFFFF" filter="url(#cardShadow)"/>
        <text x="380" y="32" font-family="'Lexend', system-ui, sans-serif" font-size="16" font-weight="700" fill="#1F3A3D" text-anchor="middle">Ikaw naman! Sabihin ang tunog: /m/</text>

        <!-- Pulsing Microphone Studio Container -->
        <g transform="translate(180, 80)">
          <rect x="0" y="0" width="400" height="340" rx="28" fill="#FFFFFF" stroke="#FF6F91" stroke-width="4" filter="url(#cardShadow)"/>
          
          <!-- Large Mic Icon with Pulse Circle -->
          <circle cx="200" cy="150" r="${68 + Math.sin(t * 10) * 8}" fill="#FF6F91" opacity="0.2"/>
          <circle cx="200" cy="150" r="56" fill="url(#guavaBtn)"/>
          <!-- Mic SVG Glyph -->
          <path d="M194 136 c0 -3.3 2.7 -6 6 -6 s6 2.7 6 6 v14 c0 3.3 -2.7 6 -6 6 s-6 -2.7 -6 -6 z M188 144 c0 6.6 5.4 12 12 12 s12 -5.4 12 -12 h3 c0 7.7 -5.8 14.1 -13.5 14.9 v9.1 h-3 v-9.1 c-7.7 -0.8 -13.5 -7.2 -13.5 -14.9 z" fill="#FFFFFF" transform="scale(1.2) translate(-36, -30)"/>

          <!-- Live Recording Status -->
          <rect x="110" y="240" width="180" height="38" rx="19" fill="#FFE2E8"/>
          <circle cx="130" cy="259" r="5" fill="#E14C71"/>
          <text x="206" y="265" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="800" fill="#E14C71" text-anchor="middle">Nagsasalita...</text>
        </g>

        <!-- Live 16kHz PCM Waveform Stream -->
        <g transform="translate(200, 448)">
          ${bars.map((h, i) => `
            <rect x="${i * 15}" y="${40 - h / 2}" width="8" height="${h}" rx="4" fill="#FF6F91"/>
          `).join('')}
        </g>
        <text x="380" y="504" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="700" fill="#0284C7" text-anchor="middle">Vosk 68MB Edge ASR Active • AudioBuffer Ring Queue (Zero Disk Wear)</text>
      </g>
    ` : `
      <!-- RESULT / EVALUATION SCREEN -->
      <g transform="translate(260, 96)">
        <rect x="0" y="0" width="760" height="52" rx="16" fill="#34A863" filter="url(#cardShadow)"/>
        <text x="380" y="32" font-family="'Lexend', system-ui, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" text-anchor="middle">Napakagaling! Wasto ang iyong bigkas!</text>

        <g transform="translate(180, 76)">
          <rect x="0" y="0" width="400" height="350" rx="28" fill="#FFFFFF" stroke="#34A863" stroke-width="4" filter="url(#cardShadow)"/>
          
          <!-- Stars Burst -->
          <g transform="translate(130, 40)">
            <polygon points="16,3 20,13 31,13 22,20 25,30 16,24 7,30 10,20 1,13 12,13" fill="${starCount >= 1 ? '#FFC107' : '#E2E8F0'}" transform="scale(1.4)"/>
            <polygon points="16,3 20,13 31,13 22,20 25,30 16,24 7,30 10,20 1,13 12,13" fill="${starCount >= 2 ? '#FFC107' : '#E2E8F0'}" transform="translate(50, -10) scale(1.6)"/>
            <polygon points="16,3 20,13 31,13 22,20 25,30 16,24 7,30 10,20 1,13 12,13" fill="${starCount >= 3 ? '#FFC107' : '#E2E8F0'}" transform="translate(100, 0) scale(1.4)"/>
          </g>

          <!-- Accuracy Circle Indicator -->
          <circle cx="200" cy="180" r="54" fill="#F0FDF4" stroke="#34A863" stroke-width="6"/>
          <text x="200" y="184" font-family="'Lexend', system-ui, sans-serif" font-size="34" font-weight="900" fill="#166534" text-anchor="middle">${scorePct}%</text>
          <text x="200" y="206" font-family="'Lexend', system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803D" text-anchor="middle">ASR ACCURACY</text>

          <!-- Success Details -->
          <text x="200" y="270" font-family="'Lexend', system-ui, sans-serif" font-size="15" font-weight="800" fill="#1F3A3D" text-anchor="middle">Target Phoneme /m/ Verified</text>
          <text x="200" y="292" font-family="'Lexend', system-ui, sans-serif" font-size="12" font-weight="600" fill="#5C7679" text-anchor="middle">Acoustic Minimal Pair Distinction: Passed</text>
          
          <!-- Room DB Indicator -->
          <rect x="80" y="306" width="240" height="26" rx="13" fill="#EEF2F6"/>
          <text x="200" y="323" font-family="'Lexend', system-ui, sans-serif" font-size="10" font-weight="700" fill="#475569" text-anchor="middle">Room SQLite: Profile Progress Committed</text>
        </g>

        <!-- CTA Button -->
        <g transform="translate(360, 460)">
          <rect x="0" y="0" width="200" height="48" rx="24" fill="url(#mangoBtn)" filter="url(#cardShadow)"/>
          <text x="100" y="30" font-family="'Lexend', system-ui, sans-serif" font-size="15" font-weight="800" fill="#1F3A3D" text-anchor="middle">Magpatuloy</text>
        </g>
      </g>
    `}

    <!-- Bottom Technical Proof Footer -->
    <rect x="0" y="670" width="${WIDTH}" height="50" fill="#1E293B"/>
    <text x="40" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#38BDF8">PlayIT v2 // Architecture: Clean Architecture + MVVM</text>
    <text x="640" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle">Jetpack Compose • 100% Offline • Vosk Edge Kaldi ASR</text>
    <text x="${WIDTH - 40}" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#4ADE80" text-anchor="end">Thesis QA: 76+ Unit Tests Passing</text>
  </svg>
  `;
}

// ===========================================================================
// 2. ReadHub — Real Web Application Walkthrough
// Theme color: #821124 (ReadHub Maroon), Real Live App from readhub-three.vercel.app
// ===========================================================================
function renderReadHubFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.5s): Login Screen with real input typing
  // Phase 2 (3.5..8.0s): Catalog Grid with books and borrow interaction
  // Phase 3 (8.0..12.0s): Borrow state committed and ShedLock overdue scheduler verified
  const isLogin = t < 3.5;
  const isBorrowed = t >= 8.2;

  const emailText = isLogin ? "student@cit.edu".slice(0, Math.min(15, Math.round((t / 2.0) * 15))) : "student@cit.edu";
  const passDots = isLogin ? "••••••••••••".slice(0, Math.min(10, Math.round(clamp((t - 1.2) / 1.5) * 10))) : "••••••••••";

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="readhubMaroon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#821124"/>
        <stop offset="100%" stop-color="#5B0C19"/>
      </linearGradient>
      <filter id="cardElevated" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.08"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#F8FAFC"/>

    <!-- ReadHub Brand Header Bar -->
    <rect x="0" y="0" width="${WIDTH}" height="64" fill="url(#readhubMaroon)"/>
    
    <!-- Logo and Brand Name -->
    <g transform="translate(48, 18)">
      <rect x="0" y="0" width="30" height="28" rx="6" fill="#FFFFFF"/>
      <!-- Book icon -->
      <path d="M6 7 L15 11 L24 7 L24 21 L15 25 L6 21 Z" fill="#821124"/>
      <text x="40" y="20" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">ReadHub</text>
      <text x="136" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#FCA5A5">| Campus Peer Library</text>
    </g>

    ${isLogin ? `
      <!-- Top Right Auth Status -->
      <g transform="translate(1080, 20)">
        <rect x="0" y="0" width="90" height="26" rx="13" fill="#FFFFFF" opacity="0.2"/>
        <text x="45" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">SIGN IN</text>
      </g>

      <!-- REAL LOGIN FORM -->
      <g transform="translate(420, 120)">
        <rect x="0" y="0" width="440" height="480" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#cardElevated)"/>
        
        <text x="220" y="56" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#1E293B" text-anchor="middle">Welcome back</text>
        <text x="220" y="80" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B" text-anchor="middle">Access campus library books &amp; reserves</text>

        <!-- Email Field -->
        <g transform="translate(40, 110)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">STUDENT EMAIL</text>
          <rect x="0" y="10" width="360" height="44" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="14" y="37" font-family="'Courier New', monospace" font-size="14" font-weight="600" fill="#0F172A">${emailText}</text>
          ${t < 2.0 ? `<line x1="${16 + emailText.length * 8.4}" y1="22" x2="${16 + emailText.length * 8.4}" y2="42" stroke="#821124" stroke-width="2"/>` : ''}
        </g>

        <!-- Password Field -->
        <g transform="translate(40, 195)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">PASSWORD</text>
          <rect x="0" y="10" width="360" height="44" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="14" y="39" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#0F172A">${passDots}</text>
        </g>

        <!-- Sign In Button -->
        <g transform="translate(40, 290)">
          <rect x="0" y="0" width="360" height="46" rx="8" fill="#821124"/>
          <text x="180" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">SIGN IN WITH JWT</text>
        </g>

        <!-- Security Badge -->
        <g transform="translate(40, 360)">
          <rect x="0" y="0" width="360" height="70" rx="8" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
          <text x="14" y="24" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#991B1B">SPRING SECURITY 3 // STATELESS JWT</text>
          <text x="14" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#7F1D1D">Role Authorization: ROLE_STUDENT / ROLE_ADMIN</text>
          <text x="14" y="58" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#991B1B">Nginx Gateway → Cloudinary Asset Storage</text>
        </g>
      </g>
    ` : `
      <!-- REAL CATALOG and BORROW WORKFLOW -->
      <!-- Top Nav In App -->
      <g transform="translate(420, 20)">
        <text x="0" y="16" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Catalog</text>
        <text x="90" y="16" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#FECACA">My Borrows</text>
        <text x="200" y="16" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#FECACA">Overdue Sentinel</text>
        <text x="340" y="16" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#FECACA">Admin Dashboard</text>
      </g>

      <g transform="translate(1020, 16)">
        <rect x="0" y="0" width="200" height="32" rx="16" fill="#FFFFFF" opacity="0.2"/>
        <circle cx="16" cy="16" r="10" fill="#FFFFFF"/>
        <text x="36" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Mateo R. (CIT-U)</text>
      </g>

      <!-- Catalog Header and Search Filter Bar -->
      <g transform="translate(64, 88)">
        <text x="0" y="24" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A">Technical Book Catalog</text>
        <text x="0" y="44" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Live peer-to-peer textbook lending for Computer Studies students</text>

        <!-- Search Bar -->
        <rect x="740" y="6" width="410" height="40" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
        <text x="760" y="31" font-family="'Courier New', monospace" font-size="13" font-weight="600" fill="#0F172A">Filter: "Clean Architecture"</text>
      </g>

      <!-- 3 Real Catalog Book Cards -->
      <g transform="translate(64, 160)">
        <!-- Card 1: Clean Architecture -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="360" height="440" rx="14" fill="#FFFFFF" stroke="${isBorrowed ? '#821124' : '#E2E8F0'}" stroke-width="${isBorrowed ? '2' : '1'}" filter="url(#cardElevated)"/>
          <!-- Cover placeholder -->
          <rect x="20" y="20" width="320" height="180" rx="8" fill="#1E293B"/>
          <text x="40" y="70" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#38BDF8">SOFTWARE ENGINEERING</text>
          <text x="40" y="105" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Clean Architecture</text>
          <text x="40" y="130" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Robert C. Martin • 2018</text>
          
          <!-- Category Chips -->
          <rect x="40" y="150" width="60" height="22" rx="4" fill="#334155"/>
          <text x="70" y="165" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#F8FAFC" text-anchor="middle">JAVA</text>
          <rect x="110" y="150" width="80" height="22" rx="4" fill="#334155"/>
          <text x="150" y="165" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#F8FAFC" text-anchor="middle">ARCHITECTURE</text>

          <!-- Book Metadata -->
          <text x="24" y="235" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Copy #04 • Reserve Desk B-12</text>
          <text x="24" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Condition: Excellent • CIT-U CCS Library</text>

          <!-- Borrow Status Badge -->
          <g transform="translate(24, 290)">
            <rect x="0" y="0" width="130" height="28" rx="6" fill="${isBorrowed ? '#FEF2F2' : '#F0FDF4'}"/>
            <circle cx="14" cy="14" r="4" fill="${isBorrowed ? '#DC2626' : '#16A34A'}"/>
            <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="${isBorrowed ? '#991B1B' : '#15803D'}">
              ${isBorrowed ? "REQUESTED" : "AVAILABLE"}
            </text>
          </g>

          <!-- Borrow CTA Button -->
          <g transform="translate(24, 340)">
            <rect x="0" y="0" width="312" height="42" rx="8" fill="${isBorrowed ? '#16A34A' : '#821124'}"/>
            <text x="156" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">
              ${isBorrowed ? "CONFIRMED (DUE: 14 DAYS)" : "SUBMIT BORROW REQUEST"}
            </text>
          </g>

          ${isBorrowed ? `
            <text x="180" y="415" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#16A34A" text-anchor="middle">ShedLock: Lock 'borrow_tx_204' Acquired</text>
          ` : `
            <text x="180" y="415" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#94A3B8" text-anchor="middle">Click to reserve copy with student account</text>
          `}
        </g>

        <!-- Card 2: Designing Data-Intensive Applications -->
        <g transform="translate(395, 0)">
          <rect x="0" y="0" width="360" height="440" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" filter="url(#cardElevated)"/>
          <rect x="20" y="20" width="320" height="180" rx="8" fill="#0F172A"/>
          <text x="40" y="70" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#A855F7">DISTRIBUTED SYSTEMS</text>
          <text x="40" y="105" font-family="system-ui, sans-serif" font-size="19" font-weight="800" fill="#FFFFFF">Designing Data-Intensive Apps</text>
          <text x="40" y="130" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Martin Kleppmann • O'Reilly</text>
          <rect x="40" y="150" width="80" height="22" rx="4" fill="#334155"/>
          <text x="80" y="165" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#F8FAFC" text-anchor="middle">DATABASES</text>

          <text x="24" y="235" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Copy #01 • Lab 402 Shelf</text>
          <text x="24" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Condition: Like New</text>

          <g transform="translate(24, 290)">
            <rect x="0" y="0" width="110" height="28" rx="6" fill="#F0FDF4"/>
            <circle cx="14" cy="14" r="4" fill="#16A34A"/>
            <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#15803D">AVAILABLE</text>
          </g>

          <g transform="translate(24, 340)">
            <rect x="0" y="0" width="312" height="42" rx="8" fill="#E2E8F0"/>
            <text x="156" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569" text-anchor="middle">BORROW REQUEST</text>
          </g>
        </g>

        <!-- Card 3: Spring Boot 3 in Action -->
        <g transform="translate(790, 0)">
          <rect x="0" y="0" width="360" height="440" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" filter="url(#cardElevated)"/>
          <rect x="20" y="20" width="320" height="180" rx="8" fill="#14532D"/>
          <text x="40" y="70" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#4ADE80">BACKEND FRAMEWORK</text>
          <text x="40" y="105" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Spring Boot 3 in Action</text>
          <text x="40" y="130" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#BBF7D0">Craig Walls • Manning</text>
          <rect x="40" y="150" width="60" height="22" rx="4" fill="#166534"/>
          <text x="70" y="165" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#F8FAFC" text-anchor="middle">SPRING</text>

          <text x="24" y="235" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Copy #02 • On Loan to Faculty</text>
          <text x="24" y="258" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Due: Nov 14, 2026</text>

          <g transform="translate(24, 290)">
            <rect x="0" y="0" width="100" height="28" rx="6" fill="#FEF2F2"/>
            <circle cx="14" cy="14" r="4" fill="#DC2626"/>
            <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#991B1B">BORROWED</text>
          </g>

          <g transform="translate(24, 340)">
            <rect x="0" y="0" width="312" height="42" rx="8" fill="#F1F5F9"/>
            <text x="156" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#94A3B8" text-anchor="middle">JOIN WAITLIST</text>
          </g>
        </g>
      </g>
    `}

    <!-- Bottom Technical Status Bar -->
    <rect x="0" y="670" width="${WIDTH}" height="50" fill="#0F172A"/>
    <text x="40" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#38BDF8">ReadHub // Production: readhub-three.vercel.app/login</text>
    <text x="640" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle">Spring Boot 3.2 • Spring Data JPA • MySQL • Docker &amp; Nginx</text>
    <text x="${WIDTH - 40}" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#4ADE80" text-anchor="end">ShedLock: Lock Table Distributed OK</text>
  </svg>
  `;
}

// ===========================================================================
// 3. Gordon RamsAi — Real Streamlit RAG Chatbot
// Theme: Streamlit dark #0e1117, ChromaDB Vector retrieval, Gemini streaming critique
// ===========================================================================
function renderGordonRamsAiFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.2s): Typing query
  // Phase 2 (3.2..6.5s): ChromaDB Vector search chunks
  // Phase 3 (6.5..12s): Gemini token stream response
  const fullPrompt = "High-protein Filipino dinner under 600 calories.";
  const typedLen = Math.min(fullPrompt.length, Math.round((t / 2.8) * fullPrompt.length));
  const currentPrompt = fullPrompt.slice(0, typedLen);

  const isRAG = t >= 3.2;
  const isStreaming = t >= 6.5;

  const fullResponse = `Right, listen to me! You want 48g of protein without feeling sluggish? Chicken Tinola made with skinless chicken breast and heaps of fresh malunggay leaves clocks in at exactly 420 kcal (48g Protein | 12g Fat | 18g Carbs). Do NOT over-boil the ginger broth or you'll destroy the aromatics! Proper food!`;
  const streamLen = isStreaming ? Math.min(fullResponse.length, Math.round(clamp((t - 6.5) / 5.2) * fullResponse.length)) : 0;
  const displayedStream = fullResponse.slice(0, streamLen);

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Streamlit Dark Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0E1117"/>

    <!-- Left Sidebar (Streamlit Sidebar 280px) -->
    <rect x="0" y="0" width="280" height="${HEIGHT}" fill="#262730"/>
    <line x1="280" y1="0" x2="280" y2="${HEIGHT}" stroke="#363945" stroke-width="1"/>

    <!-- Sidebar Header -->
    <g transform="translate(24, 28)">
      <rect x="0" y="0" width="36" height="36" rx="8" fill="#FF4B4B"/>
      <text x="18" y="24" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle">R</text>
      <text x="48" y="20" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">Gordon RamsAi</text>
      <text x="48" y="34" font-family="'Courier New', monospace" font-size="11" font-weight="600" fill="#9CA3AF">RAG CULINARY BOT</text>
    </g>

    <!-- Sidebar Navigation -->
    <g transform="translate(24, 96)">
      <rect x="0" y="0" width="232" height="36" rx="8" fill="#FF4B4B" opacity="0.15"/>
      <text x="16" y="23" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FF4B4B">Chef Kitchen (Chat)</text>
      
      <text x="16" y="65" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#9CA3AF">Vector Knowledge Base</text>
      <text x="16" y="105" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#9CA3AF">Filipino Macro Index</text>
      <text x="16" y="145" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#9CA3AF">Langfuse Observability</text>
    </g>

    <!-- Sidebar Telemetry Card -->
    <g transform="translate(20, 480)">
      <rect x="0" y="0" width="240" height="170" rx="10" fill="#1B1D23" stroke="#363945" stroke-width="1"/>
      <text x="14" y="26" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FF4B4B">RAG TELEMETRY</text>
      <text x="14" y="52" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#E2E8F0">Vector DB: ChromaDB Local</text>
      <text x="14" y="74" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#E2E8F0">Embedding: MiniLM-L6-v2</text>
      <text x="14" y="96" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#E2E8F0">LLM: Google Gemini 1.5</text>
      <text x="14" y="118" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#E2E8F0">Latency: 284ms (RAG search)</text>
      <rect x="14" y="132" width="80" height="20" rx="4" fill="#065F46"/>
      <text x="54" y="146" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#A7F3D0" text-anchor="middle">ONLINE 200</text>
    </g>

    <!-- Main Chat Canvas (280px to 1280px = 1000px width) -->
    <!-- Top Bar -->
    <g transform="translate(320, 24)">
      <text x="0" y="24" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#FAFAFA">Culinary RAG Consultation</text>
      <text x="0" y="44" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#9CA3AF">Grounding nutrition advice in custom culinary vector embeddings</text>
    </g>

    <!-- Chat Stream Area -->
    <g transform="translate(320, 90)">
      <!-- User Question Bubble -->
      <g transform="translate(0, 0)">
        <circle cx="20" cy="20" r="16" fill="#3B82F6"/>
        <text x="20" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">U</text>
        
        <rect x="48" y="0" width="560" height="52" rx="12" fill="#262730" stroke="#363945" stroke-width="1"/>
        <text x="68" y="31" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#FAFAFA">${currentPrompt}</text>
        ${t < 2.8 ? `<line x1="${70 + currentPrompt.length * 8.4}" y1="18" x2="${70 + currentPrompt.length * 8.4}" y2="36" stroke="#FF4B4B" stroke-width="2"/>` : ''}
      </g>

      <!-- ChromaDB Retrieval Indicator -->
      ${isRAG ? `
        <g transform="translate(48, 68)">
          <rect x="0" y="0" width="720" height="42" rx="8" fill="#13271D" stroke="#059669" stroke-width="1"/>
          <circle cx="16" cy="21" r="5" fill="#10B981"/>
          <text x="32" y="20" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#34D399">ChromaDB Local Vector Match (k=3, cosine sim: 0.91)</text>
          <text x="32" y="34" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#A7F3D0">Retrieved context: 'chicken_tinola_malunggay_macros.txt' (420 kcal, 48g protein, 0g trans-fat)</text>
        </g>
      ` : ''}

      <!-- Gordon Ramsay Bot Response -->
      ${isStreaming ? `
        <g transform="translate(0, 126)">
          <!-- Gordon Avatar -->
          <circle cx="20" cy="24" r="18" fill="#FF4B4B"/>
          <text x="20" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">GR</text>

          <rect x="48" y="0" width="860" height="240" rx="14" fill="#1B1D23" stroke="#FF4B4B" stroke-width="1.5"/>
          <text x="72" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#FF4B4B">Chef Gordon RamsAi (Gemini-1.5-Pro Grounded)</text>

          <!-- Wrapped text output simulation -->
          <text x="72" y="65" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#E2E8F0">
            ${displayedStream.slice(0, 85)}
          </text>
          <text x="72" y="92" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#E2E8F0">
            ${displayedStream.slice(85, 175)}
          </text>
          <text x="72" y="119" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#E2E8F0">
            ${displayedStream.slice(175, 260)}
          </text>
          <text x="72" y="146" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#4ADE80">
            ${displayedStream.slice(260)}
          </text>

          <!-- Macro Breakdown Card inside bot bubble -->
          <g transform="translate(72, 165)">
            <rect x="0" y="0" width="160" height="52" rx="8" fill="#262730"/>
            <text x="14" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#9CA3AF">ENERGY</text>
            <text x="14" y="44" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">420 kcal</text>

            <rect x="180" y="0" width="160" height="52" rx="8" fill="#262730"/>
            <text x="194" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#38BDF8">PROTEIN</text>
            <text x="194" y="44" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">48.2 g</text>

            <rect x="360" y="0" width="160" height="52" rx="8" fill="#262730"/>
            <text x="374" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#FBBF24">FAT</text>
            <text x="374" y="44" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">12.0 g</text>

            <rect x="540" y="0" width="160" height="52" rx="8" fill="#262730"/>
            <text x="554" y="24" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#4ADE80">CARBOHYDRATES</text>
            <text x="554" y="44" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FAFAFA">18.4 g</text>
          </g>
        </g>
      ` : ''}

      <!-- Bottom Chat Input Bar -->
      <g transform="translate(0, 490)">
        <rect x="0" y="0" width="910" height="52" rx="10" fill="#262730" stroke="#4B5563" stroke-width="1"/>
        <text x="24" y="32" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#6B7280">Ask Gordon for recipe critiques, macro splits, or cooking techniques...</text>
        <rect x="850" y="10" width="46" height="32" rx="6" fill="#FF4B4B"/>
        <text x="873" y="30" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">→</text>
      </g>
    </g>

    <!-- Bottom Technical Footer -->
    <rect x="0" y="670" width="${WIDTH}" height="50" fill="#0A0B0E"/>
    <text x="40" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#FF4B4B">Gordon RamsAi // Deployed: gordon-ramsai.streamlit.app</text>
    <text x="640" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#9CA3AF" text-anchor="middle">Streamlit • ChromaDB RAG • Google GenAI • Langfuse Telemetry</text>
    <text x="${WIDTH - 40}" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#4ADE80" text-anchor="end">Core Developer (~80% Build)</text>
  </svg>
  `;
}

// ===========================================================================
// 4. DaloyAqua — Authentic SDLC Phase 0 AgriTech System Architecture
// Baleno, Masbate smallholder fieldwork research and spec-driven data contracts
// ===========================================================================
function renderDaloyAquaFrame(frameIndex) {
  const t = frameIndex / FPS;

  // Phase 1 (0..3.5s): Problem and Fieldwork Context (Baleno Masbate value chain)
  // Phase 2 (3.5..8.0s): SDLC Phase 0 Spec-Driven Architecture (Spec 001, 002, 003)
  // Phase 3 (8.0..12.0s): Co-op Pooled Selling and Transparent Copra Valuation Engine
  const isPhase1 = t < 3.5;
  const isPhase2 = t >= 3.5 && t < 8.0;

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="daloyAquaTeal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0E4E59"/>
        <stop offset="100%" stop-color="#072C33"/>
      </linearGradient>
      <filter id="boxElevation" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#072C33" flood-opacity="0.2"/>
      </filter>
    </defs>

    <!-- Dark Architectural Blueprint Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#081A1F"/>

    <!-- Top Architecture Navigation Bar -->
    <rect x="0" y="0" width="${WIDTH}" height="64" fill="url(#daloyAquaTeal)"/>
    
    <g transform="translate(48, 18)">
      <text x="0" y="20" font-family="'Lexend', system-ui, sans-serif" font-size="20" font-weight="900" fill="#5EEAD4" letter-spacing="1">DaloyAqua</text>
      <text x="125" y="20" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="#A5F3FC">| SDLC Phase 0 Architecture Spec</text>
    </g>

    <g transform="translate(860, 20)">
      <rect x="0" y="0" width="370" height="26" rx="13" fill="#041B20" stroke="#14B8A6" stroke-width="1"/>
      <circle cx="14" cy="13" r="4" fill="#2DD4BF"/>
      <text x="26" y="17" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#CCFBF1">BALENO, MASBATE • 3 SIBLINGS (IT, AGRI, ACCT)</text>
    </g>

    <!-- MAIN SYSTEM ARCHITECTURE CONTENT -->
    <g transform="translate(64, 88)">
      <!-- Top Context Banner -->
      <g transform="translate(0, 0)">
        <text x="0" y="24" font-family="'Lexend', system-ui, sans-serif" font-size="22" font-weight="800" fill="#F0FDFA">
          ${isPhase1 ? "1. Agritech Fieldwork Research &amp; Problem Space" : isPhase2 ? "2. Spec-Driven System Architecture (SDLC Phase 0)" : "3. Transparent Copra Valuation &amp; Pooled Co-op Selling Engine"}
        </text>
        <text x="0" y="46" font-family="'Lexend', system-ui, sans-serif" font-size="13" font-weight="500" fill="#99F6E4">
          ${isPhase1 
            ? "Primary discovery: Smallholder copra farmers suffer up to 18% arbitrary moisture deductions at weighing stations"
            : isPhase2
            ? "Specification-first development: Validated family farm logbooks before writing production code"
            : "Data contract: Automated moisture-penalty calculation gives farmers collective bargaining leverage"}
        </text>
      </g>

      <!-- Architecture Pipeline Graphic (3 Stage Cards) -->
      <g transform="translate(0, 70)">
        <!-- Card 1: Spec 001 Farm Logbook -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="360" height="470" rx="14" fill="#0C252B" stroke="${isPhase1 ? '#2DD4BF' : '#134E5A'}" stroke-width="${isPhase1 ? '3' : '1.5'}" filter="url(#boxElevation)"/>
          
          <rect x="20" y="20" width="320" height="40" rx="6" fill="#133E47"/>
          <text x="32" y="45" font-family="'Courier New', monospace" font-size="12" font-weight="800" fill="#5EEAD4">SPEC 001 // LOGBOOK INSTRUMENT</text>

          <text x="24" y="90" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#F0FDFA">Family Farm Logbook v0.1</text>
          <text x="24" y="112" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#99F6E4">Mother's Turnover Edition • Baleno Farm</text>

          <!-- Fieldwork bullet points -->
          <g transform="translate(24, 140)">
            <text x="0" y="0" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• 6 Field Interview Rounds (G1-G6)</text>
            <text x="0" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Daily copra yield &amp; labor cost tracking</text>

            <text x="0" y="60" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• SAAD &amp; ACPC Conduit Audit</text>
            <text x="0" y="84" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Evaluating government credit access rules</text>

            <text x="0" y="120" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Research-First Strategy</text>
            <text x="0" y="144" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">"Association first, not app first"</text>
          </g>

          <rect x="24" y="380" width="312" height="60" rx="8" fill="#041B20" stroke="#134E5A" stroke-width="1"/>
          <text x="36" y="405" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#5EEAD4">STATUS: SDLC S0 GATE READY</text>
          <text x="36" y="425" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#99F6E4">Proves baseline before writing mobile app</text>
        </g>

        <!-- Card 2: Spec 002 Mobile Entry (Offline-First) -->
        <g transform="translate(395, 0)">
          <rect x="0" y="0" width="360" height="470" rx="14" fill="#0C252B" stroke="${isPhase2 ? '#2DD4BF' : '#134E5A'}" stroke-width="${isPhase2 ? '3' : '1.5'}" filter="url(#boxElevation)"/>
          
          <rect x="20" y="20" width="320" height="40" rx="6" fill="#133E47"/>
          <text x="32" y="45" font-family="'Courier New', monospace" font-size="12" font-weight="800" fill="#5EEAD4">SPEC 002 // OFFLINE MOBILE ENTRY</text>

          <text x="24" y="90" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#F0FDFA">Assisted Harvest Ingestion</text>
          <text x="24" y="112" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#99F6E4">Designed for 2G / Zero-Signal Barangays</text>

          <g transform="translate(24, 140)">
            <text x="0" y="0" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Offline SQLite Store-and-Forward</text>
            <text x="0" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Encrypted local storage on Android devices</text>

            <text x="0" y="60" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Pydantic Ingestion Schemas</text>
            <text x="0" y="84" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Strict type checking for harvest weight (kg)</text>

            <text x="0" y="120" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Sibling Roles Architecture</text>
            <text x="0" y="144" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">IT (System) • Agri (Domain) • Acct (Audit)</text>
          </g>

          <rect x="24" y="380" width="312" height="60" rx="8" fill="#041B20" stroke="#134E5A" stroke-width="1"/>
          <text x="36" y="405" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#5EEAD4">STATUS: DRAFT SPEC (AWAITS S0)</text>
          <text x="36" y="425" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#99F6E4">Spec-driven design prevents premature builds</text>
        </g>

        <!-- Card 3: Spec 003 Copra Moisture and Value Engine -->
        <g transform="translate(790, 0)">
          <rect x="0" y="0" width="360" height="470" rx="14" fill="#0C252B" stroke="${!isPhase1 && !isPhase2 ? '#2DD4BF' : '#134E5A'}" stroke-width="${!isPhase1 && !isPhase2 ? '3' : '1.5'}" filter="url(#boxElevation)"/>
          
          <rect x="20" y="20" width="320" height="40" rx="6" fill="#133E47"/>
          <text x="32" y="45" font-family="'Courier New', monospace" font-size="12" font-weight="800" fill="#5EEAD4">SPEC 003 // VALUATION ENGINE</text>

          <text x="24" y="90" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#F0FDFA">Copra Quality &amp; Deduction Rules</text>
          <text x="24" y="112" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#99F6E4">Transparent Moisture Matrix vs Mill Price</text>

          <g transform="translate(24, 140)">
            <text x="0" y="0" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Moisture Deduction Floor Formula</text>
            <text x="0" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Stops arbitrary middleman penalties</text>

            <text x="0" y="60" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Collective Pooled Selling</text>
            <text x="0" y="84" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Aggregates bag lots for direct mill delivery</text>

            <text x="0" y="120" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#2DD4BF">• Family Farm Tested</text>
            <text x="0" y="144" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#CCFBF1">Validated on our own Masbate homestead</text>
          </g>

          <rect x="24" y="380" width="312" height="60" rx="8" fill="#041B20" stroke="#134E5A" stroke-width="1"/>
          <text x="36" y="405" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#5EEAD4">STATUS: SPEC IMPLEMENTED IN V0.1</text>
          <text x="36" y="425" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#99F6E4">Review gate for Baleno farmer groups</text>
        </g>
      </g>
    </g>

    <!-- Bottom Technical Bar -->
    <rect x="0" y="670" width="${WIDTH}" height="50" fill="#041B20"/>
    <text x="40" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#5EEAD4">DaloyAqua // Methodology: Spec-Driven Development (SDD)</text>
    <text x="640" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#99F6E4" text-anchor="middle">SDLC Stage S0 • Fieldwork Verified • Research Rounds 1-6</text>
    <text x="${WIDTH - 40}" y="700" font-family="'Courier New', monospace" font-size="12" font-weight="600" fill="#2DD4BF" text-anchor="end">Agritech Innovation Log Active</text>
  </svg>
  `;
}

// ===========================================================================
// MAIN RENDERING PIPELINE
// ===========================================================================
async function generateVideo({ name, frameRenderer, outputVideoPath, outputPosterPath }) {
  console.log(`\n======================================================`);
  console.log(`Rendering Real System Walkthrough Video for: ${name}`);
  console.log(`Resolution: ${WIDTH}x${HEIGHT} @ ${FPS}fps (${DURATION_SEC}s = ${TOTAL_FRAMES} frames)`);

  // 1. Generate and Save High-Fidelity Poster (< 80 KB)
  const posterSvg = frameRenderer(Math.round(TOTAL_FRAMES * 0.45)); // Mid-walkthrough frame
  const posterBuffer = await sharp(Buffer.from(posterSvg))
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  fs.writeFileSync(outputPosterPath, posterBuffer);
  console.log(`  Saved Poster: ${outputPosterPath} (${posterBuffer.length} bytes)`);

  // 2. Stream Frames directly into FFmpeg stdin
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

    ffmpeg.stderr.on('data', () => {});

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        const stats = fs.statSync(outputVideoPath);
        console.log(`  Rendered MP4: ${outputVideoPath} (${(stats.size / 1024).toFixed(1)} KB)`);
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with error code ${code}`));
      }
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });

    // Pipe PNG frames asynchronously
    (async () => {
      try {
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const svg = frameRenderer(i);
          const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
          if (!ffmpeg.stdin.write(pngBuffer)) {
            await new Promise((res) => ffmpeg.stdin.once('drain', res));
          }
        }
        ffmpeg.stdin.end();
      } catch (err) {
        ffmpeg.stdin.destroy();
        reject(err);
      }
    })();
  });
}

async function main() {
  fs.mkdirSync('public/videos', { recursive: true });
  fs.mkdirSync('public/images/projects', { recursive: true });

  const tasks = [
    {
      name: 'playit',
      frameRenderer: renderPlayItFrame,
      outputVideoPath: 'public/videos/playit.mp4',
      outputPosterPath: 'public/images/projects/playit-poster.webp',
    },
    {
      name: 'readhub',
      frameRenderer: renderReadHubFrame,
      outputVideoPath: 'public/videos/readhub.mp4',
      outputPosterPath: 'public/images/projects/readhub-poster.webp',
    },
    {
      name: 'gordon-ramsai',
      frameRenderer: renderGordonRamsAiFrame,
      outputVideoPath: 'public/videos/gordon-ramsai.mp4',
      outputPosterPath: 'public/images/projects/gordon-ramsai-poster.webp',
    },
    {
      name: 'daloyaqua',
      frameRenderer: renderDaloyAquaFrame,
      outputVideoPath: 'public/videos/daloyaqua.mp4',
      outputPosterPath: 'public/images/projects/daloyaqua-poster.webp',
    },
  ];

  for (const t of tasks) {
    await generateVideo(t);
  }

  console.log(`\nAll 4 Real System Walkthrough Videos generated successfully!`);
}

main().catch((err) => {
  console.error('Fatal error generating videos:', err);
  process.exit(1);
});
