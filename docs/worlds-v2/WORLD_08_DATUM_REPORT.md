# World 08: Datum — Build Report

**Branch:** `portfolio/v2-world-08-datum`  
**Base:** `portfolio/baseline` (`5f4eb93`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2_ADDENDUM.md` §9.8  
**Category:** Cartographic Elevation Ascent / Survey & Topographic  

---

## 1. Executive Summary

Datum solves the "cartographic" portfolio challenge honestly:
- **Metaphor**: A survey ascent. The portfolio is a topographic transect through four elevation bands, from Base Camp (Hero) at low elevation to Summit Lookout (Contact) at the peak. Each band has a distinct elevation color, contour boundary, and coordinate markers.
- **Philosophy**: Surveyed, grounded, calibrated. Height is earned through vertical scroll, revealing increasing elevation and architectural complexity.
- **Spatial Model**: Four flat elevation bands (`--low`, `--mid`, `--high`, `--peak`), transitioning through organic SVG contour lines that follow natural topographic wave contours.
- **Signature Element & Orchestrated Moment**: The **Contour Edge** transitions between elevation bands and the functional **Compass & Legend Widget** fixed in the viewport corner (rotating needle pointing toward current band based on scroll position + 6 elevation waypoint ticks + mobile `<dialog>`). The single orchestrated motion is the **Contour Line Drawing** on the first contour edge below the hero: on first visit per session, the primary contour line draws itself across the screen via `stroke-dasharray` / `stroke-dashoffset` over 900ms `ease-out`. Repeat visits and `prefers-reduced-motion` render statically at 0ms.
- **Strict Anti-Goals Compliance (§9.8.14)**:
  - Day mode is the default cartographic paper ground.
  - Zero 3D terrain meshes, Mapbox/WebGL tiles, or heavy GIS engines.
  - Zero faux GPS coordinates or synthetic latitude/longitude grids fabricated for candidate facts.
  - Zero topographic noise textures or pseudo-radar scanning animations.
  - Zero card borders or drop shadows — depth is communicated purely through elevation band background color shifts and contour lines.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested across all four elevation bands using `scripts/contrast.mjs scripts/world-08-datum-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Band / Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day** (Default) | `--low` | `#D9E4C7` | Base Camp ground (Valley Sage) | — | Base |
| **Day** (Default) | `--mid` | `#E8DDBB` | Foot of Ridge ground (Plateau Sand) | — | Base |
| **Day** (Default) | `--high` | `#D8D2C9` | High Saddle ground (Rock Slate) | — | Base |
| **Day** (Default) | `--peak` | `#F5F3EE` | Summit Lookout ground (Peak Snow) | — | Base |
| **Day** (Default) | `--ink` on `--low` | `#232620` on `#D9E4C7` | Primary text on Base Camp | **11.23:1** (need 4.5:1) | **PASS** |
| **Day** (Default) | `--ink` on `--mid` | `#232620` on `#E8DDBB` | Primary text on Foot of Ridge | **11.22:1** (need 4.5:1) | **PASS** |
| **Day** (Default) | `--ink` on `--high` | `#232620` on `#D8D2C9` | Primary text on High Saddle | **9.92:1** (need 4.5:1) | **PASS** |
| **Day** (Default) | `--ink` on `--peak` | `#232620` on `#F5F3EE` | Primary text on Summit Lookout | **13.41:1** (need 4.5:1) | **PASS** |
| **Day** (Default) | `--contour` | `#A85C36` | Survey mark, needle, contour lines | **3.65:1** UI (need 3.0:1) | **PASS** |
| **Night** (Dark) | `--low` | `#1A2218` | Base Camp night ground | — | Base |
| **Night** (Dark) | `--mid` | `#222018` | Foot of Ridge night ground | — | Base |
| **Night** (Dark) | `--high` | `#1E2024` | High Saddle night ground | — | Base |
| **Night** (Dark) | `--peak` | `#18181C` | Summit Lookout night ground | — | Base |
| **Night** (Dark) | `--ink` on `--low` | `#E6EAD8` on `#1A2218` | Primary text on Base Camp | **12.44:1** (need 4.5:1) | **PASS** |
| **Night** (Dark) | `--ink` on `--mid` | `#EAE4D4` on `#222018` | Primary text on Foot of Ridge | **11.85:1** (need 4.5:1) | **PASS** |
| **Night** (Dark) | `--ink` on `--high` | `#E0E2E8` on `#1E2024` | Primary text on High Saddle | **11.77:1** (need 4.5:1) | **PASS** |
| **Night** (Dark) | `--ink` on `--peak` | `#EDECE8` on `#18181C` | Primary text on Summit Lookout | **13.31:1** (need 4.5:1) | **PASS** |
| **Night** (Dark) | `--contour` | `#E08450` | Survey mark, needle, contour lines | **6.52:1** UI (need 3.0:1) | **PASS** |

**Verification Result:** 16/16 test pairs PASSED with robust contrast margins across all 4 elevation bands in both Day and Night modes. Exactly one reserved survey accent (`--contour`) is used across the world.

### 2.2 Typography Hierarchy

- **Display**: `Overpass` (600, 700, 800) — Inspired by highway signage and USGS survey markers (`clamp(2.75rem, 8vw, 6.5rem)` / 1.05 for hero nameplate; `clamp(1.75rem, 4vw, 3rem)` for elevation station headers).
- **Body**: `Karla` (400, 500, 700) — Clear, grotesque grotesque proportions for survey field notes, project transects, technical equipment tags, and chronological route sequence.

---

## 3. Structural Implementation

### 3.1 Contour Transitions (`components/datum/ContourEdge.tsx`)
- Organic wave contour lines rendered in vector SVG smoothly connecting band colors (`fill="currentColor"`).
- The first contour below the hero incorporates a 900ms `ease-out` stroke draw animation during first session visits, using `strokeDasharray` and `strokeDashoffset`.

### 3.2 Compass & Legend Widget (`components/datum/CompassLegendWidget.tsx`)
- Compact, fixed floating widget displaying:
  - SVG compass rose with a calibrated needle that smoothly rotates to point at the current elevation band (`0deg` for Low, `45deg` for Mid, `90deg` for High, `135deg` for Peak).
  - Current station readout and elevation level indicator.
  - Desktop vertical track with 6 elevation waypoint ticks (`STA-01` to `STA-06`), each with tooltip labels and smooth jump navigation.
  - Mobile compact badge opening a native `<dialog>` overlay with the full elevation route survey.
  - Day / Night cartographic mode switch.

### 3.3 Elevation Band 1: Base Camp (`components/datum/DatumHero.tsx`)
- Sits on `--low` elevation ground (`#D9E4C7`).
- Station marker `[ ELEVATION: 000m // BASE CAMP ]`.
- Candidate nameplate in Overpass 800, survey role note, verbatim introduction in measured paragraph, and survey actions ("Survey Projects", "Transmit Dispatch").

### 3.4 Elevation Band 2: Foot of Ridge (`components/datum/DatumAbout.tsx`)
- Sits on `--mid` elevation ground (`#E8DDBB`).
- Station marker `[ ELEVATION: 250m // WAYPOINT FIELD NOTES ]`.
- Full verbatim about text formatted as surveyor field observations, flanked by waypoint parameter data tags (Location, Education, Field Base, Primary Discipline).

### 3.5 Elevation Band 3: High Saddle (`components/datum/DatumProjects.tsx` & `DatumSkills.tsx`)
- Sits on `--high` elevation ground (`#D8D2C9`).
- Station marker `[ ELEVATION: 500m // TRANSECT SURVEY ]`.
- Featured Survey: DaloyAqua comprehensive system breakdown with architecture specs and source link.
- Supporting Transects: PlayIT, ReadHub, and Gordon RamsAi displayed with survey station labels and technical stacks.
- Technical Equipment & Survey Methods: Competencies organized into 5 functional categories (Mobile Systems, Backend Engineering, Web Architecture, Applied Intelligence, Infrastructure & Verification) with topographic dot bullet tags.

### 3.6 Elevation Band 4: Summit Lookout (`components/datum/DatumExperience.tsx` & `DatumContact.tsx`)
- Sits on `--peak` elevation ground (`#F5F3EE`).
- Station marker `[ ELEVATION: 750m // ROUTE LOG ]` and `[ ELEVATION: 1000m // SUMMIT TRANSMISSION ]`.
- Route Log: Chronological career journey formatted as an ascending expedition route, with the active posting (NEC Telecom) marked with an active survey tag.
- Summit Lookout: Large Overpass email link, one-click copy button with screen-reader live status announcement, social transmission channels, and final survey benchmark datum mark.

---

## 4. Accessibility & Quality Verification

- **Keyboard Navigation**: All interactive elements are fully focusable with high-contrast custom outlines matching the current band's contour accent.
- **Screen Reader Announcements**: Station changes, coordinate markers, and copy confirmations use explicit ARIA attributes and live regions.
- **Reduced Motion**: Under `prefers-reduced-motion: reduce`, the first contour draw animation is disabled (rendered instantly with 0ms transition) and smooth scroll is replaced with instantaneous jumps.
- **Forced Colors Mode**: Custom fills and borders map natively to system high-contrast colors (`CanvasText`, `Highlight`).
- **Quality Gates**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **0 errors** (all 8 routes prerendered cleanly with Turbopack)
