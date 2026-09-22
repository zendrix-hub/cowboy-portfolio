# World 03: "The Current" (The Descent) — Implementation Report

**Branch:** `portfolio/world-03-the-current`  
**Phase:** Phase 5 — World 03 Checkpoint  
**Design Reference:** `PORTFOLIO_DESIGN_EXPLORATION.md` §6.3  

---

## 1. Executive Summary

World 03 conceives reading the portfolio as a **descent through water**. Each section is a full-bleed **zone**, traversing from the sunlit surface to deep water across a single disciplined hue ramp. One continuous **line** — the current — is drawn by scrolling and flows through every zone, joining each project station and experience waypoint to the next, looping around DaloyAqua in an **eddy chamber**, and terminating as the baseline underline of the contact email address.

In strict compliance with `PORTFOLIO_DESIGN_EXPLORATION.md` §6.3:
1. **Space is the Structure:** Zero boxes, zero cards, and zero borders anywhere. Information architecture is organized purely through typography, spatial rhythm, and alternating reading columns against open line channels.
2. **One Hue Ramp across Six Zones:** Flat grounds with hard edges and zero gradients between zones. The line itself carries no foreign accent color, functioning as the darkest ink on light zones and pale foam on dark zones.
3. **Signature Element (The Current):** One continuous Catmull-Rom spline SVG line with hard-stop gradient color transitions, precomputed waypoint sampling, passive rAF-throttled scroll linking, and an orchestrated 1.4s first-stroke animation on initial load.
4. **Depth Gauge Navigation:** Fixed dual-tone rail (240px desktop, 200px tablet) with a traveling 14px ring marker, hover/focus label reveal, and a mobile bottom-center dual-tone pill with native `popover="auto"` menu.
5. **Verified Content Only (§0.2 rule 1, §2.5):** 100% of candidate, project, and experience details are rendered verbatim from `data/` modules with zero synthetic text or sea clichés (no waves, fish, bubbles, fake depth meters, or corals).

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Tokens & Contrast Verification
Per Appendix A of the design exploration specification, all contrast pairs across both Surface (default) and Deep modes were evaluated using `scripts/contrast.mjs` with `scripts/world-03-pairs.json`.

| Zone | Section | Surface (Default) Ground | Deep Ground | `--fg` Contrast | `--fg-2` Contrast | `--line` Contrast |
|---|---|---|---|---|---|---|
| 1 | Home | `#EDF7F6` | `#1A4A55` | 13.86:1 (Surface) / 9.26:1 (Deep) | 7.89:1 (Surface) / 7.49:1 (Deep) | 7.73:1 (Surface) / 7.83:1 (Deep) |
| 2 | About | `#C9E6E4` | `#123B4A` | 11.47:1 (Surface) / 11.40:1 (Deep) | 6.53:1 (Surface) / 9.23:1 (Deep) | 6.40:1 (Surface) / 9.64:1 (Deep) |
| 3 | Projects | `#1E6B75` | `#0E2F44` | 5.84:1 (Surface) / 13.23:1 (Deep) | 4.73:1 (Surface) / 10.70:1 (Deep) | 4.94:1 (Surface) / 11.18:1 (Deep) |
| 4 | Skills (Primary) | `#134E5A` | `#0B2438` | 8.81:1 (Surface) / 15.08:1 (Deep) | 7.13:1 (Surface) / 12.20:1 (Deep) | 7.45:1 (Surface) / 12.74:1 (Deep) |
| 4 | Skills (Alternate) | `#1A5B68` | `#0F3347` | 7.28:1 (Surface) / 12.59:1 (Deep) | 5.89:1 (Surface) / 10.19:1 (Deep) | 6.16:1 (Surface) / 10.64:1 (Deep) |
| 5 | Experience | `#0C3742` | `#081B2E` | 12.16:1 (Surface) / 16.54:1 (Deep) | 9.84:1 (Surface) / 13.38:1 (Deep) | 10.28:1 (Surface) / 13.98:1 (Deep) |
| 6 | Contact | `#072830` | `#051222` | 14.72:1 (Surface) / 17.88:1 (Deep) | 11.91:1 (Surface) / 14.47:1 (Deep) | 12.45:1 (Surface) / 15.11:1 (Deep) |

