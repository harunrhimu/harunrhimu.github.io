# Restructure Plan — Agency site → Personal portfolio

> Target site: `harunrhimu.github.io`
> Source: `H:\pibric\portfolio` (React + Vite + React Router)
> Decisions locked: keep current `pibric` app as an untouched **backup**; restructure on the
> Vite codebase; **warm paper + ochre** palette; keep 2–3 understated testimonials; **no urgency badges**.
> The Next.js migration stays a separate later effort — all content/design work here carries over.

---

## 0. Guiding idea

| Now (agency / "Pibric") | Target (personal) |
|---|---|
| Sells a service, funnel-shaped homepage (13 sections) | Introduces a person; homepage is a short index |
| "Hire a Power BI Developer Today", "Book a Free Consultation", scarcity badge, "responds in 24h" | Calm, factual, first-person. No urgency mechanics. |
| 7 nav items + Services/Gallery/Videos pages | 4 nav items: Home · Case Studies · Blog · About |
| "Let's Talk" as a nav button → full Contact page | "Let's Talk" as a floating button → small slide-over panel |
| Emerald-on-white + tri-color gradient headings (looks like sulaimanahmed.dev) | Warm paper + single ochre accent, solid headings |
| Logo "Pibric. / Power BI & Fabric" | Wordmark "Harun" |

**Keep:** the token architecture in `src/index.css` (one `:root` block swap — already built for this),
light/dark, the case-study + blog data model, the `SEO` component, the deploy workflow.

---

## 1. Information architecture

### Routes

| Path | Keep? | In nav? | Notes |
|---|---|---|---|
| `/` | rebuild | yes | Condensed personal homepage |
| `/case-studies` + `/case-studies/:slug` | yes | yes | Reframe copy; absorb Gallery + Videos as sections/links |
| `/blog` + `/blog/:slug` | as-is | yes | Copy tweak only |
| `/about` | rebuild | yes | Absorbs Services + Skills content |
| `/contact` | keep live | no | Target of "prefer a full page?" link in the FAB panel + footer |
| `/dashboard-gallery` | keep live | no | Linked from Case Studies + Home, not nav |
| `/videos` | keep live | no | Linked from Case Studies / About |
| `/services` | redirect → `/about` | no | Content merged into About |
| `/skills` | redirect → `/about` | no | Same |
| `*` | yes | — | 404 (GitHub Pages `404.html` already in place) |

Redirects: add `<Route path="/services" element={<Navigate to="/about" replace />} />` (and `/skills`)
in `src/App.jsx`. Cheap; protects existing inbound links.

### Navbar (`src/components/Navbar.jsx`)

- Links array → `Home, Case Studies, Blog, About`.
- Logo → text "Harun" (drop `logo-icon.png` + "Pibric" + "Power BI & Fabric" subtitle, or keep a tiny `Data · BI` kicker).
- Right side: keep `ThemeToggle`; replace the `/contact` `<Link>` "Let's Talk" with a `<button>` that opens the Let's Talk panel. Keep the subtle "Open to work" pill.
- Mobile menu: same 4 links + "Let's talk" button.

### Footer (`src/components/Footer.jsx`)

- Collapse 4 columns → 2: (a) "Harun" + one-line blurb + social icons, (b) nav links (Home, Case Studies, Blog, About, Contact).
- Delete the "Services" column. Fix real social URLs (currently `href="#"`). Change "Pibric" → "Harun". Keep email + Dhaka.

---

## 2. Design system changes

All in `src/index.css` + `tailwind.config.js`. No per-component color edits needed if done via tokens.

### 2a. Palette — warm paper + ochre

Replace the `:root` / `[data-theme="light"]` block:

```
--bg-page:        250 248 244;  /* #faf8f4 warm paper */
--bg-card:        255 255 254;
--bg-band:        244 241 235;  /* #f4f1eb */
--bg-inset:       245 242 236;
--text-heading:    28  25  23;  /* #1c1917 ink */
--text-body:       68  64  60;  /* #44403c */
--text-muted:     120 113 108;  /* #78716c */
--text-subtle:    168 162 158;
--border:         231 227 221;
--border-strong:  214 209 201;
--accent:         180  83   9;  /* #b45309 ochre — AA text on paper */
--accent-soft:    217 119   6;  /* #d97706 hover / large text */
--accent-fill:    245 158  11;  /* #f59e0b fills only, never text */
--on-accent:       28  25  23;  /* dark ink on amber fills (amber is light!) */
```

