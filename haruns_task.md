# Harun's Production Readiness Task List
> Portfolio: harunrhimu.github.io | Created: 2026-06-20
> Target: Production-ready within 1–2 months

---

## How to use this file
- Work top to bottom — items are ordered by impact on client trust
- After completing each item, give the content to Claude and say "update the site with this"
- Every batch of updates ends with a build + push (Claude can do that for you)

---

## CRITICAL — Fix before promoting the site anywhere

### 1. OG Image (Shared link preview)
**Why:** When you paste your site link into LinkedIn, WhatsApp, or email, the `og-image.jpg` is what shows up. Right now the file is missing — clients see a blank preview. This is the first impression.

**What to create:**
- Size: 1200 × 630 pixels
- Design: Dark `#0f172a` background, your name "Harun" large, subtitle "Microsoft Fabric Analytics Engineer & Power BI Design Specialist", optionally your photo or a Power BI visual
- Tools: Canva (free), Figma, or PowerPoint → Export as JPG
- File name: `og-image.jpg`

**Where to put it:** Drop the file into `portfolio\public\` folder then tell Claude to rebuild and deploy.

---

### 2. Verify the Contact Form Works
**Why:** EmailJS keys are already in `.env` and wired up. But they were never tested end-to-end on the live site. If the form is broken, every client inquiry is lost silently.

**What to do:**
1. Go to https://harunrhimu.github.io/contact
2. Fill in the form and submit
3. Check your email (harunrhimu@gmail.com) — did you receive the message?
4. If not, log into emailjs.com and check your service/template is active

**No code change needed — just verify it works.**

---

### 3. Real Testimonials
**Why:** The 4 current testimonials (Sarah M., James K., Amina R., David L.) are entirely fictional. A client who Googles the names or company won't find them — instant trust killer.

**File to update:** `portfolio\src\data\testimonials.js`

**What to collect (minimum 2, ideally 4):**
- Copy-paste from your Upwork reviews (Job Success Score reviews)
- Ask past clients via LinkedIn DM for a 2–3 sentence quote
- If you have no reviews yet, leave only 1–2 slots with real quotes rather than 4 fake ones

**Format needed (give to Claude):**
```
Name: [First name + last initial, or full name if they agree]
Role: [Their job title]
Company: [Company name or "Confidential" if they prefer]
Quote: [Their exact words]
Rating: 5
```

---

### 4. CtaBanner — Verify Your Stats
**Why:** The bottom of every page shows "50+ Dashboards Delivered", "20+ Happy Clients", "40% Avg. Time Saved", "100+ Data Sources Unified". If these are inflated, a client who asks about them will catch it.

**File:** `portfolio\src\components\CtaBanner.jsx` (lines 51–55)

**What to do:** Write down your real numbers and tell Claude to update them. If your real numbers are lower (e.g. 10 clients, 25 dashboards), use honest numbers — specific smaller numbers are more credible than round inflated ones.

---

### 5. Case Studies — Replace Demo Data
**Why:** All 5 case studies use fake clients, fake metrics, and placeholder YouTube video IDs (`YOUR_VIDEO_ID_1` etc). A client clicking "See Full Case Study" will read generic stories that match no real project.

**File:** `portfolio\src\data\caseStudies.js`

**Priority order:**
1. Keep 1–2 case studies with real project details (even if anonymized as "E-Commerce Client, Bangladesh")
2. Replace the Unsplash stock photos with your actual dashboard screenshots
3. Replace `YOUR_VIDEO_ID_X` with real YouTube IDs — OR remove the `videoUrl` field entirely if you have no video for that project

**What to give Claude per case study:**
```
Project title: 
Client type: (industry, can be anonymized)
The real challenge they had:
What you built:
3 measurable results (e.g. "Reduced report time from 3 days to 2 hours"):
Tools used:
Screenshot: [attach the file]
YouTube video ID: [the part after ?v= in your YouTube URL, or leave blank]
```

---

## HIGH — Complete within Month 1

### 6. Videos Page — Replace All Placeholder YouTube IDs
**Why:** The Videos page has 6 tutorials all pointing to `youtube.com/watch?v=example1` etc. Clicking any video goes nowhere.

**File:** `portfolio\src\data\videos.js`

**What to give Claude:**
For each of your real YouTube videos:
```
Title:
Short description (1 sentence):
YouTube URL: https://www.youtube.com/watch?v=REAL_ID
Duration: (e.g. 18:24)
Category: (Tutorial / Tips & Tricks / Deep Dive / Microsoft Fabric / etc.)
```

If you have fewer than 6 real videos, tell Claude to reduce the list to only the real ones. 3 real videos beats 6 fake ones.

---

### 7. Featured Video — Confirm or Change
**Why:** The homepage currently features "Web Data to Excel (Power Query)" video (YouTube ID: W_2z0b7Tyvk). This is a real video — good. But confirm it's your best/most impressive work to showcase first.

**File:** `portfolio\src\components\FeaturedVideo.jsx` (line 4–5)

**What to do:** Watch the video and decide — is this the one you want featured? If you have a better one (a Fabric demo, a dashboard walkthrough), give Claude the new YouTube URL.

---

### 8. DP-600 Certification Badge
**Why:** The structured data (Google-readable) already lists your DP-600. But there's no visual badge on the site. Clients scanning your page can't see it.

**What to do:**
1. Download your official Microsoft badge from Credly (credly.com) — it's the verified badge image
2. Also download PL-300 badge if you have it
3. Tell Claude "add a certifications section to the About page with these badge images"

**Files to provide:** The badge PNG/SVG images

---

### 9. Upwork Profile Link
**Why:** Your biggest trust signal as a freelancer is your Upwork Job Success Score. There's no link to it anywhere on the site.

**Where to add it:**
- Footer (alongside LinkedIn/GitHub/YouTube links)
- Contact page info panel
- CtaBanner as a secondary CTA button

**What to give Claude:** Your Upwork profile URL

---

### 10. Real Dashboard Screenshots for Case Studies
**Why:** All case study images currently show generic stock photos from Unsplash (graphs, spreadsheets, data centers). Real Power BI screenshot = instant credibility. Stock photo = instant skepticism.

**What to prepare:**
- Export screenshots from your Power BI Desktop or Service (use Snipping Tool or PrtSc)
- Minimum 1280×800px, clean and sharp
- Remove any client-identifying information if the project is confidential
- Blur or replace sensitive numbers with similar-looking demo values in Power BI before screenshotting

**Tip:** Even 1 real dashboard screenshot on the featured case study transforms the site. Start with just that one.

---

## MEDIUM — Complete within Month 2

### 11. Blog Posts — 4 Missing Articles
**Why:** The blog currently has content but the audit flagged 4 articles as planned but missing. Each blog post is an SEO asset that brings in organic search traffic.

**Planned posts to write:**
- PBIP + GitHub integration (Power BI Projects workflow)
- Power BI Data Modeling Best Practice for AI
- Row Level Security deep dive
- Power BI Report Optimization

**How to work with Claude:** Write a rough draft or bullet-point outline in a chat, then say "turn this into a blog post for my portfolio". Claude will format it to match the blog data structure in `portfolio\src\data\blog.js`.

---

### 12. Olist E-Commerce Case Study
**Why:** The audit flagged this as your "flagship project" — a 4-pillar case study. This type of detailed, real-world case study is the highest-converting portfolio content for getting freelance clients.

**What it should cover:**
- The dataset (Brazilian Olist e-commerce public data)
- What questions you answered
- The Medallion architecture / data model you built
- The Power BI dashboard screenshots
- Key DAX measures or Fabric components used
- What a real client would learn from hiring you based on this

**Start by:** Telling Claude "I want to add the Olist case study, here's what I built: [describe your work]" — Claude will build the data structure and UI for it.

---

### 13. Embedded Public Power BI Report
**Why:** The audit's highest-impact trust signal. Nothing closes a client faster than letting them interact with a live dashboard you built — even on public demo data.

**How to do it:**
1. Build a clean demo dashboard in Power BI Desktop using public data (Olist, AdventureWorks, or any Kaggle dataset)
2. Publish it to Power BI Service
3. Use "Publish to Web" to get an embed URL
4. Give Claude the embed URL — they'll add an interactive section to your site

---

### 14. Google Analytics (Track Visitors)
**Why:** Once the site is promoted, you want to know which pages clients visit, where they drop off, and which blog posts bring traffic.

**What to do:**
1. Create a free Google Analytics 4 account at analytics.google.com
2. Create a property for harunrhimu.github.io
3. Copy the Measurement ID (format: G-XXXXXXXXXX)
4. Give it to Claude — they'll add the GA4 script to `index.html`

---

## LOW — Nice to have, not blocking launch

### 15. Fabric End-to-End Showcase
A dedicated page or case study showing: raw data → Fabric Lakehouse → Dataflow Gen2 → Direct Lake semantic model → Power BI dashboard. The full pipeline in one visual. Very powerful for Fabric-specific clients.

### 16. LinkedIn Recommendations Count
If you have recommendations on LinkedIn, add a small social proof line somewhere (e.g. "4.9★ on LinkedIn · 12 recommendations") with a link to your profile.

### 17. Before & After Dashboard Gallery
Real screenshots: "Client's old Excel report" vs "New Power BI dashboard I built". The BeforeAfter section on the homepage is currently text only — real images would make it far more impactful.

---

## Quick Reference — Files Claude Will Edit Per Task

| Your Task | File Claude Edits |
|-----------|------------------|
| Testimonials | `portfolio\src\data\testimonials.js` |
| Case studies content | `portfolio\src\data\caseStudies.js` |
| Videos | `portfolio\src\data\videos.js` |
| Featured video | `portfolio\src\components\FeaturedVideo.jsx` |
| CtaBanner stats | `portfolio\src\components\CtaBanner.jsx` |
| Upwork/footer links | `portfolio\src\components\Footer.jsx` |
| Blog posts | `portfolio\src\data\blog.js` |
| GA4 script | `portfolio\index.html` |
| OG image | Drop file in `portfolio\public\`, Claude rebuilds |
| Dashboard screenshots | Drop files in `portfolio\public\`, Claude updates case studies |

---

## Deploy Checklist (every time you update content)

After giving Claude new content and it edits the files, say:
> "Build and deploy to GitHub Pages"

Claude will run:
1. `npm run build` in `portfolio\`
2. Copy `dist\` → `Clone\harunrhimu.github.io\`
3. `git add . && git commit && git push` from `Clone\harunrhimu.github.io\`

---

*Last updated: 2026-06-20*