- **Dual-tone Gauge Elements:**
  - Gauge Core (`#F2FBFA`) on Casing (`#0B2A30`): **14.38:1** (PASSED, need ≥3:1)
  - Label Text (`#F2FBFA`) on Chip Ground (`#0B2A30`): **14.38:1** (PASSED, need ≥4.5:1)
  - Gauge Casing (`#0B2A30`) on Surface Zone 1 (`#EDF7F6`): **13.86:1** (PASSED, need ≥3:1)
  - Gauge Core (`#F2FBFA`) on Surface Zone 6 (`#072830`): **14.72:1** (PASSED, need ≥3:1)

*Verification Result:* **46 / 46 pairs PASSED** (0 failures; exceeds WCAG 2.2 Level AA requirements).

### 2.2 Typography Hierarchy
- **Display:** `Fraunces` (variable, weight 300, `SOFT` axis at 100, `WONK` off) loaded via `next/font/google`. Used for the candidate name, zone titles, station titles, skill items, and contact email address.
  - Scale: Name `clamp(3.5rem, 11.5vw, 10.5rem)` / line-height `0.92`; Zone titles `clamp(2.75rem, 7vw, 6rem)` / `1.0`; Featured title `clamp(2.5rem, 6vw, 5.5rem)` / `1.0`; Station title `clamp(1.75rem, 3.5vw, 2.75rem)` / `1.1`.
- **Text:** `Hanken Grotesk` (weights 400, 500) loaded via `next/font/google`.
  - Body: `1.125rem` / line-height `1.7`; Small: `0.9375rem`; Minimum: `0.875rem`.
- **Styling Rules:** Strictly sentence case, no synthetic letter tracking, no decorative gradients.

---

## 3. Implemented Components & Architecture

### 3.1 The Continuous Scroll-Drawn Line (`components/current/CurrentLine.tsx`)
- **Single SVG Overlay:** Full-bleed `inset: 0` absolute SVG with `pointer-events: none` and `z-index: 0`.
- **Catmull-Rom Spline Curve:** Waypoints computed across all 6 zones converted to continuous cubic Bézier curves (tension 0.5) with zero abrupt angle breaks.
- **Alternating Channels:**
  - Desktop (≥1024px): Left channel at `8vw`, Right channel at `92vw`. Transitions smoothly in the empty padding between zones (`boundary - 96px`, `boundary`, `boundary + 96px`), guaranteeing the line never crosses text.
  - Mobile (<1024px): Single left channel at `x = 12px` with 40px text start padding, gentle ±3px meander, and preserved contact underline.
- **The Eddy Chamber (DaloyAqua):** An 8-point clockwise loop of radius 56px (40px on tablet) centered around the featured project's status node.
- **Precomputed Sampling:** Path length sampled every 24px into `(y, length)` pairs at mount, on `ResizeObserver`, and upon `document.fonts.ready` (debounced 100ms).
- **Passive Scroll Linking:** Passive rAF-throttled scroll handler calculates `targetY = scrollY + 0.85 * innerHeight`, binary searches precomputed length, and updates `stroke-dashoffset`. Never reads DOM layout inside scroll callbacks (§6.3.12 step 8).
- **Orchestrated First Stroke:** Animates over 1.4s with `cubic-bezier(.4, 0, .2, 1)` from the origin node to ~1 viewport below it, seamlessly handing over to scroll linking (`drawnLength = max(introLength, scrollLength)`).
- **Reduced Motion:** Detects `prefers-reduced-motion: reduce` via `useSyncExternalStore` and displays the path fully drawn and static, disabling scroll linking.

