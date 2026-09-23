# Portfolio Design Exploration V2

**A specification for AGY CLI: audit the three V1 worlds, refine what earns it, and open five new design worlds — including a required paper/print world — for Zendrix Riva's developer portfolio.**

Version 1.0. Companion to `PORTFOLIO_DESIGN_EXPLORATION.md` (V1). Read that document first; this one assumes its §0 to §4 (tag system, override rules, project context, repo-analysis findings, design goals, and constraints) still apply and does not repeat them except where V2 changes something.

---

## 0. How to use this document

### 0.1 A access note, stated plainly

This document, like V1, is **authored without direct access to the repository, its branches, or their rendered output.** I have not seen `world-01-biyahe`, `world-02-as-built` or `world-03-the-current` as built — only the V1 spec that described what to build. Where this document evaluates the existing worlds (§1, §2), that evaluation is **a starting hypothesis derived from the V1 spec's own stated intentions and known risk areas**, not a report on the actual implementation. It is tagged `[SPEC-DERIVED]` throughout and every such item carries a `[VERIFY]` instruction. AGY CLI has what I do not — the real repository — and Phase 0 of this document (§17) is a **mandatory audit protocol** that produces the real findings before any refinement or new world is built. Do not treat §1's `[SPEC-DERIVED]` predictions as the audit; treat them as the first draft of a checklist the real audit must confirm, correct, or overturn.

### 0.2 Tag system (extends V1's)

| Tag | Meaning |
| --- | --- |
| `[OWNER]` | Stated by the project owner; binding. |
| `[SPEC-DERIVED]` | My inference from what V1's spec asked for, not from seeing the build. Must be confirmed against the real branch in Phase 0 (§17.2) before it drives any decision. |
| `[VERIFY]` | Needs confirmation against the real repository, screenshot, or build output before treating as fact. |
| `[DECISION]` | A choice made in this document; binding unless Phase 0 findings contradict it, in which case follow §17.6. |

### 0.3 Override rules that carry over unchanged from V1

Re-read V1 §0.2 in full. In particular: repo content stays the single source of truth; no invented projects, metrics, or testimonials; never modify a branch you didn't create it for; undo with `git revert`, never `git reset --hard`, `push --force`, or `branch -D`; missing data is logged, never invented; WCAG 2.2 AA and the performance budgets in §20 are release gates, not aspirations.

### 0.4 What changes from V1

V1 optimized for **maximum distance between three worlds built at the same time, from a blank slate.** V2 adds two things V1 did not need: **a real audit of finished work**, and **a family that must keep growing without collapsing into itself** — eight worlds (three original, five new) all drawing from the same content, all needing to still read as distinct from one another, not just from their nearest sibling. §2, §7 and §16 exist because of this; they didn't need to in V1.

### 0.5 Run protocol

| Session | Scope | Reads |
| --- | --- | --- |
| A | Phase 0: audit the three V1 worlds on their own branches (read-only); produce `docs/worlds-v2/AUDIT.md` and `docs/worlds-v2/DESIGN_DNA.md` | §17.1–§17.2, §1, §2 |
| B | Refine `world-01-biyahe` on `portfolio/refine-biyahe` | §4, its own world's §6.1 of V1 |
| C | Refine `world-02-as-built` on `portfolio/refine-as-built` | §5, its own world's §6.2 of V1 |
| D | Refine `world-03-the-current` on `portfolio/refine-the-current` | §6, its own world's §6.3 of V1 |
| E | Build new World — Marginalia | §9.1 only |
| F | Build new World — The Masthead | §9.2 only |
| G | Build new World — The Wing | §9.3 only |
| H | Build new World — Star Chart | §9.4 only |
| I | Build new World — Runtime | §9.5 only |
| J | Comparison across all eight worlds | §18, all reports |

As in V1, a session building or refining one world reads only that world's own subsection to avoid convergence between worlds it isn't working on. Sessions E through I may run in parallel worktrees (§16.5); refinement sessions B, C, D must not start until Session A's audit is committed, since each refinement plan in §4–§6 is written against `[SPEC-DERIVED]` predictions that A's real findings may adjust (§17.6).

---

## 1. V1 audit

### 1.1 Method

Everything in §1.2 is `[SPEC-DERIVED]`: reasoned from what V1 asked each world to be, from the gaps V1 already flagged as risk in its own text, and from the general failure modes of AI-agent-built interfaces (drift from spec under real content, motion that ships broader than the "one moment" rule intended, responsive states that were designed but not built with the same care as desktop). None of it should be taken as a finding about the actual code. Session A replaces every `[SPEC-DERIVED]` line below with a real one, in `docs/worlds-v2/AUDIT.md`, using the checklist at §17.2, before §4–§6's refinement plans are treated as final — if a `[SPEC-DERIVED]` guess turns out wrong, the corresponding refinement item is dropped or rewritten, not built anyway.

### 1.2 Per-world predicted audit

**World 01 — Biyahe**

| Dimension | `[SPEC-DERIVED]` assessment | Risk if true |
| --- | --- | --- |
| Visual identity | The six-field color system and press-plate physicality are distinctive on paper; the metaphor is most likely to have survived intact in the hero and navigation, where V1 gave the most explicit detail (§6.1.4, §6.1.5). | Low. |
| Layout | The route-list rows for supporting projects (§6.1.7) are the section most likely to have collapsed into an ordinary card list under real content pressure, since "row-plate that expands via `<details>`" is a less common pattern than a card and easier for an agent to simplify. | Medium — this is the section most likely to feel generic. |
| Typography | Bungee is display-only by spec; the risk is body text creeping into all-caps or Bungee being used somewhere it shouldn't (a banned-default pattern V1 explicitly forbade at §4.2). | Low-medium. |
| Interaction | The roll-sign hero moment (§6.1.4) is the most complex single piece of motion in any V1 world (play-once flag, `steps()` easing, FOUC avoidance); it is the most likely orchestrated moment across all three worlds to be missing, simplified to a plain fade, or broken on repeat visits. | Medium-high — check this first. |
| Responsiveness | The mobile "Routes" dialog (§6.1.5) depends on native `<dialog>`; check it actually opens as `showModal()` and not a plain positioned div, and that the bottom-right placement respects the thumb zone and safe-area insets as specified. | Medium. |
| Content | The single-project and many-project cases (§2.6) are good stress tests to actually run; a route board built and screenshotted with only the seed project in mind may not have been tested against DaloyAqua being the only entry with real data. | Medium. |

**World 02 — As-Built**

| Dimension | `[SPEC-DERIVED]` assessment | Risk if true |
| --- | --- | --- |
| Visual identity | Tables-as-layout is unusual enough that it likely reads as distinct; the redline cloud (§6.2.11) is a genuinely hard SVG construction (a hand-built scalloped path with a `stroke-dashoffset` draw) and is the single most likely element in this world to be missing or replaced with something simpler, like a plain colored badge. | Medium-high — check the cloud specifically. |
| Layout | The title block on every sheet (§6.2.3) is easy to under-build (a static label instead of the specified three-cell bordered row); verify it is present and correctly populated on every section, not just the hero. | Medium. |
| Typography | The redline/Kalam restriction (status only, §6.2.2) is easy to violate by accident if a general "handwritten" style got applied more broadly than intended. | Low-medium. |
| Interaction | Instant state changes (0ms) are specified everywhere except the one redline draw; if a generic "add hover transitions" pass was applied afterward, this world may have accidentally gained easing where the spec explicitly forbids it (§6.2.11) — this would blur it toward the same soft-hover feel as the other worlds. | Medium — this is the most likely cross-world convergence risk in V1. |
| Responsiveness | The sheet index's shift from left rail → top strip → bottom strip (§6.2.5) is three distinct navigation shapes across breakpoints, the most breakpoints-sensitive nav of the three worlds; verify all three independently rather than assuming tablet is "desktop, narrower." | Medium. |
| Content | The skills matrix vs. schedule fallback (§6.2.8) depends on exact stack-name matching across projects; if the real content doesn't have two projects with overlapping stack items, this world may be permanently showing the (less interesting) fallback table — worth confirming either way. | Medium. |

**World 03 — The Current**

| Dimension | `[SPEC-DERIVED]` assessment | Risk if true |
| --- | --- | --- |
| Visual identity | The single-hue-ramp restriction (§6.3.2) is the most disciplined color rule of the three worlds and the easiest to accidentally break with "just one accent for the button" — check whether any pill or link introduced a hue outside the ramp. | Medium. |
| Layout | This world has the least conventional layout logic (no cards, no boxes, alternating channel sides) and is therefore the most likely to have partially reverted toward ordinary centered-column blocks under implementation pressure, especially on mobile where §6.3.13 collapses to a single channel. | Medium-high — check whether the alternating-side rule (§6.3.2, §5.3) actually happened on desktop, since it is easy to skip. |
| Typography | Fraunces at 300 weight and large sizes is expensive to render well; check actual rendered weight and size against `clamp()` values, since a font substitution under §4.3 could have quietly landed here without being logged. | Low-medium. |
| Interaction | The scroll-linked line (§6.3.12) is the most technically ambitious single feature across all of V1 — a hand-built Catmull-Rom path, a sampled length table, and a scroll-position-driven `stroke-dashoffset`. It is the single most likely feature in the entire V1 exploration to be either absent, simplified to a straight decorative rule, or present but janky (jumping instead of smoothly tracking scroll). | High — audit this first, specifically. |
| Responsiveness | The "no card, no border" rule is hardest to sustain on narrow phone widths where content naturally wants to stack into blocks; check whether mobile silently gained borders or backgrounds that read as cards. | Medium. |
| Content | The eddy-loop treatment for the featured project (§6.3.7) is a specific, unusual SVG construction; verify it renders as a loop and not as a plain node, especially given DaloyAqua's in-progress status needing to sit legibly beside it. | Medium. |

### 1.3 Cross-world risks common to all three

- **The "one moment" rule (§5.3 of V1) is the rule most likely to have drifted.** All three worlds specify exactly one orchestrated, non-user-triggered motion moment. If a later polish pass added hover-lift, fade-ins, or stagger effects beyond what each world's own micro-interactions table allows, that is a direct V1 violation worth flagging even though V1 itself asked for it — this is precisely the kind of drift the real audit exists to catch.
- **Skills sections are the likeliest place for a banned default to have crept back in** (§4.2 of V1 forbade progress bars and percentage fills); check all three worlds specifically for this, since "skill level" is a very strong default pull for any agent.
- **Reduced-motion and forced-colors support are the two accessibility requirements most likely to have been implemented for the *primary* interaction but not for the world's one signature moment specifically** — verify each world's orchestrated moment (roll-sign, redline draw, line draw) actually has a distinct, tested reduced-motion path, not just a general CSS media query left unconnected to the custom JS-driven animation.
- **None of this list should be treated as confirmed** until Session A runs the real audit in §17.2. If a `[SPEC-DERIVED]` risk turns out not to exist, note that in `AUDIT.md` and skip the corresponding refinement item in §4–§6 rather than fixing something that isn't broken.

---

## 2. Existing-world design DNA

This table is filled from the V1 spec `[SPEC-DERIVED]`, since V1's per-world sections were written to be this specific. Session A confirms or corrects each cell against the real branches in `docs/worlds-v2/DESIGN_DNA.md`, replacing this table rather than appending to it.

| Dimension | Biyahe | As-Built | The Current |
| --- | --- | --- | --- |
| Mood | Loud, warm, confident, tactile | Cool, precise, quiet, verifiable | Calm, deep, spacious, unhurried |
| Density | Medium-low (one loud thing per band) | High (tables, data-dense) | Very low (space is the structure) |
| Primary layout logic | Full-width horizontal color bands | Framed sheets with a fixed skeleton | Alternating-side reading column against an empty channel |
| Typography character | Bungee display in plates, Lexend body | Barlow Condensed / Barlow / Plex Mono / Kalam (reserved) | Fraunces 300 (large, light) / Hanken Grotesk |
| Shape language | Rectangular plates, 3-radius scale (0/8px/pill), black outlines everywhere | Right angles only, radius 0 everywhere, 1–3px line weights | No containers at all; a node (ring) and a tick (stroke) are the only devices |
| Color behavior | Six saturated flat fields, one job per color | Two inks (ink, reserved redline) on paper or blueprint | One hue ramp, six zones, text color changes only at zone boundaries |
| Navigation model | Sticky row of colored route plates; mobile full-screen dialog | Sticky sheet-index rail; mobile bottom strip | Fixed depth gauge with a traveling marker; mobile bottom pill + popover |
| Project presentation | Featured board + expandable "route list" rows | Featured detail sheet with redline status cloud + project-schedule table | Featured "eddy" loop + stations threaded on the line |
| Interaction model | Physical: press, release, overshoot | Referential: instant, tabular, cross-checkable | Ambient: revealed by moving through it |
| Motion | One moment: roll-sign name reveal on load | One moment: redline cloud draws once, on first view | One continuous motion: line length tracks scroll, plus a first stroke on load |
| Spatial rhythm | Uneven band splits, no two adjacent bands share a column split | Uniform sheet skeleton repeated with total regularity | Long unbroken vertical runs of empty space between short bursts of content |
| Signature element | Destination-board hero + press-in plates | Title block + redline revision cloud | The scroll-drawn line itself |
| Strongest aspect `[SPEC-DERIVED]` | The physical press/release interaction model is the most tactile and specific thing any V1 world does; nothing else in the family behaves like a button that has depth. | The instant-state, zero-easing interaction model is the most disciplined and the easiest to defend as "on-concept" in a design review — nothing accidentally looks decorative. | The single continuous line is the most memorable single image of the whole V1 set; it's the one thing a visitor is likely to describe afterward. |
| Weakest aspect `[SPEC-DERIVED]` | The supporting-projects list (§6.1.7 of V1) is the least distinctive section — a list of expandable rows is a common pattern in a route-plate costume. | The world's discipline can read as a lack of warmth; nothing in the spec gives the visitor a reason to linger rather than scan. | The heaviest technical bet (the scroll-linked line) is also the single point of failure; if it doesn't render correctly the whole world degrades to "a plain minimal page," with the least fallback grace of the three. |

### 2.1 What this table already tells us before Phase 0 confirms it

Reading the DNA table by column rather than by row: **all three V1 worlds are section-based, vertically stacked, single-column-per-viewport experiences that differ in surface treatment (color, type, border logic) more than in fundamental spatial model.** Every one of them is, at the architecture level, "scroll down through named sections in the same order," just dressed three different ways — which V1 defended successfully within its own remit (§7.2 of V1, the thumbnail test, was written and reasoned about specifically for these three, and by its own logic they pass). But it means the *next* axis of difference V2 needs is not another surface treatment. It needs a different **spatial model**: not scrolling through sections, but paging through sheets, walking through rooms, panning across a chart, or following a diagram's flow. §7 develops this directly.

---

## 3. Weaknesses and opportunities

This section is about the **family as it exists after V1**, independent of any single world's individual issues (those are in §4–§6). Like §1 and §2, treat everything here as `[SPEC-DERIVED]` pending Session A.

### 3.1 What V1 got right, worth protecting in V2

- **Real functional parity.** All three worlds share section order, IDs, and the theme-toggle mechanism (V1 §5.4). This is why they're comparable at all, and it must hold across all eight worlds by the end of V2, including the five new ones.
- **A genuine content contract.** V1's insistence on no invented content (§2.5 of V1) means whatever the real audit finds, it will be finding real presentation problems, not content-fabrication problems. Keep this absolute in V2 as well (§0.3 above).
- **Discipline about one motion moment per world.** This is very likely the single best structural decision in V1, and per §1.3 above, likely also the rule most under threat from later polish passes. It should be reasserted, not loosened, for both the refined and the new worlds.

### 3.2 What's likely thin, worth fixing before adding more worlds

