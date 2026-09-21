# 01_CONCEPT_LOCK.md: Concept Lock & Similarity Gate

**Repository:** `zendrix-hub/cowboy-portfolio`  
**Phase:** Phase 2 — Concept Lock Checkpoint  
**Status:** **PASSED & LOCKED** (Binding for all future world sessions)  
**Branches:** `portfolio/world-01-biyahe`, `portfolio/world-02-as-built`, `portfolio/world-03-the-current`

---

## 1. The Concept Comparison Matrix (§7.1)

| Category | World 01 — Biyahe | World 02 — As-Built | World 03 — The Current |
| :--- | :--- | :--- | :--- |
| **Design Philosophy** | The portfolio is a painted route board; color is structure; every element feels physical and pressable. | The portfolio is an issued as-built drawing set; structure is the design; the record is honest, including what is unfinished. | The portfolio is a descent through water; one drawn line joins everything; space is the structure. |
| **Visual Mood** | Loud, warm, tactile, confident, friendly. | Cool, precise, dense, quiet, verifiable. | Calm, deep, spacious, unhurried, absorbed. |
| **Layout** | Full-width horizontal color bands, uneven column splits, plate-based containers. | Framed sheets with a fixed skeleton (title, content, title block), tables as the primary layout tool. | Six full-bleed zones, a 36rem reading column against an empty channel, alternating sides. |
| **Typography** | Bungee 400 (display, plates only) + Lexend (everything else); type sits inside colored plates. | Barlow Condensed 600 (titles) + Barlow 400/600 (text) + IBM Plex Mono 400 (data) + Kalam 400 (handwritten status only). | Fraunces 300 (display, large and light, `SOFT=100`) + Hanken Grotesk 400/500 (text). |
| **Color** | Six saturated flat fields (sun `#FFC72C`, signal `#E4262A`, cobalt `#1B3FD1`, leaf `#0F9D58`, chalk `#FFFFFF`, enamel `#000000`), each with exactly one job. | Two inks (ink `#0F2233`, redline `#C4161C`) on print paper (`#F8FAFC`) or cyanotype blueprint (`#0B3A63`); redline reserved for one purpose. | One continuous hue ramp across six zones, surface (`#EDF7F6`) to deep (`#051222`); no accent color at all. |
| **Navigation** | Sticky row of colored route plates; mobile "Routes" plate opens a full-screen native `<dialog>`. | Sticky sheet index rail with sheet numbers; mobile becomes a fixed bottom sheet strip. | Fixed depth gauge with a traveling marker; mobile becomes a bottom pill with a native `popover` list. |
| **Hero** | Destination board carries `{NAME}`; role plate below it; the roll-sign motion settles on `{NAME}` once per session. | Cover sheet: `{NAME}` at cover scale with a dimension line; static, no motion. | Enormous `{NAME}`; the line originates at its end and makes the first stroke down the page. |
| **Projects** | Featured project (DaloyAqua) as a full-width board; others as a pressable "route list" of row-plates that expand (`<details>`). | Featured project as a detail sheet with a redline revision cloud around its status; others as rows in a real project-schedule table. | Featured project as an "eddy" where the line loops once around the status; others as stations threaded on the line. |
| **Animation** | One moment: the roll-sign name reveal (max 900ms). Otherwise only physical press states on interactive plates. | One moment: the redline cloud draws itself once over 800ms linear on first view. Otherwise everything is instant (0ms). | One continuous motion: the line's draw length follows scroll position, plus one 1.4s first stroke on initial load. |
| **Interaction Model** | Physical: press, release, overshoot. Things look like physical plates because they behave like physical plates. | Referential: instant state, tables you scan and cross-reference, nothing pretends to be tactile. | Ambient: the page reveals itself as you move through it; almost nothing is a discrete "control". |
| **Overall Personality** | The builder who makes things people can pick up and use. | The engineer who documents and verifies, and says plainly what is still in progress. | The systems thinker who values focus and lets one idea occupy the screen at a time. |

---

## 2. Similarity Gate Evaluation (§7.2)

### 2.1 Row-by-Row Mechanism Audit

| Dimension | World 01 vs. World 02 | World 02 vs. World 03 | World 01 vs. World 03 | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Navigation Model** | Route plates vs. Sheet index rail | Sheet index rail vs. Depth gauge rail | Route plates vs. Depth gauge | **PASS** (3 distinct paradigms) |
| **Container Grammar** | Beveled/bordered plates | Framed drawing sheets + tables | Zero containers (open space + nodes) | **PASS** (3 distinct structures) |
| **Palette Structure** | 6 saturated flat color bands | 2 inks on paper/blueprint | 1 continuous hue ramp (6 zones) | **PASS** (3 distinct color logics) |
| **Typographic Voice** | Heavy bold display + geometric sans | Technical condensed + mono + script | Elegant soft serif + grotesque | **PASS** (Zero shared type roles) |
| **Featured Project** | Destination billboard | Architectural detail sheet + redline | Eddy chamber loop node | **PASS** (Distinct visual signatures) |
| **Supporting Projects** | Expandable route rows | Real schedule data table | Waypoint stations on current line | **PASS** (3 distinct mechanisms) |
| **Motion Grammar** | Stepped physical mechanical roll | Plotter-pen redline draw; instant state | Continuous scroll-linked vector stream | **PASS** (3 distinct motion rules) |

### 2.2 Conceptual Thumbnail Test (§7.2)
- **World 01 (Biyahe):** High-contrast color blocks with bold outlined plates and yellow/red vehicle panel vibes. Instantly recognizable at 320px thumbnail width.
- **World 02 (As-Built):** Double-framed technical drafting sheets with ruled tables, left index rail, and prominent redline revision mark. Unmistakably reads as an engineering drawing set at 320px.
- **World 03 (The Current):** Monochromatic deep water descent with massive open whitespace, delicate serif headlines, and a single continuous organic line. Unmistakably reads as a calm ambient flow at 320px.

**Gate Outcome:** **PASSED.** The three concepts differ fundamentally in structure, container grammar, interaction model, navigation paradigm, and visual tone.

---

## 3. Subject Matter Grounding Confirmation (§5.2)

- **World 01 (Biyahe):** Authentically grounded in Philippine public transit signage (jeepney destination plates, hand-painted enamel signs) and the physical tactile interface conventions of the owner's flagship thesis project, *PlayIT*.
- **World 02 (As-Built):** Authentically grounded in architectural and engineering record drawings, providing an honest, dignified home for an early-career student/intern whose primary project (*DaloyAqua*) is actively in development under construction.
- **World 03 (The Current):** Authentically grounded in the flow concept of *Daloy* (from *DaloyAqua*), reflecting systems thinking, deep focus, and clean architectural clarity.

---

## 4. Phase 1 Content Extraction Confirmation

- **Requirement:** Phase 0 discovered that the About bio text and Hero intro sentence were hard-coded in JSX.
- **Action Taken:** Extracted into `data/social.ts` as `social.intro` and `social.about`.
- **Integrity Verification:**
  - `npm run lint` PASSED (0 errors, 0 warnings).
  - `npx tsc --noEmit` PASSED (0 type errors).
  - `npm run build` PASSED (all static routes successfully compiled).
  - Rendered output maintains 100% content fidelity with no value modifications.

---

## 5. Checkpoint Sign-Off

The baseline discovery and concept locks are complete. The three world branches may now be cut from this exact baseline commit on `portfolio/baseline`.
