# Portfolio Launch Readiness Checklist

> **Last audited:** March 6, 2026
> **Total placeholders found:** 39 across 10 source files
> **Status:** NOT ready for launch — complete all items in Section 1-4 first

---

## 1. LAUNCH BLOCKERS (Site will look broken without these)

### 1.1 Contact Form — Completely Non-Functional

The contact form uses EmailJS but all credentials are placeholders. Every form submission will silently fail.

**What you need to do:** Go to [https://www.emailjs.com](https://www.emailjs.com), create a free account, set up a service (Gmail/Outlook), create an email template, then copy your 3 keys.

- [ ] **EmailJS Service ID**
  - `src/components/Contact.jsx` → Line 5 → currently `'YOUR_SERVICE_ID'`
  - `src/pages/ContactPage.jsx` → Line 9 → currently `'YOUR_SERVICE_ID'`
  - Replace both with your real EmailJS Service ID (e.g. `'service_abc123'`)

- [ ] **EmailJS Template ID**
  - `src/components/Contact.jsx` → Line 6 → currently `'YOUR_TEMPLATE_ID'`
  - `src/pages/ContactPage.jsx` → Line 10 → currently `'YOUR_TEMPLATE_ID'`
  - Replace both with your real EmailJS Template ID (e.g. `'template_xyz789'`)

- [ ] **EmailJS Public Key**
  - `src/components/Contact.jsx` → Line 7 → currently `'YOUR_PUBLIC_KEY'`
  - `src/pages/ContactPage.jsx` → Line 11 → currently `'YOUR_PUBLIC_KEY'`
  - Replace both with your real EmailJS Public Key (e.g. `'pk_AbCdEfG'`)

---

### 1.2 Contact Info — Shows Dummy Email & LinkedIn

Visitors will see `your.email@example.com` and `linkedin.com/in/yourprofile` on your contact page.

- [ ] **Email address** — Replace with your real email in ALL 3 files:
  - `src/components/Contact.jsx` → Line 67 → `value: 'your.email@example.com'` and `href: 'mailto:your.email@example.com'`
  - `src/pages/ContactPage.jsx` → Line 85 → `value: 'your.email@example.com'`
  - `src/pages/ContactPage.jsx` → Line 86 → `href: 'mailto:your.email@example.com'`
  - `src/components/Footer.jsx` → Line 85 → `'your.email@example.com'`

- [ ] **LinkedIn URL** — Replace with `https://www.linkedin.com/in/harunrhimu/` in:
  - `src/components/Contact.jsx` → Line 68 → `value: 'linkedin.com/in/yourprofile'` and `href: '#'`
  - `src/pages/ContactPage.jsx` → Line 91 → `value: 'linkedin.com/in/yourprofile'`

---

### 1.3 Footer Social Links — All Dead (#)

The footer has LinkedIn, GitHub, and YouTube icons but they all link to `#` (nowhere). Your Hero section already has the correct URLs — the footer just wasn't updated.

- [ ] **Footer social links** — Update all 3 links in:
  - `src/components/Footer.jsx` → Line 32 → all three `href="#"` icons
  - Replace with:
    - LinkedIn: `https://www.linkedin.com/in/harunrhimu/`
    - GitHub: `https://github.com/harunrhimu`
    - YouTube: `https://www.youtube.com/@harunrhimu`

---

### 1.4 Work Experience — Shows "Your Company Name"

The About page work experience timeline will literally display "Your Company Name", "Previous Company", and "First Company".

- [ ] **Current role company name**
  - `src/data/skills.js` → Line 40 → `company: 'Your Company Name'`
  - `src/components/Experience.jsx` → Line 4 → `company: 'Your Company Name'`
  - Replace with your actual current employer (e.g. `'Data Crafters'`)

- [ ] **Previous role company name**
  - `src/data/skills.js` → Line 56 → `company: 'Previous Company'`
  - `src/components/Experience.jsx` → Line 18 → `company: 'Previous Company'`
  - Replace with your real previous employer name

- [ ] **First role company name**
  - `src/data/skills.js` → Line 70 → `company: 'First Company'`
  - `src/components/Experience.jsx` → Line 32 → `company: 'First Company'`
  - Replace with your real first employer name

---

### 1.5 Education — Shows "Your University Name"

- [ ] **University name**
  - `src/data/skills.js` → Line 87 → `institution: 'Your University Name'`
  - `src/components/Experience.jsx` → Line 49 → `institution: 'Your University Name'`
  - Replace with your actual university/institution name

---

### 1.6 YouTube Channel Link on Videos Page — Wrong Handle

- [ ] **Channel URL**
  - `src/pages/VideosPage.jsx` → Line 36 → `href="https://www.youtube.com/@yourchannel"`
  - Replace with `https://www.youtube.com/@harunrhimu`

---

## 2. VIDEOS YOU NEED TO RECORD

These are the biggest content gap. Every video section on the site currently shows a **broken black iframe** because the YouTube IDs are placeholders. You need to actually create and upload these videos.

### 2.1 Homepage Featured Video (1 video)

**What to record:** A flagship "Building a Sales Dashboard from Scratch in Power BI" screen recording. Show a real project from data import → modeling → DAX → final dashboard.

- [ ] Record and upload to YouTube
- [ ] Copy the video ID from the YouTube URL (the part after `v=`)
- [ ] Update: `src/components/FeaturedVideo.jsx` → Line 4
  - Currently: `'https://www.youtube.com/embed/YOUR_VIDEO_ID'`
  - Replace `YOUR_VIDEO_ID` with your real video ID (e.g. `'https://www.youtube.com/embed/dQw4w9WgXcQ'`)

---

### 2.2 Case Study Walkthrough Videos (5 videos)

Each case study detail page has an embedded video section. You need to record a screen walkthrough of each dashboard/solution.

- [ ] **Video 1 — Sales Performance Dashboard walkthrough**
  - Record: Show the real Power BI sales dashboard with filters, drill-downs, KPIs
  - Update: `src/data/caseStudies.js` → Line 24 → `'https://www.youtube.com/embed/YOUR_VIDEO_ID_1'`

- [ ] **Video 2 — HR Analytics Dashboard walkthrough**
  - Record: Show employee turnover analysis, attrition metrics, department breakdowns
  - Update: `src/data/caseStudies.js` → Line 48 → `'https://www.youtube.com/embed/YOUR_VIDEO_ID_2'`

- [ ] **Video 3 — Financial Reporting Suite walkthrough**
  - Record: Show P&L, balance sheet, cash flow dashboards with automated refresh
  - Update: `src/data/caseStudies.js` → Line 72 → `'https://www.youtube.com/embed/YOUR_VIDEO_ID_3'`

- [ ] **Video 4 — Supply Chain Visibility Dashboard walkthrough**
  - Record: Show inventory tracking, logistics KPIs, supplier performance
  - Update: `src/data/caseStudies.js` → Line 96 → `'https://www.youtube.com/embed/YOUR_VIDEO_ID_4'`

- [ ] **Video 5 — Customer Segmentation Analysis walkthrough**
  - Record: Show RFM analysis, customer clustering, marketing ROI visuals
  - Update: `src/data/caseStudies.js` → Line 120 → `'https://www.youtube.com/embed/YOUR_VIDEO_ID_5'`

---

### 2.3 YouTube Channel Videos (6 videos)

The Videos page and VideoShowcase component display 6 tutorial videos. All URLs are `example1` through `example6`.

**All in file:** `src/data/videos.js`

- [ ] **Video: "Power BI DAX Masterclass"** → Line 6 → replace `'https://www.youtube.com/watch?v=example1'` with real URL. Also replace the Unsplash thumbnail on Line 7 with YouTube auto-thumbnail: `https://img.youtube.com/vi/YOUR_REAL_ID/hqdefault.jpg`

- [ ] **Video: "Microsoft Fabric End-to-End"** → Line 14 → replace `example2`. This one requires you to **learn and build a real Fabric end-to-end pipeline first** (Lakehouse → Dataflow Gen2 → Notebook → Semantic Model → Power BI Report), then record the walkthrough.

- [ ] **Video: "Python + Power BI Integration"** → Line 22 → replace `example3`

- [ ] **Video: "Dashboard Design Principles"** → Line 30 → replace `example4`

- [ ] **Video: "Row-Level Security Deep Dive"** → Line 38 → replace `example5`

- [ ] **Video: "Data Modeling Best Practices"** → Line 46 → replace `example6`

> **Tip:** After uploading each video to YouTube, the thumbnail URL is automatically available at:
> `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
> Replace the Unsplash stock image URLs in `videos.js` with these.

---

## 3. CONTENT YOU NEED TO CREATE / RESEARCH

### 3.1 Blog Posts — Need Unique Angles & Real Screenshots

The 6 blog posts have well-written text but use generic Unsplash stock photos. To stand out from competitors:

**All images in:** `src/data/blog.js`

- [ ] **Blog 1: "DAX Patterns"** — Replace stock image (Line ~8) with a screenshot of your actual DAX formula + result in Power BI Desktop
- [ ] **Blog 2: "Python + Azure Data Pipeline"** — Replace stock image with a screenshot of your real Azure Data Factory pipeline or Python notebook
- [ ] **Blog 3: "Dashboard Storytelling"** — Replace stock image with a before/after of a real dashboard you redesigned
- [ ] **Blog 4: "Microsoft Fabric Intro"** — Replace stock image with a screenshot of your Fabric workspace (requires you to **set up and use a real Fabric trial/environment first**)
- [ ] **Blog 5: "Power Query Tips"** — Replace stock image with Power Query Editor showing a real transformation
- [ ] **Blog 6: "Row-Level Security"** — Replace stock image with RLS setup dialog or test-as-role view

**Competitor research to do:**
- [ ] Research what top Power BI bloggers (SQLBI, Curbal, Guy in a Cube) are NOT covering well
- [ ] Identify 3-5 unique MVP blog angles where you can provide value others don't (e.g., Fabric for small businesses, Bangla-language data challenges, budget-friendly BI for startups)
- [ ] Plan your next 5 blog posts based on gaps you find

---

### 3.2 Microsoft Fabric — Learn & Build Before You Demo

Your site has an entire "AI Fabric Section" and a case study mentions Fabric, but you need real hands-on experience to back it up.

- [ ] **Get a Fabric trial** — Sign up at [https://www.microsoft.com/en-us/microsoft-fabric](https://www.microsoft.com/en-us/microsoft-fabric)
- [ ] **Build an end-to-end Fabric solution** — Lakehouse → Dataflow Gen2 → Notebook → Semantic Model → Power BI Report
- [ ] **Learn these Fabric components specifically:**
  - [ ] Data Factory (Dataflow Gen2 & Data Pipelines)
  - [ ] Synapse Data Engineering (Notebooks, Spark)
  - [ ] Synapse Data Warehouse (T-SQL endpoint)
  - [ ] Real-Time Intelligence (KQL, Eventstreams)
  - [ ] OneLake (unified data lake)
- [ ] **Record yourself using each component** — These become your YouTube videos (Section 2.3) and case study evidence

---

### 3.3 Case Studies — Replace Stock Photos with Real Dashboard Screenshots

**All images in:** `src/data/caseStudies.js`

- [ ] **Case Study 1 image** (Line ~9) — Replace Unsplash photo with actual Sales Dashboard screenshot
- [ ] **Case Study 2 image** (Line ~33) — Replace with actual HR Analytics Dashboard screenshot
- [ ] **Case Study 3 image** (Line ~57) — Replace with actual Financial Reporting screenshot
- [ ] **Case Study 4 image** (Line ~81) — Replace with actual Supply Chain Dashboard screenshot
- [ ] **Case Study 5 image** (Line ~105) — Replace with actual Customer Segmentation screenshot

> **Tip:** If client dashboards are confidential, create sample/demo versions with anonymized data that look similar. Host screenshots in `/public/images/` or on a CDN.

---

## 4. ASSETS TO PREPARE

### 4.1 OG Image (Social Share Preview) — MISSING FILE

When anyone shares your site on LinkedIn, Facebook, Twitter, or Slack, they'll see a **broken image** because `og-image.jpg` doesn't exist.

- [ ] **Create an OG image** (1200x630px recommended)
  - Design a professional card with your name, title "Power BI Developer & Fabric Engineer", and your photo
  - Save as `public/og-image.jpg`
  - Referenced in: `index.html` → Line 21 and `src/components/SEO.jsx` → Line 5

---

### 4.2 Resume / CV PDF — Dead Download Button

- [ ] **Upload your resume PDF**
  - `src/components/Experience.jsx` → Line 173 → `href="#"` (Download Resume button goes nowhere)
  - Save your CV as `public/resume.pdf` and update the href to `/resume.pdf`

---

## 5. TESTIMONIALS — Credibility Check

The 4 testimonials use generic names (Sarah M., James K.) with generic company names matching the case studies exactly. This could hurt credibility.

**File:** `src/data/testimonials.js` (referenced by `src/components/Testimonials.jsx`)

- [ ] **Option A:** Get real testimonials from actual clients (even LinkedIn recommendations copy-pasted with permission)
- [ ] **Option B:** If clients want anonymity, at least vary the company descriptors so they don't perfectly mirror your case study names
- [ ] **Option C:** Remove the testimonials section entirely until you have real ones (more honest, less risky)

---

## 6. NICE-TO-HAVE (Not blocking launch, but should fix soon)

### 6.1 Stats Inconsistency

Your stats numbers differ across pages:
- Hero says "50+ PBI Reports" | About section says "50+ Dashboards" | CtaBanner says "50+ Dashboards"
- These should all use the same accurate number

- [ ] Decide on real numbers and update:
  - `src/components/Hero.jsx` (stats section, hardcoded)
  - `src/components/About.jsx` (stats section, hardcoded)
  - `src/components/CtaBanner.jsx` (stats section, hardcoded)

### 6.2 Remove Dead Code (Optional Cleanup)

These components are not used anywhere in the app:
- [ ] `src/components/Blog.jsx` — Legacy blog component, replaced by `BlogPreview.jsx`
- [ ] `src/components/ProjectModal.jsx` — Old modal, data schema doesn't match current case studies

### 6.3 Scarcity Message is Hardcoded

- [ ] `src/components/CtaBanner.jsx` → "Currently accepting only 2 new clients this quarter"
  - This will always say "2 new clients" even if outdated — remember to update it periodically

---

## Quick Reference: All Placeholder Locations

| What | File | Line(s) |
|------|------|---------|
| EmailJS Service ID | `src/components/Contact.jsx` | 5 |
| EmailJS Template ID | `src/components/Contact.jsx` | 6 |
| EmailJS Public Key | `src/components/Contact.jsx` | 7 |
| EmailJS Service ID | `src/pages/ContactPage.jsx` | 9 |
| EmailJS Template ID | `src/pages/ContactPage.jsx` | 10 |
| EmailJS Public Key | `src/pages/ContactPage.jsx` | 11 |
| Featured Video URL | `src/components/FeaturedVideo.jsx` | 4 |
| Case Study Video 1-5 | `src/data/caseStudies.js` | 24, 48, 72, 96, 120 |
| YouTube Videos 1-6 | `src/data/videos.js` | 6, 14, 22, 30, 38, 46 |
| Company Names (x3) | `src/data/skills.js` | 40, 56, 70 |
| Company Names (x3) | `src/components/Experience.jsx` | 4, 18, 32 |
| University Name | `src/data/skills.js` | 87 |
| University Name | `src/components/Experience.jsx` | 49 |
| Email (placeholder) | `src/components/Contact.jsx` | 67 |
| Email (placeholder) | `src/pages/ContactPage.jsx` | 85-86 |
| Email (placeholder) | `src/components/Footer.jsx` | 85 |
| LinkedIn (placeholder) | `src/components/Contact.jsx` | 68 |
| LinkedIn (placeholder) | `src/pages/ContactPage.jsx` | 91 |
| Footer social links | `src/components/Footer.jsx` | 32 |
| YouTube channel URL | `src/pages/VideosPage.jsx` | 36 |
| Resume download link | `src/components/Experience.jsx` | 173 |
| OG Image (missing file) | `public/og-image.jpg` | N/A (file doesn't exist) |

---

## Priority Order for Launch

1. **Do first (30 min):** Fill in company names, university, email, LinkedIn, footer links, YouTube channel URL — these are just text replacements
2. **Do second (1 hour):** Set up EmailJS account and replace the 6 credential placeholders
3. **Do third (1 hour):** Create and add `og-image.jpg` and `resume.pdf` to `/public/`
4. **Do fourth (1-2 weeks):** Record your first 2-3 YouTube videos (start with the Featured Video and 1-2 case study walkthroughs)
5. **Do fifth (ongoing):** Replace all stock photos with real screenshots, research blog angles, learn Fabric end-to-end
6. **Do last (ongoing):** Get real testimonials, add more blog posts, record remaining videos
