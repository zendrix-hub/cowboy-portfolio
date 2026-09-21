# CONTENT_GAPS.md: Logged Content Gaps & Decisions

**Repository:** `zendrix-hub/cowboy-portfolio`  
**Purpose:** Logs all missing fields, sparse data, and presentation fallbacks.  
**Rule (§0.2 Rule 7):** Missing data is omitted gracefully or rendered with defined fallbacks. Never fill gaps with placeholder, lorem ipsum, or plausible-sounding fabricated text.

---

## 1. Project Imagery & Media

| Project | Missing Asset | Fallback Behavior per World Specification |
| --- | --- | --- |
| **DaloyAqua** (Featured) | No screenshot or mockup in `public/` | **W1 (Biyahe):** Algorithmic stripe-pattern window seeded by slug (`aria-hidden`).<br>**W2 (As-Built):** SVG hatch window with 1px rule at 8px pitch.<br>**W3 (The Current):** Unframed text layout; no placeholder. |
| **PlayIT** | No screenshot in `public/` | Same fallbacks as above. |
| **ReadHub** | No screenshot in `public/` | Same fallbacks as above. |
| **Gordon RamsAi** | No screenshot in `public/` | Same fallbacks as above. |

---

## 2. Project Metrics & Statistics

- **Gap:** No quantitative metrics (e.g. active users, download numbers, percentage performance gains, throughput stats) exist in `data/projects.ts`.
- **Policy:** Strictly enforce §0.2 Rule 1 and §2.5: **Never invent numbers or statistics.** Layouts must remain compelling based on problem context, constraints, and architecture alone.

---

## 3. Experience & Tenure Gaps

| Entry | Field / Note | Handling |
| --- | --- | --- |
| **NEC Telecom Internship** | Active tenure (`"Sept 2026 – Present"`) | Render literally. Marked with active visual indicator in each world. |
| **CIT-U Undergraduate** | Degree candidate (`"2023 – Jan 2027 (Expected)"`) | Display degree and expected graduation date honestly. |
| **Cloud & AI Certifications** | Non-standard period (`"Verified"`) | Render period text as `"Verified"` without fabricating dates. |
| **Self-Directed Study** | Non-standard period (`"Multi-Year Habit"`) | Render period text as `"Multi-Year Habit"` without fabricating calendar years. |

---

## 4. Experience Entry Count

- **Gap:** The experience dataset contains exactly 4 entries.
- **Policy:** The Journey / Experience sections in all three worlds are intentionally designed for 2 to 4 entries:
  - **W1 (Biyahe):** Generously spaced road with 4 stops.
  - **W2 (As-Built):** Clean, uncluttered revision table with 4 rows.
  - **W3 (The Current):** Spacious descent where the traveling current line provides visual interest between stations.

---

## 5. Contact Form Deprecation

- **Current Repository State:** `components/sections/Contact.tsx` contains an interactive `<ContactForm />` powered by `resend` and `zod` via `app/actions/contact.ts`.
- **Policy (§2.2, §4.1):** Contact in all three worlds must be a plain `mailto:rivazendrix@gmail.com` link, optionally accompanied by a "Copy address" clipboard button. No forms, server actions, or third-party email backends will be used in any world. The existing `app/actions/contact.ts` remains untouched on `portfolio/baseline` as a protected path.
