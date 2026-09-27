# World 04: Star Chart — Build Report

**Branch:** `portfolio/v2-world-04-star-chart`  
**Base:** `portfolio/baseline` (`f3cff4a`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §9.4  
**Category:** Scientific Observational Field / Celestial Navigation Chart  

---

## 1. Executive Summary

Star Chart constructs the portfolio as a precision celestial navigation chart / astronomical observation field:
- **Metaphor**: A dark observational sky (`#12102A` Observation mode, toggleable to `#E9EEF5` Draft mode) populated by 48 deterministically positioned field stars, where the candidate's career, projects, and competencies are mapped as celestial waypoints and constellations.
- **Philosophy**: Scientific precision, quiet authority, deep observational focus. Minimalist line-work (`1px` geometric connections) with zero generic cards, zero decorative glowing shadows, zero floating particles, zero nebula gradients, and zero photographic imagery.
- **Spatial Model**: 6 discrete waypoints on an open observational coordinate field (`#hero`, `#about`, `#projects`, `#skills`, `#experience`, `#contact`), linked visually by an interactive fixed hexagonal Overview loop widget.
- **Orchestrated Motion Moment**: The Constellation Formed (§9.4.4, §9.4.11). Unlike traditional landing pages, the Hero contains **zero orchestrated animation**. Instead, the single motion moment occurs in Projects when DaloyAqua reaches 60% viewport visibility: 1px gold lines draw outward from DaloyAqua's major coordinate star to its 5 exact technology skill nodes (`Spring Boot`, `PostgreSQL`, `Docker`, `Redis`, `REST APIs`) over 800ms linear draw, followed by star dots fading in (250ms). A `sessionStorage` gate (`star-chart-constellation-drawn`) ensures play-once per session, while `prefers-reduced-motion` renders the full constellation immediately at 0ms.
- **Strict Anti-Goals Compliance (§9.4.14)**:
  - Zero invented celestial coordinates, light-years, or magnitudes — all metadata is strictly candidate-authentic.
  - Zero 3D/WebGL canvas simulations.
  - Zero photographic imagery — by explicit design (§9.4.3), this world contains zero portrait or project images; the field is composed purely of stars, precision geometry, and typography.
  - Zero rounded containers (`rounded-none` strictly enforced).
  - Zero generic cards, drop shadows, or gradient borders.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested using `scripts/contrast.mjs scripts/world-04-star-chart-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Observation** (Default) | `--field` | `#12102A` | Observational Deep Night Sky Ground | — | Base |
| **Observation** (Default) | `--ink` | `#DCE6F5` | Star dots, primary readings, headings | **14.72:1** (need 4.5:1) | **PASS** |
| **Observation** (Default) | `--ink-2` | `#9AA6C4` | Coordinate data, technical descriptions | **7.61:1** (need 4.5:1) | **PASS** |
| **Observation** (Default) | `--gold` | `#F3D48B` | Reserved Accent (Major star, active links, constellation) | **12.88:1** (need 4.5:1) | **PASS** |
| **Draft** (Light) | `--field` | `#E9EEF5` | Celestial Paper Ground | — | Base |
| **Draft** (Light) | `--ink` | `#181530` | Deep blue ink text & primary geometry | **15.15:1** (need 4.5:1) | **PASS** |
| **Draft** (Light) | `--ink-2` | `#4B4870` | Secondary ink & technical readings | **7.32:1** (need 4.5:1) | **PASS** |
| **Draft** (Light) | `--gold` | `#8A6A1E` | Solar Amber Accent (Threshold, active waypoint) | **4.33:1** UI (need 3.0:1) | **PASS** |

**Verification Result:** 6/6 test pairs PASSED with generous safety margins. Exactly one warm metallic accent (`--gold`) is used across the world, reserved strictly for:
1. The primary constellation lines and DaloyAqua anchor star
2. The current active waypoint indicator in the Overview widget
3. Active role bullet and terminal contact star
4. High-priority interactive chart links

### 2.2 Typography Hierarchy

- **Display**: `Space Grotesk` (600, 700) — Observational title, waypoint headings, major star names.
- **Body**: `Public Sans` (400, 500) — Clear, objective candidate bio, project rationale, role descriptions.
- **Technical Metadata**: `JetBrains Mono` (400, 500) — Waypoint numbers (`[WP-01]`), date ranges, status badges, skill catalogs, and terminal readings.

---

## 3. Structural Implementation

### 3.1 Overview Waypoint Widget (`components/starchart/OverviewWidget.tsx`)
- Fixed at the top-right (`top-6 right-6`), providing an interactive hexagonal loop connecting the 6 waypoints.
- Active waypoint is dynamically tracked via `IntersectionObserver` across all 6 sections.
- Desktop view features an SVG loop with interactive dot nodes, expanding labels on hover/focus, and an active pulsing outer ring.
- Mobile view provides a compact trigger button expanding into a full waypoint modal sheet with accessible keyboard navigation and `aria-expanded` state.
- Integrated Draft/Observation mode toggle positioned cleanly as the 7th coordinate dot.

### 3.2 Hero Waypoint (`components/starchart/StarHero.tsx`)
- Section `[WP-01] // ORIGIN`.
- Space Grotesk nameplate with mono observation badge `OBSERVATIONAL FIELD // SECTOR 01`.
- Clean Public Sans introduction and authentic role statement.
- Instant, zero-orchestrated presentation for fastest possible LCP.

### 3.3 About Waypoint (`components/starchart/StarAbout.tsx`)
- Section `[WP-02] // MERIDIAN`.
- Authentic bio text divided into clear observational reading panes.
- Candidate metadata (location, education, status) organized in a precision 4-point mono grid.

### 3.4 Projects Waypoint (`components/starchart/StarProjects.tsx`)
- Section `[WP-03] // CONSTELLATION`.
- Features DaloyAqua as the primary constellation anchor star.
- On desktop, an interactive SVG canvas renders 1px constellation lines drawing outward to 5 verified skill nodes (`Spring Boot`, `PostgreSQL`, `Docker`, `Redis`, `REST APIs`).
- On mobile, an accessible tabular dot matrix renders with identical semantic structure.
- Supporting projects (Portfolio, Task Flow, Microservices Sandbox) are mapped as secondary celestial nodes with live repository/demo links.

### 3.5 Skills Waypoint (`components/starchart/StarSkills.tsx`)
- Section `[WP-04] // SPECTRA`.
- Complete catalog of candidate skills mapped in JetBrains Mono with hollow/filled coordinate dot markers.
- Grouped systematically into Languages, Frameworks, Infrastructure, and Architecture.

### 3.6 Experience Waypoint (`components/starchart/StarExperience.tsx`)
- Section `[WP-05] // EPOCH`.
- Chronological timeline featuring a vertical 1px guide line with star-dot bullets.
- Current active posting highlighted with the warm gold coordinate star.

### 3.7 Contact Waypoint (`components/starchart/StarContact.tsx`)
- Section `[WP-06] // TERMINAL`.
- Terminal beacon with gold star dot, unedited mailto address, one-click copy button with screen-reader feedback (`role="status"`), and direct links to GitHub and LinkedIn.

---

## 4. Accessibility & Performance Verification

- **Keyboard Navigation**: Full skip link (`#content`), logical tab order across all waypoints, Overview widget, and action links. Focus states rendered using crisp 2px `--gold` outlines with 2px offset.
- **Reduced Motion**: Under `prefers-reduced-motion: reduce`, all CSS transitions, line-draw animations, and pulsing rings are completely disabled (`animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important`).
- **Forced Colors Mode**: Under `@media (forced-colors: active)`, all custom colors and SVG strokes adapt to `CanvasText`, `Highlight`, and `LinkText`.
- **Quality Gates**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **0 errors** (prerendered all 8 routes in Turbopack)