Dark block:

```
--bg-page:         26  23  20;  /* #1a1714 */
--bg-card:         36  32  28;
--bg-band:         36  32  28;
--bg-inset:        46  41  36;
--text-heading:   250 249 246;
--text-body:      214 209 201;
--text-muted:     168 162 158;
--text-subtle:    120 113 108;
--border:          61  55  48;
--border-strong:   82  74  64;
--accent:         251 191  36;  /* #fbbf24 */
--accent-soft:    253 224  71;
--accent-fill:    245 158  11;
--on-accent:       28  25  23;
```

- Retire the **second** accent: set `--accent-warm*` equal to the ochre (or repurpose to a neutral stone). One accent only.
- In `tailwind.config.js` repoint the `brand` ramp to amber values
  (`50:#fffbeb 100:#fef3c7 200:#fde68a 300:#fcd34d 400:#fbbf24 500:#f59e0b 600:#d97706 700:#b45309 800:#92400e 900:#78350f`).
  This reskins every existing `bg-brand-500/10`, `border-brand-500/20`, etc. with **zero component edits**.

### 2b. Kill the rainbow headings

`.text-gradient` is on nearly every `<h1>/<h2>`. Redefine the utility instead of editing files:

```css
.text-gradient       { @apply text-heading; }   /* was 3-color gradient */
.text-gradient-warm  { @apply text-accent; }
```

Result: solid headings everywhere instantly. Where you want emphasis on one word, wrap it in `text-accent` deliberately.

### 2c. Buttons

`.btn-primary` currently `bg-brand-600 text-white`. Amber fills need **dark** text:

```css
.btn-primary { @apply … bg-accent-fill text-[color:rgb(var(--on-accent))] hover:bg-accent-soft …; }
```

Drop the `hover:-translate-y-0.5` if you want it calmer.

### 2d. Motion & typography (calmer, more "personal")

- Remove: `animate-bounce` scroll indicator (Hero), `animate-pulse-slow` glow, `animate-float` on Hero stat cards (or slow to a barely-there drift), the marquee (component gets deleted anyway).
- Typography: keep **Inter**. Add **JetBrains Mono** (already loaded) for kicker labels (`.label`) and case-study/experience metadata — gives it character à la harun.dev without the serif-headline cliché. *Optional:* a display serif (e.g. Fraunces) for `h1` only if you want warmth — but that's now the common look.
- Headings slightly tighter / one size step quieter site-wide, if desired.

---

## 3. Page specs

### 3a. Home (`src/pages/HomePage.jsx`) — from 13 sections to ~6

| Order | Section | Source | Change |
|---|---|---|---|
| 1 | Hero | `Hero.jsx` | "Hi, I'm Harun" + **one honest sentence** ("I'm a data analyst who builds Power BI & Fabric dashboards and writes about the craft."). Keep cert badges (small). CTAs → "View work" / "Read the blog". Keep socials. **Cut:** "Live dashboard by week 3. Full handover by week 4.", "You share access… no DAX needed", the 3 floating stat cards (keep 1 or none), scroll indicator. |
| 2 | Selected work | `CaseStudiesPreview.jsx` | 2–3 case studies, "See all →". Neutral heading "Selected work". |
| 3 | What I work with | `services.js` / `skills.js` | Replace `ServicesPreview` sales cards with a **compact prose paragraph + tag row** (Fabric, Power BI, DAX, SQL, Python…). No "packages", no pricing framing. |
| 4 | Writing | `BlogPreview.jsx` | 3 latest posts. Heading "Writing" / "Notes". |
| 5 | Credentials | cert data | One compact strip: PL-300, DP-600, DP-700 + "Speaking at Global Fabric Data Day 2026". |
| 6 | Quiet close | new, tiny | One line: "Have a project or a question? *Let's talk.*" → opens the FAB panel. **Not** the big `CtaBanner`. |

**Delete from Home:** `MarqueeBanner`, `TrustedBy`, `BeforeAfter`, `MyApproach`, `WhyWorkWithMe`,
`AiFabricSection`, `DashboardGalleryPreview` (link instead), `FeaturedVideo` (move to Case Studies/About),
`FAQ` (move to About), `CtaBanner`, `ScarcityBadge`, most `SectionDivider` clutter.

