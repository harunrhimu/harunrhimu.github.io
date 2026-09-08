# Session Handoff — Dashboard Gallery / Procurement KPIs

**Date:** 2026-07-14
**Workspace:** `H:\pibric`
**Outcome:** Procurement KPIs report added to the dashboard gallery and deployed live.

---

## ⚠️ Read this first — source is not committed

The live site is published, but **every source change from this session is uncommitted in `H:\pibric`**.
It exists only on local disk. If this machine is lost, the work is lost — the deploy repo only
holds compiled output, not source.

Untracked (brand new, never committed):

- `portfolio/src/data/dashboards.js`
- `portfolio/src/pages/DashboardGallery.jsx`
- `portfolio/src/components/DashboardGalleryPreview.jsx`
- `portfolio/public/dashboards/` — **all 14 dashboard PNGs, ~7 MB**

Current branch is `migrate/nextjs`, not `main`. Nothing was committed to the source repo this
session because it was never asked for. **Recommended next action: commit these.**

The two repos are separate by design (see `dev to build guide.md`): pushing the Pages repo
publishes the site; committing `H:\pibric` only preserves source history. Both matter.

---

## What shipped

Two commits to the deploy repo `harunrhimu/harunrhimu.github.io` (branch `main`),
live at <https://harunrhimu.github.io/dashboard-gallery>:

| Commit | What |
| --- | --- |
| `bd3cfe4` | Add Procurement KPIs report to dashboard gallery (5 pages, featured) |
| `18f3a0e` | Show business problem in lightbox; scrollable modal; legible info panel |

Both were verified live (assets returning 200, expected strings present in the shipped bundles).

### 1. Procurement KPIs added to the gallery

New entry in `portfolio/src/data/dashboards.js`, placed **first** and `featured: true`.
Being first makes it the homepage hero too — `DashboardGalleryPreview` takes `dashboards.slice(0, 3)`
and renders index 0 full-width, independent of the `featured` flag.

- **Category:** `Procurement` (new — the filter chips derive from the data, so the chip appeared automatically)
- **Tools:** Power BI, DAX, Power Query
- **Pages:** 5

Real figures pulled off the report pages (not invented): $49.30M spend, $3.93M savings
(7.97% rate), 777 POs 2022–2024, 5 suppliers × 5 categories, 78.43% on-time,
5.64% defect rate, 82.37% compliance, 10.8-day avg lead time.

**Side effect:** `dc-sales-analytics` was flipped `featured: true → false`. The gallery renders
every featured card full-width, so leaving both would have produced two hero cards. Trivially
reversible if you want DC Sales back on top.

### 2. Business problem in the lightbox

Added an optional `problem` field to the dashboard schema, rendered in the lightbox info strip
under the guiding question, behind a "The Business Problem" heading.

**Only `procurement-kpis` has a `problem`.** The render is conditional (`{item.problem && ...}`),
so the other three dashboards show the strip exactly as before. Drafts were written for
DC Sales / DC Burger / Contoso but **deliberately removed before deploy** at your instruction —
they were my narrative framing of your projects and needed your sign-off. They are not saved
anywhere; re-adding means writing a new `problem:` string per entry, nothing else.

Two supporting fixes in `DashboardGallery.jsx` (the `Lightbox` component):

- Modal is now scrollable (`overflow-y-auto`, `items-start`) — the added text pushed it past
  viewport height on smaller screens.
- Info strip moved onto a solid panel (`bg-surface-900/90`). Previously the white title sat
  directly on the blurred backdrop and was nearly unreadable.

---

## How the dashboard images were produced

Worth knowing, because the next report will need the same pipeline.

Source PDF: `H:\Data Analyst\Procurement KPIs Report\Procurement.pdf` (7 pages).

No PDF renderer existed on this machine. Note `convert` on PATH is
`C:\WINDOWS\system32\convert` — the **FAT→NTFS filesystem utility**, not ImageMagick. Do not run it.

Installed PyMuPDF into the real Python (the one on PATH first is a hermes venv with no pip):

```
C:\Users\harunrhimu\AppData\Local\Programs\Python\Python314\python.exe -m pip install pymupdf
```

Rendered at **zoom 2.5**, which yields exactly **3690×2115** — pixel-identical to the three
pre-existing dashboards, so new cards drop into the grid with no visual mismatch. Match this
for any future report.

```python
import fitz
doc = fitz.open("path/to/report.pdf")
for i, page in enumerate(doc):
    page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5)).save(f"name-page-{i+1}.png")
```

Naming convention in `portfolio/public/dashboards/`: `name.png`, then `name-page-2.png` … `name-page-N.png`.
`pages` in the data must equal `images.length`.

### Pages 6 and 7 were deliberately excluded

- **Page 6 (drill-through)** exports *unfiltered* — renders as "Performance: All Suppliers", a raw
  PO table floating on mostly white space. Looks unfinished, not impressive.
- **Page 7 (tooltip)** is 516×276 — a hover artifact, far too small for a gallery.

If you want either included, re-render from the PDF; the source images are gone from scratch space
but reproducible in seconds.

---

## 🔴 Open issue — two bugs in the Power BI report itself

These are **in the report, not the website**, and were not fixed. They are visible in the
screenshots now published on the live site.

1. **Every KPI card on all five pages shows `PY Var 0.00%`.** Prior-year equals current-year
   exactly on each card (Total Spend $49.30M vs PY $49.30M; on-time 78.43% vs PY 78.43%).
   This cannot be right — page 2's own year chart shows ~$23M in 2022 against ~$26M in 2023,
   so a working YoY could not be zero. The `SAMEPERIODLASTYEAR` measures appear to return the
   current total. Suspect the `Dim_Date` relationship or the Date Table marking.

2. **Page 4's "Rolling 3M Avg Lead Time" is blank.** The card reads `--` and its companion
   chart plots a single dot against a `(Blank)` axis label.

Fixing means editing the TMDL in `Procurement.SemanticModel`, then **re-exporting the PDF,
re-rendering pages 1–5 at zoom 2.5, and redeploying** — the published PNGs are baked, so a model
fix alone will not change the site.

Relevant DAX lives in `H:\Data Analyst\Procurement KPIs Report\Procurement Analysis Plan.md` §4.2.

---

## Deploy procedure (as executed)

Per `H:\pibric\dev to build guide.md` — read it before any build/deploy; `.claude/CLAUDE.md` requires this.

```powershell
cd H:\pibric\portfolio
npm run build                                   # -> portfolio\dist

Remove-Item "H:\pibric\Clone\harunrhimu.github.io\assets" -Recurse -Force
Copy-Item "H:\pibric\portfolio\dist\*" "H:\pibric\Clone\harunrhimu.github.io" -Recurse -Force

cd H:\pibric\Clone\harunrhimu.github.io
git add -A; git commit -m "..."; git push origin main
```

Notes learned in practice:

- Deleting the old `assets` folder first is essential — stale hashed chunks otherwise accumulate.
- `.git` and `readme.md` in the target must survive the copy. Both were verified each time.
- GitHub Pages takes **~20–60 seconds**; the first curl after push returns 404. Poll, don't assume failure.
- The "chunks larger than 500 kB" build warning is **pre-existing** and unrelated to this work.

---

## Suggested next steps

1. **Commit the source in `H:\pibric`** (highest priority — see top of doc).
2. Fix the two Power BI measure bugs, re-export, re-render, redeploy.
3. Optionally supply your own `problem` copy for DC Sales / DC Burger / Contoso.
4. Optionally build a full case-study page for Procurement — the lightbox already supports a
   `caseStudySlug` field that renders a "Full Case Study" button, currently unused by every dashboard.
