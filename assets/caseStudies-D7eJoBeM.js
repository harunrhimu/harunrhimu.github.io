const e=`# From Snowflake to Star: Re-Architecting a Power BI Model on the Brazilian E-Commerce (Olist) Dataset

> **A data modeling case study** — how I rebuilt a tangled Power BI model into a clean, query-efficient **star schema** using a header/detail (order vs. order-line) design, and resolved the grain mismatches that make multi-table e-commerce data tricky.

**Stack:** Power BI Desktop · Power Query (M) · DAX · Dimensional Modeling

**Dataset:** Olist Brazilian E-Commerce (~100K orders, 9 source CSVs)

**Skills shown:** dimensional modeling, grain analysis, snowflake→star conversion, header/detail patterns, Power Query transformation

---

## 1. The Brief

The starting model had been built largely on **auto-detect relationships and auto-generated tables**. It "worked" in the sense that visuals rendered, but under the hood it was a mix of **snowflake** branches, **auto date/time** clutter, **fact-to-fact** relationships, and **redundant fact tables** at different grains.

The goal: turn it into a model worth shipping — a **proper star schema** that is easy to understand, fast to query, and safe from double-counting — and document the reasoning so it can stand as a portfolio case study.

---

## 2. The Dataset

Olist publishes a realistic snapshot of a Brazilian marketplace as 9 CSVs:

| File | Grain | Role |
|---|---|---|
| \`orders_dataset.csv\` | 1 row / order | Order header |
| \`order_items_dataset.csv\` | 1 row / order line | Order detail (the money) |
| \`order_payments_dataset.csv\` | 1 row / payment line | Payments (split payments allowed) |
| \`order_reviews_dataset.csv\` | ~1 row / order | Customer reviews |
| \`customers_dataset.csv\` | 1 row / customer key | Customer dimension |
| \`products_dataset.csv\` | 1 row / product | Product dimension |
| \`sellers_dataset.csv\` | 1 row / seller | Seller dimension |
| \`product_category_name_translation.csv\` | lookup | PT→EN category names |
| \`geolocation_dataset.csv\` | ~1M rows | Lat/long by zip prefix |

The interesting modeling tension is right there in the first four files: **four candidate "fact" tables at three different grains**, plus lookups that invite snowflaking.

---

## 3. Starting Point — What Was Wrong

Here's the original model (simplified):

\`\`\`mermaid
graph TD
    subgraph "Auto date/time clutter"
      LDT1[LocalDateTable_*]:::junk
      LDT2[LocalDateTable_*]:::junk
      LDT3[DateTableTemplate_*]:::junk
    end
    DPC[Dim Product Category]:::snow --> DP[Dim Product]
    DG[Dim Geography]:::snow --> DC[Dim Customer]
    DG --> DS[Dim Seller]
    FOI[Fact Orders Items] -->|fact-to-fact| FO[Fact Order]
    FOP[Fact Order Payment] -->|fact-to-fact| FO
    FRV[Dim Review ?] -->|fact-to-fact| FO
    FO --> DC
    FO -.bi-directional.-> DC
    classDef junk fill:#fde,stroke:#c66;
    classDef snow fill:#eef,stroke:#66c;
\`\`\`

### Problems identified

| # | Problem | Why it's a problem |
|---|---|---|
| P1 | **Auto date/time enabled** — 8+ hidden \`LocalDateTable_*\` / \`DateTableTemplate_*\` tables | Model bloat, no shared/conformed calendar, no control over date logic |
| P2 | **Snowflake: \`Dim Product Category\`** hanging off \`Dim Product\` | Extra hop, slower filters, harder to read |
| P3 | **Snowflake: \`Dim Geography\`** shared by Customer & Seller | Extra hop + ambiguity risk |
| P4 | **Fact-to-fact relationships** — Items, Payment, Review all pointing at \`Fact Order\` | Power BI anti-pattern; fragile filter propagation, ambiguity, hard to reason about |
| P5 | **Four fact tables at three grains** (order / line / payment / review) | Over-fragmented; invites double-counting and confusing joins |
| P6 | **Bi-directional cross-filter** on the Order→Customer relationship | Ambiguity and potential circular filter paths |
| P7 | **A "review" table mislabeled** and date fields not modeled for time intelligence | Inconsistent naming, no usable date keys |

The diagnosis in one line: **this was a snowflake/galaxy hybrid pretending to be a star.**

---

## 4. Target Architecture

The destination is a **star schema built around a header/detail pattern**. The key insight that makes it a *clean* star instead of a fact-to-fact mess:

> **An order header is at "one row per order" — which is exactly the grain of a dimension.** So the header isn't a fact at all. Promote it to **\`Dim Order\`**.

\`\`\`mermaid
erDiagram
    "Dim Date"        ||--o{ "Fact Orders Items" : "Order Purchase Date"
    "Dim Customer"    ||--o{ "Fact Orders Items" : customer_id
    "Dim Product"     ||--o{ "Fact Orders Items" : product_id
    "Dim Seller"      ||--o{ "Fact Orders Items" : seller_id
    "Dim Order"       ||--o{ "Fact Orders Items" : order_id
\`\`\`

- **One fact:** \`Fact Orders Items\` (grain = order line).
- **Five dimensions:** \`Dim Date\`, \`Dim Customer\`, \`Dim Product\`, \`Dim Seller\`, \`Dim Order\`.
- **All relationships are dim → fact (one-to-many, single direction).** Zero fact-to-fact. Zero snowflake.

---

## 5. The Conversion — Problem by Problem

### P1 — Replace auto date/time with a real \`Dim Date\`

**Strategy:** Turned off auto date/time, removed every \`LocalDateTable_*\` and \`DateTableTemplate_*\`, and authored a single conformed calendar in Power Query covering the data window (2016–2018):

\`\`\`m
let
    Source = List.Dates(#date(2016,1,1), Duration.Days(#date(2018,12,31) - #date(2016,1,1)) + 1, #duration(1,0,0,0)),
    ToTable = Table.FromList(Source, Splitter.SplitByNothing(), {"Date"}, null, ExtraValues.Error),
    Typed = Table.TransformColumnTypes(ToTable, {{"Date", type date}}),
    Cols = Table.AddColumn(Typed, "Year", each Date.Year([Date]), Int64.Type),
    // + MonthNo, Month, YearMonth, Quarter, DayOfWeek ...
in
    Cols
\`\`\`

Then **Mark as Date Table** on \`Dim Date[Date]\` so DAX time intelligence is reliable. Result: one calendar shared by every date role instead of dozens of hidden tables.

### P2 — De-snowflake the product category

**Strategy:** Folded the PT→EN translation directly into \`Dim Product\` with a merge inside the same query, adding a single \`product_category_name_english\` column. The standalone \`Dim Product Category\` table was removed.

\`\`\`m
// inside Dim Product — both files come from the SAME folder source
Merged   = Table.NestedJoin(Products, {"product_category_name"}, Translation, {"product_category_name"}, "T", JoinKind.LeftOuter),
Expanded = Table.ExpandTableColumn(Merged, "T", {"product_category_name_english"})
\`\`\`

### P3 — Flatten geography

\`Dim Geography\` was removed. City and State already live on \`Dim Customer\` and \`Dim Seller\`, so the extra snowflake hop bought nothing — flattening it simplified the model with no loss of analytical detail.

### P4 + P5 — Consolidate the extra facts, then resolve header/detail

This was the heart of the project, done in two moves.

**Move 1 — Collapse Payment & Review into the order header.**
Payments and reviews are *attributes of an order*, not independent fact grains. But each sits at a different grain than the order, so they can't be joined 1:1:

- **Payments** are *finer* than orders (split payments → multiple rows per order). I **aggregated to order grain**: \`Payment Value\` (sum), \`Payment Installments\` (max), \`Payment Count\` (row count), \`Payment Type\` (the primary / lowest-sequential method).
- **Reviews** are *~1:1 but with duplicates*. I **deduplicated to the latest review per order** before joining.

\`\`\`m
PaymentsAgg = Table.Group(Payments, {"order_id"}, {
    {"Payment Value", each List.Sum([payment_value]), type number},
    {"Payment Installments", each List.Max([payment_installments]), Int64.Type},
    {"Payment Count", each Table.RowCount(_), Int64.Type},
    {"Payment Type", each let s = Table.Sort(_, {{"payment_sequential", Order.Ascending}}) in try s{0}[payment_type] otherwise null, type text}
})
\`\`\`

**Move 2 — Promote the header to a dimension.**
With payments and reviews absorbed, the order "header fact" was now purely descriptive at one-row-per-order. I **renamed \`Fact Order\` → \`Dim Order\`**, and made \`Fact Orders Items\` the single fact. To keep it a *pure* star (not a snowflake), I **carried the foreign keys down** to the line grain — \`customer_id\` and \`Order Purchase Date\` — so the fact joins straight to \`Dim Customer\` and \`Dim Date\`:

\`\`\`m
// inside Fact Orders Items — pull header keys down onto each line
JoinOrders   = Table.NestedJoin(Items, {"order_id"}, OrderKeys, {"order_id"}, "Ord", JoinKind.LeftOuter),
ExpandOrders = Table.ExpandTableColumn(JoinOrders, "Ord", {"customer_id", "order_purchase_timestamp"})
\`\`\`

This single decision eliminated **all three fact-to-fact relationships** at once. The old \`Items → Order\` arrow didn't disappear — it became a clean \`Dim Order → Fact\` dimension link.

### P6 — Remove bi-directional filtering

Set the Order/Customer relationship back to **single direction** (dim → fact). Bi-directional cross-filter was removed to kill ambiguity; where a reverse count is genuinely needed (e.g. distinct customers in a period) it's handled explicitly in DAX instead of bending the relationship.

### P7 — Consistent naming + date roles

Standardized table names (\`Dim *\` / \`Fact *\`), added explicit \`Date\`-typed key columns (\`Order Purchase Date\`, \`Shipping Limit Date\`, etc.) derived via \`Date.From(...)\`, and wired the primary one as the **active** relationship to \`Dim Date\` (secondary date roles kept as inactive relationships for \`USERELATIONSHIP\`).

---

## 6. Grain Investigation — "Is the data incomplete?"

Before merging the two order tables, the counts didn't line up and it looked like missing data. The right move is to profile the raw files instead of guessing:

| | Rows | Distinct \`order_id\` |
|---|---|---|
| \`orders_dataset\` | 99,441 | 99,441 |
| \`order_items_dataset\` | 112,650 | 98,666 |

Two independent, *legitimate* reasons for the gap:

1. **One order → many lines.** 88,863 orders have a single line; the rest have 2–21 lines, pushing item rows above order rows.
2. **775 orders have no lines at all** — and 767 of them are \`unavailable\` or \`canceled\`. These are **genuinely failed orders**: placed but never fulfilled, so no product, price, or delivery ever existed.

Integrity check: **0 orphan items** (every line maps to a real order). Overall, 96,478 of 99,441 orders are \`delivered\` — a healthy real-world distribution.

**Conclusion: the data is not broken.** The "missing price / missing delivery" rows are the *truth* about cancelled orders, not gaps. This is why the failed orders are **preserved in \`Dim Order\`** (countable via status) even though they correctly have no rows in the sales fact.

---

## 7. Final Model

\`\`\`mermaid
graph TD
    DD["Dim Date"]:::dim
    DC["Dim Customer"]:::dim
    DP["Dim Product"]:::dim
    DS["Dim Seller"]:::dim
    DO["Dim Order"]:::dim
    F["Fact Orders Items<br/>(grain: order line)"]:::fact
    DD --> F
    DC --> F
    DP --> F
    DS --> F
    DO --> F
    classDef dim fill:#e8f0fe,stroke:#3b6;
    classDef fact fill:#fff3cd,stroke:#c93;
\`\`\`

| Table | Type | Grain | Rows |
|---|---|---|---|
| \`Fact Orders Items\` | Fact | order line | 112,650 |
| \`Dim Order\` | Dimension | order | 99,441 (incl. 775 failed) |
| \`Dim Customer\` | Dimension | customer key | — |
| \`Dim Product\` | Dimension | product (category flattened) | — |
| \`Dim Seller\` | Dimension | seller | — |
| \`Dim Date\` | Dimension | day | 2016–2018 |

**Modeling rules encoded in the design:**
- **Line metrics** (\`price\`, \`freight\`) are additive → live on the fact, safe to \`SUM\`.
- **Order metrics** (payment, review, status, delivery) live on \`Dim Order\` at one-row-per-order → aggregate there without double-counting.
- **Order count** = \`DISTINCTCOUNT(order_id)\` on the fact, *or* \`COUNTROWS(Dim Order)\` for all orders incl. failed.

---

## 8. Before vs. After

| Aspect | Before | After |
|---|---|---|
| Schema shape | Snowflake / galaxy hybrid | **Pure star** |
| Tables | 4 facts + snowflaked dims + 8 auto-date tables | **1 fact + 5 dims** |
| Fact-to-fact relationships | 3 | **0** |
| Snowflake hops | 2 (category, geography) | **0** |
| Calendar | Auto date/time clutter | **1 conformed \`Dim Date\`** |
| Bi-directional filters | Yes (ambiguous) | **No** |
| Double-counting risk | High (multi-grain facts) | **Controlled by grain-aware design** |
| Failed orders | Easily lost in joins | **Preserved in \`Dim Order\`** |

---

## 9. Takeaways (the transferable skills)

1. **Grain first.** Every modeling decision — which table is a fact, what to aggregate, where double-counting hides — falls out of nailing the grain.
2. **A "header" is usually a dimension.** Header/detail problems dissolve when you stop treating the header as a fact. This is the clean alternative to fact-to-fact.
3. **Star beats snowflake for BI.** Flatten lookups into their dimension unless there's a compelling reason not to.
4. **Conformed calendar + Mark-as-Date-Table** is non-negotiable for trustworthy time intelligence.
5. **Profile before you "fix."** The 775 "broken" orders weren't broken — they were cancelled. Verify with the raw data.
6. **Document the trade-offs.** A model with one clearly-stated limitation is more professional than one with hidden complexity.

---

*Built with Power BI, Power Query (M), and DAX on the public Olist Brazilian E-Commerce dataset.*
`,t=[{slug:"inventory-optimization-analysis",title:"Inventory Optimization Analysis",client:"Retail Business",industry:"Retail",challenge:"The business held 9.11M units of inventory with a Days Sales of Inventory of 167.54 days and an inventory turnover of only 2.18x per year — far below industry benchmarks. Stock levels at the beginning and end of the year were nearly identical, meaning purchases of $321.90M were not translating into sales velocity, locking $147.76M in idle inventory value.",solution:"Built a Power BI dashboard analysing inventory performance across all store brands, SKUs, and bottle sizes for the full 2016 fiscal year. Compared beginning-of-year vs. end-of-year on-hand quantities per product to expose which items were overstocked, and surfaced the size-mix imbalance (750mL alone accounted for 60.82% of total stock).",details:["Modelled the full inventory dataset in Power BI Desktop with slicers for Date, Store, and Size for flexible drill-down.","Built KPI cards for Total On Hand (9.11M), Inventory Value ($147.76M), Total Purchases ($321.90M), Days Sales of Inventory (167.54), and Inventory Turnover (2.18).","Created side-by-side bar charts comparing On Hand by Inventory at beginning vs. end of year per InventoryId to pinpoint persistent surplus items.","Added a donut chart breaking total stock by bottle size, revealing 750mL dominance (60.82%) as a concentration risk.","Identified the top overstocked SKUs (MOUNTMEND_5609 at 3.7K, EANVERNESS_5111 at 3.2K) and recommended targeted reorder-point reductions."],results:[{metric:"9.11M",label:"Units On Hand"},{metric:"167.54",label:"Days of Inventory"},{metric:"2.18x",label:"Inventory Turnover"}],tags:["Power BI","DAX","Inventory Analysis","Retail Analytics"],featured:!0,image:"/case-studies/inventory-thumbnail.png",pdfUrl:"/case-studies/inventory-analysis.pdf"},{slug:"snowflake-to-star-power-bi-data-modeling",title:"From Snowflake to Star Schema: Re-Architecting a Power BI Data Model",client:"Self-Initiated Project",industry:"E-Commerce",challenge:"The original Power BI model was built on auto-detect relationships and auto-generated tables. It rendered visuals, but underneath it was a snowflake/galaxy hybrid pretending to be a star — a tangle of:",challengePoints:["Snowflake branches instead of flat, conformed dimensions.","8+ hidden auto date/time tables bloating the model.","Fact-to-fact relationships propagating filters unpredictably.","Bi-directional cross-filters creating ambiguity.",'Four "fact" tables sitting at three different grains.'],challengeOutcome:"The result: slow queries, double-counting risk, and a model nobody could safely change. In plain terms — every simple question had to wander a maze, and the same sale could get counted twice.",solution:"Re-architected the model on the Olist Brazilian E-Commerce dataset (~100K orders, 9 source CSVs) into a clean star schema using a header/detail pattern. The key insight: an order header sits at one-row-per-order — the grain of a dimension — so it was promoted to Dim Order rather than treated as a fact. Payments and reviews were aggregated/deduplicated to order grain and absorbed, header keys were carried down to the line grain, and every relationship became a single-direction dim → fact link. Zero fact-to-fact, zero snowflake.",details:["Replaced auto date/time and 8+ hidden LocalDateTable_* tables with a single conformed Dim Date authored in Power Query (M) and Mark-as-Date-Table for reliable time intelligence.","De-snowflaked the model: folded the PT→EN category translation into Dim Product and flattened Dim Geography into Dim Customer / Dim Seller, removing both snowflake hops.","Collapsed the extra Payment and Review facts into the order header — aggregating split payments to order grain (sum value, max installments, primary type) and deduplicating reviews to the latest per order.","Promoted the order header to Dim Order and carried foreign keys down to the order-line grain, eliminating all three fact-to-fact relationships at once and leaving a single Fact Orders Items.",'Profiled the raw files to prove the data was not broken: the 775 "missing" orders were genuinely cancelled/unavailable (0 orphan items), so failed orders are preserved in Dim Order and countable via status.',"Removed bi-directional cross-filtering and standardized naming (Dim * / Fact *) with explicit Date-typed keys and inactive relationships for secondary date roles via USERELATIONSHIP."],results:[{metric:"4→1",label:"Facts Consolidated"},{metric:"0",label:"Fact-to-Fact Rels"},{metric:"8→1",label:"Date Tables"}],tags:["Power BI","Power Query (M)","DAX","Dimensional Modeling","Star Schema"],featured:!1,image:"/case-studies/snowflake-to-star-thumbnail.png",content:e}];export{t as c};
