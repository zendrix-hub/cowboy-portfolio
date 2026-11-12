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

// Browser Window Dimensions on 1280x720 canvas
const WIN_W = 1140;
const WIN_H = 656;
const WIN_X = Math.round((WIDTH - WIN_W) / 2); // 70
const WIN_Y = Math.round((HEIGHT - WIN_H) / 2); // 32
const TITLE_H = 44;
const VIEW_W = WIN_W;
const VIEW_H = WIN_H - TITLE_H; // 612

// Easing helpers
function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}
function easeInOutCubic(t) {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
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

// Generate the SVG frame for ReadHub
function renderReadHubFrame(frameIndex) {
  const t = frameIndex / FPS; // 0.0 to 12.0s

  // Determine active beat and dynamic ambient glow behind browser
  // Beat 1: Login & JWT Auth (0.0s - 3.0s) -> deep maroon / gold glow
  // Beat 2: Student Dashboard & Urgent Advisory (3.0s - 5.8s) -> amber / maroon glow
  // Beat 3: Browse Catalog & Borrowing Request (5.8s - 8.8s) -> gold / emerald glow
  // Beat 4: Admin Dashboard & Overdue Management (8.8s - 12.0s) -> maroon / success emerald glow

  let glowColor = "#821124"; // CIT-U Maroon
  let glowOpacity = 0.16;

  if (t >= 3.0 && t < 5.8) {
    glowColor = "#FDC83A"; // CIT-U Gold
    glowOpacity = 0.18;
  } else if (t >= 5.8 && t < 8.8) {
    glowColor = "#10B981"; // Success Emerald
    glowOpacity = 0.18;
  } else if (t >= 8.8) {
    glowColor = t > 10.4 ? "#10B981" : "#821124";
    glowOpacity = 0.20;
  }

  // Inside browser viewport content
  let viewContentSvg = "";
  let cursorSvg = "";

  // Common Header Bar for Dashboards (used in Beat 2, 3, 4)
  function renderNavbar(isAdmin = false, activeBadgeCount = 1) {
    const roleTitle = isAdmin ? "Super Admin" : "Uno Student";
    const roleBadge = isAdmin ? "Admin" : "Student";
    const roleBg = isAdmin ? "#821124" : "#FDC83A";
    const roleColor = isAdmin ? "#FFFFFF" : "#1E293B";

    return `
      <!-- Navbar Container -->
      <g transform="translate(0, 0)">
        <rect width="${VIEW_W}" height="64" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        
        <!-- Brand Logo & Title -->
        <g transform="translate(24, 14)">
          <!-- Maroon Logo Box -->
          <rect x="0" y="0" width="36" height="36" rx="8" fill="#821124"/>
          <!-- BookOpen Vector Icon -->
          <path d="M7 11 C11 10, 15 10, 18 13 C21 10, 25 10, 29 11 L29 25 C25 24, 21 24, 18 27 C15 24, 11 24, 7 25 Z" fill="none" stroke="#FDC83A" stroke-width="2" stroke-linejoin="round"/>
          <line x1="18" y1="13" x2="18" y2="27" stroke="#FDC83A" stroke-width="2"/>
          
          <text x="46" y="22" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#821124" letter-spacing="-0.3">ReadHub</text>
          <text x="46" y="33" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#64748B">Book Management</text>
        </g>

        <!-- Right Side: Live Clock, Bell, User Pill -->
        <g transform="translate(${VIEW_W - 380}, 14)">
          <!-- Live Clock -->
          <g transform="translate(0, 8)">
            <text x="0" y="10" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1E293B">10:45:20 AM</text>
            <text x="0" y="22" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#94A3B8">Sun, Nov 8</text>
          </g>

          <!-- Divider -->
          <line x1="95" y1="6" x2="95" y2="30" stroke="#E2E8F0" stroke-width="1"/>

          <!-- Theme Toggle (Sun/Moon icon) -->
          <circle cx="125" cy="18" r="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="125" cy="18" r="5" fill="#64748B"/>

          <!-- Notification Bell with Active Badge -->
          <g transform="translate(155, 4)">
            <circle cx="14" cy="14" r="14" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
            <path d="M14 8 C11.8 8, 10 9.8, 10 12 L10 16 L8 18 L20 18 L18 16 L18 12 C18 9.8, 16.2 8, 14 8 Z" fill="none" stroke="#64748B" stroke-width="1.6"/>
            <circle cx="14" cy="20" r="1.5" fill="#64748B"/>
            ${activeBadgeCount > 0 ? `
              <circle cx="22" cy="7" r="6" fill="#EF4444"/>
              <text x="22" y="10" font-family="system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" text-anchor="middle">${activeBadgeCount}</text>
            ` : ""}
          </g>

          <!-- User Pill -->
          <g transform="translate(205, 3)">
            <rect x="0" y="0" width="165" height="32" rx="16" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
            <!-- Avatar Circle -->
            <circle cx="16" cy="16" r="12" fill="${roleBg}"/>
            <text x="16" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="${roleColor}" text-anchor="middle">${isAdmin ? "A" : "U"}</text>
            <text x="36" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1E293B">${roleTitle}</text>
            <text x="36" y="27" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#64748B">${roleBadge}</text>
          </g>
        </g>
      </g>
    `;
  }

  // -------------------------------------------------------------
  // BEAT 1: STUDENT LOGIN & JWT AUTHENTICATION (0.0s - 3.0s)
  // -------------------------------------------------------------
  if (t < 3.0) {
    const emailFull = "uno@readhub.com";
    const passFull = "••••••••";
    
    // Type email between 0.3s and 1.1s
    const emailCharCount = Math.min(emailFull.length, Math.round(clamp((t - 0.3) / 0.8) * emailFull.length));
    const emailTyped = emailFull.slice(0, emailCharCount);

    // Type password between 1.1s and 1.7s
    const passCharCount = Math.min(passFull.length, Math.round(clamp((t - 1.1) / 0.6) * passFull.length));
    const passTyped = passFull.slice(0, passCharCount);

    const isSubmitted = t >= 2.0;
    const isSuccess = t >= 2.4;

    // Toast Notification at top right
    let toastSvg = "";
    if (isSuccess) {
      const toastP = easeOutBack(clamp((t - 2.4) / 0.3));
      toastSvg = `
        <g transform="translate(${VIEW_W - 360}, ${lerp(-50, 20, toastP)})" opacity="${toastP}">
          <rect width="330" height="48" rx="10" fill="#FFFFFF" stroke="#10B981" stroke-width="1.5" filter="drop-shadow(0 4px 12px rgba(16,185,129,0.15))"/>
          <circle cx="24" cy="24" r="10" fill="#D1FAE5"/>
          <path d="M19 24 L22 27 L29 20" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
          <text x="44" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065F46">Login Successful</text>
          <text x="44" y="35" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#047857">Welcome back, Uno Student</text>
        </g>
      `;
    }

    viewContentSvg = `
      <!-- Page Background -->
      <rect width="${VIEW_W}" height="${VIEW_H}" fill="#F8FAFC"/>
      <!-- Soft Radial Brand Accents -->
      <circle cx="${VIEW_W * 0.85}" cy="${VIEW_H * 0.2}" r="300" fill="#FDC83A" opacity="0.07"/>
      <circle cx="${VIEW_W * 0.15}" cy="${VIEW_H * 0.85}" r="320" fill="#821124" opacity="0.06"/>

      <!-- Centered Glassmorphic Login Card (W: 420, H: 470) -->
      <g transform="translate(${(VIEW_W - 420) / 2}, 60)">
        <!-- Card Background -->
        <rect width="420" height="470" rx="16" fill="rgba(255, 255, 255, 0.88)" stroke="#E2E8F0" stroke-width="1.5"/>
        
        <!-- Logo Box & Titles -->
        <g transform="translate(190, 32)">
          <rect x="-20" y="0" width="40" height="40" rx="10" fill="#821124"/>
          <!-- BookOpen Vector Icon -->
          <path d="M-13 11 C-9 10, -5 10, -2 13 C1 10, 5 10, 9 11 L9 25 C5 24, 1 24, -2 27 C-5 24, -9 24, -13 25 Z" fill="none" stroke="#FDC83A" stroke-width="2.2" stroke-linejoin="round"/>
          <line x1="-2" y1="13" x2="-2" y2="27" stroke="#FDC83A" stroke-width="2.2"/>
        </g>
        <text x="210" y="100" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#821124" text-anchor="middle" letter-spacing="-0.4">ReadHub Portal</text>
        <text x="210" y="122" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B" text-anchor="middle">Campus Peer Lending &amp; Library System</text>

        <!-- Role Toggle Pill (Student / Admin) -->
        <g transform="translate(30, 142)">
          <rect width="360" height="38" rx="8" fill="#F1F5F9"/>
          <!-- Active Student Tab (Maroon) -->
          <rect x="2" y="2" width="176" height="34" rx="6" fill="#821124"/>
          <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Student</text>
          <!-- Admin Tab -->
          <text x="270" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="middle">Administrator</text>
        </g>

        <!-- Form Inputs -->
        <!-- Email Input -->
        <g transform="translate(30, 198)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1E293B">Institutional Email</text>
          <rect x="0" y="8" width="360" height="42" rx="8" fill="#FFFFFF" stroke="${t < 1.1 ? '#821124' : '#E2E8F0'}" stroke-width="${t < 1.1 ? '1.5' : '1'}"/>
          <text x="14" y="34" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#1E293B">${emailTyped}</text>
          ${t < 1.1 && ((t * 4) % 2 > 1) ? `<line x1="${14 + emailTyped.length * 7.5}" y1="20" x2="${14 + emailTyped.length * 7.5}" y2="38" stroke="#821124" stroke-width="1.5"/>` : ""}
        </g>

        <!-- Password Input -->
        <g transform="translate(30, 274)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1E293B">Password</text>
          <rect x="0" y="8" width="360" height="42" rx="8" fill="#FFFFFF" stroke="${t >= 1.1 && t < 1.8 ? '#821124' : '#E2E8F0'}" stroke-width="${t >= 1.1 && t < 1.8 ? '1.5' : '1'}"/>
          <text x="14" y="37" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#1E293B">${passTyped}</text>
        </g>

        <!-- Sign In Button -->
        <g transform="translate(30, 350)">
          <rect width="360" height="46" rx="8" fill="${isSubmitted ? '#550B17' : '#821124'}"/>
          <text x="180" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">
            ${isSubmitted && !isSuccess ? "Authenticating JWT..." : "Sign In to ReadHub"}
          </text>
        </g>

        <!-- CIT-U Peer Lending Footer Note -->
        <text x="210" y="425" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#94A3B8" text-anchor="middle">Cebu Institute of Technology — University</text>
      </g>

      ${toastSvg}
    `;

    // Cursor movement for Beat 1
    let cx = 640;
    let cy = 500;
    let cScale = 1.0;
    let rippleSvg = "";

    if (t < 0.8) {
      const p = easeInOutCubic(clamp(t / 0.8));
      cx = lerp(640, 500, p);
      cy = lerp(550, 290, p);
    } else if (t < 1.4) {
      const p = easeInOutCubic(clamp((t - 0.8) / 0.6));
      cx = lerp(500, 500, p);
      cy = lerp(290, 365, p);
    } else if (t < 1.9) {
      const p = easeInOutCubic(clamp((t - 1.4) / 0.5));
      cx = lerp(500, 640, p);
      cy = lerp(365, 435, p);
    } else {
      cx = 640;
      cy = 435;
      const tapT = (t - 1.9) / 0.4;
      cScale = tapT < 0.3 ? 0.82 : 1.0;
      const ripR = 14 + tapT * 45;
      const ripOp = Math.max(0, 0.85 * (1 - tapT));
      rippleSvg = `
        <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#FDC83A" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
      `;
    }

    cursorSvg = `
      ${rippleSvg}
      <g transform="translate(${cx}, ${cy}) scale(${cScale})">
        <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6" fill="#821124"/>
      </g>
    `;
  }

  // -------------------------------------------------------------
  // BEAT 2: STUDENT DASHBOARD & URGENT LOAN ADVISORY (3.0s - 5.8s)
  // -------------------------------------------------------------
  else if (t >= 3.0 && t < 5.8) {
    const showModal = t >= 3.5 && t < 5.3;

    let modalSvg = "";
    if (showModal) {
      const modalP = t < 5.0 ? easeOutBack(clamp((t - 3.5) / 0.35)) : 1.0 - easeInOutCubic((t - 5.0) / 0.3);
      modalSvg = `
        <!-- Dimmed Glass Backdrop -->
        <rect width="${VIEW_W}" height="${VIEW_H}" fill="rgba(15, 23, 42, 0.45)" opacity="${clamp(modalP * 1.2)}"/>

        <!-- UrgentActionModal (W: 520, H: 270) -->
        <g transform="translate(${(VIEW_W - 520) / 2}, 160) scale(${modalP})" opacity="${modalP}">
          <rect width="520" height="270" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.25))"/>
          
          <!-- Modal Header Banner -->
          <g transform="translate(30, 28)">
            <circle cx="16" cy="16" r="16" fill="#FEE2E2"/>
            <path d="M16 9 L16 17 M16 21 L16 22" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/>
            <text x="44" y="16" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#991B1B">Urgent Action Required</text>
            <text x="44" y="32" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">You have 1 borrowed material due soon.</text>
          </g>

          <!-- Book Item Card inside Modal -->
          <g transform="translate(30, 92)">
            <rect width="460" height="74" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
            <rect x="14" y="14" width="46" height="46" rx="8" fill="#FEF3C7"/>
            <!-- Book vector icon -->
            <path d="M25 24 C28 23, 33 23, 37 25 L37 42 C33 40, 28 40, 25 42 Z" fill="none" stroke="#D97706" stroke-width="2"/>
            <text x="72" y="34" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#1E293B">Clean Code</text>
            <text x="72" y="50" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">Robert C. Martin • Tech Catalog</text>
            
            <!-- Due Badge Pill -->
            <g transform="translate(330, 22)">
              <rect width="116" height="28" rx="14" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
              <circle cx="16" cy="14" r="5" fill="#D97706"/>
              <text x="28" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#B45309">Due in 2 Days</text>
            </g>
          </g>

          <!-- Action Buttons -->
          <g transform="translate(30, 192)">
            <rect x="0" y="0" width="220" height="44" rx="8" fill="#F1F5F9"/>
            <text x="110" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569" text-anchor="middle">View My Activity</text>

            <rect x="240" y="0" width="220" height="44" rx="8" fill="#821124"/>
            <text x="350" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">Acknowledge &amp; Close</text>
          </g>
        </g>
      `;
    }

    viewContentSvg = `
      <!-- Page Background -->
      <rect width="${VIEW_W}" height="${VIEW_H}" fill="#F8FAFC"/>
      ${renderNavbar(false, 1)}

      <!-- Action Bar (Tabs) -->
      <g transform="translate(24, 80)">
        <rect width="${VIEW_W - 48}" height="48" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        
        <!-- Tab 1: Overview (Active) -->
        <rect x="6" y="6" width="130" height="36" rx="8" fill="#821124"/>
        <text x="71" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">Overview</text>

        <!-- Tab 2: Browse Items -->
        <text x="210" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748B" text-anchor="middle">Browse Items</text>

        <!-- Tab 3: My Activity -->
        <text x="340" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748B" text-anchor="middle">My Activity</text>
      </g>

      <!-- 4 Glass Stat Cards (Repeat 4 Cards Grid) -->
      <g transform="translate(24, 144)">
        <!-- Card 1: Total Requests -->
        <g transform="translate(0, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#FDF2F4"/>
          <path d="M32 26 L32 34 L37 37" stroke="#821124" stroke-width="2" stroke-linecap="round"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Total Requests</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#821124">12</text>
        </g>

        <!-- Card 2: Active Loans -->
        <g transform="translate(278, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#ECFDF5"/>
          <circle cx="32" cy="34" r="7" stroke="#10B981" stroke-width="2" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Active Loans</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#10B981">2</text>
        </g>

        <!-- Card 3: Pending Requests -->
        <g transform="translate(556, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#FEF3C7"/>
          <rect x="26" y="28" width="12" height="12" rx="3" stroke="#D97706" stroke-width="2" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Pending Requests</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#D97706">1</text>
        </g>

        <!-- Card 4: Favorite Genre -->
        <g transform="translate(834, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#F1F5F9"/>
          <path d="M26 38 L32 26 L38 38 Z" stroke="#475569" stroke-width="2" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Favorite Genre</text>
          <text x="32" y="74" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#1E293B">Technology</text>
        </g>
      </g>

      <!-- Charts Grid: My Borrowing Trend (Last 6 Months) -->
      <g transform="translate(24, 258)">
        <rect width="${VIEW_W - 48}" height="330" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        <text x="24" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1E293B">My Borrowing Trend (Last 6 Months)</text>
        <line x1="24" y1="50" x2="${VIEW_W - 72}" y2="50" stroke="#F1F5F9" stroke-width="1"/>

        <!-- SVG Trend Bars -->
        <g transform="translate(60, 250)">
          <!-- Axis Line -->
          <line x1="0" y1="0" x2="960" y2="0" stroke="#CBD5E1" stroke-width="1"/>

          <!-- 6 Monthly Bars -->
          ${[
            { m: "Jun", val: 3, h: 60 },
            { m: "Jul", val: 5, h: 100 },
            { m: "Aug", val: 8, h: 150 },
            { m: "Sep", val: 6, h: 120 },
            { m: "Oct", val: 10, h: 180 },
            { m: "Nov", val: 12, h: 210 },
          ].map((bar, i) => `
            <g transform="translate(${i * 160 + 40}, 0)">
              <!-- Bar Column (Maroon & Gold top) -->
              <rect x="-24" y="${-bar.h}" width="48" height="${bar.h}" rx="6" fill="#821124"/>
              <rect x="-24" y="${-bar.h}" width="48" height="6" rx="3" fill="#FDC83A"/>
              <text x="0" y="${-bar.h - 10}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#821124" text-anchor="middle">${bar.val}</text>
              <text x="0" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="middle">${bar.m}</text>
            </g>
          `).join("")}
        </g>
      </g>

      ${modalSvg}
    `;

    // Cursor handles modal dismissal
    if (showModal) {
      let cx = 500;
      let cy = 400;
      let cScale = 1.0;
      let rippleSvg = "";

      if (t < 4.8) {
        const p = easeInOutCubic((t - 3.5) / 1.3);
        cx = lerp(500, 660, p);
        cy = lerp(400, 375, p);
      } else {
        cx = 660;
        cy = 375;
        const tapT = (t - 4.8) / 0.4;
        cScale = tapT < 0.3 ? 0.82 : 1.0;
        const ripR = 14 + tapT * 40;
        const ripOp = Math.max(0, 0.85 * (1 - tapT));
        rippleSvg = `
          <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
        `;
      }

      cursorSvg = `
        ${rippleSvg}
        <g transform="translate(${cx}, ${cy}) scale(${cScale})">
          <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#821124"/>
        </g>
      `;
    }
  }

  // -------------------------------------------------------------
  // BEAT 3: BROWSE CATALOG & BORROWING REQUEST (5.8s - 8.8s)
  // -------------------------------------------------------------
  else if (t >= 5.8 && t < 8.8) {
    const searchTarget = "Clean Architecture";
    const typeP = clamp((t - 6.2) / 0.9);
    const typedSearch = searchTarget.slice(0, Math.round(typeP * searchTarget.length));

    const isRequested = t >= 8.0;

    let toastSvg = "";
    if (isRequested) {
      const toastP = easeOutBack(clamp((t - 8.0) / 0.3));
      toastSvg = `
        <g transform="translate(${VIEW_W - 400}, ${lerp(-50, 20, toastP)})" opacity="${toastP}">
          <rect width="370" height="48" rx="10" fill="#FFFFFF" stroke="#10B981" stroke-width="1.5" filter="drop-shadow(0 6px 16px rgba(16,185,129,0.2))"/>
          <circle cx="24" cy="24" r="10" fill="#D1FAE5"/>
          <path d="M19 24 L22 27 L29 20" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
          <text x="44" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065F46">Borrow Request Submitted</text>
          <text x="44" y="35" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#047857">"Clean Architecture" awaiting approval</text>
        </g>
      `;
    }

    viewContentSvg = `
      <rect width="${VIEW_W}" height="${VIEW_H}" fill="#F8FAFC"/>
      ${renderNavbar(false, isRequested ? 2 : 1)}

      <!-- Action Bar (Tabs) with Browse Items ACTIVE -->
      <g transform="translate(24, 80)">
        <rect width="${VIEW_W - 48}" height="48" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        <text x="71" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748B" text-anchor="middle">Overview</text>

        <!-- Tab 2: Browse Items (Active Maroon) -->
        <rect x="140" y="6" width="140" height="36" rx="8" fill="#821124"/>
        <text x="210" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">Browse Items</text>

        <!-- Tab 3: My Activity -->
        <text x="350" y="28" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748B" text-anchor="middle">My Activity</text>
      </g>

      <!-- Browse Controls: Search & Category Chips -->
      <g transform="translate(24, 144)">
        <!-- Search Input Field -->
        <rect width="480" height="42" rx="8" fill="#FFFFFF" stroke="${t >= 6.2 && t < 7.2 ? '#821124' : '#E2E8F0'}" stroke-width="${t >= 6.2 && t < 7.2 ? '1.5' : '1'}"/>
        <!-- Search icon -->
        <circle cx="20" cy="21" r="6" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
        <line x1="25" y1="25" x2="31" y2="31" stroke="#94A3B8" stroke-width="1.8"/>
        <text x="40" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#1E293B">${typedSearch}</text>
        ${t >= 6.2 && t < 7.2 ? `<line x1="${40 + typedSearch.length * 8}" y1="12" x2="${40 + typedSearch.length * 8}" y2="30" stroke="#821124" stroke-width="1.5"/>` : ""}

        <!-- Category Filter Chips -->
        <g transform="translate(520, 0)">
          <rect x="0" y="3" width="70" height="36" rx="18" fill="#821124"/>
          <text x="35" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">All</text>

          <rect x="80" y="3" width="115" height="36" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <text x="137" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">Technology</text>

          <rect x="205" y="3" width="95" height="36" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <text x="252" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">Science</text>

          <rect x="310" y="3" width="85" height="36" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <text x="352" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">Fiction</text>
        </g>
      </g>

      <!-- Book Cards Grid -->
      <g transform="translate(24, 208)">
        <!-- Book Card 1: Clean Architecture (Target) -->
        <g transform="translate(0, 0)">
          <rect width="350" height="380" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.04))"/>
          
          <!-- Card Header & Icon Box -->
          <g transform="translate(20, 20)">
            <!-- Yellow Icon Box -->
            <rect width="52" height="52" rx="10" fill="#FEF3C7"/>
            <path d="M16 16 C20 15, 26 15, 30 17 L30 36 C26 34, 20 34, 16 36 Z" fill="none" stroke="#D97706" stroke-width="2.2"/>
            <text x="68" y="24" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#1E293B">Clean Architecture</text>
            <text x="68" y="42" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">by Robert C. Martin</text>
          </g>

          <text x="20" y="105" font-family="system-ui, sans-serif" font-size="12" font-weight="400" fill="#64748B" width="310">
            A Craftsman's Guide to Software Structure and Design. Essential textbook for campus engineering students.
          </text>

          <!-- Badges Row -->
          <g transform="translate(20, 160)">
            <rect width="84" height="26" rx="6" fill="#D1FAE5"/>
            <text x="42" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065F46" text-anchor="middle">Available</text>

            <rect x="94" y="0" width="130" height="26" rx="6" fill="#FFFFFF" stroke="#FDE68A" stroke-width="1.5"/>
            <text x="159" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#B45309" text-anchor="middle">Excellent Condition</text>
          </g>

          <!-- Action Buttons -->
          <g transform="translate(20, 316)">
            <rect x="0" y="0" width="145" height="42" rx="8" fill="#F1F5F9"/>
            <text x="72" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">View Details</text>

            <rect x="155" y="0" width="155" height="42" rx="8" fill="${isRequested ? '#10B981' : '#821124'}"/>
            <text x="232" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">
              ${isRequested ? "Request Sent!" : "Request Book"}
            </text>
          </g>
        </g>

        <!-- Book Card 2: Design Patterns -->
        <g transform="translate(374, 0)">
          <rect width="350" height="380" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <g transform="translate(20, 20)">
            <rect width="52" height="52" rx="10" fill="#F1F5F9"/>
            <path d="M16 16 C20 15, 26 15, 30 17 L30 36 C26 34, 20 34, 16 36 Z" fill="none" stroke="#475569" stroke-width="2.2"/>
            <text x="68" y="24" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#1E293B">Design Patterns</text>
            <text x="68" y="42" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">by Gang of Four</text>
          </g>
          <text x="20" y="105" font-family="system-ui, sans-serif" font-size="12" font-weight="400" fill="#64748B">
            Elements of Reusable Object-Oriented Software. Core catalog textbook for architecture courses.
          </text>
          <g transform="translate(20, 160)">
            <rect width="100" height="26" rx="6" fill="#FEE2E2"/>
            <text x="50" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#991B1B" text-anchor="middle">Checked Out</text>
          </g>
          <g transform="translate(20, 316)">
            <rect x="0" y="0" width="310" height="42" rx="8" fill="#F1F5F9"/>
            <text x="155" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle">Currently Unavailable</text>
          </g>
        </g>

        <!-- Book Card 3: Modern Operating Systems -->
        <g transform="translate(748, 0)">
          <rect width="344" height="380" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <g transform="translate(20, 20)">
            <rect width="52" height="52" rx="10" fill="#FEF3C7"/>
            <path d="M16 16 C20 15, 26 15, 30 17 L30 36 C26 34, 20 34, 16 36 Z" fill="none" stroke="#D97706" stroke-width="2.2"/>
            <text x="68" y="24" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#1E293B">Modern OS</text>
            <text x="68" y="42" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748B">by Andrew S. Tanenbaum</text>
          </g>
          <text x="20" y="105" font-family="system-ui, sans-serif" font-size="12" font-weight="400" fill="#64748B">
            Fourth edition resource covering processes, memory, distributed file systems, and hardware parity.
          </text>
          <g transform="translate(20, 160)">
            <rect width="84" height="26" rx="6" fill="#D1FAE5"/>
            <text x="42" y="17" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065F46" text-anchor="middle">Available</text>
          </g>
          <g transform="translate(20, 316)">
            <rect x="0" y="0" width="145" height="42" rx="8" fill="#F1F5F9"/>
            <text x="72" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">View Details</text>
            <rect x="155" y="0" width="149" height="42" rx="8" fill="#821124"/>
            <text x="229" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Request Book</text>
          </g>
        </g>
      </g>

      ${toastSvg}
    `;

    // Cursor clicks "Request Book" on Card 1
    let cx = 300;
    let cy = 200;
    let cScale = 1.0;
    let rippleSvg = "";

    if (t < 7.4) {
      const p = easeInOutCubic((t - 5.8) / 1.6);
      cx = lerp(300, 250, p);
      cy = lerp(200, 545, p);
    } else {
      cx = 250;
      cy = 545;
      const tapT = (t - 7.4) / 0.4;
      cScale = tapT < 0.3 ? 0.82 : 1.0;
      const ripR = 14 + tapT * 40;
      const ripOp = Math.max(0, 0.85 * (1 - tapT));
      rippleSvg = `
        <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#10B981" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
      `;
    }

    cursorSvg = `
      ${rippleSvg}
      <g transform="translate(${cx}, ${cy}) scale(${cScale})">
        <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6" fill="#821124"/>
      </g>
    `;
  }

  // -------------------------------------------------------------
  // BEAT 4: ADMIN DASHBOARD & OVERDUE MANAGEMENT (8.8s - 12.0s)
  // -------------------------------------------------------------
  else if (t >= 8.8) {
    const isApproved = t >= 10.2;

    let toastSvg = "";
    if (isApproved) {
      const toastP = easeOutBack(clamp((t - 10.2) / 0.3));
      toastSvg = `
        <g transform="translate(${VIEW_W - 400}, ${lerp(-50, 20, toastP)})" opacity="${toastP}">
          <rect width="370" height="48" rx="10" fill="#FFFFFF" stroke="#10B981" stroke-width="1.5" filter="drop-shadow(0 6px 16px rgba(16,185,129,0.2))"/>
          <circle cx="24" cy="24" r="10" fill="#D1FAE5"/>
          <path d="M19 24 L22 27 L29 20" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
          <text x="44" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065F46">Transaction Approved</text>
          <text x="44" y="35" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#047857">Clean Architecture loaned to Uno Student</text>
        </g>
      `;
    }

    viewContentSvg = `
      <rect width="${VIEW_W}" height="${VIEW_H}" fill="#F8FAFC"/>
      ${renderNavbar(true, 0)}

      <!-- Admin Stat Cards (4 Cards Grid) -->
      <g transform="translate(24, 76)">
        <!-- Card 1: Pending Approvals -->
        <g transform="translate(0, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#FDF2F4"/>
          <circle cx="32" cy="34" r="7" stroke="#821124" stroke-width="2" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Pending Approvals</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#821124">
            ${isApproved ? "0" : "1"}
          </text>
        </g>

        <!-- Card 2: Overdue Books (Red Border & Alert) -->
        <g transform="translate(278, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <rect x="0" y="0" width="258" height="4" rx="2" fill="#EF4444"/>
          <circle cx="32" cy="34" r="16" fill="#FEE2E2"/>
          <path d="M32 26 L32 34 M32 38 L32 39" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#EF4444">Overdue Books</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#EF4444">1</text>
        </g>

        <!-- Card 3: Total Inventory -->
        <g transform="translate(556, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#FEF3C7"/>
          <rect x="25" y="27" width="14" height="14" rx="3" stroke="#D97706" stroke-width="2" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Total Inventory</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#D97706">124</text>
        </g>

        <!-- Card 4: Students Count -->
        <g transform="translate(834, 0)">
          <rect width="258" height="96" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
          <circle cx="32" cy="34" r="16" fill="#F1F5F9"/>
          <circle cx="32" cy="30" r="5" stroke="#475569" stroke-width="1.8" fill="none"/>
          <path d="M24 41 C24 37, 28 35, 32 35 C36 35, 40 37, 40 41" stroke="#475569" stroke-width="1.8" fill="none"/>
          <text x="56" y="38" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#64748B">Students Count</text>
          <text x="32" y="76" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#1E293B">48</text>
        </g>
      </g>

      <!-- Transactions Queue Table Card -->
      <g transform="translate(24, 186)">
        <rect width="${VIEW_W - 48}" height="402" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        
        <!-- Table Header Bar -->
        <g transform="translate(24, 24)">
          <text x="0" y="0" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#1E293B">Active Loan &amp; Approval Queue</text>
          <text x="0" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748B">Real-time Spring Boot transaction processing with ShedLock overdue sentinel</text>
        </g>

        <!-- Table Structure -->
        <g transform="translate(24, 70)">
          <!-- Table Header -->
          <rect width="${VIEW_W - 96}" height="36" rx="6" fill="#F8FAFC"/>
          <text x="20" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">STUDENT</text>
          <text x="260" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">BOOK MATERIAL</text>
          <text x="530" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">STATUS</text>
          <text x="690" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">DATE</text>
          <text x="${VIEW_W - 130}" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B" text-anchor="end">ACTIONS</text>

          <!-- ROW 1: Uno Student (Target for Approval) -->
          <g transform="translate(0, 44)">
            <rect width="${VIEW_W - 96}" height="64" rx="8" fill="#FFFFFF" stroke="#F1F5F9" stroke-width="1"/>
            
            <!-- Student Info -->
            <text x="20" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">Uno Student</text>
            <text x="20" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">uno@readhub.com</text>

            <!-- Book Info -->
            <text x="260" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">Clean Architecture</text>
            <text x="260" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748B">Robert C. Martin • Tech</text>

            <!-- Status Badge: PENDING -> BORROWED -->
            <g transform="translate(530, 18)">
              ${isApproved ? `
                <rect width="95" height="28" rx="14" fill="#ECFDF5"/>
                <circle cx="14" cy="14" r="4" fill="#10B981"/>
                <text x="26" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#047857">BORROWED</text>
              ` : `
                <rect width="84" height="28" rx="14" fill="#FEF3C7"/>
                <circle cx="14" cy="14" r="4" fill="#D97706"/>
                <text x="26" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#B45309">PENDING</text>
              `}
            </g>

            <!-- Date -->
            <text x="690" y="37" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569">Nov 8, 2026</text>

            <!-- Action Buttons -->
            <g transform="translate(${VIEW_W - 130}, 14)">
              ${isApproved ? `
                <rect x="-100" y="0" width="100" height="36" rx="6" fill="#F1F5F9"/>
                <text x="-50" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">Active Loan</text>
              ` : `
                <!-- Approve Button (Green) -->
                <rect x="-170" y="0" width="80" height="36" rx="6" fill="#10B981"/>
                <text x="-130" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Approve</text>
                <!-- Reject Button -->
                <rect x="-80" y="0" width="80" height="36" rx="6" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
                <text x="-40" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="middle">Reject</text>
              `}
            </g>
          </g>

          <!-- ROW 2: Maya Santos (Overdue Item Highlighted in Soft Red #FEF2F2) -->
          <g transform="translate(0, 116)">
            <rect width="${VIEW_W - 96}" height="64" rx="8" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="1"/>
            
            <text x="20" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#991B1B">Maya Santos</text>
            <text x="20" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#B91C1C">maya@cit.edu</text>

            <text x="260" y="25" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#991B1B">Design Patterns</text>
            <g transform="translate(260, 34)">
              <circle cx="6" cy="7" r="4" fill="#DC2626"/>
              <text x="16" y="11" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#DC2626">OVERDUE 3 DAYS (Notice Sent)</text>
            </g>

            <!-- Status Badge: OVERDUE -->
            <g transform="translate(530, 18)">
              <rect width="84" height="28" rx="14" fill="#FEE2E2"/>
              <circle cx="14" cy="14" r="4" fill="#DC2626"/>
              <text x="26" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#991B1B">OVERDUE</text>
            </g>

            <text x="690" y="37" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#991B1B">Nov 5, 2026</text>

            <g transform="translate(${VIEW_W - 130}, 14)">
              <rect x="-120" y="0" width="120" height="36" rx="6" fill="#FEE2E2" stroke="#F87171" stroke-width="1"/>
              <text x="-60" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#B91C1C" text-anchor="middle">ShedLock Alert</text>
            </g>
          </g>

          <!-- ROW 3: James Queddeng (Returned Book) -->
          <g transform="translate(0, 188)">
            <rect width="${VIEW_W - 96}" height="60" rx="8" fill="#FFFFFF" stroke="#F1F5F9" stroke-width="1"/>
            <text x="20" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">James Queddeng</text>
            <text x="20" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">james@cit.edu</text>
            <text x="260" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">Modern Operating Systems</text>
            <text x="260" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748B">Andrew S. Tanenbaum</text>
            <g transform="translate(530, 16)">
              <rect width="84" height="28" rx="14" fill="#F1F5F9"/>
              <text x="42" y="18" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569" text-anchor="middle">RETURNED</text>
            </g>
            <text x="690" y="35" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B">Nov 4, 2026</text>
            <g transform="translate(${VIEW_W - 130}, 12)">
              <text x="-40" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#94A3B8" text-anchor="middle">Archived</text>
            </g>
          </g>
        </g>
      </g>

      ${toastSvg}
    `;

    // Cursor clicks "Approve" button on Row 1
    let cx = 850;
    let cy = 250;
    let cScale = 1.0;
    let rippleSvg = "";

    if (t < 10.0) {
      const p = easeInOutCubic((t - 8.8) / 1.2);
      cx = lerp(800, VIEW_W - 220, p);
      cy = lerp(200, 360, p);
    } else {
      cx = VIEW_W - 220;
      cy = 360;
      const tapT = (t - 10.0) / 0.4;
      cScale = tapT < 0.3 ? 0.82 : 1.0;
      const ripR = 14 + tapT * 40;
      const ripOp = Math.max(0, 0.85 * (1 - tapT));
      rippleSvg = `
        <circle cx="${cx}" cy="${cy}" r="${ripR}" stroke="#10B981" stroke-width="2.5" fill="none" opacity="${ripOp}"/>
      `;
    }

    cursorSvg = `
      ${rippleSvg}
      <g transform="translate(${cx}, ${cy}) scale(${cScale})">
        <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6" fill="#10B981"/>
      </g>
    `;
  }

  // =============================================================
  // MODERN WEB BROWSER WINDOW MOCKUP
  // Frame: Width 1140, Height 656, Centered at x: 70, y: 32
  // Bezel radius: 14px
  // Title bar height: 44px
  // =============================================================
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep dark studio backdrop -->
      <radialGradient id="studioBg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0E1626"/>
        <stop offset="100%" stop-color="#04070E"/>
      </radialGradient>

      <!-- Dynamic ambient glow behind browser -->
      <radialGradient id="ambientAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="${glowOpacity}"/>
        <stop offset="60%" stop-color="${glowColor}" stop-opacity="${glowOpacity * 0.3}"/>
        <stop offset="100%" stop-color="${glowColor}" stop-opacity="0"/>
      </radialGradient>

      <!-- Browser content clipping path -->
      <clipPath id="browserClip">
        <rect x="0" y="0" width="${VIEW_W}" height="${VIEW_H}" rx="0"/>
      </clipPath>
    </defs>

    <!-- Studio Backdrop -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#studioBg)"/>

    <!-- Ambient Glow behind Browser Window -->
    <ellipse cx="640" cy="360" rx="580" ry="360" fill="url(#ambientAura)"/>

    <!-- Soft Ground Shadow -->
    <ellipse cx="640" cy="695" rx="480" ry="16" fill="#000000" opacity="0.6"/>

    <!-- ========================================================= -->
    <!-- BROWSER WINDOW FRAME -->
    <!-- ========================================================= -->
    <g transform="translate(${WIN_X}, ${WIN_Y})">
      <!-- Window Shadow -->
      <rect x="-8" y="-4" width="${WIN_W + 16}" height="${WIN_H + 16}" rx="18" fill="#000000" opacity="0.35"/>
      <rect x="-4" y="-2" width="${WIN_W + 8}" height="${WIN_H + 8}" rx="16" fill="#000000" opacity="0.45"/>

      <!-- Window Outer Container -->
      <rect width="${WIN_W}" height="${WIN_H}" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>

      <!-- ======================================================= -->
      <!-- BROWSER TOP TITLE BAR (Chrome / macOS style) -->
      <!-- ======================================================= -->
      <g transform="translate(0, 0)">
        <rect width="${WIN_W}" height="${TITLE_H}" rx="14" fill="#1E293B"/>
        <!-- Fix bottom corners of title bar -->
        <rect y="20" width="${WIN_W}" height="${TITLE_H - 20}" fill="#1E293B"/>
        <line x1="0" y1="${TITLE_H}" x2="${WIN_W}" y2="${TITLE_H}" stroke="#334155" stroke-width="1"/>

        <!-- 3 Window Dots (Red, Yellow, Green) -->
        <circle cx="22" cy="22" r="6" fill="#EF4444"/>
        <circle cx="40" cy="22" r="6" fill="#F59E0B"/>
        <circle cx="58" cy="22" r="6" fill="#10B981"/>

        <!-- URL Address Bar -->
        <g transform="translate(${(WIN_W - 560) / 2}, 8)">
          <rect width="560" height="28" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <!-- SSL Lock Icon (Green) -->
          <circle cx="16" cy="14" r="3.5" fill="none" stroke="#10B981" stroke-width="1.5"/>
          <rect x="12" y="13" width="8" height="6" rx="1.5" fill="#10B981"/>
          <text x="28" y="19" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#94A3B8">
            https://<tspan fill="#F8FAFC">readhub-three.vercel.app</tspan>${t < 3.0 ? "/login" : t < 8.8 ? "/student/dashboard" : "/admin/dashboard"}
          </text>
        </g>
      </g>

      <!-- ======================================================= -->
      <!-- BROWSER VIEWPORT DISPLAY -->
      <!-- ======================================================= -->
      <g transform="translate(0, ${TITLE_H})">
        <g clip-path="url(#browserClip)">
          ${viewContentSvg}
          ${cursorSvg}
        </g>
      </g>
    </g>
  </svg>
  `;
}

async function main() {
  const outVideoPath = path.join(OUT_VIDEOS_DIR, "readhub.mp4");
  const outPosterPath = path.join(OUT_IMAGES_DIR, "readhub-poster.webp");

  console.log(`Spawning FFmpeg to encode ReadHub pure video (${TOTAL_FRAMES} frames) -> ${outVideoPath}...`);

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
    const svgStr = renderReadHubFrame(i);
    const rawRgba = await sharp(Buffer.from(svgStr)).raw().toBuffer();

    // If frame 120 (5.0s, Student Dashboard Overview), save as poster image
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
  console.log(`Generated ReadHub video size: ${(stat.size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