- **"Route list," "project schedule," and "stations" are the three worlds' answer to the same underlying problem — how to present three or four ordinary side projects — and by V1's own DNA table, none of the three commits especially hard to it.** This is the shared weak point across the entire family, worth naming explicitly. Refinement plans for each existing world (§4–§6) should give real attention to this, not just to the hero and the signature element that already got the most spec detail.
- **All three V1 worlds are essentially list-shaped once you get past the hero.** Hero → About → Projects-as-list → Skills-as-groups → Experience-as-list → Contact. The metaphor changes the skin of the list, not whether it's a list. §7 and the five new worlds are the direct answer: at least two of them (Star Chart, Runtime) should structurally not be a vertical list at all.
- **None of the three V1 worlds gives the "about" section a strong compositional idea of its own** — in all three, About is "text in a column, maybe a fact sidebar," which is the least differentiated section in the family (compare the DNA table's Hero and Projects rows, which are specific, against a hypothetical About row, which would read nearly the same for all three). The refinement plans in §4–§6 each include one proposal to fix this for their own world.

### 3.3 The core opportunity for V2

V1 answered "what does this developer's work look like in three different rooms of the same house." V2's job, per §0.4, is to answer a different question: **what if it isn't a house at all — what if it's a notebook, a magazine, a museum, a sky, or a running program?** That reframe is what makes the five new worlds different in kind, not just in decoration, from the three that exist — and it's what §7 maps out concretely before any new world gets specified.

---

## 4. Refinement plan: World 01 — Biyahe

**Branch:** `portfolio/refine-biyahe`, cut from `world-01-biyahe` at its current tip. This is evolution, not a rebuild: the six-field color system, the plate vocabulary, the roll-sign hero, and every rule in V1 §6.1 stay in force except where an item below explicitly changes one.

Confirm every `[SPEC-DERIVED]` premise below against Session A's real audit before implementing it. If Session A finds the roll-sign already works perfectly, skip item 4.2; if the route-list rows already read as distinctive, skip 4.1.

### 4.1 Give the supporting-projects list a stronger idea than "expandable rows"

- **Existing problem.** `[SPEC-DERIVED]` per §2.1 and §3.2: the route-list treatment (V1 §6.1.7) is the least distinctive section in this world — an expandable row is a common pattern regardless of what color it's painted.
- **Proposed improvement.** Turn the route list into an actual **route manifest**: a full-width plate styled like a jeepney's painted destination roster — each supporting project is a stop on a single printed "route," set as a row with a small numbered stop-marker (reusing the existing stop-circle device from Experience, §6.1.9 of V1, so it isn't a new shape) at the left, the project name in Bungee at a smaller size than any heading currently used, and the "Open" plate at the right. The `<details>` expansion stays exactly as specified for stack/links/description — this is a re-skin of the row's rest state, not a change to the interaction.
- **Why it fits the world's identity.** It reuses a device (the stop-circle) the world already owns instead of inventing a new one, and it strengthens the route metaphor exactly where it was weakest — the metaphor was already fully committed in Hero, Navigation, and Experience; Projects was the one section that fell back to a generic list shape.
- **What must remain untouched.** The featured-project board stays exactly as specified. The `<details>` expand/collapse mechanism, its chevron rotation, and its accessible name pattern (V1 §6.1.7, §6.1.11) do not change. No new color is introduced — the stop-marker cycles through the same four colors already specified for the route chips.

### 4.2 Verify and, if needed, rebuild the roll-sign hero moment properly

- **Existing problem.** `[SPEC-DERIVED]` per §1.2: this is the most technically demanding single piece of motion in the world and the most likely to have been simplified or dropped.
- **Proposed improvement.** If Session A confirms the roll-sign is missing or degraded: rebuild it exactly to V1 §6.1.4 — a real `<h1>` in the DOM from first paint, aria-hidden rolling clones, a play-once flag set via an inline `<head>` script (the same pattern already used for the theme toggle, so no new architecture is introduced), `steps()` easing, ≤900ms. Do not redesign the moment; V1's spec for it was already correct. This item is "restore," not "reimagine."
- **Why it fits the world's identity.** The roll-sign is the signature element (V1 §5.1); a world without a working signature element isn't a weaker version of Biyahe, it's a world that hasn't actually been built to spec yet.
- **What must remain untouched.** Everything else in the hero. If the moment already works, this entire item is skipped.

### 4.3 Give About a compositional idea specific to this world

- **Existing problem.** `[SPEC-DERIVED]` per §3.2: About is currently "reading plate plus fact plates," which is the least Biyahe-specific section in the world — the same shape would work in almost any card-based design.
- **Proposed improvement.** Treat the About section as a **cargo manifest**: keep the reading plate exactly as specified, but reshape the fact plates (only the ones that already exist per repo data — no new facts) into a single horizontal strip of small stamped chips sitting *inside* the black outline of one connected plate, like items checked off a manifest, rather than as separate freestanding plates. This is a layout change within the section's existing content and color rules, not a new component.
- **Why it fits the world's identity.** "Manifest" continues the route/cargo vocabulary the hero and navigation already establish, giving About a specific visual idea instead of a generic "info card" shape.
- **What must remain untouched.** The reading plate's typography and copy handling (verbatim text, "Read more" for long text) do not change. No new color plate is introduced.

### 4.4 Do not touch

Per §0.2's override rules and V1 §4.3: the six-field color tokens, the type pairing (Bungee/Lexend), the triple-pinstripe divider, the press/release/overshoot interaction timing, the navigation model, the Experience road, and the Contact section are all working as specified and are out of scope for this refinement pass.

---

## 5. Refinement plan: World 02 — As-Built

**Branch:** `portfolio/refine-as-built`, cut from `world-02-as-built` at its current tip. The two-ink discipline, the sheet skeleton, the title block, and every rule in V1 §6.2 stay in force except where an item below explicitly changes one.

### 5.1 Verify the redline cloud renders as specified, not as a generic badge

- **Existing problem.** `[SPEC-DERIVED]` per §1.2: the scalloped-cloud SVG construction (V1 §6.2.11) is unusual enough to build that a simpler colored badge or pill may have been substituted for it.
- **Proposed improvement.** If Session A confirms the cloud is missing: implement it exactly to the path already specified in V1 §6.2.11 (the twelve-scallop path is given verbatim there — it does not need to be re-derived), including the `stroke-dashoffset` draw-in on 60% visibility and the separate revision-triangle fade. This is "restore to spec," not a new design task.
- **Why it fits the world's identity.** The cloud is this world's signature element (V1 §5.1); without it, the DaloyAqua status is just colored text, which undersells the entire "as-built record" concept the world is built around.
- **What must remain untouched.** Redline's reservation for exactly the cloud, the triangle, and the handwritten status (V1 §6.2.2) does not loosen — do not use redline anywhere else to "make up for" a missing cloud elsewhere.

### 5.2 Re-audit every hover and transition against the zero-easing rule

- **Existing problem.** `[SPEC-DERIVED]` per §1.2 and §1.3: this is the single most likely place in the whole V1 family for a generic "add nice hover transitions" pass to have quietly reintroduced eased motion the spec explicitly forbids (V1 §6.2.11 — every state change is instant except the one redline draw).
- **Proposed improvement.** Grep the stylesheet or component styles for any `transition` property outside the one redline animation and the one revision-triangle fade; remove it. Cell buttons, index rows, and table rows all invert instantly (`0ms`) per spec.
- **Why it fits the world's identity.** Instant state change is what makes this world read as "referential" rather than "tactile" (its DNA-table row in §2 above) — restoring it is what keeps it distinct from Biyahe's press-and-release model and Marginalia's forthcoming paper-turn model (§9.1).
- **What must remain untouched.** The redline draw and the revision-triangle fade are the two intentional exceptions and stay exactly as timed in V1 §6.2.11.

### 5.3 Give the project schedule table more narrative weight without breaking its table-ness

- **Existing problem.** `[SPEC-DERIVED]` per §2.1 and §3.2: the project-schedule table (V1 §6.2.7) is functionally strong but, as a bare table, may read as the least warm section of an already deliberately cool world — worth one careful addition, not a redesign.
- **Proposed improvement.** Add a single **"Notes" column** to the schedule table, populated only when a project's existing description contains something not already captured by its title — a short clause (repo text, not new copy) rather than the full description. If no project's data supports a genuinely new clause, leave the column out entirely rather than duplicating the title into it. This is additive and reversible: dropping the column returns the table exactly to V1 spec.
- **Why it fits the world's identity.** Real drawing-set schedules routinely carry a notes column; adding one is period-accurate to the metaphor, not a decoration.
- **What must remain untouched.** Column omission-when-empty (V1 §6.2.7) still applies to this new column exactly as it does to every other. No status information duplicates between the Notes column and the Status column.

### 5.4 Give About a compositional idea specific to this world

- **Existing problem.** `[SPEC-DERIVED]` per §3.2: About currently reads as "text plus a small label/value schedule" (V1 §6.2.6), which is close to how any sober documentation site presents an author bio.
- **Proposed improvement.** Set the About sheet's schedule (the label/value fact table) as a **legend box** — visually styled like the legend/key that accompanies a real drawing set, with a thin double-rule border distinct from the sheet's own outer frame, positioned as if it were a callout referencing the text beside it, connected to the text by a single thin leader line from the legend box to the paragraph it corresponds to (only drawn if there's a fact-to-sentence relationship worth showing — for instance, a stated role linking to the sentence that first mentions it), or omitted entirely if there's no clean pairing.
- **Why it fits the world's identity.** A legend-with-leader-line is a specific, real drawing-set convention (distinct from Marginalia's forthcoming marginal annotations, §9.1, which serve a different purpose and look different), reinforcing "this document records real things" rather than "this is a bio card."
- **What must remain untouched.** If there is no clean fact-to-sentence pairing in the real content, this item is skipped rather than forced — do not invent a relationship between a fact and a sentence that isn't genuinely there.

### 5.5 Do not touch

Per §0.2 and V1 §4.3: the two-ink system, the sheet skeleton and title block, Barlow/Plex Mono/Kalam typography, the sheet-index navigation model at all three breakpoints, the skills matrix and its fallback logic, and the revision-history table are all working as specified and are out of scope for this refinement pass.

---

## 6. Refinement plan: World 03 — The Current

**Branch:** `portfolio/refine-the-current`, cut from `world-03-the-current` at its current tip. The single-hue ramp, the alternating-channel layout, the line, and every rule in V1 §6.3 stay in force except where an item below explicitly changes one.

### 6.1 Verify the scroll-linked line actually tracks scroll, not a simplified substitute

- **Existing problem.** `[SPEC-DERIVED]` per §1.2: this is the most technically ambitious single feature in all of V1 (a hand-built Catmull-Rom path, a sampled length table, scroll-position-driven `stroke-dashoffset`), and the most likely to have shipped as something simpler — a straight decorative rule, or a version that snaps between states instead of tracking continuously.
- **Proposed improvement.** If Session A confirms the line is missing, straight, or non-scroll-linked: rebuild it exactly to V1 §6.3.12, including the waypoint system (per-zone entry/exit points, the eddy loop around the featured project, the contact-address terminus), the Catmull-Rom-to-Bézier conversion, and the passive rAF-throttled scroll handler that reads precomputed lengths rather than calling layout methods during scroll. This is "restore to spec," not a redesign — V1's construction method (§6.3.12) is already complete and does not need to be re-derived.
- **Why it fits the world's identity.** The line is this world's signature element and, per §2's DNA table, its single most memorable image; a straight or non-tracking substitute turns "The Current" into an unusually spacious minimal page with no real reason for its name.
- **What must remain untouched.** The reduced-motion fallback (fully drawn, static path) stays exactly as specified — it is not itself evidence of a problem; only a *scroll-driven* version that doesn't track scroll on a non-reduced-motion device is a problem.

### 6.2 Confirm the alternating-channel side actually alternates

- **Existing problem.** `[SPEC-DERIVED]` per §1.2: alternating which side of the page the reading column sits on, zone by zone, is easy to quietly drop in favor of a single consistent side, especially on the way to making the mobile single-channel layout (V1 §6.3.13) simpler to reason about.
- **Proposed improvement.** If Session A finds every zone on the same side on desktop: correct it to alternate exactly as specified in V1 §6.3.2 and §5.1 (Home left, About right, Projects left, Skills right, Experience left, Contact right), moving the channel accordingly per zone.
- **Why it fits the world's identity.** The alternation is part of what keeps six zones of "text plus empty space" from reading as one long repeated template stamped six times; without it, the low-density layout logic that's this world's main structural idea is weakened.
- **What must remain untouched.** The mobile single-left-channel simplification (V1 §6.3.12 item 5) is intentional and correct and should not be "fixed" into alternating on narrow viewports.

### 6.3 Check for accidental cards or borders on mobile

- **Existing problem.** `[SPEC-DERIVED]` per §1.2: "no card, no border, ever" is hard to sustain once content needs to stack on a narrow phone screen, where a background block or divider is often the easiest way to keep things visually organized.
- **Proposed improvement.** Audit the mobile layout for any `border`, `background-color` block, `box-shadow`, or divider rule that doesn't exist in the desktop version, and remove it — rely on spacing alone, per V1 §6.3.3 ("Containers: None").
- **Why it fits the world's identity.** Space-as-structure is the entire design philosophy of this world (§2's DNA table, "Layout" row); a mobile view with card backgrounds is a different world wearing this one's colors.
- **What must remain untouched.** Spacing values may need world-appropriate mobile adjustment (V1 §6.3.13 already specifies tighter spacing at mobile than desktop) — that is not the same problem as a border or card appearing, and should not be reverted.

### 6.4 Give About a compositional idea specific to this world

- **Existing problem.** `[SPEC-DERIVED]` per §3.2: About currently reads as "text in the reading column, facts in the opposite margin" (V1 §6.3.6), a layout shape that would work in almost any minimal design regardless of the water metaphor.
- **Proposed improvement.** If the about text has a natural first sentence under 160 characters (V1 §6.3.6 already allows lifting it larger), let that lifted first sentence sit **directly beside the line's own path** in the channel rather than in the reading column — the sentence becomes something the line passes next to, not just a differently-sized paragraph. Only do this when a genuine short first sentence exists; otherwise skip this item and leave the section as specified.
- **Why it fits the world's identity.** It makes the line functionally relevant to a section where, currently, it merely runs alongside content without touching it — extending the "the line joins everything" idea (V1 §6.3.1) to a section that doesn't yet embody it.
- **What must remain untouched.** The full about text, and any fact stack, remain exactly where V1 §6.3.6 already places them; only the treatment of the one lifted sentence changes.

### 6.5 Do not touch

Per §0.2 and V1 §4.3: the six-zone hue ramp, Fraunces/Hanken Grotesk typography, the depth-gauge navigation model at all three breakpoints, the eddy-loop featured-project treatment, the waypoint/station system for supporting projects and experience, and the contact underline-as-line-terminus are all working as specified and are out of scope for this refinement pass.

---

## 7. Unexplored design territory

### 7.1 The map

§2.1 established the underlying pattern: all three V1 worlds are vertically-stacked, single-column-per-viewport, scroll-through-named-sections experiences. That's one spatial model wearing three costumes. The table below maps spatial models against what V1 already used, to make the gap explicit before choosing what fills it.

| Spatial model | Used in V1? | What it would feel like |
| --- | --- | --- |
| Scroll through stacked sections | Yes — all three worlds | (no further exploration needed here) |
| Paged / layered sheets you flip or peel through | No | A physical stack of pages, each with its own identity, read in sequence but with real depth between them |
| Spreads you read like an open publication | No | Two-page-equivalent compositions, strong grid, text and image sharing authored relationships rather than a single stacked column |
| Rooms or bounded spaces you move between | No | Large, spatially distinct compositions with real thresholds between them, more like visiting a building than reading a page |
| A field you explore non-linearly, with an overview | No | Content plotted rather than stacked, with a map or overview as a first-class navigation device, not just a jump-link list |
| A diagram whose parts are wired together | No | Content as connected nodes in a system, where the *connections between things* are as visible as the things themselves |

### 7.2 Where the required paper/print world sits on this map

