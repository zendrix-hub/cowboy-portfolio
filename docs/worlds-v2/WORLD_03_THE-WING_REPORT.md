# World 03: The Wing — Build Report

**Branch:** `portfolio/v2-world-03-the-wing`  
**Base:** `portfolio/baseline` (`f3cff4a`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §9.3  
**Category:** Walkable Spatial Gallery / Institutional Exhibition  

---

## 1. Executive Summary

The Wing constructs the portfolio not as a printed document, but as a walkable architectural gallery wing of a permanent institution:
- **Metaphor**: A sequence of six physical **rooms** separated by a **threshold** (a 3px `--brass` line across the room's entrance) and announced by an authentic wayfinding **plaque**.
- **Philosophy**: Institutional calm and spaciousness. Generous breathing room (`clamp(64px, 12vh, 160px)` padding) gives each installation space to stand on its own merit.
- **Spatial Model**: Discrete rooms you move through (`min-height: 90svh`). Right angles only — zero border-radius anywhere, zero box-shadows.
- **Orchestrated Motion Moment**: The Plan Unveiled. On first visit per session, the fixed floor-plan widget's six room outlines draw sequentially via `stroke-dashoffset` (~600ms total), followed by the active room filling with warm brass. Repeat visits and `prefers-reduced-motion` display immediately at 0ms.
- **Strict Anti-Goals**: Zero 3D/WebGL simulation, zero faux marble or concrete photographic textures, zero path-and-stops devices (strictly avoiding Biyahe's signature transit motif), zero forced museum jargon ("Provenance", "Medium"), and zero filled app buttons.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested using `scripts/contrast.mjs scripts/world-03-the-wing-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Daylight** | `--concrete` | `#E7E4DE` | Room Ground (Warm Architectural Concrete) | — | Base |
| **Daylight** | `--ink` | `#1C1A17` | Text, plaque borders, exhibit frames | **13.68:1** (need 4.5:1) | **PASS** |
| **Daylight** | `--ink-2` | `#4C4740` | Captions, wall-label body | **7.25:1** (need 4.5:1) | **PASS** |
| **Daylight** | `--brass` | `#8A5F1F` | Reserved Accent (Threshold edge, active room) | **4.43:1** UI (need 3.0:1) | **PASS** |
| **Gallery lights** | `--concrete` | `#171512` | Dark Room Ground | — | Base |
| **Gallery lights** | `--ink` | `#EDE8E0` | Text, plaque borders, exhibit frames | **14.94:1** (need 4.5:1) | **PASS** |
| **Gallery lights** | `--ink-2` | `#B8B0A3` | Captions, wall-label body | **8.48:1** (need 4.5:1) | **PASS** |
| **Gallery lights** | `--brass` | `#E4A54B` | Reserved Accent | **8.49:1** UI (need 3.0:1) | **PASS** |

**Verification Result:** 6/6 test pairs PASSED with high safety margins. Exactly one warm accent (`--brass`) is used across the world, reserved strictly for:
1. The leading threshold line across each room's entrance
2. The current active room fill in the floor plan / directory
3. Active role timeline plaque indicator

### 2.2 Typography Hierarchy

- **Display**: `Archivo` (600, 700) — Candidate name, room titles, plaque numbers, exhibit titles.
- **Body & Meta**: `Inter` (400, 500, 600) — Body copy, wall-label text, captions, outlined buttons.
- **Scale**:
  - Hero Name: `clamp(2.75rem, 9.5vw, 7.25rem)` / line-height 0.95
  - Room Titles: `clamp(2rem, 5vw, 4rem)` / line-height 1.0
  - Body: `1.0625rem` / line-height 1.7 (generous institutional measure)
  - Wall-Label Body: `0.9375rem` / line-height 1.5–1.65
  - Plaque Numerals: `0.8125rem` font-archivo tracking-wider

All fonts loaded via `next/font/google` with Latin subsetting and `display: "swap"`. Combined font weight: ~70 KB gzipped (well under the ≤90 KB budget).

---

## 3. Signature Elements & Devices

1. **The Threshold & Wayfinding Plaque (`components/wing/RoomThreshold.tsx`)**:
   - A 3px `--brass` threshold line spanning the full width of the room's entrance.
   - An authentic wayfinding plaque (`Room 01 • ENTRANCE`, etc.) mounted at the left edge in Archivo font with a 1px `--ink` border (`aria-hidden="true"`).
2. **The Floor-Plan Navigator (`components/wing/FloorPlanNav.tsx`)**:
   - **Desktop/Tablet (≥640px)**: A fixed architectural widget in the bottom-right corner (~160×110px). Displays an interactive top-down schematic of six gallery rooms branching off a central corridor.
   - Features sequenced SVG outline drawing on first visit per session (~600ms total), with the current room filled in `--brass`.
   - Hover and focus states dynamically reveal room titles.
   - **Mobile (<640px)**: Replaced by a fixed bottom "Directory" button invoking a native `<dialog>` styled as a lobby building directory board with 6 rooms, brass active bar, focus trap, and `Escape`-to-close.
3. **Containers System (§9.3.3)**:
   - Exactly three container types:
     1. The **Plaque** (room identification, entrance wayfinding, terminal exit)
     2. The **Frame** (1px `--ink` border surrounding installations)
     3. The **Wall Label** (authentic museum/gallery-style card with title, description, stack, and links)
4. **Outlined Signage Buttons**:
   - Buttons (`.wing-btn`) are 1px `--ink` outlined rectangles with 48px touch target and zero fill, styled like engraved metal/glass institutional signage.

---

## 4. Section Structure & Verification

### Room 01: Entrance (`#room-01`)
- Wayfinding threshold and plaque for Room 01.
- Candidate name in Archivo 700 at hero scale, centered.
- Role and intro narrative in Inter.
- Outlined actions: `[ See projects ]` and `[ Send an email ]`.

### Room 02: Profile (`#room-02`)
- Wayfinding threshold and plaque for Room 02.
- Central reading column serving as the gallery's "artist statement".
- Outer margin wall labels (desktop) mounted on surrounding boundaries for Academic Base, Enterprise Role, Coordinates, and Core Focus.

### Room 03: The Exhibits (`#room-03`)
- **Main Wall (DaloyAqua)**:
  - Large exhibit frame with architectural schematic diagram.
  - Wall label beside it featuring title, status (`[In Progress]`), full description, stack, and direct action links.
- **Secondary Wall (Supporting Projects)**:
  - 3-column row of framed exhibit installations for `PlayIT`, `ReadHub`, and `Gordon RamsAi` with accompanying wall labels.

### Room 04: The Collection (`#room-04`)
- Wayfinding threshold and plaque for Room 04.
- Technical disciplines cataloged by category in Archivo.
- Sharp rectangular outlined tags (1px `--ink`, zero radius) wrapping within rows.

### Room 05: The Record Wall (`#room-05`)
- Wayfinding threshold and plaque for Room 05.
- Chronology displayed as individual timeline plaques with period in top corner.
- Active role highlighted with a 4px `--brass` left border.

### Room 06: The Exit (`#room-06`)
- Wayfinding threshold and plaque for Room 06.
- Final terminal plaque engraved with direct mailto address.
- Outlined "Copy address" button with polite live region confirmation (`role="status"`).
- External indices and exhibition colophon footer.

---

## 5. Navigation & Responsiveness

### 5.1 Floor-Plan Navigator & Directory Board
- **Desktop (≥1024px)**: Fixed corner widget with sequenced SVG draw, hover labels, and scrollspy tracking via `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).
- **Tablet (640–1023px)**: Compact 120×80px widget.
- **Mobile (<640px)**: Bottom "Directory" button with safe-area padding opening a full-page modal dialog.
- **Edition Switcher**: Integrated in floor-plan widget and directory dialog, toggling smoothly between Daylight (default) and Gallery lights modes.

---

## 6. Accessibility & Quality Gates

- **Contrast**: 6/6 pairs passed WCAG 2.2 AA (ratios from 4.43:1 to 14.94:1).
- **Focus Rings**: `:focus-visible` with `outline: 2px solid var(--ink)` and `outline-offset: 4px`.
- **Forced Colors (`@media (forced-colors: active)`)**: Explicit `CanvasText` borders for plaques/frames and `Highlight` for threshold lines.
- **Reduced Motion**: Sequenced SVG drawing suppressed to 0ms under `prefers-reduced-motion: reduce`.
- **Code Quality Checks**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **8/8 routes prerendered successfully with Turbopack**

---

## 7. Anti-Generic Check (§14.4)

> *Could this design be found in a generic AI-generated developer portfolio template?*

**No.** The Wing establishes a spatial reality completely distinct from typical web templates:
1. It eliminates card-based grids in favor of spatial rooms with threshold lines and door-side plaques.
2. The interactive floor plan provides a literal top-down architectural layout of the exhibition space.
3. Projects are hung as gallery exhibits paired with authentic museum wall labels.
4. Buttons emulate engraved institutional signage rather than SaaS app pills.
5. The warm concrete palette and refined brass accents create an atmosphere of quiet, confident craftsmanship.