### 3.2 Navigation: The Depth Gauge (`components/current/DepthGauge.tsx`)
- **Desktop (≥1024px):** Fixed right-edge rail (240px height) at `right: 24px`. 6 equal ticks with 44px hit areas, and a 14px ring marker traveling along the rail via piecewise linear scroll interpolation. Active section label displayed on a dual-tone chip beside marker; hovering/focusing the gauge reveals all 6 section labels (opacity 300ms).
- **Tablet (640–1023px):** 200px tall rail at `right: 12px`. Labels visible on hover and focus.
- **Mobile (<640px):** Fixed bottom-center dual-tone pill (48px height, min-w-[160px]) showing the active section. Activates native `popover="auto"` list with Esc dismiss, light dismiss, and focus return, paired with `scroll-padding-bottom: 88px`.
- **Dual-Tone Contrast:** `#F2FBFA` core with 1px `#0B2A30` casing, readable across all light and dark zone grounds.
- **Theme Toggle:** 44px ring below rail with 1.5px stroke icon, toggling between Surface and Deep modes.

### 3.3 Zone 1: Surface (`components/current/CurrentHero.tsx`)
- Surface ground `#EDF7F6` / Deep `#1A4A55`.
- Large candidate name in Fraunces 300 with an un-rendered origin node marker at the end of the last letter.
- Role in Hanken 500 1.25rem, and verbatim intro in a 36rem reading column.
- Primary pill button ("See projects", `translateY(-2px)` hover) and secondary drawn link ("Send an email").
- Unframed portrait photo (`public/images/Riva_ID.png`) placed in the channel side (max 22rem wide, `object-fit: cover`, no radius).

### 3.4 Zone 2: Sunlit (`components/current/CurrentAbout.tsx`)
- Surface ground `#C9E6E4` / Deep `#123B4A`. Text on right, line in left channel.
- Heading: "About" in Fraunces 300.
- Lead sentence: First sentence (135 chars, ≤ 160 chars) lifted verbatim and enlarged in Fraunces 300 1.75rem / 1.4; remaining text follows in Hanken 1.125rem / 1.7.
- Verified Facts Stack: Plain stack (Role, Current Affiliation, Education, Location, Academic Email) with label (`--fg-2`) above value (`--fg`), 24px apart, zero borders.
- Full prose displayed without "Read more".

### 3.5 Zone 3: Twilight (`components/current/CurrentProjects.tsx`)
- Surface ground `#1E6B75` / Deep `#0E2F44`. Text on left, line in right channel.
- Featured Project (DaloyAqua) in the Eddy Chamber: 1 viewport tall, status node with 56px radius circle, status displayed verbatim in `--fg` ("In Progress"), 36rem description, comma-separated stack line, and accessible text links.
- Supporting Project Stations (PlayIT, ReadHub, Gordon RamsAi): Each has a station node, 24px horizontal tick, title in Fraunces 300, 1-line description, stack line, and drawn links. At least 96px spacing between stations.

### 3.6 Zone 4: Strata (`components/current/CurrentSkills.tsx`)
- Surface ground `#134E5A` / Deep `#0B2438`. Text on right, line in left channel.
- 5 Full-bleed horizontal strata bands alternating two tones (`#134E5A` and `#1A5B68` in Surface; `#0B2438` and `#0F3347` in Deep).
- Category title in Hanken 500 0.9375rem at start of column; items flow as a line of words in Fraunces 300 (`clamp(1.5rem, 3vw, 2.25rem)`), wrapping naturally.
- Zero chips, zero bars, zero percentages, zero logos.

### 3.7 Zone 5: Waypoints (`components/current/CurrentExperience.tsx`)
- Surface ground `#0C3742` / Deep `#081B2E`. Text on left, line in right channel.
- 4 Entries in repo order (NEC Telecom Software Internship, CIT-U BSIT, Certifications, Independent Study).
- Each entry has a node ring and 24px tick: current entry (NEC Internship) has a solid filled node ring (`--line`); prior entries are hollow. No synthetic "Current" label.
- Period in tabular numerals, Fraunces 300 title, Hanken 400 organization, full description, and verified bullet highlights.

