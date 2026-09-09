# Portfolio Theme Experiments & Architectural Protocol

> **Repository:** `zendrix-hub/cowboy-portfolio`  
> **Created:** September 9, 2026  
> **Workflow:** Branch-per-Theme Exploration  

---

## 🧭 Purpose & Core Philosophy

This document defines the standard operating procedure (SOP) for exploring, building, and evaluating distinct visual designs, interactive layouts, and animation architectures for **Zendrix Riva's portfolio**.

### Core Tenet
**Every theme experiment lives on its own isolated Git branch.**  
No experimental theme code is directly merged into `main` until it is selected as the production standard. This allows fluid, risk-free creative exploration—from ultra-clean recruiter minimalists to award-winning Awwwards-style WebGL/canvas universe simulators—without destabilizing working baselines.

---

## 🌿 Branch Naming & Taxonomy

All branches follow a strict, semantic naming convention:

| Branch Type | Syntax | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **Root Trunk** | `main` | Production-ready, stable codebase. | `main` |
| **Base Theme** | `theme/base-<slug>` | Baseline designs kept as permanent reference snapshots. | `theme/base-spotlight` |
| **Active Theme** | `theme/<theme-slug>` | Active visual/architectural exploratory branches. | `theme/universe-constellation` |
| **Spike / Demo** | `spike/<feature-slug>` | Isolated experiments for a specific tech (e.g. 3D R3F, physics). | `spike/r3f-particle-galaxy` |

---

## 🔄 Standard Workflow for Every New Theme

Whenever a new theme or layout concept is discussed, follow these exact 6 steps:

### Step 1: Branch Creation
Always branch from `main` (or a specified stable parent) to start with a clean slate:
```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create and switch to the new theme branch
git checkout -b theme/<new-theme-name>
```

### Step 2: Register in This Document
Add the new branch to the [Theme Registry](#-theme-registry) below with:
- Target Concept / Aesthetic
- Core Interactive Mechanics
- Target Performance Budget (FPS / Bundle Size)
- Status (`Planning`, `In Progress`, `Review`, `Shipped`, `Archived`)

### Step 3: Component & Style Isolation
Keep theme-specific logic modular:
- Place theme-specific canvases and effects under `components/themes/<theme-name>/` or `components/interactive/`.
- Avoid hardcoding breaking global CSS overrides in `app/globals.css` that would corrupt other branches on merge.
- Maintain responsive behavior across mobile, tablet, and ultra-wide displays.
- Respect accessibility: always wire `prefers-reduced-motion` fallbacks.

### Step 4: Progression & Implementation Milestones
Follow a three-phase execution order:
1. **Wireframe & DOM Anchor Layout:** Ensure semantic content (About Me, Skills, Projects) is accessible and accurately structured.
2. **Animation & Interaction Layer:** Build the interactive canvas, particle systems, raycasters, and motion hooks.
3. **Refinement & Sound / Haptics:** Add micro-interactions, responsive touch handling, audio synthesis, and lighting shaders.

### Step 5: Verification & Quality Gate
Before submitting any theme for final review or merging, verify:
```bash
# 1. Type check & build verification
npm run build

# 2. Lint verification
npm run lint

# 3. Clean git tree
git status
```

### Step 6: Upstream or Archive
- **If Approved for Production:** Merge into `main` via PR or fast-forward commit, tag the release (e.g. `v2.0-universe`), and push.
- **If Kept as Alternative Exploration:** Keep the branch alive on GitHub for future reference or portfolio showcase.

---

## 📋 Theme Registry

### 1. `main`
- **Role:** Production Trunk
- **Status:** `Active`
- **Description:** Clean baseline repository tracking the current stable deploy.

---

### 2. `theme/base-spotlight`
- **Role:** Base Reference Snapshot
- **Status:** `Preserved`
- **Aesthetic:** Clean dual-column layout (sticky developer sidebar + scrollable content).
- **Core Mechanics:**
  - Interactive ambient cursor spotlight (`<SpotlightGlow />`)
  - Section focus tracking (`SectionFocusContext` + `FocusableSection`)
  - Command palette (`⌘K` modal via `cmdk`)
  - Clean card hover glows and framer-motion fade-ins.

---

### 3. `theme/universe-constellation`
- **Role:** Active Exploratory Branch
- **Status:** `In Progress`
- **Aesthetic:** Deep cosmic void (`#030712`), volumetric cyan/violet nebulae, radiant star cores.
- **Architectural Specifications (Agreed via `/grill-me`):**
  - **Rendering Engine:** Dual-layer canvas (Lightweight WebGL GLSL fragment shader for volumetric nebula dust + 2D canvas for crisp 60fps vector lines and stardust; 0 external dependencies, <15KB footprint).
  - **Node Registration:** Dynamic DOM Rect Observer (`<ConstellationNode />` hook/wrapper tracking live viewport bounding boxes on scroll/resize, preserving semantic card layouts with zero hardcoded coordinates).
  - **Vector Visuals:** Pulsing Photon Energy Streams (cyan/violet gradient lines with travelling photon packets shooting from the Origin Star $\rightarrow$ Pillars $\rightarrow$ Skills $\rightarrow$ Projects, with non-active nodes gently dimming for contrast).
  - **Cursor Physics:** Gravitational Singularity & Magnetic Snap (attracts nearby stardust into a trailing comet orbit, snapping elastic tether lines to star nodes within an 80px radius).
  - **Sound Design:** Procedural Web Audio API synthesizer (0 MP3/audio files to download, muted by default with a floating celestial sound toggle HUD, gentle glass resonance on node hover, warp whoosh on navigation jump).
  - **Performance & Accessibility:** Adaptive Performance Engine (60fps full-particle desktop; 40 particles + touch ripple mobile fallback for battery conservation; full `prefers-reduced-motion` compliance falling back to static celestial glow).

---

## 🛠 Active Experiment Checklist (`theme/universe-constellation`)

- [x] Git repository initialized & base branches created (`main`, `theme/base-spotlight`)
- [x] Remote origin linked to `zendrix-hub/cowboy-portfolio`
- [x] Initial theme branch created: `theme/universe-constellation`
- [x] Push all branches to GitHub remote (`origin`)
- [x] **Milestone 1: Dynamic Node Registry (`ConstellationContext` & `<ConstellationNode />`)**
- [ ] **Milestone 2: Dual-Layer Canvas Engine (`<ConstellationCanvas />` WebGL Nebula + 2D Raycaster)**
- [ ] **Milestone 3: Origin Star & Pillar-to-Project Vector Linking**
- [ ] **Milestone 4: Gravitational Singularity Cursor & Ambient Stardust Physics**
- [ ] **Milestone 5: Floating Procedural Audio HUD & Sound Synthesis**
- [ ] **Milestone 6: Mobile Touch Adaptation, Reduced-Motion Gate & Build Verification (`npm run build`)**

