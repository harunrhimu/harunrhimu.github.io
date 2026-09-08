# Offer Build Status — Ready / Missing / Untouched

Companion tracker to [offer-audit-100m-offers.md](offer-audit-100m-offers.md). That file has the full reasoning; this file is a quick-scan status board for handing implementation work to a coding session. Three buckets: **ready to build now**, **decided in principle but not finalized**, and **not touched at all yet** (checked against the book's own 11-point checklist).

---

## A. Ready to implement now

Confirmed decisions with a real target file and a clear change. Safe to hand to a coding session as-is.

1. **Stat fix** — [Hero.jsx:120](portfolio/src/components/Hero.jsx#L120) `25+` → `35+`; [CtaBanner.jsx:51](portfolio/src/components/CtaBanner.jsx#L51) `50+` → `35+` (align wording to "reports")
2. **Surface certifications** — [Hero.jsx:42](portfolio/src/components/Hero.jsx#L42): move PL-300/DP-600 out of the `sr-only` span into a visible badge
3. **Niche repositioning** — [Hero.jsx:4](portfolio/src/components/Hero.jsx#L4) role rotator → "Power BI & Fabric for E-Commerce Sales Teams" (+ supporting line for Inventory/Procurement/Rebate); [Hero.jsx:52-55](portfolio/src/components/Hero.jsx#L52-L55) description sharpened toward confirmed Dream Outcome ("single source of truth," "answers in seconds"); add explicit Effort & Sacrifice line ("You share access to your data — I handle the rest, no DAX/Power Query needed on your end")
4. **Flagship offer** — add "4-Week E-Commerce Sales Intelligence on Power BI & Fabric" as a named, featured package leading [ServicesPage.jsx](portfolio/src/pages/ServicesPage.jsx); reframe the 7 [services.js](portfolio/src/data/services.js) categories as supporting capabilities, not co-equal tiles
5. **Guarantee** — add "The 4-Week Live Guarantee" ("If your dashboard isn't live and adopted by your team within 4 weeks, I keep working for free until it is") to [CtaBanner.jsx](portfolio/src/components/CtaBanner.jsx) and ServicesPage.jsx
6. **Scarcity repetition** — repeat "Currently accepting only 2 new clients this quarter" on ServicesPage and [ContactPage.jsx](portfolio/src/pages/ContactPage.jsx), from one shared source
7. **Timeline claim** — update [faqs.js:4](portfolio/src/data/faqs.js#L4) and Hero/CTA copy to "Live dashboard by week 3, full handover by week 4" consistently
8. **One confirmed bonus** — add "Handover Confidence Kit" (~$400–600 value) as a visible named bonus
9. **Urgency mechanic** — add *"Next quarter's client slots open [Month]. Booking now secures this quarter's remaining spot."* to CtaBanner, ServicesPage, and ContactPage, next to the scarcity line. **Build `[Month]` as a computed value, not hardcoded text** — small JS utility that derives the next quarter's start month from the current date (logic + code sample in §5 of the audit doc), so it never goes stale. The "2 clients" capacity number stays manual (real business fact); only the month auto-updates.

~~Real case study~~ — **removed (2026-07-29):** the 90%→30% Fabric capacity story was work done under Harun's current company, not a personal/freelance engagement — not suitable for a personal-portfolio case study (ownership, not just disclosure-wording). Dropped entirely, not anonymized/reworded. See §8 of the audit doc.

---

## B. Decided in principle, not yet finalized (don't build these until closed)

| Item | Status | What's missing |
|---|---|---|
| Bonus stack | 1 of 3 confirmed | Book confirmed to need no fixed count — one bonus per distinct objection is the rule, so the stack tops out at 3 real candidates (no 4th needed). "2-Week Safety Net" and "Excel-to-Dashboard Automation" still need final go-ahead on the *name*; "48-Hour Proposal Guarantee" is no longer part of this stack at all — recategorized as a guarantee-adjacent trust line instead (no dollar value) |

**Resolved this round (2026-07-29) — moved out of this table:**
- **Testimonials.js** — Harun's decision: keep as-is, no changes. Closed.
- **Real case study / disclosure question** — moot: the case study itself was dropped (employer-owned work, not personal-portfolio-suitable), so there's no disclosure question left to resolve. Closed.
- **Urgency mechanic** — accepted, moved to Section A (item 9) with an auto-compute implementation note. Closed.

---

## C. Not touched in discussion at all (per the book's own checklist)

Straight from the "$100M Offers" execution checklist (§15 of the tactics summary) — these are real gaps in the *offer design process itself*, not just missing copy. You said you're handling pricing, problems/solutions listing, and trim & stack separately — this section spells out exactly what those cover plus a couple of smaller untouched items so nothing gets lost.

1. **Pricing ("Charge What It's Worth")** — no price band, no anchor decision exists yet anywhere in the discussion. Blocks: finalizing bonus dollar values, building the Trim & Stack "total value" figure, and giving the guarantee real financial weight.
2. **Problems & Solutions listing** — the book's actual exercise (list every friction point an e-commerce sales prospect has "in insane detail," convert each into a named "How to ___" solution) has never been run for this niche. [WhyWorkWithMe.jsx](portfolio/src/components/WhyWorkWithMe.jsx)'s existing 3 items predate the niche decision and aren't niche-specific or exhaustive.
3. **Trim & Stack (the bundle + "total value" figure)** — no "Total value: $X — yours for $Y" bundle has been built; can't be finalized until pricing (#1) is set.
4. **Market validation against the book's 4 indicators** — the niche (E-Commerce Sales Analytics) was picked based on real project history, but was never explicitly checked one-by-one against the book's own test: Massive Pain, Purchasing Power, Easy to Target, Growing Market. Worth a quick pass once you're back to offer-design work — likely passes easily, but hasn't been formally confirmed.
5. **Delivery-vehicle brainstorm ("Product Delivery Cheat Codes")** — the book's exercise for varying level of attention (1:1 vs. group), DIY vs. done-for-you, response-speed commitments, etc. was never run — the flagship's exact delivery mechanics (how many check-ins, what medium, what response-time standard beyond the 48-hour proposal turnaround) are still undefined.
6. **Offer-fatigue refresh plan** — no plan yet for how the flagship name/wrapper gets refreshed over time if response rates fade (book's naming chapter covers a specific cheapest-first fix order: creative → copy → name → duration → discount → pricing structure).
7. **Partner/affiliate bonuses** — the book suggests negotiating free/discounted services from complementary (non-competing) businesses to add to the bonus stack; never discussed as an option here.
8. **Guarantee alternatives** — only the Conditional/Service guarantee type was decided; the book's other three types (Unconditional, Anti-Guarantee, Implied/performance-based) were never compared against it, so it's worth knowing this was a choice, not the only option, if circumstances change later.

---

## How to use this with a coding session

Hand **Section A** to Claude as the implementation task — it's fully decided and file-specific. Do not hand Section B or C items to a coding session yet; they need decisions made first (in this conversation or the separate pricing/problems/trim-and-stack work you're doing), or you'll end up with half-finished copy live on the site.
