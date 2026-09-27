# Worlds V2: Screenshot Archive & Capture Specification

**Execution Phase:** Phase 3 (Session J)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §14.2  

---

## 1. Directory Structure

```text
docs/worlds-v2/screenshots/
├── README.md
├── biyahe/              # Refined World 01
├── as-built/            # Refined World 02
├── the-current/         # Refined World 03
├── marginalia/          # New World 01
├── masthead/            # New World 02
├── the-wing/            # New World 03
├── star-chart/          # New World 04
└── runtime/             # New World 05
```

---

## 2. Capture Protocol & Viewport Specifications

For each of the eight worlds (3 refined + 5 new), 6 standardized captures are specified:

| Shot ID | Target / Viewport | Width × Height | Scope / Type | File Convention |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Desktop Full Page | `1280px` × full height | Full route scroll from `#hero` to `#contact` | `desktop-full.png` |
| **02** | Tablet Full Page | `768px` × full height | Full route scroll at standard tablet viewport | `tablet-full.png` |
| **03** | Mobile Full Page | `360px` × full height | Full route scroll at standard mobile viewport | `mobile-full.png` |
| **04** | Desktop Hero Crop | `1280px` × `800px` | First screenful displaying nameplate & navigation | `hero-crop.png` |
| **05** | Desktop Projects Crop | `1280px` × `900px` | Featured project & signature motion moment | `projects-crop.png` |
| **06** | Desktop Contact Crop | `1280px` × `600px` | Terminal contact waypoint, mailto, & copy button | `contact-crop.png` |

**Total Family Inventory:** 8 worlds × 6 captures = 48 standardized images.

---

## 3. Capture Verification Checklist

- [x] All 8 world branches independently buildable with Turbopack.
- [x] Viewport scales calibrated to V1 baselines (`360px`, `768px`, `1280px`).
- [x] Both color modes (light/dark or primary/alt) functional across all branches.
- [x] All signature elements visible without distortion or clipping.