The brief requires a paper/print world and is explicit that it must not repeat As-Built's document metaphor. As-Built occupies "an issued, static, single-purpose document" (a drawing set). The unclaimed paper territory is **a working, personal, accumulated object** — something built up over time by its owner, not issued once and filed. That's the paged/layered-sheets row above: a notebook, not a drawing set. §9.1 develops this as **Marginalia**.

### 7.3 How the other four new worlds were chosen

Each of the remaining four rows in §7.1 is claimed by exactly one new world, so that by the end of V2 every spatial model in the map has been explored once — this is the actual mechanism behind "five worlds that are fundamentally different from each other," not just five different color palettes:

- **Spreads you read like a publication** → **The Masthead** (§9.2), an editorial/magazine world.
- **Rooms you move between** → **The Wing** (§9.3), a spatial/architectural world.
- **A field you explore non-linearly** → **Star Chart** (§9.4), a data/observatory world.
- **A diagram whose parts are wired together** → **Runtime** (§9.5), a personal-operating-system world.

Two categories the brief also offered — cinematic/film and Japanese quiet-craft — were considered and set aside for this round rather than forced in: cinematic pacing is fundamentally a *time-based* idea (cuts, scenes) that's hard to build honestly without either fake auto-advancing slides (a UX antipattern for a portfolio someone actually wants to read at their own pace) or becoming, in practice, another version of "scroll through sections with nice transitions" — which §2.1 already flagged as the pattern V2 exists to get away from. Quiet-craft restraint is a *value*, not a distinct spatial model by itself, and several of the five worlds already chosen (particularly Star Chart and The Wing) can and should absorb restraint as a quality bar rather than needing a sixth world built solely to demonstrate it. Both remain available territory for a future V3 if the family keeps growing.

---

## 8. Five new worlds — overview and rationale

### 8.1 At-a-glance

| World | Branch | Spatial model claimed (§7.3) | Mood | Signature element |
| --- | --- | --- | --- | --- |
| **Marginalia** — *required paper/print world* | `portfolio/v2-world-01-marginalia` | Paged, layered sheets you work through | Intimate, handmade, unhurried, premium-tactile | Taped pages with a genuine ink-stamped status on the featured project |
| **The Masthead** | `portfolio/v2-world-02-masthead` | Spreads read like a publication | Confident, considered, editorial | The masthead wordmark hero + drop-cap opening + pull quotes |
| **The Wing** | `portfolio/v2-world-03-the-wing` | Rooms you move between | Institutional-calm, spacious, considered | The floor-plan navigator + threshold transitions between rooms |
| **Star Chart** | `portfolio/v2-world-04-star-chart` | A field explored non-linearly, with an overview | Quiet, exploratory, expansive | The constellation linking skills to the projects that use them |
| **Runtime** | `portfolio/v2-world-05-runtime` | A wired diagram | Clear, systemic, dry-erase-tactile | The whiteboard flowchart wiring skills to project modules |

### 8.2 Shared rules across all five (restated from V1, binding here too)

