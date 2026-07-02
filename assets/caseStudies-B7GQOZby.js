const e=`# From Snowflake Chaos to Star Schema Clarity: Building a 6-Page E-Commerce Analytics Report

> **A data modeling + reporting case study** — how ~100K e-commerce orders spread across 9 tangled source tables became one clean star schema and a 6-page Power BI report that answers every sales, delivery, and satisfaction question.

**Stack:** Power BI (PBIP) · Power Query (M) · DAX · TMDL · Star Schema · Git

**Dataset:** E-commerce marketplace, 2016–2018 (~100K orders, 9 source CSVs)

**Skills shown:** grain analysis, header/detail modeling, Power Query consolidation, DAX measure design, multi-page report architecture

| Orders | Line Items | DAX Measures | Report Pages |
|---|---|---|---|
| 99,441 | 112,650 | 47 | 6 |

---

## 1. The Problem — The Model Was a Snowflake

The dataset ships as nine separate CSVs. Wired up naively, orders, payments, and reviews all become **fact tables joined to each other** — a snowflake that quietly breaks aggregation and confuses every business user.

| Issue | Detail |
|---|---|
| **Grain mismatch** | Order header (99,441) vs. line items (112,650) vs. payments vs. reviews — four different grains |
| **Fact-to-fact links** | Payment and Review modeled as facts joined to Orders — a snowflake anti-pattern |
| **"Missing" rows** | 775 orders had no line items; many had no review — looked like broken data |
| **Double-count risk** | Multiple relationship paths inflate revenue and make slicing ambiguous |

**The goal:** collapse nine source tables into a single, trustworthy star schema where every measure aggregates correctly — and a business user can explore without fear.

---

## 2. The Data — Real Data, Real Ambiguity

Before trusting a single chart, three questions had to be answered:

| # | Question | Resolution |
|---|---|---|
| 1 | **775 orders with zero line items** | 767 were \`unavailable\` / \`canceled\` — valid business cases, kept in the model |
| 2 | **Blank payments & reviews** | Left null on purpose — a missing review is a real event, not a data error |
| 3 | **\`customer_id\` ≠ the customer** | \`customer_id\` is per-order; \`customer_unique_id\` is the real person — used for true customer counts |

Sample of the raw order header (\`orders_dataset.csv\`, 99,441 rows):

| order_id | status | purchase | delivered | items |
|---|---|---|---|---|
| e481f… | delivered | 17-10-02 | 17-10-10 | 1 |
| 53cdb… | delivered | 18-07-24 | 18-08-07 | 3 |
| a4591… | **canceled** | 18-02-11 | — null | **0 ⚠** |
| 47770… | delivered | 17-05-16 | 17-05-26 | 2 |

Integrity check across the 9 source tables: **0 orphan items**, 96,478 of 99,441 orders \`delivered\` — a healthy real-world distribution.

> Knowing when *not* to fix something is what separates a data analyst from someone who just runs queries.

---

## 3. The Process — From 9 CSVs to a Star Schema

| Step | Focus |
|---|---|
| 1. Discover | Map the 9 tables and the business questions to answer |
| 2. Investigate | Profile grains, keys, and the 775 orphan orders |
| 3. Transform | Power Query — group, join, consolidate |
| 4. Model | Header → dimension, one fact, pure star |
| 5. Measure | 47 DAX measures — sales to satisfaction |
| 6. Build | 6 report pages, 84 visuals, one design system |

---

## 4. The Model — The Transformation, Side by Side

The key insight: you don't merge grains — you separate them cleanly. The order header (with payment and review consolidated in) becomes a **dimension**; line items stay as the single fact.

\`\`\`mermaid
graph TD
    FO["Fact Order"]:::fact
    FP["Fact Payment"]:::fact
    FR["Fact Review"]:::fact
    FI["Fact Items"]:::fact
    DPC["Dim Product Category"]:::dim --> DP["Dim Product"]:::dim
    FP -->|fact-to-fact| FO
    FR -->|fact-to-fact| FO
    FI -->|fact-to-fact| FO
    classDef fact fill:#3d1417,stroke:#FF6B6B,color:#ffb9ba;
    classDef dim fill:#1b2140,stroke:#F4A340,color:#cdd2ee;
\`\`\`

\`\`\`mermaid
graph TD
    F["Fact Orders Items<br/>(grain: order line)"]:::fact
    DProd["Dim Product"]:::dim --> F
    DDate["Dim Date"]:::dim --> F
    DSell["Dim Seller"]:::dim --> F
    DCust["Dim Customer"]:::dim --> F
    DOrd["Dim Order<br/>+payment +review"]:::special --> F
    classDef fact fill:#0f3b37,stroke:#1FB6A6,color:#4FD6C8;
    classDef dim fill:#132029,stroke:#2b6b64,color:#cdd2ee;
    classDef special fill:#231b3d,stroke:#7a5bbf,color:#b79be6;
\`\`\`

**Consolidating payments and reviews to order grain:**

\`\`\`m
// aggregate payments to order grain
Pay = Table.Group(Src, {"order_id"},
  {{"Payment Value", each List.Sum([value])},
   {"Installments", each List.Max([n])}})

// latest review per order
Rev = Table.Distinct(Table.Sort(R,
  {{"answer_ts", Order.Descending}}), {"order_id"})

// header + payment + review = Dim Order
DimOrder = Join(Orders, Pay) & Join(…, Rev)
\`\`\`

**Carrying the header keys down to the line grain:**

\`\`\`m
// bring FK + date keys onto the line grain
Items = Table.NestedJoin(I, {"order_id"},
  DimOrder, {"order_id"}, "o", JoinKind.LeftOuter)

Items = Table.ExpandTableColumn(Items, "o",
  {"customer_id", "order_purchase_timestamp"})

// result: 1 fact -> 5 dims, zero fact-to-fact
// 112,650 rows, one clean grain
\`\`\`

This single move eliminated all three fact-to-fact relationships at once — the old \`Items → Order\` arrow became a clean \`Dim Order → Fact\` link instead.

---

## 5. The Report — Six Pages on the Star Schema

One consistent design system — teal accent, KPI cards, a 2×2 chart grid, and three synced slicers (Category, State, Status) — across every page, all built at 1920×1080.

| # | Page | KPIs | Key Visuals |
|---|---|---|---|
| 1 | **Executive Overview** | Total Revenue, Revenue YoY %, Revenue MoM %, Revenue YTD, Order Count, AOV | Revenue trend by month, revenue by state, top categories, orders by status |
| 2 | **Sales Trends** | Same KPI set, trended | Revenue vs. prior year, revenue by year/quarter/weekday |
| 3 | **Product & Category** | Total Revenue, Items Sold, Active Categories, Avg Item Price, Products Sold, Freight % Rev | Revenue by category treemap, avg item price by category, top products |
| 4 | **Customer Analysis** | Unique Customers, Customers/Order, Orders per Customer, Revenue/Customer, AOV, Total Revenue | Orders over time, customers by state, top cities by revenue |
| 5 | **Delivery & Operations** | Avg Delivery Days, On-Time Rate %, Late Deliveries, Delivered Orders, Cancellation %, Days vs. Estimate | Delivery days trend, on-time vs. late, delivery days by state |
| 6 | **Reviews & Satisfaction** | Avg Review Score, % Positive, 5-Star Reviews, Negative Reviews, Reviews Count, Positive Reviews | Review score trend, score distribution, avg review by category/state |

---

## 6. The Impact

| Metric | Result |
|---|---|
| Fact-to-fact relationships | **0** — a pure star schema |
| Orders preserved | **99,441** — one source of truth, including failed orders |
| Source tables consolidated | **9 → 6** (5 dimensions + 1 fact) |

| Aspect | Before | After |
|---|---|---|
| Schema shape | Three fact tables, ambiguous paths | One fact at line grain, header promoted to a dimension |
| Trust | Revenue double-counts when sliced by product | Every measure aggregates correctly |
| Usability | Nobody fully trusts the totals | Self-service, drill-anywhere across 6 report pages |

---

*Built with Power BI, Power Query (M), DAX, and TMDL on a public e-commerce marketplace dataset.*
`,n=[{slug:"inventory-optimization-analysis",title:"Inventory Optimization Analysis",client:"Retail Business",industry:"Retail",challenge:"The business held 9.11M units of inventory with a Days Sales of Inventory of 167.54 days and an inventory turnover of only 2.18x per year — far below industry benchmarks. Stock levels at the beginning and end of the year were nearly identical, meaning purchases of $321.90M were not translating into sales velocity, locking $147.76M in idle inventory value.",solution:"Built a Power BI dashboard analysing inventory performance across all store brands, SKUs, and bottle sizes for the full 2016 fiscal year. Compared beginning-of-year vs. end-of-year on-hand quantities per product to expose which items were overstocked, and surfaced the size-mix imbalance (750mL alone accounted for 60.82% of total stock).",details:["Modelled the full inventory dataset in Power BI Desktop with slicers for Date, Store, and Size for flexible drill-down.","Built KPI cards for Total On Hand (9.11M), Inventory Value ($147.76M), Total Purchases ($321.90M), Days Sales of Inventory (167.54), and Inventory Turnover (2.18).","Created side-by-side bar charts comparing On Hand by Inventory at beginning vs. end of year per InventoryId to pinpoint persistent surplus items.","Added a donut chart breaking total stock by bottle size, revealing 750mL dominance (60.82%) as a concentration risk.","Identified the top overstocked SKUs (MOUNTMEND_5609 at 3.7K, EANVERNESS_5111 at 3.2K) and recommended targeted reorder-point reductions."],results:[{metric:"9.11M",label:"Units On Hand"},{metric:"167.54",label:"Days of Inventory"},{metric:"2.18x",label:"Inventory Turnover"}],tags:["Power BI","DAX","Inventory Analysis","Retail Analytics"],featured:!0,image:"/case-studies/inventory-thumbnail.png",pdfUrl:"/case-studies/inventory-analysis.pdf"},{slug:"ecommerce-analytics-report-star-schema",title:"From Snowflake to Star Schema: Re-Architecting a Power BI Data Model",client:"Self-Initiated Project",industry:"E-Commerce",challenge:"The e-commerce dataset ships as nine separate CSVs. Wired up naively, orders, payments and reviews all became fact tables joined to each other — a snowflake that quietly breaks aggregation and confuses every business user.",solution:"Consolidated nine source tables into a single star schema — one fact at line grain, order header promoted to a dimension — then built a 6-page Power BI report (47 DAX measures, 84 visuals) covering sales, product, customer, delivery and satisfaction analysis.",details:["Profiled all 9 source CSVs to resolve grain mismatches between orders (99,441), line items (112,650), payments and reviews before writing a single relationship.","Aggregated split payments and deduplicated reviews to order grain in Power Query, then consolidated both into a promoted Dim Order dimension.","Carried customer and date foreign keys down to the order-line grain so Fact Orders Items joins directly to Dim Customer and Dim Date — zero fact-to-fact relationships.","Authored 47 DAX measures spanning revenue, delivery performance, and review sentiment.","Built a 6-page, 84-visual Power BI report (Executive Overview, Sales Trends, Product & Category, Customer Analysis, Delivery & Operations, Reviews & Satisfaction) on one consistent design system with 3 synced slicers."],results:[{metric:"47",label:"DAX Measures"},{metric:"6",label:"Report Pages"},{metric:"99,441",label:"Orders Analyzed"}],tags:["Power BI","Power Query (M)","DAX","TMDL","Star Schema"],featured:!1,image:"/case-studies/snowflake-to-star-thumbnail.png",content:e}];export{n as c};
