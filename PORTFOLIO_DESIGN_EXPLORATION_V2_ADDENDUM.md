# Portfolio Design Exploration — Addendum: Three More Worlds

**Extends `PORTFOLIO_DESIGN_EXPLORATION_V2.md`. Three more new worlds for the same family, continuing V2's §9 numbering as §9.6–§9.8.**

## A.0 How this fits in

V2 §7.3 deliberately set two categories aside rather than forcing them in: **cinematic/film** (because time-based pacing is hard to build honestly without either fake auto-advancing slides or collapsing into "scroll with nice transitions") and **Japanese quiet-craft** (because restraint is a value, not by itself a distinct spatial model). This addendum takes both up now that there's a real answer for the first problem (§9.6.2) and a way to make the second a genuine spatial model rather than a decorative philosophy (§9.7.2) — plus one more world, **Datum**, claiming a spatial model — organic elevation bands you ascend through — that neither V1 nor V2 touched.

Everything procedural from V2 still applies unchanged and is not repeated here: the tag system and access-honesty framing (V2 §0), the shared rules every world in the family follows (V2 §8.2 — same content and section order, one orchestrated moment, no V1 §4.2 banned defaults, WCAG 2.2 AA, the performance budgets), the contrast-verification method (V1 Appendix A), the git branch and phase mechanics (V2 §12–§13), and the quality checklist (V2 §17). This document adds three world specifications and the deltas that follow from having three more worlds in the family: an extended branch list (§A.4), extended font/budget rows (§A.5), and an extended diversity check (§A.6).

**Branches:** `portfolio/v2-world-06-slate`, `portfolio/v2-world-07-the-clearing`, `portfolio/v2-world-08-datum` — all three cut from the same V2 baseline used for Worlds 01–05 (V2 §12.2), true siblings of the original five, not descendants of them.

---

## 9.6 New World 06: Slate

**Branch:** `portfolio/v2-world-06-slate`

### 9.6.1 Concept

- **Metaphor.** The portfolio is a reel of film: each section is a **shot**, framed and numbered like a slate marks a take, with the widescreen letterbox always present at the top and bottom of the viewport. Hero is the **title card**. Contact is the **end card**.
- **Philosophy.** Composed, paced, deliberate. The visitor feels like they're watching something that was shot and cut with intent, not scrolling a page. The emotion is anticipation held by pacing, not by content withheld.
- **Spatial model.** Discrete shots, not continuous scroll. The mechanism that makes this real rather than decorative is described in §9.6.2 — it is the one genuinely new spatial idea this world contributes to the family.
- **Signature element.** The letterbox frame and the scene-slate mark, combined with the one cut moment (§9.6.4).

### 9.6.2 Solving the "cinematic" problem honestly

V2 §7.3 named the risk directly: a portfolio can't ethically auto-advance like a film (the visitor doesn't control a projector they didn't ask for), and without auto-advance, "cinematic" risks meaning nothing more than "scroll, but with transitions" — which the family already has (The Current). This world's answer: **CSS scroll-snap** (`scroll-snap-type: y mandatory` on the scroll container, `scroll-snap-align: start` on each section). The visitor still scrolls entirely under their own control — nothing plays without input — but each scroll gesture resolves into a fully composed, held frame rather than settling at an arbitrary point mid-section. That's what gives this world a felt sense of discrete shots instead of continuous flow, without a single autoplaying pixel.

### 9.6.3 Design plan