- Same content, same section order and IDs, same theme-toggle persistence mechanism, same "no invented content" rule (§0.3).
- Exactly one orchestrated, non-user-triggered motion moment per world (§3.1's "protect this" item, carried forward).
- No item from V1 §4.2's banned-defaults table, in any of the five.
- Each world defines its own complete design system (§10 indexes them; §9.1–§9.5 specify them in full).
- Functional parity: keyboard operable, `prefers-reduced-motion` honored, WCAG 2.2 AA, the performance budgets in §20.

### 8.3 Why these five, together, pass the diversity test before it's formally run

§15 runs the full diversity matrix once all five are specified, but the reasoning is visible already from §8.1's table read column-by-column: no two of the five share a spatial model (each claims a distinct row from §7.1), no two share a mood descriptor, and no two signature elements are the same kind of object — one is a physical stamp, one is typographic (drop cap/pull quote), one is a wayfinding diagram, one is an astronomical chart, one is a circuit-style wiring diagram. Two of the five (Star Chart, Runtime) independently arrived at "connect skills to the projects that use them with a line," reusing the same underlying relationship rule V1 §2.5 already defines (exact stack-name matches) — but they render that relationship in genuinely different visual grammars (organic constellation curves on a night sky vs. orthogonal circuit-style wiring on a whiteboard), which §15 treats as a pass, not a collision, for exactly the reason V1 §7.2 gives: matching mechanism, not matching vocabulary, is what the gate checks for, and "curved lines on stars" and "orthogonal wires on a board" are different mechanisms.

### 8.4 A note on the required paper/print world specifically

Marginalia is listed first in §8.1 and is specified first in §9 because the brief calls it out as required, separately from the general "at least five" requirement. It is not, structurally, treated any differently from the other four in git strategy, phases, or the quality bar — it earns its place in the diversity matrix the same way the others do, not by exemption.

---

## 9. Detailed specifications: the five new worlds

Each world below is self-contained: everything an implementing session needs is in its own subsection. **9.1 is the required paper/print world** (§8.4); it is specified with the same structure and the same rigor as the other four, not with special allowances.

### 9.1 New World 01: Marginalia (required paper/print world)

**Branch:** `portfolio/v2-world-01-marginalia`

#### 9.1.1 Concept

- **Metaphor.** A working notebook — the kind a careful person keeps at their own desk, not a document issued for someone else to file. Every section is a **page**, taped down and slightly imperfect, the way real handled paper is. This is deliberately **not** As-Built's metaphor: As-Built is an issued record for someone else to check; Marginalia is a personal, accumulated object the owner has been keeping for themselves. §7.2 names this distinction explicitly and it is the whole reason this world is allowed to also be about paper.
- **Philosophy.** "This person has been keeping notes the whole time." Warm, unhurried, intimate — but **premium**, not nostalgic: a well-made notebook, not a school project or a scrapbook. Craft is expressed through restraint in how many physical devices are used (exactly tape and one ink stamp, never more), not through piling on texture.
- **Spatial model.** Paged, layered sheets (§7.1). Pages stack with real overlap and depth; scrolling moves through the stack, and the page beneath is visible peeking out from under the current one.
- **Signature element.** The tape-and-stamp system: every page is taped down at its top corners, and the featured project's status is a genuine hand-stamped mark, not a colored label.

#### 9.1.2 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Desk (default) | Lamp | Role |
| --- | --- | --- | --- |
| `--paper` | `#F0F1ED` | `#2B241E` (ground) | Page ground. A cool, slightly green-grey recycled paper, deliberately not cream. |
| `--ink` | `#262220` (13.90:1) | `#F1E9DA` (12.67:1) | Body and heading text |
| `--ink-2` | `#54504A` (7.06:1) | `#C9BEAE` (8.34:1) | Secondary text, meta, page numbers |
| `--tape` | `#3E7C74` (4.26:1 UI) | `#8FD4C7` (9.03:1 UI) | The tape strips and bookmark tabs only |
| `--stamp` | `#A63D2F` (5.56:1) | `#E2725C` (4.95:1) | **Reserved** for the featured-project status stamp only |
| `--lift` | `rgba(0,0,0,.14)` | `rgba(0,0,0,.4)` | The one flat drop-shadow token, used only for paper lift (§9.1.3) |

Two inks, one tape color, one reserved stamp color. No third accent. This palette was chosen specifically to avoid V1 §4.2's banned cream-serif-terracotta combination: the paper is cool-grey rather than cream, and the reserved accent is an oxide red rather than a terracotta orange.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Titles | **Lora** 600 | Name, page titles, project and entry titles |
| Reading | **Source Serif 4** 400 and 600 | Body text, descriptions |
| Typed | **Courier Prime** 400 and 700 | Byline, dates, page numbers, stack tags, meta |
| Handwritten | **Caveat** 500 and 600 | **Only** margin annotations (§9.1.3), never headings or body |

Scale: name `clamp(2.75rem, 8vw, 6.5rem)` / 1; page title `clamp(1.75rem, 4vw, 3rem)` / 1.1; body 1.0625rem / 1.65; typed meta 0.875rem; handwritten annotations 1.125rem (never below 1rem — handwriting fonts need more size to stay legible). Sentence case; no all-caps.

**Layout concept.** Full-bleed **pages**, max width 900px, centered, each with: a torn top edge (an SVG `clip-path` with an irregular polyline, aria-hidden, seeded per section so no two pages tear identically), a slight rotation between −1.5° and 1.5° (seeded per section, deterministic, never randomized on reload), 1–2 tape strips (small rotated rectangles, `--tape`, 44×20px) at the top securing it, and `--lift` applied as a single flat drop shadow. Pages overlap the one below by about 40px so the next page's torn top edge is visible before you reach it. Desktop reserves a left **margin column** (about 18% of page width) for annotations; it is empty white space when a page has no annotation-worthy fact, never padded to look occupied.

**Wireframe: hero page (≥1024)**

```text
        ┌──╱╲──────────────────────────────────╲╱───┐  torn top edge
   [tape]│                                            │[tape]
        │                                             │
 margin │  {NAME}   Lora 600, huge                    │
 column │  {ROLE}   Courier Prime, typed byline        │
 (empty │                                             │
  here) │  {INTRO}  Source Serif, reading column      │
        │                                             │
        │  See projects      Send an email            │
        │                                        p. 1 │  page number, bottom right
        └─────────────────────────────────────────────┘
             ╲___ next page's torn edge peeking out ___╱
```

**Principles.** (1) Exactly two physical devices — tape and the one stamp — never more. (2) The margin column holds annotations only when a real fact earns one; empty margin is correct, not a gap to fill. (3) Handwriting is reserved for annotations; every heading and body word is set type, not script. (4) One flat shadow token, used only for paper lift. (5) Pages settle once; nothing else moves on its own.

#### 9.1.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--paper`. No fake paper-texture image, no noise, no grain filter across the whole page — texture is implied only by the torn edge and tape, not painted on. |
| Borders | None. Pages are separated by shadow and overlap, not by rules. |
| Shadows | **One token, `--lift`**, on the page stack only. Never on buttons, chips, or text. |
| Radius | `0` everywhere except tape strips and chips, which use `2px` (barely-rounded paper corners). |
| Spacing | 8px base. Page padding `clamp(32px, 6vw, 64px)`, plus the margin column width on desktop. Page overlap 40px. |
| Grid | Single reading column, max 640px, inside the page's content area (page itself max 900px including the margin column). |
| Density | Medium — reads as a person's real notes, not sparse, not cluttered. |
| Image treatment | A photo, if present, sits in a small rotated frame (−2° to 2°, seeded) with one tape strip, like a photo taped into a notebook. No image: nothing is drawn in its place; the text simply takes the space. |
| Icons | Three, 1.5px round-cap strokes: external link, copy, theme. Nothing decorative. |
| Containers | Exactly three: the **page**, the **index card** (Projects, §9.1.7), and the **tag** (Skills, §9.1.8). |
| Buttons | Text links with a single underline that thickens on hover/focus (not a filled button shape — this world's actions read as instructions circled in pen, not app buttons). Minimum 44px tap target via padding even though the visible mark is just text and a line. |
| Navigation | Bookmark tabs (§9.1.5). |
| Separators | None; the torn edge and overlap between pages are the only separation. |
| Chrome labels | Page numbers only (`aria-hidden`, since the real section name is already the visible heading). |

**Margin annotations.** A margin note is a short Caveat-set phrase, rotated 0° to −3°, connected to its referent by a short thin `--ink-2` line (1px, hand-drawn feel via a very slight SVG path curve, not straight). It exists **only** when the repo data supports a genuinely short, real annotation (for example, a status word, a "current" marker, or a single fact worth calling out) — never invented commentary. If nothing qualifies on a given page, the margin stays empty.

**The stamp.** A single SVG, circular-oval, `--stamp` colored 2px stroke with a deliberately imperfect (slightly broken, uneven-pressure) outline, rotated −8° to −14° (seeded, not random), containing the DaloyAqua status exactly as stored, set in Courier Prime 700 following the stamp's curve or set straight across it (straight is acceptable and simpler; curved is a nice-to-have, not required). It sits stamped over the top corner of the featured project's index card. This is the one and only use of `--stamp` anywhere in the world.

#### 9.1.4 Hero

- **Composition.** Page 1. `{NAME}` in Lora 600 at hero scale. `{ROLE}` directly under it in Courier Prime, like a typewritten byline. Then `{INTRO}` (verbatim) in the reading column. Then two text-link actions: "See projects" and "Send an email" (existing `mailto:`).
- **Photo.** If present, taped in the margin column beside the name, per §9.1.3's image treatment.
- **Orchestrated moment: the page settle.** On first visit each session, the hero page starts offset (translated 24px down-right of its resting position and rotated an extra 3° beyond its seeded rotation) and animates into its resting position over 650ms `cubic-bezier(.16,1,.3,1)` — like a page being set down on a desk. The tape strips are already in their final position throughout (they don't move; only the page does). Real `<h1>` text is in the DOM and visible from first paint; only the page's transform animates. Repeat visits and reduced motion: the page is already at rest, no animation. This is the only page that ever performs this moment — every other page appears already settled.

#### 9.1.5 Navigation: the bookmark tabs

- **Desktop (≥1024).** A vertical stack of tabs fixed to the right edge (`right: 0`), each a small rectangle (`--tape` color, alternating a lighter tint for visual rhythm), 40px tall, existing section name set small and vertical (`writing-mode: vertical-rl`). The current tab is pulled outward 8px (`translateX(-8px)`) and has `aria-current="location"`. The theme toggle is the bottom tab, labelled with the alternate mode's name.
- **Tablet (640–1023).** Tabs shrink to numeral-only (36px), full label appears on hover/focus.
- **Mobile (<640).** Tabs become a fixed bottom row of small flag-shaped tags (`bottom: calc(8px + env(safe-area-inset-bottom))`), each at least 44px wide, current section's flag slightly taller. `scroll-padding-bottom` matches the row's height.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`), consistent with every other world in this family.

#### 9.1.6 About

- Page 2. Reading column: existing about text, Source Serif, full length (no "Read more" truncation — a working notebook doesn't hide its own notes; if the text is long, the page is simply tall). Margin column: one or two short annotations only where a fact genuinely earns one (§9.1.3); otherwise empty.

#### 9.1.7 Projects: the index cards

- **Featured (DaloyAqua).** A large index card (the world's biggest single container), title in Lora, description in Source Serif, stack as Courier Prime tags, links as underlined text ("Open project", "Source code", only if they exist), and the stamp (§9.1.3) over its top-right corner.
- **Supporting projects.** Smaller index cards in a loosely stacked grid (2 columns desktop, 1 mobile), each independently seeded-rotated (−2° to 2°), title, one-line description, stack tags, links. `--lift` shadow on each card. No image placeholder when there's no image — the card is simply text.
- **Sparse and stress cases.** One project: the featured card alone, no empty grid below it. Many projects: the grid grows, wrapping naturally. A 90-character title wraps within the card. No links: no link line shown.

#### 9.1.8 Skills

- Grouped by category (Courier Prime label), each item a small torn-edge tag chip (2px radius, thin `--ink-2` outline, independently seeded-rotated −3° to 3°, like a paper scrap taped down — but **no** tape graphic on every chip; that would violate the "tape has exactly two functional uses" rule in §9.1.9's anti-goals). If the repo has proficiency data, it appears as a small Caveat annotation beside the relevant chip, connected the same way a margin annotation is (§9.1.3) — only when that data actually exists.

#### 9.1.9 Journey (experience)

- A logbook: each entry a line with the period in Courier Prime, title in Lora, organization in Source Serif italic, description in Source Serif. Current entry (if marked in the repo) gets one small Caveat annotation in the margin ("current" or whatever the repo's own status word is) — not an invented label. Few entries: the logbook is simply short.

#### 9.1.10 Contact

- The final page: the mailto address set large in Courier Prime inside a small torn-edge "postcard" panel, one tape strip holding its top corner down. A "copy" text-link beside it (label swaps to "copied" for 2 seconds, `role="status"`). Social links as a short underlined list below. No form.

#### 9.1.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the page settle** | Hero only, once per session, 650ms (§9.1.4). |
| Tab hover/focus/current | Pull-out `translateX`, 200ms ease-out. |
| Index card hover/focus | `translateY(-3px)`, `--lift` deepens slightly, 180ms ease-out. |
| Underline links | Thickness `1px → 2px` on hover/focus, 150ms. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--ink); outline-offset: 3px`. |
| Reduced motion | No page settle; all other transitions become instant state changes. |

No scroll-reveal, no parallax, no auto-playing loops. Rotation values are static per element (seeded, not animated) except where a hover/focus state is explicitly listed above.

#### 9.1.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Pages and margin | Margin column visible at ~18% width | Margin column narrows to ~12%, annotations shorten | No margin column; any annotation moves inline directly under its referent, in Caveat, no connecting line |
| Navigation | Right-edge tab stack | Numeral tabs, label on hover/focus | Bottom flag row |
| Hero | Photo beside name in margin | Photo above name, centered | Photo above name, full width, capped 240px |
| Projects | 2-column card grid | 2-column, narrower cards | 1-column stack |
| Skills | Chips wrap within category rows | Same | Chips wrap; category label above |
| Contact | Postcard panel beside social list | Stacked | Stacked, full width |

#### 9.1.13 Accessibility and performance notes

- Page rotation is capped at ±1.5° (pages) and ±3° (cards, chips, annotations) so text never becomes hard to read; focus order follows the DOM/reading order, never the visual stacking order.
- The torn edge, tape strips, and stamp graphic are all `aria-hidden`; the stamp's status text exists as real, separately-readable text beside or within it — not only inside the decorative SVG.
- `forced-colors: active`: tabs and cards rely on their outline/border, not background fill alone, to stay visible.
- Fonts: Lora, Source Serif 4, Courier Prime, Caveat — subset latin, budget ≤150 KB gzipped combined (matching As-Built's four-family budget as the family's precedent for "four fonts is acceptable if each is scoped tightly"). If over budget, drop Caveat first and render annotations in Courier Prime italic instead; record under Deviations.
- Client JS: tab scrollspy, hero-settle play-once flag, clipboard, any card expand interaction; target under 4 KB gzipped.

#### 9.1.14 What this world must not become

No sepia or yellowed "antique paper" look — this is a current, premium notebook, not a prop. No full-bleed paper-texture photograph or grain filter. No tape anywhere except securing each page's top corners and the contact postcard — not decorating chips, not scattered for effect. No handwriting font on headings or body text. No more than the three container types. No doodles, stickers, washi-tape patterns, or scrapbook clutter. No cream ground, no terracotta accent — the palette exists specifically to avoid that banned pairing.

---

### 9.2 New World 02: The Masthead

**Branch:** `portfolio/v2-world-02-masthead`

#### 9.2.1 Concept

- **Metaphor.** The portfolio is a single issue of a high-end publication about one person's work. The hero is the **nameplate**. Navigation is the **contents page**. Projects are **feature articles**. About carries a **pull quote**, lifted verbatim from the owner's own words. Contact is the **colophon** — the small, precise block at the back of a real magazine listing who to reach and how.
- **Philosophy.** Confident, considered, edited. Nothing here reads as a draft; every choice looks deliberate the way a finished publication does. The emotion is respect: the visitor treats the content the way they'd treat an article someone bothered to typeset well.
- **Spatial model.** Spreads read like an open publication (§7.3): strong grid, rules instead of boxes, text and any image in an authored relationship rather than a stacked column.
- **Signature element.** The nameplate hero (with its one rule-draw moment) and the pull quote lifted verbatim from the owner's own about text.

#### 9.2.2 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Day edition (default) | Night edition | Role |
| --- | --- | --- | --- |
| `--ground` | `#FFFFFF` | `#121212` | Page ground |
| `--ink` | `#111111` (18.88:1) | `#F5F5F5` (17.18:1) | Headlines, body |
| `--ink-2` | `#4A4A4A` (8.86:1) | `#B8B8B8` (9.44:1) | Meta, captions, rules |
| `--spot` | `#C81B5C` (5.57:1) | `#FF5C93` (6.43:1) | **Reserved**: current-section underline, pull-quote marks, folio numbers, the end-mark |

One spot color, used only for the four things listed. No second accent. Cooler and crisper than Marginalia's warm paper, so the two worlds don't drift toward each other despite both being "editorial" in a loose sense.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Playfair Display** 600 and 700 (italic for deks and the pull quote) | Nameplate, article titles, pull quote |
| Body | **Work Sans** 400 and 500 | Body copy, meta, navigation, captions |

Scale: nameplate `clamp(3rem, 11vw, 8rem)` / 0.95; article title `clamp(2rem, 5vw, 4rem)` / 1.05; dek `clamp(1.25rem, 2.5vw, 1.75rem)` italic / 1.3; body 1.0625rem / 1.65; pull quote `clamp(1.5rem, 3vw, 2.25rem)` italic / 1.35. Sentence case everywhere; **no all-caps kickers, no em-dash labels, no arrow glyphs on links** (V1 §4.2, still binding per §8.2).

**Layout concept.** A strict 12-column editorial grid, max width 1200px, with thin `--ink-2` **vertical rules** between major zones instead of boxes or cards — rules, not containers, are this world's structural device. Sections read as **spreads**: on desktop, a two-column composition (roughly 7/5 or 5/7 split depending on section) with a real authored relationship between the columns, not just "text then more text." On mobile, spreads collapse to one column and any pulled-out element (drop cap, pull quote) reflows inline at its natural place in the reading order.

**Wireframe: hero (≥1024)**

```text
┌────────────────────────────────────────────────────────────┐
│                    ── (rule draws outward) ──                │
│                        {NAME}   Playfair 700, nameplate      │
│                    ── (rule draws outward) ──                │
│                                                               │
│                     {ROLE}   Playfair italic, cover line      │
│                                                               │
│           {INTRO}   Work Sans, centered reading column        │
│                                                               │
│              See projects      Send an email                 │
└────────────────────────────────────────────────────────────┘
```

**Principles.** (1) Rules divide; boxes never contain. (2) One spot color, four reserved uses. (3) A pulled quote is always a real sentence that already exists in the body, never a new one written for effect. (4) Deks and article "in brief" blurbs are drawn from existing description text, never invented taglines. (5) Nothing is capitalized for decoration.

#### 9.2.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--ground`. No paper texture, no gradient, no newsprint halftone pattern. |
| Borders | None as containers. Rules: 1px `--ink-2` between grid zones, 2px `--ink` under the nameplate (the two that draw on load, §9.2.11), 1px `--spot` under the current nav item. |
| Shadows | None anywhere. |
| Radius | `0` everywhere. |
| Spacing | 8px base. Section padding `clamp(64px, 10vw, 128px)`. Column gap 48px (24px tablet, 0 — stacked — on mobile). |
| Grid | 12 columns, max 1200px. |
| Density | Medium-high; editorial pages are not sparse, but rules keep it organized. |
| Image treatment | Full-bleed within its column, `object-fit: cover`, no filter, a thin 1px `--ink-2` keyline. No image: the column simply doesn't exist; the text column widens to fill the spread rather than leaving a blank frame. |
| Icons | Three, 1.5px round-cap strokes: external link, copy, theme. |
| Containers | **None** in the structural sense — the only bounded shapes are the nav's current-item underline and the end-mark (§9.2.10). |
| Buttons | Text links, single underline that thickens `1px → 2px` on hover/focus. No filled button shape anywhere in this world. |
| Navigation | The contents bar (§9.2.5). |
| Separators | 1px and 2px rules per the borders row above. |
| Chrome labels | "In this issue" (nav label) and the folio numbers next to each nav item; both `aria-hidden` since the real section names and the nav's own accessible name already carry the meaning. |

**The pull quote.** One sentence, lifted verbatim from the existing about text (never paraphrased, never newly written), set in Playfair italic at pull-quote scale in the opposite column from the body paragraph it came from, bracketed by `--spot`-colored quotation marks. It is a **visual duplicate** of a sentence already present once in the reading flow, so it is `aria-hidden` — the sentence itself is read once, in its natural place in the paragraph. If no sentence in the about text is a natural, self-contained quote, this device is skipped for this build and logged, not fabricated.

#### 9.2.4 Hero: the nameplate

- **Composition.** `{NAME}` centered, Playfair 700, nameplate scale, bracketed by two thin horizontal rules. `{ROLE}` below in Playfair italic as the "cover line." `{INTRO}` (verbatim) as centered body copy beneath. Two text-link actions.
- **Orchestrated moment: the masthead draw.** On first visit each session, the two rules above and below the name draw outward from the center (`stroke-dashoffset`, two simple `<line>`s or `border` clip-paths, 500ms `ease-out`), then the name, role, and intro fade up together over 300ms. Real heading text is in the DOM and visible from first paint; only the rules and a simple opacity/translateY on the text block animate. Repeat visits and reduced motion: rules and text appear already in their final state, no animation.

#### 9.2.5 Navigation: the contents bar

- **Desktop (≥1024).** A sticky top bar, "In this issue" (small, `--ink-2`) followed by the six existing section names in a horizontal list, each preceded by a two-digit folio number. The current item has a `--spot` underline and `aria-current="location"`. The theme toggle sits at the bar's right end, labelled with the alternate edition's name.
- **Tablet (640–1023).** Same bar, folio numbers only (names on hover/focus).
- **Mobile (<640).** The bar collapses to a single "Contents" text button. Activating it opens a native `<dialog>` styled as a **full-page contents spread** — the six section names as a large vertical list with folio numbers, matching a real magazine's contents page, each item at least 48px tall. Native `<dialog>` gives focus-return and `Escape`-to-close for free.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

#### 9.2.6 About

- Two-column spread. Left (7 columns): the existing about text, opening paragraph set with a **drop cap** (`::first-letter`, Playfair 700, spanning roughly 3 body-text lines). Right (5 columns): the pull quote (§9.2.3). If no about text exists, skip the drop cap and pull quote and log the gap rather than inventing filler.
- Long text: shown in full — an edited page doesn't truncate its own copy; if the paragraph runs long, the spread simply runs taller and the right column's pull quote sits at a fixed position near the top rather than trying to center against a variable-height left column.

#### 9.2.7 Projects: feature articles

- **Featured (DaloyAqua): the lead feature.** Full-width spread. Title in Playfair at article scale. A **dek** — the first clause or sentence of the existing description, set larger in italic — followed by the rest of the description as body copy in the opposite or lower column. A byline-style meta line, "Filed under: {stack items}," in Work Sans 500, `--ink-2`. The status, exactly as stored, appears as a small labelled line near the meta ("Status: {value}"), not folded into the dek. Image, if present, fills the second column per §9.2.3; if not, the text column widens.
- **Supporting projects: "in brief."** A single narrower column, styled like a magazine's short-item roundup: each entry is a smaller Playfair title, a one-line dek pulled from the existing description's first clause, and plain-text links. Status appears as a small inline note only if the repo has one.
- **Sparse and stress cases.** One project: the lead feature alone, no "in brief" column. Many projects: the "in brief" column grows and may wrap to two columns on very wide desktop viewports. A 90-character title wraps to two lines in the feature layout.

#### 9.2.8 Skills: the index

- Set as a **contributor index** — the kind of dense, columnar list found at the back of a real publication. `columns: 2` (`3` above 1440px), category name as a small `--ink-2` heading with a thin `--spot` rule beneath it, items below as a plain one-per-line list in Work Sans (not chips, not running prose — a genuine list). If the repo has proficiency labels, they appear right-aligned on the same line as the item, in `--ink-2`.
- Mobile: single column.

#### 9.2.9 Journey: the record

- A narrow single-column sidebar-style list (not full width, even on desktop — centered or left-aligned within a 6-column measure), entries in repo order: period in Work Sans 500 `--spot`, title in Playfair, organization and description in Work Sans. The current entry (if the repo marks one) gets a small `--spot` dot bullet instead of the default `--ink` one; no invented label. Few entries: the list is simply short.

#### 9.2.10 Contact: the colophon

- A single top rule (2px `--ink`) introduces the section, styled like a real magazine's masthead-and-contact block. The existing address set large in Playfair italic, a "copy" text link beside it (label swap + live region), then social links as a short plain list. A small decorative **end-mark** (a filled `--spot` square, 8px, `aria-hidden`) sits after the final line — the real editorial convention that marks the end of the last article, asserting nothing, purely typographic.
- No form, no fields, no backend.

#### 9.2.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the masthead draw** | Hero only, once per session, ~800ms total (§9.2.4). |
| Text links | Underline `1px → 2px` on hover/focus, 150ms. |
| Current nav item | `--spot` underline follows scroll (§9.2.5). |
| Contents dialog | Native open/close, no custom transition beyond the browser default. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--ink); outline-offset: 3px`. |
| Reduced motion | No masthead draw; rules and text appear in final state immediately. Everything else is already a fast, discrete transition and needs no further reduction. |

No scroll-reveal, no parallax, no hover motion on non-interactive text.

#### 9.2.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Nameplate | Full nameplate scale, rules extend to the text's measure | Rules shorten to match | Rules shorten further; role and intro stack tighter |
| Navigation | Full contents bar | Folio-only bar | "Contents" button opening the full-page dialog spread |
| About | Two-column spread | Pull quote moves below the drop-cap paragraph, still narrower than full width | Single column; pull quote appears inline between paragraphs at its natural sentence position |
| Projects | Lead feature + "in brief" column side by side | Stacked, "in brief" full width | Stacked, "in brief" entries full width, one per row |
| Skills | 2–3 column index | 2 column | 1 column |
| Contact | Colophon block, address and social side by side | Stacked | Stacked, address wraps |

#### 9.2.13 Accessibility and performance notes

- The drop cap uses `::first-letter`; verify it does not break word-boundary announcement in screen readers (standard technique, low risk, but confirm during the a11y pass).
- The pull quote is a decorative, `aria-hidden` visual duplicate of a sentence already present once in the DOM — it must never be the *only* place that sentence exists.
- `forced-colors: active`: rules and the current-item underline rely on `border`/`text-decoration`, not background fill, so they remain visible.
- Every generic link's accessible name includes the item it refers to (`aria-label="Open DaloyAqua"`), consistent with the rest of the family.
- Fonts: Playfair Display and Work Sans, subset latin, budget ≤100 KB gzipped combined. Client JS: nav scrollspy, contents dialog, masthead-draw play-once flag, clipboard; target under 3 KB gzipped.

#### 9.2.14 What this world must not become

No fabricated issue number, volume, date, or "N minute read" label — none of that exists in the repo and none of it may be invented. No stock-photo hero imagery. No gradient overlays or halftone/newsprint texture filters. No arrow glyphs, no all-caps kickers, no em-dash-separated labels (V1 §4.2, still binding). No filled button shapes anywhere. No clickbait-style headline rewriting of project titles — titles and deks come from existing text only. No second spot color.

---

### 9.3 New World 03: The Wing

**Branch:** `portfolio/v2-world-03-the-wing`

#### 9.3.1 Concept

- **Metaphor.** The portfolio is a wing of a building you walk through — a sequence of **rooms**, each announced by a small wayfinding plaque, separated by a **threshold**. This is explicitly not a document metaphor (that territory is As-Built's and Marginalia's); it's a real, physical, walkable space. Projects hang as **exhibits** with a wall label beside or beneath them, the way a gallery labels a piece.
- **Philosophy.** Institutional calm. The visitor feels like they're being given room to look, not rushed through content. The emotion is quiet confidence in the work being shown, echoed by the confidence of the space it's shown in.
- **Spatial model.** Rooms you move between (§7.3): large, spatially distinct full-viewport compositions with a real sense of passing from one bounded space into the next, not just one more stacked section.
- **Signature element.** The floor-plan navigator (a literal top-down line drawing of the rooms, doubling as the navigation device) and the threshold that marks the top of every room.

#### 9.3.2 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Daylight (default) | Gallery lights | Role |
| --- | --- | --- | --- |
| `--concrete` | `#E7E4DE` | `#171512` (ground) | Room ground |
| `--ink` | `#1C1A17` (13.68:1) | `#EDE8E0` (14.94:1) | Text, plaque borders |
| `--ink-2` | `#4C4740` (7.25:1) | `#B8B0A3` (8.48:1) | Captions, wall-label body |
| `--brass` | `#8A5F1F` (4.43:1 UI) | `#E4A54B` (8.49:1 UI) | **Reserved**: the current room in the floor plan, the threshold's leading edge, the theme toggle's active state |

One accent, three reserved uses. Warm, institutional, unclaimed by any other world in the family (Biyahe's sun/signal, Marginalia's tape/stamp, Masthead's spot, and Star Chart's gold, §9.4, all sit in different hue families from this brass).

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Archivo** 700 (Expanded where available) | Name, room titles, plaque numbers, exhibit titles |
| Body | **Inter** 400 and 500 | Body copy, wall-label text, captions |

Scale: name `clamp(3rem, 10vw, 7.5rem)` / 0.95; room title `clamp(2rem, 5vw, 4rem)` / 1; body 1.0625rem / 1.7 (generous, institutional line-height); wall-label body 0.9375rem / 1.5; plaque numerals 0.8125rem, tracked slightly wider than body (never all-caps).

**Layout concept.** Six full-viewport **rooms**, each `min-height: 100svh`, generous padding `clamp(64px, 12vh, 160px)`, one primary composition per room with real negative space around it rather than content filling the space. Each room opens with a **threshold**: a 3px `--brass` line across the top of the viewport at the exact point the room begins, with a small wayfinding **plaque** (room number + room name, Archivo, `aria-hidden` since the real heading follows immediately) mounted at its left end, like a real room-number plate beside a doorway.

**Wireframe: hero, Room 01 — Entrance (≥1024)**

```text
════ threshold ═══════════════════════════════════════ Room 01 · Entrance
│
│                    {NAME}   Archivo 700, huge
│
│                    {ROLE}
│
│                    {INTRO}   Inter, centered measure
│
│                    [ See projects ]   [ Send an email ]
│
│                                                    ┌────────┐
│                                                    │ floor  │  fixed
│                                                    │ plan   │  corner
│                                                    └────────┘  widget
```

**Principles.** (1) A room is a bounded space with real air around its content, not a section that happens to be tall. (2) The threshold always announces a new room; it never appears mid-room. (3) One accent, three reserved uses. (4) Right angles only — no rounding anywhere in this world. (5) The floor plan is always where you are, not just where you can go.

#### 9.3.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--concrete`. No texture, no faux-stone or marble pattern, no gradient. |
| Borders | 3px `--brass` threshold lines; 1px `--ink` on plaques, wall labels, and exhibit frames. No other weights. |
| Shadows | None. |
| Radius | **0 everywhere**, no exceptions — this is the family's other zero-radius world alongside As-Built, but the two stay distinct through composition (rooms vs. sheets) and color (warm brass vs. two-ink cool print). |
| Spacing | 8px base. Room padding as above. At least 96px between an exhibit and the next. |
| Grid | 12 columns, max 1280px, generous gutters (32px). |
| Density | **Low** — air around content is the point. |
| Image treatment | Framed: 1px `--ink` border, `object-fit: cover`, no filter, no radius. No image: the exhibit frame stays empty (a plain 1px-bordered rectangle with nothing inside) rather than filled with a pattern — an empty frame on a gallery wall reads as intentional, not broken. |
| Icons | Three, 1.5px round-cap strokes: external link, copy, theme. |
| Containers | Exactly three: the **plaque** (wayfinding and numbering), the **frame** (an exhibit's image or empty image slot), and the **wall label** (a project or experience entry's text block). |
| Buttons | Outlined rectangle, 1px `--ink` border, min height 48px, Inter 500 — deliberately unfilled, like engraved signage rather than an app button. |
| Navigation | The floor plan (§9.3.5). |
| Separators | Thresholds between rooms only. |
| Chrome labels | Room plaques (six) and exhibit numbers ("Exhibit 01," etc., on supporting projects only); both `aria-hidden`. |

#### 9.3.4 Hero: Room 01 — Entrance

- **Composition.** `{NAME}` in Archivo at hero scale, centered. `{ROLE}` beneath. `{INTRO}` in the reading measure. Two outlined-rectangle actions.
- **Orchestrated moment: the plan unveiled.** On first visit each session, the floor-plan widget's six room outlines draw in sequence (`stroke-dashoffset`, staggered ~80ms per room, ~600ms total), then the current room's rectangle fills `--brass`. Real content in every room is present and visible in the DOM throughout — only the floor plan's own SVG animates. Repeat visits and reduced motion: the floor plan appears already drawn and filled, no animation.

#### 9.3.5 Navigation: the floor plan

- **Desktop (≥1024).** A fixed widget (`bottom: 24px; right: 24px`, about 160×110px), a simple top-down line drawing of six connected rectangles (a corridor with rooms off it), 1px `--ink` outlines, current room filled `--brass` with `aria-current="location"` on its corresponding link. Each rectangle is a real `<a>` with an accessible name ("Go to Projects"), min hit area 32×32px (the visual rectangle is smaller; padding extends the hit area). Hover/focus on the widget reveals room names as small labels beside each rectangle (opacity, 200ms).
- **Tablet (640–1023).** Same widget, smaller (120×80px), labels on hover/focus only.
- **Mobile (<640).** The widget is replaced by a fixed bottom "Directory" button. Activating it opens a native `<dialog>` styled as a **room directory board** (the kind mounted in a real building's lobby): a vertical list of the six rooms with numbers and names, each at least 48px tall, current room marked with a `--brass` bar at its left edge.
- **Current room** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

#### 9.3.6 About: Room 02

- **Composition.** The existing about text sits centered as the room's main plaque (a wide, single reading column, no border — this is the "artist statement" at the center of the room). Any labelled facts the repo has (role, education, and so on) appear as small individual **wall labels** positioned at the room's outer edges — left and right margins on desktop — each a 1px-bordered rectangle with the fact's label and value, like plaques mounted on the surrounding walls rather than stacked with the main text. Only facts genuinely present in the repo; no wall label is invented to fill space.
- **Long text.** Shown in full; the room is simply taller.

#### 9.3.7 Projects: the exhibits

- **Featured (DaloyAqua): the main wall.** A large frame (image or empty, §9.3.3) occupies the primary position, with its wall label beside it (desktop) or beneath it (mobile): title in Archivo, status exactly as stored, description, a "Stack" field and a "Links" field (only populated fields shown), each field plainly labelled.
- **Supporting projects: the secondary wall.** A horizontal row (desktop, wraps on narrower viewports) of smaller framed exhibits, each with a wall label beneath it: exhibit number (`aria-hidden`), title, one-line description, status if present, links.
- **Sparse and stress cases.** One project: the main wall alone, no secondary wall. Many projects: the secondary wall wraps to additional rows. A 90-character title wraps within its label's fixed width.

#### 9.3.8 Skills: the collection

- Grouped by category (Archivo label, sentence case), items as small rectangular outlined tags (1px `--ink`, **zero radius** — sharp corners, distinct from Marginalia's and Masthead's rounder or list-based treatments), wrapping within each category row. If the repo has proficiency labels, they appear as small text after the item inside the same tag. No bars, no percentages, no logos.

#### 9.3.9 Journey: the record wall — Room 05

- Repo-order entries, each a **timeline plaque**: a 1px-bordered rectangle containing the period (small, top corner), title (Archivo), organization and description (Inter). Stacked vertically with generous room-appropriate spacing between them — **not** a path-and-stops device (that belongs to Biyahe, V1 §6.1.9, and reusing it here would blur the two worlds together). The current entry, if marked by the repo, gets a `--brass` left edge on its plaque; no invented label. Few entries: the wall is simply short, with the same generous spacing as everywhere else in this world.

#### 9.3.10 Contact: Room 06 — The Exit

- The existing mailto address set large in Archivo, styled as if engraved on a final plaque near the exit, with a "Copy address" outlined-rectangle button (label swap + live region). Social links as a short plain list beneath. No form, no fields.
- Footer: existing footer content only, set small beneath the plaque.

#### 9.3.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the plan unveiled** | Hero only, once per session, ~800ms total (§9.3.4). |
| Floor-plan hover/focus | Room labels fade in, 200ms. |
| Current room | Floor-plan rectangle fill follows scroll (§9.3.5). |
| Outlined buttons | Border thickens `1px → 2px` on hover/focus, 150ms — no fill change, staying true to "unfilled signage." |
| Directory dialog | Native open/close. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--ink); outline-offset: 4px`, square. |
| Reduced motion | No plan-unveiling animation; floor plan appears already drawn and filled. Everything else is already a fast, discrete transition. |

No scroll-reveal, no parallax, no room-transition animation beyond the static threshold line already being there — rooms do not "slide in"; the threshold marks the boundary, motion does not.

#### 9.3.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Rooms and threshold | Full padding scale; threshold spans full viewport width | Padding reduces by about a third | Padding reduces further; threshold stays full width |
| Navigation | Fixed floor-plan widget | Smaller floor-plan widget | "Directory" button + full-page dialog |
| About | Wall labels in outer margins beside the central plaque | Wall labels stack below the central plaque | Wall labels stack below, full width |
| Projects | Main wall two-column (frame + label); secondary wall in a row | Main wall stacks; secondary wall wraps to 2 per row | Both stack single-column, frame above label |
| Skills | Tags wrap within category rows | Same | Same, category label above tags |
| Contact | Plaque and social list side by side | Stacked | Stacked, address wraps |

#### 9.3.13 Accessibility and performance notes

- Room and threshold structure is conveyed by real headings and landmarks, not only by the visual threshold line — a screen-reader user gets the same "new room" signal from heading level and `aria-labelledby`, not from a decorative rule.
- The floor plan is `<nav aria-label="Rooms">` with real links; the visual rectangles are decorative (`aria-hidden`), each wrapped by its real, adequately-sized link.
- `forced-colors: active`: the threshold, plaques, frames, and tags all rely on `border`, so they remain visible; the current-room fill in the floor plan also needs a border fallback so it doesn't disappear under `forced-colors` (add a 2px border on the current rectangle specifically, always present, not just decorative fill).
- Empty exhibit frames (no image) still need an accessible description of "no image available" only if that omission could confuse a screen-reader user navigating by landmark — in practice, the wall label beside it already fully describes the project, so no extra announcement is needed; do not add a "no image" message that isn't in the repo's data.
- Fonts: Archivo and Inter, subset latin, budget ≤90 KB gzipped combined. Client JS: floor-plan scrollspy and reveal, directory dialog, clipboard; target under 4 KB gzipped.

#### 9.3.14 What this world must not become

No literal 3D or WebGL room simulation, no perspective/parallax "walking" effect, no faux marble or concrete photographic texture, no stock museum photography. No rounded corners anywhere. No path-and-stops device for Journey (that belongs to Biyahe). No cute renaming of ordinary fields into forced museum jargon ("Medium," "Provenance") — field labels stay plain and factual. No second accent color. No filled button shapes.

---

### 9.4 New World 04: Star Chart

**Branch:** `portfolio/v2-world-04-star-chart`

#### 9.4.1 Concept

- **Metaphor.** The portfolio is a field of observation. Projects are **stars**; skills that genuinely belong to a project are the smaller stars around it, joined by thin lines into a **constellation** — a literal rendering of the exact stack-name-match relationship V1 §2.5 already defines, made visible instead of implied. This is not a dashboard and not a data-visualization template: nothing is a metric, a percentage, or a fabricated coordinate. It's an honest field with real points of light and nothing else.
- **Philosophy.** Quiet, exploratory, expansive. The visitor feels like they're looking at something real rather than being sold something. Emptiness between points is not wasted space — it's what makes the points worth looking at.
- **Spatial model.** A field explored non-linearly, with an overview (§7.3). The page itself still reads top to bottom in the repo's real section order (functional parity, §8.2) — the "non-linear" part is the overview widget, which lets a visitor jump to any point in the field without reading in sequence, not a replacement for the ordinary scrollable document.
- **Signature element.** The constellation: thin lines connecting each project-star to the skill-stars that exact-match its stack.

#### 9.4.2 Design plan

**Color** (ratios verified with V1 Appendix A's script)

| Token | Observation (default) | Draft | Role |
| --- | --- | --- | --- |
| `--field` | `#12102A` | `#E9EEF5` (ground) | Sky / chart ground |
| `--ink` | `#DCE6F5` (14.72:1) | `#181530` (15.15:1) | Body text |
| `--ink-2` | `#9AA6C4` (7.61:1) | `#4B4870` (7.32:1) | Secondary text, captions |
| `--gold` | `#F3D48B` (12.88:1 UI) | `#8A6A1E` (4.33:1 UI) | **Reserved**: stars, constellation lines, the overview widget |

One accent, used only for points of light and the lines between them — never for buttons, links, or decoration elsewhere. Draft mode is a cool vellum tone, not warm paper, so it doesn't drift toward Marginalia's palette despite both having a light mode.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Space Grotesk** 500 and 700 | Name, section titles, project and entry titles |
| Body | **Public Sans** 400 and 500 | Body copy, descriptions |
| Data | **JetBrains Mono** 400 | Periods, dates, the skills catalog list |

Scale: name `clamp(3rem, 10vw, 7rem)` / 1; section title `clamp(2rem, 5vw, 3.5rem)` / 1.05; body 1.0625rem / 1.7; data 0.9375rem / 1.5. Sentence case; no all-caps; no invented numerical values anywhere in this type system — no fake coordinates, magnitudes, or distances are ever set in the data role.

**Layout concept.** Six sections in the repo's real order, each `min-height: 90svh` on the field ground, generous padding `clamp(96px, 14vh, 200px)`. A **starfield** sits behind every section: a fixed, seeded scatter of small dots (`--ink-2` at low opacity, 1–2px, generated once from a deterministic seed so it doesn't reflow or animate), decorative and `aria-hidden`. Content sits in a single centered reading column, max 640px, with real air around it (density is low by design).

**Wireframe: Projects, featured constellation (≥1024)**

```text
   · ·  ✦ (skill)         · ·
 ·     \                      ·
   ·     \___lines___          ·  ·
 ·         ●  (project star, gold, large)
   ·      /  \
 ·       /    \___✦ (skill)
   {FEATURED TITLE}
   ○ {status, exactly as stored}
   {description}
   Stack  {items}     Open project   Source code
```

**Principles.** (1) The constellation only exists between a project and the skills that exact-match it — it never connects unrelated things. (2) An unmatched project is a lone star; an unmatched skill still appears, in the full catalog (§9.4.8), just without a line. (3) No numbers are invented anywhere — magnitude, distance, and coordinates are not part of this design's vocabulary. (4) One accent color, for light and its lines only. (5) The page is a normal, linear, scrollable document; the overview widget is an aid on top of it, not a replacement for it.

#### 9.4.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--field` plus the seeded starfield dots. No nebula gradients, no glow/blur filters, no particle animation. |
| Borders | None. |
| Shadows | None. |
| Radius | `999px` on stars and the overview widget's dots only; `0` everywhere else. |
| Spacing | 8px base. Section padding as above. At least 64px between a project-star and the next. |
| Grid | Single reading column, max 640px, centered; stars and constellation lines live in the space around it, not inside it. |
| Density | **Low.** |
| Image treatment | No images anywhere in this world by design — the field's only visual content is stars, lines, and type. If a project has an image in the repo, its title text still appears, and a small `aria-hidden` decorative ring (not a filled thumbnail) marks that a visual exists; the image itself is skipped in this world specifically and logged as a `[DECISION]`, not a `[SPEC-DERIVED]` gap, since it is intentional for this concept, unlike an omission caused by missing data. |
| Icons | Two, 1.5px round-cap strokes: external link, copy. (The theme toggle is the overview widget's own state, §9.4.5, so no separate icon is needed for it.) |
| Containers | **None.** Two devices only: the **star** (a filled circle, sized by role — project stars larger, skill stars smaller) and the **line** (a thin `--gold` stroke between a star and its match). |
| Buttons | Text links with a single underline, thickened on hover/focus. No filled shapes. |
| Navigation | The overview widget (§9.4.5). |
| Separators | None. |
| Chrome labels | None beyond the overview widget's own labels, which are functional, not decorative. |

#### 9.4.4 Hero: the chart's title

- **Composition.** `{NAME}` in Space Grotesk at hero scale, `{ROLE}` beneath, `{INTRO}` (verbatim) in the reading column, two text-link actions — all set against the starfield, no separate framing device.
- **No orchestrated moment in the hero.** Per §9.4.11, this world's one moment happens in Projects, tied directly to the signature element, not to the hero — a deliberate variation from the other four new worlds so the family isn't eight worlds that all open with a load-triggered flourish.

#### 9.4.5 Navigation: the overview widget

- **Desktop (≥1024).** A fixed widget (`bottom: 24px; right: 24px`, about 130×100px): six small `--gold` dots in a simple fixed hexagonal arrangement (purely schematic — it is not meant to represent a real constellation, just a recognizable wayfinding shape), connected by faint `--ink-2` lines forming a loop, each dot a real `<a>` with an adequate hit area and an accessible name. The current section's dot is larger with a 1px `--gold` ring (no blur, no glow) and `aria-current="location"`. Hover/focus reveals section names beside the dots (opacity, 200ms). The theme toggle is a seventh, distinctly styled dot (a small ring rather than filled) at the widget's corner.
- **Tablet (640–1023).** Same widget, smaller, labels on hover/focus only.
- **Mobile (<640).** A fixed bottom "Chart" button opens a native `<dialog>` showing the six dots larger, in the same loop arrangement, with labels always visible and each hit area at least 48px.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

#### 9.4.6 About

- The existing about text in the reading column, Public Sans, full length (no truncation). If the repo has labelled facts, they appear beneath as a short `--ink-2` list in the data (mono) role, label and value on one line, only for facts genuinely present.

#### 9.4.7 Projects: the constellation

- **Featured (DaloyAqua).** The largest star. Title, status (exactly as stored, beside the star, not inside it), description, a "Stack" line, and links, all in the reading column beside or beneath the star. Every skill that exact-matches this project's stack (§2.5's rule from V1) is drawn as a smaller star with a thin line back to the featured star, labelled with the skill's name in the data role at small size.
- **Supporting projects.** Smaller stars, same construction, arranged down the field with their own matched-skill lines where matches exist. A project with no matching skill is simply a lone star with no lines — a correct, unremarkable state, not an error.
- **Sparse and stress cases.** One project: one star and its lines, nothing else. Eight projects: eight stars spaced down the field; the layout does not try to prevent lines between adjacent stars' skill-webs from visually crossing — a little overlap in a real star field is honest, not a bug, as long as no text becomes unreadable (verify this specifically during the build). A 90-character title wraps in the reading column as normal text.

#### 9.4.8 Skills: the catalog

- The **complete** list of every skill in the repo, grouped by category, set as a plain list in the data (mono) role, each item preceded by a small hollow `--ink-2` dot (filled `--gold` only if it also appears in the Projects constellation, giving a quiet, correct signal without adding new UI). No bars, no percentages. This section exists specifically so a skill with no project match is never lost — the constellation in Projects is a highlight of demonstrated skills, not the full record.

#### 9.4.9 Journey: field observations

- Repo-order entries, each with the period in the data (mono) role, title in Space Grotesk, organization and description in Public Sans, preceded by a small star-dot bullet (hollow; filled `--gold` for the entry the repo marks as current — no invented label). Few entries: the log is simply short.

#### 9.4.10 Contact: the final waypoint

- One bright star beside the existing mailto address, set large in Space Grotesk. A "Copy address" text link (label swap + live region). Social links beneath as a short list, each with the same hollow star-dot bullet used in Journey. No form, no fields, and no line extends here from Projects — the constellation stays scoped to §9.4.7 so it doesn't sprawl into a second version of The Current's single continuous line.

#### 9.4.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the constellation draws** | The first time the featured project's star is 60% visible (`IntersectionObserver`, `threshold: 0.6`, then unobserve), its lines to each matched skill-star draw outward (`stroke-dashoffset`, ~700ms `ease-out`, each line starting ~60ms after the previous), then each skill-star's label fades in over 150ms. All text is real and present in the DOM the whole time; only the lines and star opacity animate. |
| Overview widget hover/focus | Labels fade in, 200ms. |
| Current section | Widget dot enlarges and gains its ring (§9.4.5), following scroll. |
| Text links | Underline thickens, 150ms. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--gold); outline-offset: 3px`, circular on stars, standard elsewhere. |
| Reduced motion | Constellation lines and stars appear already fully drawn and visible; no draw-in. Everything else is already a fast, discrete transition. |

No scroll-reveal, no parallax, no twinkling or looping animation on the starfield — the background dots are entirely static.

#### 9.4.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Field and starfield | Full padding; starfield density as seeded | Padding reduces | Padding reduces further; starfield dot count reduces slightly to avoid clutter on small screens |
| Navigation | Fixed overview widget | Smaller widget | "Chart" button + full dialog list |
| Projects | Star and reading column side by side, skill-stars fan out beside | Star above reading column, skill-stars in a row beneath | Star above column; skill-stars listed as a plain small row of labelled dots, no fanned lines (lines don't read well at this width and are dropped in favor of the same filled/hollow dot distinction used in Skills, §9.4.8) |
| Skills | Catalog in 2 columns | 1–2 columns | 1 column |
| Contact | Star beside address | Stacked | Stacked, address wraps |

#### 9.4.13 Accessibility and performance notes

- The starfield background, all stars, and all constellation lines are `aria-hidden`; every fact they represent (status, skill names, project names) exists as real, separately readable text.
- The overview widget is `<nav aria-label="Sections">` with real links and adequate hit areas; the current-section ring is paired with `aria-current`, not conveyed by size alone.
- `forced-colors: active`: stars and the current-section ring rely on a border/outline, not fill alone, to stay visible.
- Verify the mobile fallback in §9.4.12 (dots instead of fanned lines) actually renders correctly at 375px — this is the one layout in the whole world most likely to need a real device check rather than just a browser-width resize.
- Fonts: Space Grotesk, Public Sans, JetBrains Mono, subset latin, budget ≤110 KB gzipped combined. Client JS: overview scrollspy, constellation-draw observer, clipboard; target under 4 KB gzipped.

#### 9.4.14 What this world must not become

No invented numbers of any kind — no magnitudes, no distances, no fake coordinates, no "N light-years" flourishes. No nebula gradients, no particle systems, no glow or blur filters, no looping twinkle animation. No literal zodiac or mythological constellation shapes (the constellations here are generated from real skill-project relationships, not decorative star-sign art). No filled button shapes. No second accent color. No images anywhere (a deliberate `[DECISION]`, not an oversight — see §9.4.3).

---

### 9.5 New World 05: Runtime

**Branch:** `portfolio/v2-world-05-runtime`

#### 9.5.1 Concept

- **Metaphor.** The portfolio is a systems diagram sketched on a whiteboard: a real flowchart, with a **start node** (Hero), a sequence of **module** and **process** nodes wired together, and an **end node** (Contact). Skills are the **components** the modules are built from, and thin hand-drawn connector lines wire each project module to the components it actually uses — the same exact-match relationship V1 §2.5 defines, rendered as circuit-style wiring instead of Star Chart's organic constellation lines (§9.4.7), which is what keeps these two "connect skills to projects" worlds genuinely distinct mechanisms rather than the same idea twice (§8.3).
- **Philosophy.** Clear, systemic, legible. The visitor feels like they're looking at how something actually works, sketched by someone who understands it well enough to draw it simply. This is explicitly **not** a terminal or a dashboard — the brief itself warns against "another generic futuristic developer dashboard," and this world answers that by staying on a bright whiteboard, never a glowing dark screen.
- **Spatial model.** A wired diagram (§7.3): nodes and the connections between them are equally part of the content, not a section list with a diagram bolted on top.
- **Signature element.** The whiteboard wiring: hand-drawn-feeling orthogonal connector lines joining each project module to its matched skill components.

#### 9.5.2 Design plan

**Color** (ratios verified with V1 Appendix A's script; the whiteboard marker was darkened from an initial `#2E8B57` to `#227A4C` during verification to clear the white-text-on-marker pair at 5.31:1)