### 3b. Case Studies (`src/pages/CaseStudiesPage.jsx`)

- Keep grid, filter, detail page, `Markdown`/`Mermaid` rendering.
- Hero copy: "Portfolio" kicker → "Work". Sub: *"Projects I've built end-to-end — the problem, the model, the report, what I'd change."* (drop "how I've helped businesses unlock the power of their data").
- Card metrics stay (already neutral: "47 DAX Measures", "9.11M Units").
- Bottom of page: two link-outs — "More: dashboard gallery →" (`/dashboard-gallery`) and "Walkthrough videos →" (`/videos`). Keeps those pages useful without nav slots.

### 3c. Blog (`src/pages/BlogPage.jsx`)

- Near-zero change. Kicker "Insights" → "Writing". Drop "lessons learned from real projects" salesiness if desired. Keep category filter, keep `BlogDetail.jsx`.

### 3d. About Me (`src/pages/AboutPage.jsx`) — absorbs Services + Skills

| Keep | Rewrite | Delete |
|---|---|---|
| Photo + bio block | "The Person Behind Your Dashboards" → "About me", first-person, less pitch | "What You Get" 3-card sales trio |
| Skills categories grid | fine as-is (de-emphasize styling) | "Ready to Get Started / Book a Free Consultation" CTA block |
| Experience timeline | keep | Impact stats framed as ROI ("40% Avg. Time Saved") → restate neutrally ("35+ reports built", "100+ users") |
| Certifications | trim marketing copy to 1–2 lines each | — |
| Education & courses | keep, compact | — |
| Speaking & community | keep | — |
| Interests | keep (optional) | — |
| **New:** 2–3 short client quotes (`testimonials.js`), understated | — | the "Trusted By" logo wall concept |
| **New (optional):** move `FAQ` here as a small "Common questions" | — | — |

### 3e. "Let's Talk" — floating action button

**New components:**

- `LetsTalkButton.jsx` — `position: fixed; bottom-right`, appears after ~200px scroll, hides while panel open, respects `prefers-reduced-motion`. Label "Let's talk" + icon. Mobile: circular icon button.
- `LetsTalkPanel.jsx` — slide-over (desktop right sheet ~420px / mobile bottom sheet full-width). Contents:
  - Heading + one line ("Tell me about your project, or just say hi.")
  - Compact form: name, email, message — **reuse the EmailJS logic + keyword extraction from `ContactPage.jsx`** (extract into a shared `useContactForm` hook or `sendContactMessage()` util so both the panel and `/contact` use it).
  - Direct `mailto:` + LinkedIn link.
  - "Prefer a full page? →" links to `/contact`.
  - Focus trap, `Esc` to close, backdrop click to close, scroll-lock (same pattern as the mobile nav).
- Mount `<LetsTalkButton />` once in `src/App.jsx` (outside `<Routes>`), share open-state via a small context or `useState` lifted to `App`.

**Remove:** `ScarcityBadge` import/use, `urgency.js` scarcity wiring, `/contact` from nav.

---

## 4. Component disposition

| Component | Action |
|---|---|
| `Hero` | **Rewrite** (trim copy, drop urgency line, fewer floating cards) |
| `Navbar` | **Edit** (4 links, wordmark, FAB trigger) |
| `Footer` | **Edit** (2 columns, real socials, "Harun") |
| `CaseStudiesPreview`, `BlogPreview` | **Keep**, restyle headings |
| `SEO`, `Markdown`, `Mermaid`, `ScrollToTop`, `ThemeToggle`, `Breadcrumb` | **Keep as-is** |
| `SectionDivider` | **Keep**, use sparingly |
| `Testimonials` | **Trim** to a small 2–3 quote block (used on About) |
| `FAQ` | **Move** to About (or the FAB panel) |
| `Services`, `ServicesPreview`, `SkillsPreview`, `Skills` | **Delete** components; migrate needed copy into About/Home as plain content |
| `WhoIAm`, `WhyWorkWithMe`, `MyApproach`, `BeforeAfter`, `AiFabricSection` | **Delete** (salvage one or two sentences into About) |
| `MarqueeBanner`, `TrustedBy` | **Delete** |
| `FeaturedVideo` | **Delete** or fold into `/videos` / About |
| `DashboardGalleryPreview` | **Delete** (replace with a text link) |
| `CtaBanner` | **Delete** (replaced by the quiet close line + FAB) |
| `ScarcityBadge` | **Delete** |
| `Projects`, `ProjectModal` | **Verify unused** (not in router) → delete |
| `ServicesPage`, `SkillsPage` | **Delete pages**, add redirects to `/about` |
| `LetsTalkButton`, `LetsTalkPanel` | **New** |