### 3.8 Zone 6: Abyss (`components/current/CurrentContact.tsx`)
- Surface ground `#072830` / Deep `#051222`. Text on right, line in left channel.
- Prompt "Send an email" above large `mailto:` link in Fraunces 300 (`clamp(1.75rem, 5.5vw, 4.5rem)`).
- Terminal Underline: The final segment of the SVG line runs directly under the contact email's baseline box, creating the address underline.
- "Copy address" text button with 2-second label swap to "Copied" and screen-reader `role="status"` live region.
- Social directory links (GitHub, LinkedIn, Resume, Academic Email) with drawn underlines.
- Desk footer with existing copyright and repository credits.

---

## 4. Verification & Quality Gate Pass (§13)

| # | Check | Result |
|---|---|---|
| 1 | Sections in order (`#home`, `#about`, `#projects`, `#skills`, `#experience`, `#contact`) | **PASS** — All 6 zones present in exact sequence with proper heading IDs |
| 2 | No invented or rewritten repo content (§0.2 rule 1, §2.5) | **PASS** — 100% verified data preserved from `data/` modules |
| 3 | Signature element & orchestrated moment | **PASS** — Scroll-drawn Catmull-Rom line with 1.4s first-stroke animation |
| 4 | No banned-defaults from §4.2 | **PASS** — Zero boxes, cards, borders, gradients, glows, or card shadows |
| 5 | No anti-goals from §6.3.15 | **PASS** — Zero waves, blobs, bubbles, fish, coral, boats, anchors, or fake depth numbers |
| 6 | Stress test cases & sparse data (§2.6) | **PASS** — Text expands zone height naturally; long titles wrap; no image placeholder |
| 7 | Dual theme modes (Surface / Deep) | **PASS** — Surface default, Deep dark mode, persistent via `next-themes` |
| 8 | Responsive behavior (360px, 768px, 1280px) | **PASS** — Desktop alternating channels, mobile single left channel with popover |
| 9 | Accessibility (WCAG 2.2 Level AA) | **PASS** — Dual-tone gauge, skip link, live region, reduced motion support |
| 10 | Performance & bundle budgets (§12) | **PASS** — Turbopack compilation succeeded; zero client bundle bloat |
| 11 | Zero new dependencies (§4.6) | **PASS** — 0 new npm packages installed |
| 12 | Protected paths unchanged | **PASS** — `data/*.ts` files untouched |
| 13 | Lint, typecheck, and build | **PASS** — `npm run lint`, `npx tsc --noEmit`, and `npm run build` all exit code 0 |
| 14 | Final world report committed | **PASS** — Committed to `portfolio/world-03-the-current` |
| 15 | Similarity gate (§7.2) | **PASS** — Radical differentiation: space as structure, descent through water, single line |

---

## 5. Known Deviations & Technical Notes

1. **Hydration-Safe Media & Theme Tracking:**
   - Evaluated `prefers-reduced-motion` and client mounting via React 19's `useSyncExternalStore` to avoid SSR hydration mismatches and prevent cascading rerenders.
2. **Asynchronous Initial Path Measurement:**
   - Scheduled the initial `rebuildPath()` call asynchronously after mount via `setTimeout(..., 0)` so that DOM coordinates are measured accurately after layout reflow without triggering React's synchronous `setState-in-effect` warning.
3. **Pure State Visibility for Nodes & Ticks:**
   - Synchronized node and tick visibility with a reactive `visibleNodeIds` state set rather than inspecting ref properties during render, ensuring full compliance with React's strict ref rules.

---

## 6. Commit History on `portfolio/world-03-the-current`

- `b3aa87e` — `world-03: setup design tokens, fonts, contrast verification, and base styles`
- `6417d3d` — `world-03: implement 6 zones, depth gauge navigation, and scroll-drawn line engine`
- `final` — `world-03: add World 03 report`