**Color** (ratios verified with V1 Appendix A's script; the theatrical accent was brightened from an initial `#9E2B25` to `#C23A32` during verification to clear the 3:1 non-text minimum against the near-black ground)

| Token | Theatrical (default) | Storyboard | Role |
| --- | --- | --- | --- |
| `--frame` | `#16130F` (ground) | `#F2EFE9` | Shot ground. A warm near-black, not pure black — a cinema, not a terminal. |
| `--ink` | `#F2EFE9` (16.13:1) | `#16130F` (16.13:1) | Titles, body |
| `--ink-2` | `#A8A296` (7.29:1) | `#57524A` (6.75:1) | Captions, scene numbers |
| `--tally` | `#C23A32` (3.48:1 UI) | `#9E2B25` (6.47:1 UI) | **Reserved**: the scene-slate mark and the one cut moment only |

Theatrical is the default, not an afterthought dark mode — a lit theater is dark by nature, which is a motivated reason for a dark default, unlike a generic "dark mode looks techy" default the rest of the family deliberately avoids (V2 §9.5.1's warning about Runtime applies to *unmotivated* dark defaults, not this one). The near-black ground and single matte, non-glowing accent are chosen specifically so this doesn't read as V1 §4.2's banned "black ground plus neon accent" tech cliché — see anti-goals (§9.6.14).

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Bebas Neue** (single weight, used sparingly, large sizes only) | The title-card name, scene titles |
| Body | **Archivo Narrow** 400 and 500 | Body copy, credit-style role/meta lines |

Scale: name `clamp(3.5rem, 13vw, 10rem)` / 0.9, tracked slightly wider than normal (`letter-spacing: 0.02em`) at this one size only — Bebas Neue is condensed and reads best with a touch of air at very large sizes; body 1.0625rem / 1.65. No other size uses Bebas Neue: it is reserved for the name and shot titles so it never becomes the family's fifth "display font used for everything" default.

**Layout concept.** Six **shots**, each `height: 100svh` (not `min-height` — a shot is exactly one frame, never taller, so long content scrolls *within* the shot rather than the shot growing past the frame; see §9.6.7 for how this is handled for a long about text or many projects). A **letterbox**: two fixed bars, `--frame`-colored, `height: clamp(24px, 6vh, 64px)`, pinned to the very top and bottom of the viewport at all times, decorative and `aria-hidden`. Each shot carries a small **scene-slate** mark in one corner: "Scene N" in the data role, `aria-hidden`, since the real section heading is the actual content of the shot.

**Wireframe: the title card, Scene 1 (≥1024)**

```text
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  letterbox (fixed, always present)
                                   Scene 1  ← aria-hidden slate mark
                {NAME}   Bebas Neue, enormous

                {ROLE}   Archivo Narrow, credit-style

                {INTRO}   centered measure

           See projects        Send an email
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  letterbox (fixed, always present)
```

**Principles.** (1) A shot is a fixed frame, exactly one viewport tall; content that doesn't fit scrolls inside it, the shot itself never grows. (2) The letterbox is always present — it is not a hero-only flourish. (3) Bebas Neue appears exactly twice in scale (name and shot titles) and nowhere else. (4) `--tally` marks exactly two things: the slate and the one cut. (5) Nothing auto-advances; scroll-snap composes what the visitor's own scroll already does.

### 9.6.4 Hero: the title card

- **Composition.** `{NAME}` in Bebas Neue at title-card scale, `{ROLE}` beneath in a smaller "credit line" style (Archivo Narrow 500, like a film credit: name, then role, no invented job-title flourish beyond the repo's own text), `{INTRO}` in the reading measure, two text-link actions.
- **Orchestrated moment: the fade-up.** On first visit each session, a full-viewport `--frame`-colored overlay (above the letterbox, covering everything) fades to transparent over 900ms `ease-out`, like a film opening from black. The title-card content is fully present underneath the whole time; only the overlay's opacity animates. Repeat visits and reduced motion: no overlay, the shot is simply visible immediately.

### 9.6.5 Navigation: the reel

- **Desktop (≥1024).** A vertical row of six small tick marks fixed inside the right letterbox margin (reusing the letterbox's own reserved vertical space rather than adding a new fixed element), each a real link with an accessible name, current tick filled `--tally` with `aria-current="location"`. Clicking a tick scroll-snaps to that shot.
- **Tablet (640–1023).** Same ticks, positioned in the bottom letterbox instead (horizontal row) since the side margins are narrower.
- **Mobile (<640).** A small "Scenes" button in the bottom letterbox opens a native `<dialog>` listing the six shots by name, each at least 48px tall.
- **Current shot** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`) — scroll-snap makes this unusually precise in this world, since a shot is either fully in frame or not.

### 9.6.6 About

- Scene 2. The existing about text, centered, in the reading measure. If it's long enough to exceed the shot's available height at a given viewport, the shot's content area scrolls internally (`overflow-y: auto` on the shot, not the page) rather than the shot growing taller than one viewport — this is the one place the "exactly one frame" rule needs an explicit escape valve, and it's handled by internal scroll, not by breaking the frame.

### 9.6.7 Projects: the reel of shots

- **Featured (DaloyAqua): its own full shot.** Title in Bebas Neue at shot-title scale, status exactly as stored set as a small "take" label (Archivo Narrow, `--tally`) beside the title, description, stack, links.
- **Supporting projects.** Rather than cramming a list into one shot (which would fight the "held frame" idea), supporting projects share **one shot as a contact sheet** — a grid of smaller framed stills (title, one-line description, status if present, links), like a film contact sheet reviewing several takes at once. This keeps the six-shot structure intact while still showing every project.
- **Sparse and stress cases.** One project: the featured shot alone; the contact-sheet shot is skipped from the reel and logged, not left empty. Many projects: the contact sheet's grid wraps and, if it can't fit one viewport even with internal scroll, scrolls internally per §9.6.6's rule. A 90-character title wraps within its still.

### 9.6.8 Skills: the crew list

- Presented like a film's crew credits: grouped by category (Archivo Narrow 500 heading), items listed one per line beneath, in credit-roll style — plain text, no chips, no bars, no percentages. If proficiency data exists, it appears right-aligned on the same line, exactly as stored.

### 9.6.9 Journey: the timeline of takes

- Repo-order entries in a single shot, each a compact "credit line": period (data role), title (Bebas Neue, smaller than the name/shot-title scale), organization and description (Archivo Narrow). The current entry, if marked, gets a `--tally` mark beside it — no invented label.

### 9.6.10 Contact: the end card

- The existing mailto address set large in Bebas Neue, centered, like a film's closing card. "Copy address" text link (label swap + live region) beneath it, social links as a short plain list. A small `--tally` "•" mark (not a decorative ornament — the same reserved mark used for the slate and cut, applied consistently) sits after the final line, echoing a real end-card convention without asserting any fact. No form.

### 9.6.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the fade-up** | Hero only, once per session, 900ms (§9.6.4). |
| Scroll-snap between shots | The browser's native snap behavior; no custom JS-driven scroll interception. |
| Nav ticks | Fill `--tally` on current, 150ms. |
| Text links | Underline thickens, 150ms. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--tally); outline-offset: 3px`. |
| Reduced motion | No fade-up; the title card is visible immediately. `scroll-snap-type` itself is not a motion effect (it doesn't animate anything) and is not affected by `prefers-reduced-motion`, but scroll-snap's *smooth* variant, if used, is disabled in favor of `scroll-behavior: auto` under reduced motion so the snap itself doesn't glide. |

No parallax, no auto-advance, no looping projector-flicker effect.

### 9.6.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Shots and letterbox | Full `100svh` shots, side-margin nav ticks | Same, ticks move to bottom letterbox | Same, ticks replaced by "Scenes" button |
| Hero | Title-card scale as specified | Scales down with viewport-relative units | Scales down further; actions stack |
| Projects | Featured shot + contact-sheet grid shot | Contact sheet grid narrows to 2 columns | Contact sheet grid becomes 1 column, scrolls internally within its shot |
| Skills | Credit-roll columns (2) | 1–2 columns | 1 column |
| Contact | End card centered | Same | Same, address wraps |

### 9.6.13 Accessibility and performance notes

- `scroll-snap-type` must not trap keyboard or assistive-technology navigation — verify that `Tab` still moves focus normally between shots and that a screen reader's virtual cursor can move through content that snap-scrolling doesn't currently have in frame (this is the single most important test for this world specifically, since scroll-snap is a novel mechanism for the family).
- The letterbox bars and scene-slate marks are `aria-hidden`; real landmarks and headings carry the actual structure.
- `forced-colors: active`: nav ticks and the current-shot indicator rely on a border, not fill alone.
- Fonts: Bebas Neue (one weight) and Archivo Narrow, subset latin, budget ≤70 KB gzipped combined. Client JS: shot scrollspy, fade-up play-once flag, scenes dialog, clipboard; target under 3 KB gzipped.

### 9.6.14 What this world must not become

Despite a near-black default ground and one accent, this must never read as V1 §4.2's banned "black background, neon accent" tech default — the near-black is warm (not a pure `#000`), the accent is matte and reserved for exactly two marks (never a glow, never a UI-wide highlight), and the letterbox plus Bebas Neue title-card treatment are specific enough that the overall effect reads as cinema, not dashboard. No auto-advancing slides, no looping flicker/film-grain filter, no fake "runtime" or timestamp readout, no movie-poster clichés (no dramatic light-leak or lens-flare graphics), no second accent color, no Bebas Neue used at body scale.

---

## 9.7 New World 07: The Clearing

**Branch:** `portfolio/v2-world-07-the-clearing`

### 9.7.1 Concept

- **Metaphor.** Not an object this time, but a principle made spatial: a clearing in dense material — the one open, quiet space that everything else is cut away to make room for. Each section is mostly emptiness, with a single asymmetrically-placed passage of content, the way a clearing is defined by what surrounds it as much as by what's in it.
- **Philosophy.** Restraint as the entire design language, not a decorative style layered on top of one. The visitor feels unhurried and trusted to look without being told where. This is built from real compositional principles — asymmetric balance, deliberate emptiness, one quiet material cue — never from applied cultural decoration; there is no kanji, no torii gate, no cherry blossom, no red-and-black lacquer palette standing in for a philosophy it doesn't actually practice.
- **Spatial model.** This is the family's other answer to "not a vertical list" (alongside Star Chart, The Wing, and Runtime), but where those three add a structural device (a field, rooms, a diagram), this one's spatial idea is **subtraction**: the same six sections, but each given so much more room than its content needs that reading them feels like moving through open space punctuated by brief, precise marks.
- **Signature element.** The single quiet line that extends once (§9.7.4) and the asymmetric placement itself, which shifts deliberately (never centered, never on the same side twice in a row) from section to section.

### 9.7.2 Making restraint a spatial model rather than a mood

V2 §7.3 held this category back specifically because "restraint" by itself isn't a layout logic. This world resolves that with one concrete, buildable rule: **every section reserves at least 60% of its viewport height as genuinely empty ground** — no background pattern, no faint texture, no decorative filler — and the content that remains sits off-axis (never centered, never full-width), at a horizontal position that changes deliberately from section to section following a simple asymmetric rhythm (roughly a third from the left, then a third from the right, alternating, echoing the uneven, never-repeating placement real asymmetric compositions use). That's a real, checkable spatial rule an implementing session can verify against — not a vibe.

### 9.7.3 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Paper (default) | Ink | Role |
| --- | --- | --- | --- |
| `--ground` | `#EFEEEA` | `#1A1917` | Ground. A neutral warm stone, cooler and flatter than Marginalia's paper (§9.1.2) so the two don't drift toward each other despite both being light and warm-adjacent. |
| `--ink` | `#1C1B18` (14.83:1) | `#EDEAE3` (14.62:1) | The single line, and any type |
| `--ink-2` | `#6B675E` (4.85:1) | `#9C978C` (6.04:1) | Meta only — used as sparingly as possible |
| `--mark` | `#7C8567` (3.34:1 UI) | `#9BA588` (6.80:1 UI) | **Reserved**: the one line, and nothing else in the whole world |

Two tones and one mark, the smallest palette in the entire family. No texture, no grain, no simulated paper fiber — restraint is expressed through absence, not through a subtle decorative surface standing in for it.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Shippori Mincho** 400 and 500 | Name, section titles — a quiet, refined serif with real typographic lineage in this design tradition, chosen for its typographic qualities, not worn as a costume |
| Body | **Zen Kaku Gothic New** 400 | Everything else |

Scale is smaller across the board than any other world in the family: name `clamp(2.25rem, 6vw, 4.5rem)` / 1.2 (deliberately restrained even at hero scale — this world never shouts); section title `clamp(1.5rem, 3vw, 2.25rem)` / 1.3; body 1rem / 1.9 (very generous line-height, the quietest reading rhythm in the family). Wide, unhurried letter-spacing on the display role (`0.02em`) reinforces the pacing.

**Layout concept.** Six sections, each `min-height: 100svh`, each holding its content in a single narrow measure (max 32rem) positioned at roughly 30% or 70% of the viewport width (alternating section to section, per §9.7.2), vertically centered within the section but never claiming more of the viewport than it needs. **No grid is visible anywhere** — there is no column structure a viewer could detect; placement is a single deliberate point, not a system.

**Wireframe: hero (≥1024), content at the ~30% position**

```text
┌──────────────────────────────────────────────────────────┐
│                                                            │
│                                                            │
│      {NAME}                                                │
│      {ROLE}                                                │
│                                                            │
│      {INTRO}                                                │
│                                                            │
│      See projects   Send an email                          │
│                                                            │
│                                                            │
│                                                            │
└──────────────────────────────────────────────────────────┘
   (the remaining ~65–70% of the frame is genuinely empty ground)
```

**Principles.** (1) At least 60% empty ground, every section, no exceptions. (2) Content sits off-axis; it is never centered and never full-width. (3) Placement alternates deliberately across sections — the rhythm itself is the composition. (4) One mark, one use. (5) Nothing is decorated to imply quietness; quietness is the actual amount of nothing on the screen.

### 9.7.4 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--ground`. No texture, no vignette, no grain. |
| Borders | None. |
| Shadows | None. |
| Radius | `0` everywhere — there is nothing rounded to be found in this world. |
| Spacing | 8px base, but used at unusually large multiples: section padding `clamp(120px, 20vh, 280px)`, the largest in the family. |
| Grid | None, by design (§9.7.3). |
| Density | **Lowest in the family**, lower even than Star Chart or The Current. |
| Image treatment | If a project has an image, it appears small (max 30% of the section's width) and unframed, placed with the same off-axis discipline as everything else. No image: nothing stands in for it. |
| Icons | Two, the thinnest strokes in the family (1px, round caps): external link, copy. No theme-toggle icon — the toggle is a plain text word (§9.7.5). |
| Containers | **None.** |
| Buttons | Plain text, no underline at rest, a single `--mark`-colored underline appears only on hover/focus. |
| Navigation | Almost invisible until needed (§9.7.5). |
| Separators | None. |
| Chrome labels | None. This is the one world in the family with no decorative chrome label of any kind — even a small "aria-hidden" flourish would work against the whole premise. |

### 9.7.5 Navigation: the quiet mark

- **Desktop (≥1024).** A single small `--ink` dot (8px), fixed at `bottom: 32px; right: 32px`, with no visible label at rest. On hover or focus, it expands into a plain vertical text list of the six section names (no box, no border — just the words, right-aligned, appearing with a 200ms fade), each a real link; the current section's name is the only one carrying the `--mark` underline, with `aria-current="location"`. The theme toggle is the seventh word in this same list, reading "Ink" or "Paper" depending on the alternate mode.
- **Tablet and mobile (<1024).** The dot becomes a real 44px tap target (still visually just a dot); tapping opens the same plain text list, now as a native `<dialog>` rather than a hover reveal, since touch has no hover state.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

### 9.7.6 About

- The existing about text, full length, in the reading measure, positioned per §9.7.2's alternation. No fact sidebar, no annotation device — this world doesn't add a second content stream anywhere; if the repo has extra labelled facts, they follow the main text as plain, unornamented lines at the end of the same measure, in `--ink-2`, only if they exist.

### 9.7.7 Projects

- **Featured (DaloyAqua).** Title (Shippori Mincho), status exactly as stored set as a plain word beside the title (no pill, no badge — just text, following the "no containers" rule absolutely), description, a plain "Stack" line, links as plain text. Positioned per §9.7.2.
- **Supporting projects.** Each gets its **own section-height of space**, not a list within one section — this world does not compress; if there are four supporting projects, the page is simply longer, each one given the same generous emptiness as everything else. (If this produces an impractically long page for many projects, log it and cap at showing the featured project plus the most recent three in full-space treatment, with the rest in a single plain list appended quietly at the end — a `[DECISION]` to record, not a `[SPEC-DERIVED]` guess, since it's a deliberate trade-off this concept requires once content volume is known.)
- **Sparse and stress cases.** One project: one section, nothing else needed. Many projects (the stress case above): the cap applies. A 90-character title wraps in the narrow measure across two or three lines, which is normal and fine at this scale.

### 9.7.8 Skills

- A single plain list, category name then items beneath as running text separated only by generous spacing (not commas, not chips — just space, letting the wide letter-spacing and line-height already do the separating). No bars, no percentages, no logos, no dots.

### 9.7.9 Journey

- Repo-order entries, each simply: period, title, organization, description, as plain stacked lines with generous space between entries — no line, no markers, no bullets connecting them. The current entry (if marked) is set in `--ink` at slightly larger scale than the others; every other entry is `--ink-2`. This is the only place in the world where two entries are visually differentiated, and it's done with weight/color, not an added mark.

### 9.7.10 Contact

- The existing mailto address, set at name-scale in Shippori Mincho, positioned per §9.7.2, "copy" as plain text (label swap + live region), social links as a short plain list beneath. No form.

### 9.7.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the line.** | On first visit each session, immediately after the hero's text is in place, a single thin `--mark` line (1px, no more than 15% of the viewport width) extends once from a point just beside the hero content, over **2000ms, `cubic-bezier(.4,0,.2,1)`** — the slowest, quietest motion in the entire family, meant to be almost missed. It does not repeat, does not appear on any other section, and carries no label or meaning beyond marking that this is a considered space. Reduced motion: the line is simply present at its full length from the start. |
| Nav mark hover/focus | List fades in, 200ms. |
| Text links | Underline fades in on hover/focus, 150ms. |
| Copy address | Label swap + live region. |
| Focus | `outline: 1px solid var(--mark); outline-offset: 6px` — the widest offset in the family, keeping with this world's spatial generosity even in its focus states. |
| Reduced motion | No line extension; it is simply present. Everything else is already a fast, discrete transition. |

Nothing else in this world moves. No scroll-reveal, no hover-lift, no parallax — restraint applies to motion exactly as it applies to space.

### 9.7.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Placement | Alternating ~30%/~70% horizontal position | Alternation narrows to ~15%/~85% margin instead of a percentage of a wider canvas | Single consistent left-aligned position with generous left margin — true off-axis alternation stops making sense on a narrow phone screen, and forcing it would fight legibility, so this is a deliberate, logged simplification |
| Navigation | Hover-revealed dot and list | Tap-revealed | Tap opens native dialog |
| Projects | Full-space treatment per project (capped per §9.7.7) | Same, tighter padding | Same, tighter padding; capped list appended as plain stacked lines |
| Everything else | As specified | Padding reduces by roughly a third | Padding reduces further; single-column throughout |

### 9.7.13 Accessibility and performance notes

- With no visible navigation chrome at rest, verify the quiet-mark control is still reliably discoverable via keyboard alone (it must be reachable by `Tab` and must expand on `focus`, not only on `:hover`) — this is the single biggest accessibility risk this world's whole premise creates, and it needs real testing, not just a media-query check.
- Focus rings use the widest offset in the family (6px) specifically so a focused element doesn't look cramped against all the surrounding emptiness — verify this doesn't push the ring outside the viewport at section edges.
- `forced-colors: active`: the nav mark and current-section underline rely on `border`/`text-decoration`, not fill.
- Fonts: Shippori Mincho and Zen Kaku Gothic New, subset latin, budget ≤80 KB gzipped combined. Client JS: nav reveal/scrollspy, line-extension play-once flag, clipboard; target under 2 KB gzipped — the smallest budget in the family, matching how little this world actually does.

### 9.7.14 What this world must not become

No kanji, no torii gates, no cherry blossoms, no red-and-black lacquer palette, no rice-paper or tatami texture, no zen-garden rock-and-rake illustration — none of these are design principles, they're costume, and the brief itself explicitly warns against exactly this failure mode. No decorative chrome label anywhere, not even a small one — the moment this world adds a flourish to announce its own restraint, it has stopped practicing it. No second mark color. No container of any kind. No section with less than 60% empty ground.

---

## 9.8 New World 08: Datum

**Branch:** `portfolio/v2-world-08-datum`

### 9.8.1 Concept

- **Metaphor.** The portfolio is terrain, read the way a topographic map reads land: in **elevation bands**. The visitor ascends through six bands from the lowest ground to the summit, where the featured project sits. A small **compass and contour legend** — a real cartographic convention — doubles as the navigation device.
- **Philosophy.** Grounded, orienting, quietly confident. The visitor feels like they're being given a real map, not a metaphor for one — every convention borrowed from cartography (contour lines, a legend, a compass rose) does actual wayfinding work rather than sitting there as decoration.
- **Spatial model.** Organic elevation bands you ascend through — distinct from Star Chart's point-scatter field (§9.4) and The Wing's bounded rooms (§9.3): here the "zones" are continuous, contour-edged, and explicitly ordered low-to-high, giving the page a literal sense of climbing rather than either exploring a field or walking a level building.
- **Signature element.** The contour-line edges between bands and the compass/legend widget.

### 9.8.2 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Day (default) | Night | Role |
| --- | --- | --- | --- |
| `--low` | `#D9E4C7` | `#1E2A18` | Lowest band (Hero) |
| `--mid` | `#E8DDBB` | `#2E2717` | Second band (About) |
| `--high` | `#D8D2C9` | `#302E2B` | Third and fourth bands (Projects, Skills) |
| `--peak` | `#F5F3EE` | `#3D3B36` | Fifth and sixth bands (Experience, Contact) |
| `--ink` | `#232620` (10.21–13.83:1 across all day bands) | `#EDEAE0` (9.29–12.47:1 across all night bands) | Text, consistent across every band in a mode |
| `--contour` | `#A85C36` (3.29–4.46:1 UI across all day bands) | `#D98F5F` (4.29–5.75:1 UI across all night bands) | **Reserved**: contour lines, the compass mark, the legend |

Four flat elevation bands, not a gradient — this world reads as a real printed topographic map's discrete color classes, not a rendered 3D terrain. A single ink color and a single contour color are each verified against **every** band they'll appear on, in both modes, so the ascent never introduces a readability dip at any elevation.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display / labels | **Overpass** 500 and 700 (a family originally drawn from highway signage — an authentically wayfinding-native choice, not a costume) | Name, band titles, the legend's labels |
| Body | **Karla** 400 and 500 | Body copy, descriptions |

Scale: name `clamp(2.75rem, 9vw, 6.5rem)` / 1; band title `clamp(1.75rem, 4vw, 3rem)` / 1.1; body 1.0625rem / 1.7; legend labels 0.8125rem. No invented elevation numbers, grid references, or coordinates anywhere — exactly like Star Chart's rule against fabricated astronomical data (V2 §9.4.2), this world never states a number the repo didn't provide.

**Layout concept.** Six sections, one per band per the table above (`--high` and `--peak` each serve two sections, distinguished by content, not by a fifth or sixth color — real topographic maps often reuse a color class across a elevation range too). Each band-to-band transition is a **contour edge**: a 2px `--contour` line following a gentle, organic wave (a single smooth SVG path per edge, seeded per transition so no two edges repeat identically, `aria-hidden`), replacing the hard rectangular section boundary every other world in the family uses. Content sits in a centered reading column (max 640px) within each band, with generous padding `clamp(80px, 12vh, 180px)`.

**Wireframe: the ascent (≥1024), showing two band transitions**

```text
┌────────────────────────────────────────────┐
│  --low band (Hero)                          │
│      {NAME}  {ROLE}  {INTRO}                  │
│                                              │
╲＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿／  contour edge (seeded wave)
┌────────────────────────────────────────────┐
│  --mid band (About)                          │
│      {about text}                             │
│                                              │
╲＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿＿＿∿＿／  contour edge
┌────────────────────────────────────────────┐
│  --high band (Projects) …continues upward…    │
```

**Principles.** (1) Four flat bands, never a gradient. (2) Every edge between bands is a contour line, never a straight rule. (3) One ink, one contour color, each verified against every band. (4) The compass/legend does real wayfinding work; it is not decoration wearing a compass costume. (5) No invented numbers, ever.

### 9.8.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Four flat bands as above. No gradient between them, no terrain-relief shading, no hillshade texture. |
| Borders | None as rectangles — the contour edges (§9.8.2) are this world's only boundary device. |
| Shadows | None. |
| Radius | `0` on the legend and any labelled tag; `999px` on the compass mark itself (a real compass rose reads as a circle). |
| Spacing | 8px base. Band padding as above. |
| Grid | Single centered column, max 640px. |
| Density | Low-medium. |
| Image treatment | Small, unframed, `object-fit: cover`, docked to one side of its project's text. No image: nothing is drawn. |
| Icons | Two, 1.5px round-cap strokes: external link, copy. The compass mark (§9.8.5) is not an icon in this sense — it's the navigation device itself. |
| Containers | Exactly two: the **legend** (a small bordered key explaining what each band represents, §9.8.5) and the **waypoint tag** (Skills and Journey, a small `--contour`-outlined label). |
| Buttons | Plain text links with a `--contour` underline on hover/focus. |
| Navigation | The compass and legend widget (§9.8.5). |
| Separators | Contour edges only. |
| Chrome labels | None beyond the legend's own functional labels, which name the real section titles, not invented elevation numbers. |

### 9.8.4 Hero: base camp

- **Composition.** `{NAME}` in Overpass 700 at hero scale, `{ROLE}` beneath, `{INTRO}` (verbatim) in the reading column, two text-link actions — set on the `--low` band, the literal starting elevation of the ascent.
- **Orchestrated moment: the first contour draws.** On first visit each session, the contour edge immediately below the hero (the boundary into About) draws once, left to right, over 900ms `ease-out` (`stroke-dashoffset` on its seeded path). Every other contour edge on the page is simply present, undrawn, from first paint — only this one, closest to the point where the visitor starts, performs the moment, keeping the family's "exactly one moment" rule intact. Reduced motion: it too is simply present.

### 9.8.5 Navigation: the compass and legend

- **Desktop (≥1024).** A fixed widget (`bottom: 24px; right: 24px`): a small compass mark (a circle with a single `--contour` needle, always pointing toward the current band — this is the widget's one piece of real information, not decoration) beside a **legend**: six small labelled ticks, one per section, in real ascent order, current tick filled `--contour` with `aria-current="location"`. Each tick is a real link.
- **Tablet (640–1023).** Same widget, smaller, tick labels on hover/focus.
- **Mobile (<640).** A fixed bottom "Legend" button opens a native `<dialog>` showing the same six ticks, labelled and stacked, each at least 48px tall.
- **Current band** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

### 9.8.6 About

- The `--mid` band. Existing about text, full length, in Karla. If the repo has labelled facts, they appear as small waypoint tags (§9.8.3) beneath the text — only for facts genuinely present.

### 9.8.7 Projects: the summit approach

- **Featured (DaloyAqua): the summit.** Sits at the very top of the `--high`/`--peak` transition — the highest point reached before Experience and Contact, framing it as the thing the ascent was building toward. Title (Overpass), status exactly as stored (a plain waypoint tag, not a badge), description, a "Stack" line, links.
- **Supporting projects.** Listed beneath as a simple sequence of smaller entries on the same band, each with title, one-line description, status if present, links — no card, no frame, just spacing and the band color doing the separating.
- **Sparse and stress cases.** One project: the summit entry alone. Many projects: the sequence grows down the band; the band simply runs taller. A 90-character title wraps in the column.

### 9.8.8 Skills

- Grouped by category (Overpass label), items as small `--contour`-outlined waypoint tags, wrapping within each category row. No bars, no percentages. Proficiency data, if present, appears as small text inside the tag.

### 9.8.9 Journey: the route taken

- Repo-order entries, each simply title, organization, period, and description as stacked plain text, distinguished from the surrounding band only by a single small waypoint tag holding the period. The current entry (if marked) gets a filled `--contour` tag instead of outlined; no invented label.

### 9.8.10 Contact: the lookout

- The `--peak` band, the highest point of the page. The existing mailto address set large in Overpass, "Copy address" text link (label swap + live region), social links as a short plain list. No form.

### 9.8.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the first contour draws** | Once, on the edge just below Hero, 900ms (§9.8.4). |
| Compass needle | Rotates to point at the current band as it changes, 300ms ease — this is functional (it always shows a real "you are here" direction relative to the ascent order), not decorative. |
| Legend tick hover/focus/current | Fill/label reveal, 200ms. |
| Text links | Underline on hover/focus, 150ms. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--contour); outline-offset: 3px`. |
| Reduced motion | The first contour appears already drawn; the compass needle jumps instantly to the current band instead of rotating. Everything else is already a fast, discrete transition. |

No scroll-reveal, no parallax, no looping shimmer on the contour lines.

### 9.8.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Bands and contours | Full padding; contour waves at full amplitude | Padding reduces; contour amplitude reduces slightly to stay legible at narrower widths | Padding reduces further; contour amplitude reduces again |
| Navigation | Compass + legend widget | Smaller widget | "Legend" button + full dialog |
| Projects | Summit entry + sequence below | Same, tighter spacing | Same, tighter spacing |
| Skills | Tags wrap in rows | Same | Same, category label above |
| Contact | Centered on the peak band | Same | Same, address wraps |

### 9.8.13 Accessibility and performance notes

- Every band is a real landmark/section with its own heading; the contour edges are `aria-hidden` and never the only signal that a new section has begun.
- Verify `--ink` and `--contour` against every band they touch, in both modes — this was already checked for all four bands during palette selection (§9.8.2), but re-verify after any hex adjustment, since a fix for one band can silently break contrast on another.
- The compass needle's rotation is functional, not purely decorative, but it is not the *only* way the current section is conveyed — the legend's filled tick and `aria-current` carry the same information non-visually.
- `forced-colors: active`: the legend ticks and waypoint tags rely on `border`, so they remain visible.
- Fonts: Overpass and Karla, subset latin, budget ≤90 KB gzipped combined. Client JS: legend/compass scrollspy, contour-draw play-once flag, clipboard; target under 3 KB gzipped.

### 9.8.14 What this world must not become

No invented elevation numbers, grid references, or coordinates. No 3D relief-shaded terrain rendering, no hillshade texture, no topographic-map stock imagery. No gradient between bands — four flat colors only. No literal hiking-trail iconography (no boot prints, no tent icons, no mountain-peak emoji). No second contour color. No decorative-only compass needle — it must always point at something real.

---

## A.4 Extended branch map (adds to V2 §12.3)

| Branch | Cut from | Purpose |
| --- | --- | --- |
| `portfolio/v2-world-06-slate` | The V2 baseline (same one used for Worlds 01–05) | §9.6 |
| `portfolio/v2-world-07-the-clearing` | The V2 baseline | §9.7 |
| `portfolio/v2-world-08-datum` | The V2 baseline | §9.8 |

All other git rules (V2 §12.1, §12.4, §12.5, §12.6) apply unchanged — in particular, these three are true siblings of Worlds 01–05, not descendants of them, for the same reason V2 §12.3 gives for keeping new-world and refine branches on separate lineages.

## A.5 Extended font and script budgets (adds to V2 §16.2)

| World | Font budget (gzipped, combined) | Client JS target |
| --- | --- | --- |
| Slate | ≤70 KB | <3 KB |
| The Clearing | ≤80 KB | <2 KB |
| Datum | ≤90 KB | <3 KB |

All other performance rules (V2 §16.1, §16.3, §16.4) apply unchanged, including the +15 KB gzipped First Load JS ceiling per world and the zero-new-dependencies default — none of these three needs a new dependency; scroll-snap (Slate) is a CSS feature, not a library.

## A.6 Extended diversity check

### A.6.1 Against each other

| Dimension | Slate | The Clearing | Datum |
| --- | --- | --- | --- |
| Primary metaphor | A reel of film | A clearing; restraint made spatial | Topographic terrain, ascended |
| Spatial model | Discrete scroll-snapped shots | Off-axis content in mostly-empty ground | Continuous elevation bands with contour edges |
| Navigation | Reel ticks in the letterbox margin | An almost-invisible quiet mark | A functional compass + legend |
| Typography | Bebas Neue (display only) + Archivo Narrow | Shippori Mincho + Zen Kaku Gothic New | Overpass + Karla |
| Density | Medium (composed, not sparse) | Lowest in the family | Low-medium |
| Shape language | Hard-edged letterbox bars, no radius | No containers of any kind | Organic contour-wave edges between flat bands |
| Color logic | Warm near-black or light, one matte reserved accent | Two tones, one barely-used mark | Four flat elevation bands, one ink, one contour color, verified against all four |
| Motion trigger | Load (fade-up from black) | Load (a single 2-second line) | Visibility-adjacent (the first contour draws right after hero, effectively on load) |
| Emotional tone | Composed, paced, deliberate | Unhurried, quiet, trusting | Grounded, orienting |

No two of these three share a spatial model, a shape language, or a typographic pairing. Slate and Datum both use a fixed corner/margin nav widget with a dialog fallback, but so do The Wing and Star Chart already (V2 §11.1's note on this exact pattern applies again here) — the mechanism recurs across the family's more "spatial/exploratory" worlds by design, while each one's visual rendering (letterbox ticks, floor-plan lines, star dots, a functional compass) remains distinct.

### A.6.2 Against all eight existing worlds (V1's three plus V2's five)

- **Slate vs. The Current (V1):** both are "paced" in some sense, but The Current's pacing is continuous (one line, scroll-driven) while Slate's is discrete (scroll-snap, held frames) — opposite mechanisms for a loosely similar goal, which is exactly the kind of difference V1 §7.2 and V2 §11.3 treat as a pass.
- **The Clearing vs. everything:** nothing else in the family gets close to its density floor or its total absence of containers; it is, if anything, the single easiest world in the whole eleven-world set to tell apart at a glance, specifically because it does so much less than any of the others.
- **Datum vs. Star Chart (V2) and The Wing (V2):** all three could loosely be called "spatial/exploratory," but Datum's continuous ascending bands, Star Chart's discrete point field, and The Wing's bounded rooms are three different structural ideas about what "space" means, matching the same reasoning V2 §11.2 already used to clear As-Built against The Wing.

### A.6.3 The gate, run against all eleven

Apply the same thumbnail test and row-by-row check (V1 §7.2, V2 §11.3) to the full eleven-world family once real screenshots exist. Given the reasoning in §A.6.1–§A.6.2 above, no world in this addendum is expected to collide with any existing world or with each other — but as always, this expectation is `[SPEC-DERIVED]` reasoning about the specs as written, not a substitute for running the real test once these three are actually built (V2 §13.4's Phase 3, extended to cover all eleven branches rather than eight).