---

## 5. Data & utils

| File | Action |
|---|---|
| `src/data/scarcity.js`, `src/utils/urgency.js` | **Delete** |
| `src/data/services.js` | Keep the array or reduce to a `whatIDo` list; render as prose/tags, not cards |
| `src/data/testimonials.js` | Keep; use 2–3 |
| `src/data/faqs.js` | Keep; render on About |
| `src/data/caseStudies.js`, `blog.js`, `dashboards.js`, `videos.js`, `skills.js` | **Keep** |
| `src/utils/structuredData.js` | Drop `getProfessionalServiceSchema`; keep `getPersonSchema` (jobTitle → "Data Analyst / Power BI Developer"), `getWebSiteSchema`, `getBreadcrumbSchema`, per-post `BlogPosting` |
| `src/utils/theme.js` | Keep; update `theme-color` metas + the `THEME_BOOT` color in `index.html` to `#faf8f4` / `#1a1714` |

---

## 6. Copy rewrite guide (de-salesify)

Search-and-cut these patterns across `src/`:

- "Hire a Power BI Developer", "Book a Free Consultation", "Ready to Get Started?"
- "turns data into **Revenue**", "40–90% faster reporting" as a *sales* hook (fine inside a case study as fact)
- "Free initial consultation · Custom solution tailored to your data · Ongoing support"
- "Usually responds within 24 hours" ("Open to work" is OK — keep subtle)
- "The Person Behind Your Dashboards", "stop guessing and start knowing", "leadership teams actually use"

Replace with first-person, specific, non-promissory voice: *what* you built, *how*, *what you learned*.
One CTA verb: "Let's talk" (never "Book", "Hire", "Get Started").

Page `<title>`s: `Harun — Data Analyst & Power BI / Fabric Developer`; About: `About — Harun`;
drop "Hire a…" titles. `og:site_name` "Pibric" → "Harun". Regenerate `public/sitemap.xml`
(drop `/services`, `/skills`).

---

## 7. Phased execution order

1. **Backup** — branch `backup/pibric-agency` from current state (or tag it); push. This is the "pibric stays as backup".
2. **Branch** `feat/personal-portfolio` off `main`.
3. **Design tokens** — swap `:root` blocks, repoint `brand` ramp, redefine `.text-gradient`, fix `.btn-primary`, update theme-color metas. Visual reskin done, no structure change yet. Commit.
4. **IA** — router (4 routes + redirects), Navbar, Footer, mount `LetsTalkButton` stub. Commit.
5. **Let's Talk** — extract shared contact util, build `LetsTalkPanel`, wire button, remove `ScarcityBadge`/urgency. Commit.
6. **Home** — rebuild `HomePage` to the 6-section list, rewrite `Hero`, delete dead sections. Commit.
7. **About** — rebuild absorbing Services/Skills/FAQ; neutralize stats/CTA. Commit.
8. **Case Studies + Blog** — copy reframe, add Gallery/Videos link-outs. Commit.
9. **Cleanup** — delete unused components/pages/data, run `npm run build`, fix broken imports. Commit.
10. **Copy pass** — full grep for sales phrases, SEO/meta, structured data, sitemap. Commit.
11. **Deploy** (per `dev to build guide.md`): `npm run build` → delete `Clone\harunrhimu.github.io\assets`
    → copy `dist\*` → `git add -A && commit && push origin main` in the Clone repo. Verify live after ~2 min.

---

## 8. Open items

- **Testimonials:** keep 2–3, no urgency badges. *(locked)*
- **Serif display font** for `h1`? Adds warmth, but trendy. Default: no — keep Inter + mono accents.
- **Gallery / Videos:** keep as unlinked-from-nav standalone pages *(recommended)* vs. fully merge into Case Studies vs. delete?
- **"Pibric" logo icon:** drop entirely for a text wordmark, or keep a small mark?
  ans: Wordmark "Harun BI Consultant"
