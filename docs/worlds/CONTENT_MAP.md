# CONTENT_MAP.md: Portfolio Content Contract

**Repository:** `zendrix-hub/cowboy-portfolio`  
**Purpose:** Maps every portfolio entity to its definitive file location, interface, and field names.  
**Rule:** All three visual worlds consume **only** this data contract. No content may be invented or modified.

---

## 1. Entity: Person & Identity

- **Source File:** `data/social.ts`
- **Asset Location:** `public/images/avatar.webp`

| Field | Type | Current Value in Repo | Rule if Missing |
| --- | --- | --- | --- |
| `name` | `string` | `"Zendrix Bello Riva"` | Omit element |
| `displayName` | `string` | `"Zendrix Riva"` | Fall back to `name` |
| `role` | `string` | `"Software / Full-Stack Developer"` | Omit element |
| `subrole` | `string` | `"Software Engineering Intern @ NEC Telecom Software (GDC)"` | Omit element |
| `intro` | `string` | `"Engineering offline-first Android systems, modular Spring Boot APIs, and grounded AI applications with clean architecture and production discipline."` | Omit element |
| `tagline` | `string` | `"I build practical software systems, think carefully about architecture, and choose technology based on the problem rather than chasing trends."` | Omit element |
| `about` | `string` | `"I build software across mobile, backend, and full-stack environments, with a focus on clean architecture, reliability, and practical engineering. Currently interning at NEC Telecom Software Philippines while completing my final year in BSIT, I enjoy solving problems where thoughtful system design matters—from offline-first Android systems to robust backend services. I value disciplined iteration, clear structure, and software that works dependably in production."` | Omit element |
| `location` | `string` | `"Mandaue City, Cebu, Philippines"` | Omit element |
| `email` | `string` | `"rivazendrix@gmail.com"` | Keep mailto link |
| `academicEmail` | `string` | `"zendrix.riva@cit.edu"` | Omit element |
| `phone` | `string` | `"0909 188 9602"` | Omit element |
| `github` | `string` | `"https://github.com/zendrix-hub"` | Omit link |
| `linkedin` | `string` | `"https://www.linkedin.com/in/zendrix-riva/"` | Omit link |
| `resumeUrl` | `string` | `"/resume.pdf"` | Omit button |
| `photo` | `string` | `"/images/avatar.webp"` | Use world-specific fallback window |

---

## 2. Entity: Projects

- **Source File:** `data/projects.ts`
- **Interface:** `Project`

| Field | Type | Description | Handling |
| --- | --- | --- | --- |
| `title` | `string` | Project name (`PlayIT`, `ReadHub`, `DaloyAqua`, `Gordon RamsAi`) | Required |
| `subtitle` | `string` (optional) | One-line descriptor | Render if present |
| `roleContext` | `string` (optional) | Team role & scope | Render if present |
| `description` | `string` | Full project description | Render what exists |
| `problem` | `string` | Target problem description | Render in details/schedule |
| `constraints` | `string` | System constraints | Render in details/schedule |
| `architecture` | `string` | Architectural strategy | Render in details/schedule |
| `highlights` | `string[]` | Key engineering achievements | Render in list |
| `tags` / `stack` | `string[]` | Technology stack | Render as chips/data |
| `githubUrl` | `string` (optional) | GitHub repository URL | Render link if present |
| `liveUrl` | `string` (optional) | Deployed demo URL | Render link if present |
| `image` | `string` (optional) | Screenshot / mockup path (None present) | Use world-specific image fallback |
| `featured` | `boolean` | Flagship project marker | `true` for DaloyAqua and PlayIT |
| `status` | `string` | Current lifecycle state: `"In Progress"`, `"Completed"`, etc. | Render literally as stored |
| `category` | `string` | Domain category (`"Mobile"`, `"Web"`, `"Backend"`, `"AI / Full-Stack"`) | Render if used |

### Featured Project Handling (§2.2, §5.1)
- **Primary Featured Project:** **DaloyAqua** (`status: "In Progress"`). Must be given flagship treatment in every world.
- **Under Construction State:** "In Progress" must be prominently and intentionally designed, never hidden or dressed up as shipped.

---

## 3. Entity: Skills

- **Source File:** `data/skills.ts`
- **Interface:** `SkillCategory`

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Category title (e.g. `"Mobile Systems (Core Focus)"`, `"Backend Engineering & APIs"`) |
| `focus` | `string` | Concise focus summary for the group |
| `skills` | `string[]` | Array of skill and technology names |

**Rules:**
- No proficiency percentage bars, numbers, or fabricated metrics.
- Show categories and items as stored.
- Relationships between skills and projects may be derived **only** from exact string matches between `skills` and `tags` in `data/projects.ts`.

---

## 4. Entity: Experience and Education

- **Source File:** `data/experience.ts`
- **Interface:** `ExperienceItem`

| Field | Type | Description |
| --- | --- | --- |
| `period` | `string` | Date range or tenure text (e.g. `"Sept 2026 – Present"`, `"2023 – Jan 2027 (Expected)"`) |
| `title` | `string` | Role title or degree name |
| `organization` | `string` | Institution or employer name |
| `category` | `string` | `"Internship"`, `"Education"`, `"Certification"`, `"Continuous Study"` |
| `description` | `string` | Context and narrative description |
| `highlights` | `string[]` | Key activities or coursework bullets |

**Rules:**
- Render in the exact order stored in `data/experience.ts`.
- If period indicates current tenure (`"Sept 2026 – Present"`), apply the world's "current" marker (W1: signal stop circle, W2: revision triangle, W3: solid node fill).
- Treat student and intern status honestly and intentionally without apology.

---

## 5. Entity: Contact

- **Source File:** `data/social.ts`

| Field | Value | Presentation |
| --- | --- | --- |
| Email Link | `mailto:rivazendrix@gmail.com` | Primary contact mechanism (no form, no backend) |
| Copy Action | Copies `rivazendrix@gmail.com` | Accompanies link; announces through `role="status"` |
| GitHub | `https://github.com/zendrix-hub` | Outlined/styled external link |
| LinkedIn | `https://www.linkedin.com/in/zendrix-riva/` | Outlined/styled external link |

---

## 6. Entity: Site Chrome & Navigation

- **Section IDs & Anchors (Protected):**
  - `#about`
  - `#projects`
  - `#skills`
  - `#experience`
  - `#contact`
- **Meta & SEO:**
  - Page Title: `"Zendrix Riva — Software / Full-Stack Developer"`
  - Description: Maintained in `app/layout.tsx` metadata and JSON-LD schema