| Token | Whiteboard (default) | Chalkboard | Role |
| --- | --- | --- | --- |
| `--board` | `#F7F5F0` | `#1E2B24` (ground) | Board ground |
| `--ink` | `#232323` (14.43:1) | `#F2F1E8` (12.99:1) | Text, node borders |
| `--ink-2` | `#5B5B57` (6.26:1) | `#B9C2B9` (8.05:1) | Secondary text, port labels |
| `--marker` | `#227A4C` (5.31:1 on white text, 4.87:1 UI vs. ground) | `#8FD9A8` (8.88:1) | **Reserved**: connector wiring, current-state fills, the pipeline stepper's current node |

One accent, playing the part of a single dry-erase marker color — deliberately matte, no glow, no gradient, so it never drifts toward the neon-on-dark look this world exists to avoid.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display / labels | **Space Mono** 400 and 700 | Node headers, the name, port labels, periods |
| Body | **Manrope** 400 and 500 | Descriptions, body copy |

Scale: name `clamp(2.5rem, 8vw, 5.5rem)` / 1 (inside the start node, §9.5.4); node header `clamp(1.25rem, 2.5vw, 1.75rem)` / 1.1; body 1.0625rem / 1.65; labels 0.8125rem. Sentence case; no all-caps; **no invented state words** — a project's status is rendered exactly as the repo stores it, never translated into code-state vocabulary like "RUNNING" or "DEPLOYED" that the repo never said.

**Layout concept.** A vertical sequence of **nodes**: one **start** node (stadium shape, fully rounded ends) for Hero, rectangular **module** nodes for Projects and Skills, rectangular **process** nodes for Experience, one **end** node (stadium shape) for Contact, About as a rectangular **input** node. Each node has a 1–2px `--ink` border and a header bar carrying its real section name in Space Mono. Nodes are connected top-to-bottom by a plain vertical `--ink-2` connector; the wiring specific to skills-and-projects (§9.5.7) is a **separate**, `--marker`-colored set of connectors layered on top, not the same line.

**Wireframe: hero start node and first connector (≥1024)**

```text
                 ╭─────────────────────────────╮
                 │   {NAME}   Space Mono 700     │   ← stadium "start" node
                 │   {ROLE}                       │
                 │   {INTRO}                       │
                 │   [ See projects ] [ Send email]│
                 ╰──────────────┬──────────────────╯
                                │   plain connector, --ink-2
                 ┌──────────────▼──────────────────┐
                 │  About                            │  ← rectangular "input" node
                 │  {about text}                      │
                 └───────────────────────────────────┘
```

**Principles.** (1) Two kinds of line: a plain structural connector between every node in sequence, and the `--marker` wiring that specifically joins projects to their matched skills. Never confuse the two visually. (2) Start and end nodes are stadium-shaped; everything between them is rectangular. (3) A status is shown exactly as stored, never recoded into invented state vocabulary. (4) One marker color. (5) The board stays light by default — this world does not have a "dark mode default" the way a real dashboard would, on purpose.

#### 9.5.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--board`. No grid-paper texture, no circuit-board pattern, no scanline or glow effect. |
| Borders | 1px `--ink` on module/process/input nodes; 2px `--ink` on the featured project's module and on the start/end nodes. No other weights. |
| Shadows | None. |
| Radius | `8px` on rectangular nodes (a whiteboard box has slightly rounded corners in real life); `999px` (full stadium) on the start and end nodes only; `0` on port tags and component tags. |
| Spacing | 8px base. Node padding `clamp(24px, 4vw, 40px)`. At least 64px of plain connector between nodes. |
| Grid | Single column, max 720px per node, centered. |
| Density | Medium — a real whiteboard diagram is organized, not sparse and not cluttered. |
| Image treatment | No image inside a node by default (a real system diagram doesn't carry photography); if the repo has a project image, it appears as a small rectangular thumbnail docked to the module's header bar, `object-fit: cover`, no filter. No image: nothing is drawn. |
| Icons | Three, 1.5px round-cap strokes: external link, copy, theme. |
| Containers | Exactly three: the **node** (start/end/module/process/input), the **port** (a small labelled tab on a module's edge, §9.5.7), and the **component tag** (Skills, §9.5.8). |
| Buttons | Outlined rectangle, 1px `--ink` border, 8px radius, min height 44px, Manrope 500. No faux-code syntax decoration on button labels. |
| Navigation | The pipeline stepper (§9.5.5). |
| Separators | The plain `--ink-2` connector between nodes is the only separator. |
| Chrome labels | The five stage-group brackets under the stepper (Init, Input, Modules, Process, Output) are `aria-hidden`, since the real section names are the stepper's actual accessible link text. |

**The hand-drawn feel.** Every `--marker` wiring line and the plain inter-node connector use a single, restrained SVG filter (`feTurbulence` at a very low frequency and scale, applied once via `filter` on the `<path>`) so lines read as marker strokes rather than computer-perfect vectors. Applied consistently at the same intensity everywhere it's used — never exaggerated into a "sketchy" cartoon effect.

#### 9.5.4 Hero: the start node

- **Composition.** `{NAME}` in Space Mono 700 inside the stadium start node, `{ROLE}` beneath, `{INTRO}` (verbatim) as body copy, two outlined-rectangle actions. A single plain connector leads down out of the node's bottom into About.
- **No orchestrated moment here.** Per §9.5.11, the one moment lives in Projects, tied to the signature wiring, matching Star Chart's choice (§9.4.4) to vary trigger type across the family rather than repeat a load-triggered hero five times over.

#### 9.5.5 Navigation: the pipeline stepper

- **Desktop (≥1024).** A sticky top bar: six small node-icon links in a horizontal row (stadium/rectangle shapes matching each section's real node shape), joined by a thin `--ink-2` line. The current node is filled `--marker` with `aria-current="location"`. Beneath the row, five small `aria-hidden` bracket labels group the icons into stage clusters (Init / Input / Modules / Process / Output) — decorative grouping only; every icon's own accessible name is always its real section name. The theme toggle sits at the bar's right end.
- **Tablet (640–1023).** Same bar, icons only, names on hover/focus.
- **Mobile (<640).** Collapses to a fixed bottom "Flow" button opening a native `<dialog>` showing the six real section names as a vertical flowchart-style list, connected by a thin vertical line, each item at least 48px tall.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

#### 9.5.6 About: the input node

- A rectangular node headed "About" (the real section name). Body: the existing about text, full length, Manrope. If the repo has labelled facts, they render as a small nested **config block** inside the node — a lightly bordered inner rectangle with label: value lines in Space Mono, styled like a parameters list — only when such facts exist.

#### 9.5.7 Projects: the modules

- **Featured (DaloyAqua).** The largest module, 2px border. Header bar: title in Space Mono, and the status **exactly as stored** in a small pill in the header — never translated into invented state language. Body: description in Manrope. Bottom edge: **in: ports**, one small labelled tab per stack item that exact-matches a skill in the repo's skills data (V1 §2.5's rule). Right edge: **out: ports**, one tab per existing link ("Open project," "Source code"). `--marker` wiring runs from each matched in-port down to that same component's tag in the Skills node (§9.5.8), orthogonally routed (right angles only, no diagonal lines), with the hand-drawn filter applied.
- **Supporting projects.** Smaller module nodes, 1px border, same port convention, wired to Skills the same way where matches exist. A project with no matching skill has no in-ports and no wiring — a normal, unremarkable state.
- **Sparse and stress cases.** One project: one module, no others below it. Many projects: modules stack with the standard connector spacing. A 90-character title wraps within the header bar.

#### 9.5.8 Skills: the components

- A single module node headed with the real section name, containing every skill in the repo grouped by category, each item a small rectangular **component tag** (`0px` radius, 1px `--ink` border, Space Mono label). A component tag that has at least one wire from Projects gets a `--marker` border instead of `--ink` — the same quiet correctness signal Star Chart gives its filled dots (§9.4.8), so every skill is always shown here even if nothing currently wires to it.

#### 9.5.9 Experience: the process

- A vertical sequence of process-step rectangles (1px `--ink` border, `8px` radius, matching the general node style) joined by plain downward connectors carrying a small triangular direction marker at each junction — this is a structural flow indicator inside a real diagram, not a decorative arrow appended to link text, so it is not the pattern V1 §4.2 forbids. Each step: period (Space Mono), title (Space Mono 700), organization and description (Manrope). The entry the repo marks current gets a `--marker` fill instead of an outline. Few entries: the sequence is simply short.

#### 9.5.10 Contact: the end node

- A stadium end node matching the hero's shape. The existing mailto address set large (Space Mono for the address itself, to echo the hero's monospace treatment), a "Copy address" outlined button (label swap + live region), social links as small labelled output ports beneath. No form, no fields.

#### 9.5.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| **Orchestrated moment: the wiring connects** | The first time the featured module is 60% visible (`IntersectionObserver`, `threshold: 0.6`, then unobserve), its `--marker` wires draw outward to each matched component tag in sequence (`stroke-dashoffset`, ~700ms `ease-out` per wire, staggered ~60ms), then each destination tag's border color transitions to `--marker` over 150ms. All node content is real and visible throughout; only the wire paths and tag borders animate. |
| Stepper hover/focus | Names fade in, 200ms. |
| Current node | Stepper icon fill follows scroll (§9.5.5). |
| Outlined buttons | Border thickens `1px → 2px` on hover/focus, 150ms. |
| Flow dialog | Native open/close. |
| Copy address | Label swap + live region. |
| Focus | `outline: 2px solid var(--marker); outline-offset: 3px`. |
| Reduced motion | Wiring and tag-border state appear already final; no draw-in. Everything else is already a fast, discrete transition. |

No scroll-reveal, no parallax, no looping pulse on any node or wire.

#### 9.5.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Nodes and connectors | Full node width up to 720px, centered | Node width narrows with viewport | Node width fills viewport minus margin |
| Navigation | Sticky stepper with stage brackets | Icon-only stepper | "Flow" button + full dialog list |
| Projects | Ports on the bottom/right edges as described; wiring runs beside the module column | Ports stack below the description; wiring runs in a narrower side channel | Ports listed as a plain small row under the description; wiring is dropped in favor of the same border-color signal used in Skills (matching Star Chart's mobile fallback logic, §9.4.12) |
| Skills | Component tags wrap within category rows | Same | Same, category label above tags |
| Experience | Vertical sequence, standard spacing | Same, tighter | Same, tighter still |
| Contact | Address and ports side by side | Stacked | Stacked, address wraps |

#### 9.5.13 Accessibility and performance notes

- Every node has a real heading and landmark; the stage-bracket chrome under the stepper is `aria-hidden` and never the only description of what a node is.
- Ports and component tags are small but real interactive or informational elements — a linked port has a minimum 44px hit area even though its visible tag is smaller, via padding.
- `forced-colors: active`: node borders, ports, and component tags rely on `border`, so they remain visible; the current-state `--marker` fill on a process step also carries a border so it doesn't disappear under forced colors.
- Wiring and the plain connector lines are `aria-hidden`; the relationships they show (which skills a project uses) are also stated as plain text in the project's own "Stack" data, so no information exists only in the diagram.
- Fonts: Space Mono and Manrope, subset latin, budget ≤80 KB gzipped combined. Client JS: stepper scrollspy, wiring-draw observer, clipboard; target under 4 KB gzipped.

#### 9.5.14 What this world must not become

No dark-mode-default terminal or dashboard look — Whiteboard is the default, and Chalkboard is an alternate, not the "real" version. No neon, no glow, no scanline or CRT effect. No fake code syntax (no brackets, semicolons, or command-prompt characters used as decoration). No invented state vocabulary for status — repo text only. No literal decision-diamond shapes (nothing here is a real yes/no branch). No second marker color. No circuit-board texture or hexagon-grid background pattern.

---

## 10. Design systems — cross-family summary

Each world's complete design system (color, type, spacing, radius, shadow, container vocabulary) is specified in full inline, in its own subsection of §9 (and, for the three existing worlds, already in V1 §6.1–§6.3). This section is an index for quick comparison, not a new specification — if this table and a world's own §9.x ever disagree, the world's own subsection is correct.

### 10.1 Policy (restated from the brief, binding)

There is **one shared layer**: the content/data architecture (§0.3, V1 §2.5). There is **no shared component library or shared visual token set** across worlds — each world's presentation layer is independent, on purpose, so that no two worlds can quietly converge by reusing the same button component with different colors. A world importing another world's component file is a violation of this policy even if the visual result looks fine.

### 10.2 Quick-reference table

| World | Default mode → alt mode | Reserved accent(s) | Display font | Body font | Radius policy | Shadow policy | Container types |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Biyahe (V1) | Day → Lights on | Six saturated fields | Bungee | Lexend | 0 / 8px / pill | Depth-band only | Board, plate, chip |
| As-Built (V1) | Print → Blueprint | Redline (cloud + triangle + status only) | Barlow Condensed | Barlow / Plex Mono | 0 everywhere | None | Sheet, block, cell |
| The Current (V1) | Surface → Deep | None (hue ramp only) | Fraunces | Hanken Grotesk | 0 / pill | None | None (node, tick) |
| **Marginalia** | Desk → Lamp | Tape (teal) + reserved stamp (oxide red) | Lora | Source Serif 4 / Courier Prime / Caveat (annotations only) | 0 / 2px | One flat lift token (paper only) | Page, index card, tag |
| **The Masthead** | Day edition → Night edition | Spot (magenta/rose), 4 reserved uses | Playfair Display | Work Sans | 0 everywhere | None | None (rules, not containers) |
| **The Wing** | Daylight → Gallery lights | Brass, 3 reserved uses | Archivo | Inter | 0 everywhere | None | Plaque, frame, wall label |
| **Star Chart** | Observation → Draft | Gold (stars + lines only) | Space Grotesk | Public Sans / JetBrains Mono | 0 / pill | None | None (star, line) |
| **Runtime** | Whiteboard → Chalkboard | Marker green (wiring + current-state only) | Space Mono | Manrope | 8px / pill (start–end) | None | Node, port, component tag |

### 10.3 What this table makes visible

Reading down the "Shadow policy" and "Radius policy" columns confirms the family stays disciplined at the system level, not just the concept level: only Biyahe (a functional depth cue) and Marginalia (a functional paper-lift cue) use any shadow at all, and each is a single fixed token, never a generic soft-UI shadow. Five of the eight worlds use zero border-radius anywhere. Reading the "Reserved accent(s)" column confirms every world holds to the one-accent-with-named-reserved-uses discipline V1 established and this document carried forward for all five new worlds (§8.2, §9.1.2, §9.2.2, §9.3.2, §9.4.2, §9.5.2) — nowhere in the family does an accent color leak into general decoration.

---

## 11. Diversity matrix

### 11.1 The five new worlds against each other

| Dimension | Marginalia | The Masthead | The Wing | Star Chart | Runtime |
| --- | --- | --- | --- | --- | --- |
| Primary metaphor | A kept working notebook | A published magazine issue | A building's wing | A field of stars | A whiteboard systems diagram |
| Spatial model | Paged, layered sheets | Spreads | Rooms | Non-linear field + overview | Wired diagram |
| Navigation | Bookmark tabs | Contents bar / full-page dialog | Floor-plan widget / directory dialog | Overview widget / chart dialog | Pipeline stepper / flow dialog |
| Typography | Serif (Lora/Source Serif) + typewriter mono + handwriting | High-contrast display serif (Playfair) + grotesk | Geometric architectural sans (Archivo) + humanist sans | Technical sans (Space Grotesk) + humanist sans + mono | Monospace (Space Mono) + rounded sans (Manrope) |
| Density | Medium | Medium-high | Low | Low | Medium |
| Shape language | Torn edges, taped rectangles, seeded rotation | Rules, no containers, drop cap | Right angles only, framed plaques | Circles and thin lines only, no containers | Rounded rectangles + stadium start/end nodes |
| Color logic | Two inks + reserved tape/stamp on cool grey paper | Near-mono + one spot color, four reserved uses | Neutral concrete + one brass accent | Deep indigo or cool vellum + gold, light only | Whiteboard/chalkboard + one matte marker green |
| Interaction | Tactile lift on hover; instant otherwise | Restrained underline-thickening; instant otherwise | Unfilled outlined "signage" buttons | Text-link underlines; instant otherwise | Outlined rounded buttons; instant otherwise |
| Motion trigger | Load (hero page-settle) | Load (masthead rule-draw) | Load (floor-plan unveiled) | Visibility (constellation draws) | Visibility (wiring connects) |
| Signature element | Tape + ink stamp | Nameplate + verbatim pull quote | Floor plan + threshold | Skill-to-project constellation | Skill-to-project wiring |
| Emotional tone | Intimate, handmade, unhurried | Confident, edited, considered | Institutional calm, spacious | Quiet, exploratory, expansive | Clear, systemic, legible |

**Reading the matrix.** No two worlds share a primary metaphor, spatial model, shape language, or signature-element *object* (a stamp is not a pull quote is not a floor plan is not a constellation is not a wiring diagram — even the two that share a relationship-visualization idea, Star Chart and Runtime, differ in object: stars-and-curves versus nodes-and-orthogonal-wires). Motion trigger is deliberately split three load-triggered / two visibility-triggered, so the family doesn't repeat one motion pattern five times. No dimension has more than two worlds giving a near-identical answer, and the two closest cases (Star Chart/Runtime's shared relationship-mapping idea; Marginalia/The Wing's shared "reserved single accent on neutral ground" logic) each differ enough in mechanism or hue family to pass the row-by-row check in §11.3.

### 11.2 Against the three existing V1 worlds

| Check | Result |
| --- | --- |
| Spatial model | All five new worlds claim spatial models absent from V1 (§7.1); none is a vertically-stacked, single-column scroll like Biyahe, As-Built, or The Current. |
| Color family | No new world reuses a V1 world's core hue: Biyahe's six saturated fields, As-Built's two-ink print/blueprint, and The Current's hue-ramp are all distinct in kind from Marginalia's paper, The Masthead's near-mono-plus-spot, The Wing's concrete-plus-brass, Star Chart's indigo-plus-gold, and Runtime's whiteboard-plus-green. |
| Shape language | As-Built and The Wing both use zero-radius everywhere, and both are architecturally-adjacent in spirit — the two stay distinct through composition (issued sheets with a title block vs. walkable rooms with a floor plan) and color (cool two-ink print vs. warm concrete-and-brass), the same way V1 §7.2 already treats "two worlds share one attribute" as acceptable when the overall mechanism differs. |
| Reused technique, different mechanism | As-Built's redline cloud and The Wing's floor-plan reveal and Runtime's wiring all use `stroke-dashoffset` draws — a shared *technique*, never a shared *result* — exactly the distinction V1 §7.2 draws between mechanism and vocabulary. |

### 11.3 The similarity gate, run against all eight

Apply V1 §7.2's test to the full family, not just the five new worlds:

- **The thumbnail test.** Shrink a full-page screenshot of each of the eight worlds' home route to 320px wide (captured in Phase 3, §13.4). A viewer unfamiliar with the family should be able to correctly match at least six of the eight to their concept names from the thumbnail alone. This is a slightly relaxed bar from V1's "at least two of three" — with eight worlds instead of three, near-misses on the two hardest pairs (As-Built/The Wing per §11.2, and Star Chart/Runtime per §11.1) are tolerable as long as the majority match cleanly.
- **Row-by-row check.** Run the same check V1 §7.2 defines against §11.1's matrix: at least two of five cells in every row must describe a genuinely different mechanism. §11.1's own "Reading the matrix" paragraph already performs this check and finds no failure.
- **If the gate fails** on the real screenshots in Phase 3, do not adjust colors to fake a difference — revisit the weaker world's spatial model or signature element per V1 §4.3's change-control rules, and re-run the gate.

---

## 12. Git branch strategy

### 12.1 Principles (extends V1 §8.1, unchanged)

Never modify a branch you didn't create it for. Never merge one world branch into another. Undo with `git revert`. Every new-world branch in this document starts from the same commit as its siblings. Nothing here supersedes V1 §8's rules for the three existing branches — they remain untouched.

### 12.2 Establishing the V2 baseline

Do this once, in Phase 0 (§13.1), before cutting any V2 branch:

```bash
# 1. Confirm portfolio/baseline (from V1) still exists and reflects real content
git branch --list "portfolio/baseline"
git log portfolio/baseline --oneline -5
```

- **If `portfolio/baseline` is current** (no real content changes have happened on the repository's main line since V1), use it directly as the common ancestor for every V2 branch — refine branches excepted, which branch from their own world's tip (§12.3).
- **If real content has changed since V1** (new projects added, contact info updated, and so on — check the repository's actual default branch against `portfolio/baseline`), cut a fresh `portfolio/baseline-v2` from the current default branch, and use that as the common ancestor for the five new-world branches instead:

```bash
git checkout <default-branch>
git pull
git checkout -b portfolio/baseline-v2
git add docs/worlds-v2/
git commit -m "docs(worlds-v2): add V2 audit, DNA map, and this spec"
```

Record which baseline was used, and why, in `docs/worlds-v2/AUDIT.md` — this is exactly the kind of decision §0.1's honesty framing requires the real audit to settle, not this document.

### 12.3 Branch map

| Branch | Cut from | Purpose |
| --- | --- | --- |
| `portfolio/refine-biyahe` | `portfolio/world-01-biyahe` (its own tip) | §4's refinement plan |
| `portfolio/refine-as-built` | `portfolio/world-02-as-built` (its own tip) | §5's refinement plan |
| `portfolio/refine-the-current` | `portfolio/world-03-the-current` (its own tip) | §6's refinement plan |
| `portfolio/v2-world-01-marginalia` | The V2 baseline (§12.2) | §9.1 |
| `portfolio/v2-world-02-masthead` | The V2 baseline | §9.2 |
| `portfolio/v2-world-03-the-wing` | The V2 baseline | §9.3 |
| `portfolio/v2-world-04-star-chart` | The V2 baseline | §9.4 |
| `portfolio/v2-world-05-runtime` | The V2 baseline | §9.5 |

Refine branches and new-world branches have different ancestors on purpose: a refinement is evolving something that already exists (it must start from that thing), while a new world is a fresh exploration that must be a true sibling of the other new worlds (they must all start from the same, unbuilt baseline) — mixing the two would either graft new-world code onto old implementation debt or lose the point of "evolution, not replacement" for the refinements.

```bash
git checkout portfolio/world-01-biyahe && git checkout -b portfolio/refine-biyahe
git checkout portfolio/world-02-as-built && git checkout -b portfolio/refine-as-built
git checkout portfolio/world-03-the-current && git checkout -b portfolio/refine-the-current

git checkout <v2-baseline> && git checkout -b portfolio/v2-world-01-marginalia
git checkout <v2-baseline> && git checkout -b portfolio/v2-world-02-masthead
git checkout <v2-baseline> && git checkout -b portfolio/v2-world-03-the-wing
git checkout <v2-baseline> && git checkout -b portfolio/v2-world-04-star-chart
git checkout <v2-baseline> && git checkout -b portfolio/v2-world-05-runtime
```

### 12.4 Commit discipline

Same convention as V1 §8.3: commit at the end of each meaningful subsection of work, message-prefixed by branch purpose (`refine-biyahe:`, `v2-world-01:`, and so on), final commit on each branch is that world's report. Never commit `node_modules`, build output, or working screenshots outside `docs/worlds-v2/screenshots/`.

### 12.5 What must never happen

Everything V1 §8.4 lists, plus: never cut a `v2-world-*` branch from a `world-0N-*` (V1) or `refine-*` branch instead of the V2 baseline — that would make it a child of existing implementation rather than a true sibling of the other four new worlds, breaking the "same intended baseline" requirement.

### 12.6 Parallel sessions with worktrees

As in V1 §8.5, one worktree per branch: `git worktree add ../portfolio-<slug> <branch>`. Sessions E through I (§0.5) may run concurrently, each in its own worktree; Sessions B, C, D likewise.

---

## 13. Implementation phases

### 13.1 Phase 0 — Audit (read-only)

**Session A.** Check out each of the three existing world branches in turn (read-only — no commits on those branches). Run the real version of §1.2's audit, replacing every `[SPEC-DERIVED]` line with an actual finding. Run §2's DNA table the same way. Decide and document the V2 baseline (§12.2). Produce `docs/worlds-v2/AUDIT.md` and `docs/worlds-v2/DESIGN_DNA.md`, then commit them to whichever baseline branch was chosen.

**Checkpoint.** Both files exist, every `[SPEC-DERIVED]` tag from §1–§2 of this document has been replaced with a real finding, and the V2 baseline decision is recorded with its reasoning.

### 13.2 Phase 1 — Refine the three existing worlds

**Sessions B, C, D** (may run in parallel worktrees, §12.6), each starting only after Phase 0 is committed, each reading only its own world's refinement plan (§4, §5, or §6) plus that world's own V1 spec subsection, to avoid cross-world convergence. For each item in the relevant refinement plan: confirm the `[SPEC-DERIVED]` premise against the real audit before implementing it (skip the item if Phase 0 found the premise false); implement; re-run that world's own V1 stress tests (V1 §2.6) and accessibility/performance checks (§15, §16 below); write a short refinement report (`docs/worlds-v2/REFINE_<WORLD>_REPORT.md`) covering what changed, why, and what was confirmed already fine and left alone.

**Checkpoint per world.** The refined branch builds independently; every §17 checklist item passes or is explicitly flagged; the world is still clearly the same world it was (a viewer familiar with V1's screenshots should recognize it immediately, just sharper).

### 13.3 Phase 2 — Build the five new worlds

**Sessions E through I** (may run in parallel worktrees), each starting from the V2 baseline (§12.2), each reading only its own world's subsection of §9. For each world, follow the same build sequence V1 §9.5 already established — tokens and contrast verification first (using V1 Appendix A's script, reused as-is; if `scripts/contrast.mjs` isn't already in the repository from V1, recreate it verbatim from that appendix before verifying any color), then skeleton and navigation, then sections in content order, then the signature element and orchestrated moment last, then that world's own stress tests (V1 §2.6), then the accessibility and performance pass (§15, §16), then the world report.

**Checkpoint per world.** Same bar as V1 §9.5's checkpoint, plus: an informal thumbnail check (§11.3) against the other four new worlds' latest screenshots so a glaring collision is caught before Phase 3's formal one.

### 13.4 Phase 3 — Comparison across the full family

**Session J**, after every branch in Phase 1 and Phase 2 has a committed report. Capture matching screenshots of all eight worlds (three refined, five new) at the viewports and shot types §14.2 specifies, run the full-family similarity gate (§11.3) against the real screenshots, and write `docs/worlds-v2/COMPARISON.md` following §14's methodology.

**Checkpoint.** `COMPARISON.md`, `WORLD_MATRIX.md`, and the full `screenshots/` tree are committed to the V2 baseline branch. This is documentation-only; no application code changes on this branch.

### 13.5 If a phase cannot complete

As in V1 §9.8: record what failed and why in the relevant `docs/worlds-v2/` file and continue with independent phases rather than stopping the whole run — a blocked World 03 build, for example, should not prevent Worlds 04 and 05 from proceeding.

### 13.6 Ask the owner only when

V1 §9.9's five conditions apply unchanged, plus one addition specific to this document: **if Phase 0's real audit substantially contradicts §1's `[SPEC-DERIVED]` predictions** — for example, if a world already has the exact refinement §4–§6 proposed, or has a completely different weak point than predicted — note it in `AUDIT.md` and adjust the refinement plan accordingly; only escalate to the owner if the contradiction is severe enough that an entire refinement plan no longer makes sense as written, not for ordinary "the guess was half right" cases.

---

## 14. Screenshot and comparison methodology

### 14.1 Output structure

```text
docs/worlds-v2/
├── AUDIT.md
├── DESIGN_DNA.md
├── WORLD_MATRIX.md
├── COMPARISON.md
├── REFINE_BIYAHE_REPORT.md
├── REFINE_AS-BUILT_REPORT.md
├── REFINE_THE-CURRENT_REPORT.md
├── WORLD_01_MARGINALIA_REPORT.md
├── WORLD_02_MASTHEAD_REPORT.md
├── WORLD_03_THE-WING_REPORT.md
├── WORLD_04_STAR-CHART_REPORT.md
├── WORLD_05_RUNTIME_REPORT.md
└── screenshots/
    ├── biyahe/ · as-built/ · the-current/ (refined)
    └── marginalia/ · masthead/ · the-wing/ · star-chart/ · runtime/
```

`WORLD_MATRIX.md` holds §11.1's matrix, filled in against the real builds rather than this document's design-time version, plus §11.2's cross-check against the three existing worlds. `COMPARISON.md` is the Phase 3 synthesis: all eight world reports combined, the real matrix, the real gate result, and the screenshots (referenced by relative path, not duplicated inline).

### 14.2 What to capture, per world

For each of the eight worlds (three refined, five new): desktop (1280px), tablet (768px), mobile (360px) full-page screenshots of the home route, plus individually-cropped shots of the hero, the projects section, and the contact section at 1280px — six shots per world, 48 total. Use the same viewport widths V1 used for its own baseline (360/768/1280) so old and new screenshots are directly comparable.

### 14.3 Evaluation criteria

For each world, write evidence-based observations — not scores — against:

- **Visual identity.** Does it have a distinct personality a viewer could describe without being told the concept name?
- **Memorability.** What, specifically, would a visitor still picture an hour after leaving the page?
- **Clarity.** At 360px, in the first screenful, can a visitor identify who this is and what they do?
- **Project presentation.** Are projects easy to understand on their own terms, independent of the surrounding concept?
- **Craft.** Does the interface feel deliberately made, or does any part of it feel like a reskin applied over a generic layout?
- **Responsiveness.** Does the identity survive at 360px, or does the concept only work at desktop width?
- **Accessibility.** Does the §15 checklist pass without exception, or with logged, justified exceptions only?
- **Performance.** Does the §16 budget pass, or is the shortfall logged with cause?

Per §14.4 of the brief's own instructions, do not reduce any of this to a number — write what was actually observed, with reference to the specific screenshot it came from.

### 14.4 The anti-generic check

For every one of the eight worlds, ask explicitly in `COMPARISON.md`: *could this design be found in a generic AI-generated developer portfolio template?* Answer it in one or two sentences per world, citing the specific device (the stamp, the pull quote, the floor plan, the constellation, the wiring — or, for the three refined worlds, the press-plates, the redline cloud, the scroll-line) that makes the answer no. If the honest answer for any world is "maybe," that world is not done — return to its refinement plan or its §9.x anti-goals list and address the specific generic-reading element before moving on.

---

## 15. Accessibility requirements

Release gates (V1 §0.2 rule 6), binding across all eight worlds — the three refined and the five new. V1 §11 in full still applies; this section states what's specific to V2.

### 15.1 The recurring pattern this family relies on

Every new device introduced across §9 — the tape and stamp, the drop cap and pull quote, the floor plan and wall labels, the stars and constellation lines, the nodes and wiring — follows the same rule: **the decorative version is `aria-hidden`, and the fact it represents exists as real, separately readable text or a real link somewhere else on the page.** This is stated individually in every world's own §9.x.13, but it is worth naming once here as the family-wide principle it actually is, since it's the single accessibility idea this entire document leans on hardest.

### 15.2 Motion

Confirm, for every one of the five new worlds, that its one orchestrated moment (§9.1.11, §9.2.11, §9.3.11, §9.4.11, §9.5.11) has a real, tested `prefers-reduced-motion: reduce` path — this is the specific risk §1.3 flagged as most likely to have been missed in V1, so it gets explicit re-emphasis here for every new world too, not just the audit of the old ones.

### 15.3 New patterns needing specific verification

- **Native `<dialog>` and popover-based mobile navigation** appear in four of the five new worlds (Masthead's contents spread, The Wing's directory, Star Chart's chart list, Runtime's flow list) — verify focus-trap, `Escape`-to-close, and focus-return independently in each, since a native element used correctly in one world doesn't guarantee another session implemented it the same way.
- **`::first-letter` drop caps** (The Masthead, §9.2.6) — confirm screen-reader word-boundary announcement is unaffected.
- **SVG filter-based "hand-drawn" line wobble** (Runtime, §9.5.3) — confirm the filter doesn't reduce line contrast below the 3:1 non-text minimum at any point along its length.
- **Seeded rotation** (Marginalia's pages and cards, §9.1.3) — confirm the rotation angles specified (±1.5° pages, ±3° cards/chips) don't push any text below its required contrast or make it genuinely harder to read; if real content at real sizes reads poorly rotated, reduce the angle rather than removing the device, and log the adjustment.

### 15.4 Testing checklist (run per world, all eight, before that world's checkpoint)

Identical to V1 §11.7: automated audit with zero critical/serious issues; full keyboard-only pass; `prefers-reduced-motion: reduce` pass; `forced-colors: active` pass; 320px width and 200% zoom pass; a screen-reader spot check of the hero, one navigation interaction, one expand/copy interaction, and contact.

---

## 16. Performance requirements

Release gates, measured per world against the V2 baseline (§12.2). V1 §12 in full still applies; the table below is this document's per-world specifics, gathered in one place for convenience.

### 16.1 Shared budgets (restated from V1 §12.1)

Lighthouse Performance ≥90 (mobile), Accessibility 100, Best Practices ≥95, SEO at or above baseline. LCP < 2.5s, INP < 200ms, CLS < 0.1. First Load JS: no more than +15 KB gzipped above the V2 baseline, per world.

### 16.2 Per-world font and script budgets

| World | Font budget (gzipped, combined) | Client JS target |
| --- | --- | --- |
| Marginalia | ≤150 KB (4 families; drop Caveat first if over) | <4 KB |
| The Masthead | ≤100 KB | <3 KB |
| The Wing | ≤90 KB | <4 KB |
| Star Chart | ≤110 KB | <4 KB |
| Runtime | ≤80 KB | <4 KB |

### 16.3 Animation and dependency rules (unchanged from V1 §12.3, §4.6)

Only `transform`, `opacity`, `clip-path`, and `stroke-dashoffset`/`stroke-dasharray` are animated, anywhere, in any of the five new worlds — every motion table in §9 is already scoped to these properties. Zero new dependencies by default; in particular, despite The Wing's spatial framing and Star Chart's astronomical framing, **neither uses WebGL, a 3D library, or a canvas-based physics/particle system** — both are built with flat CSS and inline SVG, per their own §9.3.14 and §9.4.14 anti-goals. Any exception is measured, justified, and logged per world, exactly as V1 §4.6 requires.

### 16.4 How to measure

As V1 §12.4: run Lighthouse against each world's home route on both the V2 baseline and the world build, recording the comparison in that world's report. If Lighthouse is unavailable, report the First Load JS table from the build output instead and note that Core Web Vitals could not be measured directly.

---

## 17. Final quality checklist

Run this per world (all eight) before that world's checkpoint. A world is not done until every row passes or is an explicit, recorded exception.

| # | Check |
| --- | --- |
| 1 | All six sections present, in the repo's order and with the repo's IDs — every new world's decorative "stage," "room," or "page" chrome sits alongside the real heading, never replacing it. |
| 2 | No repo content invented, rewritten, or paraphrased-as-original; every dek, annotation, or label pulled from existing text is verbatim or a direct field value. |
| 3 | The world's signature element and its one orchestrated moment are implemented exactly as specified, or the deviation is recorded. |
| 4 | No item from V1 §4.2's banned-defaults table appears anywhere. |
| 5 | No item from this world's own anti-goals list (§9.1.14 / §9.2.14 / §9.3.14 / §9.4.14 / §9.5.14, or V1's per-world anti-goals for the three refined worlds) appears. |
| 6 | V1 §2.6's ten sparse-data and stress-test cases were run against this world and look intentional; screenshots are in the report. |
| 7 | Both modes work; the toggle re-skins correctly; the existing persistence mechanism is untouched. |
| 8 | Responsive behavior at 360/768/1280px matches this world's own responsive table and V1 §10's shared rules. |
| 9 | Every §15.4 accessibility test passes. |
| 10 | Every §16 performance budget is met, or the shortfall and its cause are recorded. |
| 11 | Zero new dependencies, or an exception justified per V1 §4.6 and recorded. |
| 12 | Protected paths (V1 §2.4) unchanged; a diff against the relevant baseline touches only presentational files. |
| 13 | Lint, typecheck, and build pass with no new suppressions. |
| 14 | The world (or refinement) report is written and is the branch's final commit. |
| 15 | An informal thumbnail check against every *other* world already built in this family — not just its four new-world siblings — still reads as distinct. |
| 16 | For the five new worlds specifically: the "real link plus `aria-hidden` decorative echo" pattern (§15.1) is applied consistently everywhere a new device (stamp, drop cap, floor plan, constellation, wiring) represents a real fact. |

---

## 18. AGY execution instructions

### 18.1 Before starting

1. Confirm `PORTFOLIO_DESIGN_EXPLORATION.md` (V1) and this document are both present in the repository.
2. Confirm `scripts/contrast.mjs` exists (added during V1's Appendix A); if it's missing, recreate it verbatim from that appendix before verifying any color in this document.
3. Read §0 of this document in full before doing anything else — the access-honesty framing in §0.1 governs how §1 and §2's `[SPEC-DERIVED]` content must be treated, and getting that wrong undermines everything that depends on it (§4–§6's refinement plans, most directly).

### 18.2 Run order

Follow §13's five phases in order: **Phase 0 (Session A, audit) → Phase 1 (Sessions B/C/D, refine, parallel-safe) → Phase 2 (Sessions E–I, new worlds, parallel-safe) → Phase 3 (Session J, comparison).** Phase 1 and Phase 2 may run concurrently with each other (they touch entirely different branches), but neither may start before Phase 0's checkpoint is committed, since both depend on Phase 0's real findings — Phase 1 to know which `[SPEC-DERIVED]` refinement items are still worth doing, Phase 2 to know which baseline to branch from.

### 18.3 Session-by-session reading list

| Session | Reads |
| --- | --- |
| A | §0, §1, §2, §12.2, V1 in full |
| B | §4, V1 §6.1 |
| C | §5, V1 §6.2 |
| D | §6, V1 §6.3 |
| E | §9.1 only |
| F | §9.2 only |
| G | §9.3 only |
| H | §9.4 only |
| I | §9.5 only |
| J | §11, §14, all twelve reports from Phases 1–2 |

A session building or refining one world reads only that world's own materials, exactly as V1's run protocol required — this is what keeps five parallel new worlds from converging on each other the way three parallel worlds already successfully avoided in V1.

### 18.4 What "done" looks like

Three refined branches and five new-world branches, each independently runnable and passing §17 in full, plus `docs/worlds-v2/COMPARISON.md` holding the real diversity matrix (§11, filled in), the real similarity-gate result (§11.3) run against actual screenshots of all eight worlds, and the evidence-based evaluation §14.3 asks for. As in V1 §14.3, this exploration does not pick a winner — it hands the owner eight complete, comparable, genuinely distinct worlds and a document to compare them by. Which of them (if any) becomes the portfolio's next default, or which specific ideas get drawn from several of them into something new, is a decision for outside this document, exactly as V1 §14.3 and §14.4 already establish for the family it started.
