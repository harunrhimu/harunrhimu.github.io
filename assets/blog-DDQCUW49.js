const e=[{slug:"power-bi-report-with-claude-ai-mcp",title:"How I Built a Power BI Report From Scratch with Claude AI and the Power BI MCP Server",excerpt:"A step-by-step case study of taking a messy, real-world Power BI model and using Claude AI + the Power BI Modeling MCP server to diagnose it, re-architect it into a clean star schema, plan a 6-page sales report, and build it from scratch.",preview:`
    <p>I took a messy, real-world Power BI model built on the Brazilian Olist e-commerce dataset and used <strong>Claude AI</strong> connected to the <strong>Power BI Modeling MCP server</strong> to diagnose it, re-architect it into a clean <strong>star schema</strong>, plan a 6-page sales report, and then build that report from scratch.</p>
    <p>This post walks through the entire workflow — what the AI did, what I directed, and where human judgment still mattered.</p>
  `,content:[`
    <section class="mb-12">
      <div style="border-left:4px solid #a855f7;background:rgba(168,85,247,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:0 0 1.5rem;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">TL;DR</p>
        <p style="margin:0;">I took a messy, real-world Power BI model built on the Brazilian Olist e-commerce dataset, and used <strong>Claude AI</strong> connected to the <strong>Power BI Modeling MCP server</strong> to diagnose it, re-architect it into a clean <strong>star schema</strong>, plan a 6-page sales report, and then build that report from scratch. This post walks through the entire workflow — what the AI did, what I directed, and where human judgment still mattered.</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>1. Introduction — Can AI Build a Full Power BI Report?</h2>
      <p>Every data analyst has heard the question by now: <em>"Will AI take over BI work?"</em> I wanted a more useful question — <strong>"Can I use AI as a power tool to do BI work better and faster?"</strong> — so I ran a real experiment instead of guessing.</p>
      <p>The challenge I set myself was deliberately end-to-end:</p>
      <ol>
        <li>Start with a genuinely flawed Power BI semantic model (no cherry-picked toy data).</li>
        <li>Use <strong>Claude AI</strong> — driving the <strong>Power BI Modeling MCP server</strong> — to review the model, fix the architecture, and build a full report.</li>
        <li>Build the report <strong>from scratch</strong>: pages, visuals, measures, navigation, the lot.</li>
        <li>Be honest about where the AI excelled and where I had to take the wheel.</li>
      </ol>
      <p>The dataset is the public <strong>Olist Brazilian E-Commerce</strong> set — roughly <strong>100,000 orders across 9 CSV files</strong>, covering orders, order items, payments, reviews, customers, products, sellers, geolocation, and category translations. It's messy in exactly the ways real client data is messy, which is what made it a fair test.</p>
      <p>The result: a <strong>clean star schema</strong> (1 fact, 5 dimensions) and a <strong>6-page interactive sales report</strong> — modeled, planned, and authored with Claude in the loop the entire way. Here's how it came together.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>2. The Toolset: Claude + Power BI Modeling MCP</h2>
      <p>The thing that makes this more than "ask ChatGPT for DAX" is <strong>MCP — the Model Context Protocol</strong>.</p>
      <p>MCP is an open standard that lets an AI assistant connect to external tools and data sources through a consistent interface. Instead of the AI only <em>talking about</em> your work, an MCP server gives it <strong>hands</strong> — the ability to read and act on real systems.</p>
      <p>The <strong>Power BI Modeling MCP server</strong> exposes the Power BI semantic model to Claude as a set of operations. In practice, that meant Claude could:</p>
      <ul>
        <li><strong>Read the live model</strong> — tables, columns, relationships, measures, partitions.</li>
        <li><strong>Inspect the schema</strong> — identify cardinality, cross-filter direction, hidden auto-date tables, snowflake branches.</li>
        <li><strong>Edit the model</strong> — add tables and columns, rewrite relationships, create and test DAX measures.</li>
        <li><strong>Run DAX queries</strong> — to validate logic and profile the data directly.</li>
      </ul>
      <p>My role was the <strong>director</strong>: I set the goal, made the architectural calls, reviewed every change, and kept the work honest. Claude's role was the <strong>fast, tireless engineer</strong> that could read the whole model at once, explain its own reasoning, and apply changes precisely. That division of labor — human judgment, AI execution — is the real story of this project.</p>
      <pre><code>┌─────────┐      directs       ┌─────────┐      MCP tools      ┌──────────────────┐
│   Me    │ ─────────────────▶ │ Claude  │ ─────────────────▶ │  Power BI Model  │
│(analyst)│ ◀───────────────── │  (AI)   │ ◀───────────────── │   (.pbip / TMDL) │
└─────────┘   reviews/approves └─────────┘   reads & verifies  └──────────────────┘
      </code></pre>
    </section>
    `,`
    <section class="mb-12">
      <h2>3. The Starting Point — A Model That "Worked" but Was Wrong</h2>
      <p>The original model rendered visuals just fine. That's the trap — it <em>looked</em> functional while hiding structural problems that would bite later with slow queries, double-counting, and fragile logic.</p>
      <p>When Claude read the model through MCP, it surfaced a hybrid that was <strong>part snowflake, part galaxy, pretending to be a star</strong>. The specific problems:</p>
      <table>
        <thead>
          <tr><th>#</th><th>Problem</th><th>Why it's a problem</th></tr>
        </thead>
        <tbody>
          <tr><td>P1</td><td><strong>Auto date/time enabled</strong> — 8+ hidden <code>LocalDateTable_*</code> tables</td><td>Model bloat, no conformed calendar, no control over date logic</td></tr>
          <tr><td>P2</td><td><strong>Snowflake:</strong> <code>Dim Product Category</code> hanging off <code>Dim Product</code></td><td>Extra hop, slower filters, harder to read</td></tr>
          <tr><td>P3</td><td><strong>Snowflake:</strong> <code>Dim Geography</code> shared by Customer &amp; Seller</td><td>Extra hop and ambiguity risk</td></tr>
          <tr><td>P4</td><td><strong>Fact-to-fact relationships</strong> — Items, Payment, Review all pointing at <code>Fact Order</code></td><td>Classic anti-pattern; fragile filter propagation</td></tr>
          <tr><td>P5</td><td><strong>Four fact tables at three grains</strong> (order / line / payment / review)</td><td>Over-fragmented; invites double-counting</td></tr>
          <tr><td>P6</td><td><strong>Bi-directional cross-filter</strong> on Order→Customer</td><td>Ambiguity and circular filter paths</td></tr>
          <tr><td>P7</td><td><strong>A "review" table mislabeled</strong> and date fields not modeled</td><td>Inconsistent naming, no usable date keys</td></tr>
        </tbody>
      </table>
      <p>One line of diagnosis: <em>this was a snowflake/galaxy hybrid pretending to be a star.</em> The value of having the AI read the <strong>entire</strong> model at once is that it caught all seven at the same time, with the reasoning attached — not one error message at a time.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>4. Step 1 — AI-Assisted Schema Review</h2>
      <p>The first deliverable wasn't code — it was <strong>understanding</strong>. I asked Claude to produce a written schema review I could stand behind: not just "this is wrong," but <em>why</em>, and <em>what the correct target looks like</em>.</p>
      <p>Claude walked the model table by table and classified each one by its <strong>real role versus its labeled role</strong> — which is where a lot of the trouble lived:</p>
      <ul>
        <li><code>Dim Review</code> was named a dimension but held <code>review_score</code> and joined on <code>order_id</code> → it's actually a <strong>fact</strong> (a review event).</li>
        <li><code>Dim Geography</code> had <strong>no relationship at all</strong> → an <strong>orphan</strong> dimension.</li>
        <li><code>Fact Order</code> had no additive numeric facts — just five date columns → it behaves like an <strong>order header</strong>, i.e. a dimension in disguise.</li>
      </ul>
      <p>That review became a documented artifact (<code>Star_Schema_Documentation.md</code>) covering the current relationships, the anti-patterns, and a target design. The point worth stressing for anyone evaluating AI in BI: <strong>the AI didn't just rename things — it justified the grain and role of every table.</strong> That reasoning is exactly what makes a model review trustworthy instead of a black box.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>5. Step 2 — Re-Architecting Snowflake → Star Schema</h2>
      <p>With the diagnosis agreed, we rebuilt the model. The key insight — the one that turns a fact-to-fact mess into a clean star — was simple once stated:</p>
      <blockquote><strong>An order header is "one row per order," which is exactly the grain of a dimension. So the header isn't a fact at all — promote it to <code>Dim Order</code>.</strong></blockquote>
      <p>That reframing dissolved the hardest problem (P4/P5) in one move. The conversion played out in a few deliberate steps, each applied through MCP and verified.</p>
      <p><strong>Replace auto date/time with a real <code>Dim Date</code>.</strong> Off went auto date/time; out went the hidden date tables; in came one conformed calendar built in Power Query:</p>
      <pre><code class="language-m">let
    Source  = List.Dates(#date(2016,1,1),
                Duration.Days(#date(2018,12,31) - #date(2016,1,1)) + 1,
                #duration(1,0,0,0)),
    ToTable = Table.FromList(Source, Splitter.SplitByNothing(), {"Date"}),
    Typed   = Table.TransformColumnTypes(ToTable, {{"Date", type date}}),
    Cols    = Table.AddColumn(Typed, "Year", each Date.Year([Date]), Int64.Type)
    // + MonthNo, Month, YearMonth, Quarter, DayOfWeek ...
in
    Cols
      </code></pre>
      <p>Then <strong>Mark as Date Table</strong> so DAX time intelligence is reliable.</p>
      <p><strong>De-snowflake the category.</strong> The PT→EN translation was folded directly into <code>Dim Product</code> as a single <code>product_category_name_english</code> column, and the standalone category table was removed.</p>
      <p><strong>Collapse the extra facts into the header.</strong> Payments and reviews are <em>attributes of an order</em>, not independent fact grains — but they sit at different grains, so a naive 1:1 join would have been wrong:</p>
      <ul>
        <li><strong>Payments</strong> are <em>finer</em> than orders (split payments → multiple rows per order). Aggregated to order grain: payment value (sum), installments (max), payment count, and the primary payment type.</li>
        <li><strong>Reviews</strong> are <em>~1:1 but with duplicates</em>. Deduplicated to the latest review per order before joining.</li>
      </ul>
      <pre><code class="language-m">PaymentsAgg = Table.Group(Payments, {"order_id"}, {
    {"Payment Value",        each List.Sum([payment_value]),  type number},
    {"Payment Installments", each List.Max([payment_installments]), Int64.Type},
    {"Payment Count",        each Table.RowCount(_),          Int64.Type},
    {"Payment Type",         each let s = Table.Sort(_, {{"payment_sequential", Order.Ascending}})
                                   in try s{0}[payment_type] otherwise null, type text}
})
      </code></pre>
      <p><strong>Promote the header and carry keys down.</strong> <code>Fact Order</code> became <code>Dim Order</code>, and the foreign keys (<code>customer_id</code>, <code>Order Purchase Date</code>) were pushed down onto each order line so the single fact joins straight to its dimensions — a <em>pure</em> star, not a snowflake:</p>
      <pre><code class="language-m">JoinOrders   = Table.NestedJoin(Items, {"order_id"}, OrderKeys, {"order_id"}, "Ord", JoinKind.LeftOuter),
ExpandOrders = Table.ExpandTableColumn(JoinOrders, "Ord", {"customer_id", "order_purchase_timestamp"})
      </code></pre>
      <p>That one decision <strong>eliminated all three fact-to-fact relationships at once.</strong> Add single-direction relationships and consistent <code>Dim *</code> / <code>Fact *</code> naming, and the model landed here:</p>
      <pre><code>            ┌───────────┐   ┌─────────────┐   ┌────────────┐
            │ Dim Date  │   │ Dim Customer│   │ Dim Product│
            └─────┬─────┘   └──────┬──────┘   └─────┬──────┘
                  │                │                │
                  └────────────┐   │   ┌────────────┘
                               ▼   ▼   ▼
                        ┌────────────────────┐
                        │  Fact Orders Items │   ◀── grain: one order line
                        └────────┬───────────┘
                            ▲    │    ▲
                  ┌─────────┘    │    └─────────┐
            ┌─────┴─────┐   ┌────┴─────┐  ┌─────┴─────┐
            │ Dim Seller│   │ Dim Order│  │   (...)   │
            └───────────┘   └──────────┘  └───────────┘
      </code></pre>
      <p><strong>1 fact · 5 dimensions · 0 fact-to-fact joins · 0 snowflake hops · 1 conformed calendar.</strong></p>
    </section>
    `,`
    <section class="mb-12">
      <h2>6. Step 3 — The Grain Investigation (Was the Data Broken?)</h2>
      <p>Mid-conversion, the row counts between the two order tables didn't line up, and it looked like missing data. This is the moment that separates a careful analyst from a careless one — and it's where I watched the AI do the <em>right</em> thing: <strong>profile the raw files instead of guessing.</strong></p>
      <table>
        <thead>
          <tr><th></th><th>Rows</th><th>Distinct <code>order_id</code></th></tr>
        </thead>
        <tbody>
          <tr><td><code>orders_dataset</code></td><td>99,441</td><td>99,441</td></tr>
          <tr><td><code>order_items_dataset</code></td><td>112,650</td><td>98,666</td></tr>
        </tbody>
      </table>
      <p>Claude ran the numbers and found two legitimate, <em>non-bug</em> reasons for the gap:</p>
      <ol>
        <li><strong>One order → many lines.</strong> 88,863 orders have a single line; the rest have 2–21 lines, which pushes item rows above order rows.</li>
        <li><strong>775 orders have no lines at all</strong> — and 767 of them are <code>unavailable</code> or <code>canceled</code>. These are <strong>genuinely failed orders</strong>: placed but never fulfilled, so no product, price, or delivery ever existed.</li>
      </ol>
      <p>Integrity check: <strong>0 orphan items</strong> — every line maps to a real order. And 96,478 of 99,441 orders are <code>delivered</code>, a healthy real-world distribution.</p>
      <div style="border-left:4px solid #22c55e;background:rgba(34,197,94,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">✅ Conclusion: the data wasn't broken.</p>
        <p style="margin:0;">The "missing price / missing delivery" rows are the <em>truth</em> about cancelled orders, not gaps. So those failed orders are <strong>preserved in <code>Dim Order</code></strong> (countable via status) even though they correctly have no rows in the sales fact. That's a modeling decision a naive cleanup would have silently destroyed.</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>7. Step 4 — Planning the Report Before Building</h2>
      <p>Here's a discipline I refused to skip just because AI makes building fast: <strong>plan the report before authoring a single visual.</strong> A fast wrong report is still a wrong report.</p>
      <p>I had Claude produce a full <strong>report plan</strong> first — a document I could review and approve like a spec. It defined:</p>
      <ul>
        <li><strong>Six pages</strong>, each with a clear analytical purpose:
          <ol>
            <li><strong>Executive Overview</strong> — one-screen business health check (KPIs, revenue trend, map, top categories).</li>
            <li><strong>Sales Trends</strong> — growth, seasonality, YoY/MoM momentum.</li>
            <li><strong>Product &amp; Category</strong> — what sells, at what price profile.</li>
            <li><strong>Customer Analysis</strong> — new vs. returning, value, geography.</li>
            <li><strong>Delivery &amp; Operations</strong> — fulfilment speed, on-time rate, order funnel.</li>
            <li><strong>Reviews &amp; Satisfaction</strong> — sentiment and its link to delivery speed.</li>
          </ol>
        </li>
        <li>A <strong>reusable layout skeleton</strong> — left nav, synced top-band slicers (Date / State / Category / Status), and a KPI card row.</li>
        <li><strong>Measure design</strong> — which KPIs each page needs and which new measures or columns the model required (a <code>DayOfWeekNo</code> sort key, new-vs-returning logic, order-value bands).</li>
        <li><strong>Formatting standards</strong> — currency, percentages, a single accent color, consistent titles.</li>
        <li><strong>Interactivity</strong> — cross-filtering, slicer sync, a drill-through detail page, custom tooltips, and a reset-filters bookmark.</li>
      </ul>
      <p>Planning first did two things: it forced the <strong>model additions</strong> to surface <em>before</em> build (so I wasn't patching the model mid-report), and it gave me an approval gate. Nothing got built until the blueprint was right.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>8. Step 5 — Building the Report From Scratch</h2>
      <p>With the plan approved, the build followed a clean sequence — model additions first, then theme, then a reusable page skeleton, then page-by-page visuals, then interactivity, then QA.</p>
      <p>What Claude authored, with me directing and reviewing each step:</p>
      <ul>
        <li><strong>Supporting model objects</strong> — the <code>DayOfWeekNo</code> sort key, new-vs-returning customer logic, and order-value bands the plan had flagged.</li>
        <li><strong>DAX measures</strong> — the KPI library (Total Revenue, Order Count, AOV, Unique Customers, Avg Review Score, On-Time Delivery Rate) plus time-intelligence measures (YoY %, MoM %, YTD) — written, then validated by running DAX queries through MCP.</li>
        <li><strong>The page skeleton</strong> — left-nav buttons with page-navigation actions, the synced slicer band, and the KPI row, built once and reused across pages.</li>
        <li><strong>Per-page visuals</strong> — line/column trends, a filled map of Brazil, treemaps, matrices with conditional formatting, a delivery-vs-review scatter, funnels, and Top-N tables.</li>
        <li><strong>Interactivity</strong> — drill-through to an order/product detail page, a custom report-page tooltip with a mini revenue trend, and a reset-filters bookmark.</li>
      </ul>
      <p>The honest division of labor: <strong>I made the design and modeling decisions; Claude executed them at speed and kept the implementation consistent.</strong> When a measure needed to avoid double-counting (order count via <code>DISTINCTCOUNT(order_id)</code> on the fact vs. <code>COUNTROWS(Dim Order)</code> for all orders including failed ones), that was a judgment call I made and the AI implemented — exactly as it should be.</p>
      <p>QA closed it out: cross-filter checks, number-format consistency, and totals sanity to confirm no double-counting had crept in.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>9. What Worked, What Didn't — My Honest Take on AI + BI</h2>
      <p>No hype. Here's the real assessment after shipping this end-to-end.</p>
      <div style="border-left:4px solid #22c55e;background:rgba(34,197,94,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">Where Claude + MCP genuinely shone</p>
        <ul style="margin:0;">
          <li><strong>Whole-model comprehension.</strong> Reading every table, relationship, and measure at once caught structural problems a click-by-click review misses.</li>
          <li><strong>Reasoning, not just output.</strong> Each change came with a justification I could check — the schema review reads like a senior analyst wrote it.</li>
          <li><strong>Speed on the mechanical work.</strong> Power Query merges, repetitive measures, consistent naming, and page skeletons — fast and tireless.</li>
          <li><strong>Documentation for free.</strong> The case-study write-ups were a byproduct of the process, not an afterthought.</li>
        </ul>
      </div>
      <div style="border-left:4px solid #f59e0b;background:rgba(245,158,11,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">Where I had to step in</p>
        <ul style="margin:0;">
          <li><strong>Architectural calls.</strong> "Promote the header to a dimension" was a human decision; the AI executed it well once directed.</li>
          <li><strong>Domain judgment.</strong> Deciding that failed orders must be <em>preserved</em>, not cleaned away, needed business context.</li>
          <li><strong>Verification discipline.</strong> I reviewed every model edit and DAX result. MCP lets the AI act — which means you must check what it acted on.</li>
        </ul>
      </div>
      <p><strong>Guardrails I used:</strong> work on a backup of the <code>.SemanticModel</code> folder, close Power BI before structural edits, validate measures by querying real data, and keep an approval gate between <em>plan</em> and <em>build</em>. AI accelerates the work; it doesn't absolve you of owning it.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>10. Skills This Project Demonstrates</h2>
      <p>For anyone reading this as a portfolio piece, here's what it actually proves I can do:</p>
      <ul>
        <li><strong>AI tooling &amp; agent direction</strong> — connecting Claude to the Power BI MCP server and driving it to deliver real, verified BI work.</li>
        <li><strong>Dimensional modeling</strong> — diagnosing snowflake/galaxy anti-patterns and designing a clean star with a header/detail pattern.</li>
        <li><strong>Grain analysis</strong> — the discipline that prevents double-counting and explains "missing" data correctly.</li>
        <li><strong>Power Query (M)</strong> — conformed date tables, merges, grain-aware aggregation, key propagation.</li>
        <li><strong>DAX</strong> — KPI and time-intelligence measures, validated against real data.</li>
        <li><strong>Report design</strong> — purpose-driven pages, reusable layout, interactivity, and formatting standards.</li>
        <li><strong>Communication</strong> — turning the whole process into documented, reviewable case studies.</li>
      </ul>
      <p>The modern data analyst isn't <em>replaced</em> by AI — they're <strong>amplified</strong> by it, provided they still own the judgment.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>11. Key Takeaways &amp; How You Can Try This</h2>
      <p>A few transferable lessons from building a Power BI report end-to-end with AI:</p>
      <ol>
        <li><strong>Grain first.</strong> Every modeling decision falls out of nailing the grain.</li>
        <li><strong>A "header" is usually a dimension.</strong> Header/detail problems dissolve when you stop treating the header as a fact — the clean alternative to fact-to-fact.</li>
        <li><strong>Star beats snowflake for BI.</strong> Flatten lookups unless there's a compelling reason not to.</li>
        <li><strong>Plan before you build.</strong> AI makes building fast, which makes a good blueprint <em>more</em> valuable, not less.</li>
        <li><strong>Profile before you "fix."</strong> The 775 "broken" orders weren't broken — they were cancelled. Verify with raw data.</li>
        <li><strong>AI acts — so you must verify.</strong> MCP gives the AI hands; keep yours on the wheel.</li>
      </ol>
      <p><strong>Want to try this workflow?</strong> You'll need Power BI Desktop with a <code>.pbip</code> (PBIR/TMDL) project, the <strong>Power BI Modeling MCP server</strong> connected to <strong>Claude</strong>, and a real dataset to test on — the public <strong>Olist Brazilian E-Commerce</strong> set on Kaggle is perfect.</p>
      <p><em>Built with Power BI, Power Query (M), and DAX on the public Olist Brazilian E-Commerce dataset — modeled and authored with Claude AI via the Power BI Modeling MCP server.</em></p>
      <p><strong>Let's connect</strong> — if you're hiring a data analyst who pairs solid BI fundamentals with modern AI tooling, <a href="/contact">get in touch</a>.</p>
    </section>
    `],category:"Power BI",date:"Jun 27, 2026",dateISO:"2026-06-27",readTime:"12 min read",image:"/power-bi-claude-mcp-cover.png"},{slug:"power-bi-pbip-git-azure-devops-fabric-cicd",title:"Power BI PBIP Git Integration with Azure DevOps — Multi-Stage Fabric CI/CD",excerpt:"With the Power BI Project format (PBIP), reports and semantic models become plain-text TMDL files you can diff and review. Here is how to wire PBIP into Azure DevOps with the fabric-cicd library for an automated, approval-gated Dev → Test → Prod Fabric deployment.",content:[`
    <section class="mb-12">
      <p>For years, Power BI development had a dirty secret: the <code>.pbix</code> file is a <strong>binary blob</strong>. You couldn't diff it, you couldn't review it in a pull request, and "version control" meant <code>Final_v2_REALLY_final.pbix</code> sitting in a shared drive. Deployment meant a human opening Power BI Desktop and clicking <strong>Publish</strong> — straight to production, fingers crossed.</p>
      <p>That era is over.</p>
      <p>With the <strong>Power BI Project format (PBIP)</strong> — where your report and semantic model are saved as <strong>plain-text TMDL files</strong> — Power BI finally behaves like real source code. And with Microsoft's open-source <strong><code>fabric-cicd</code></strong> Python library, you can wire it into <strong>Azure DevOps</strong> so that a single merged pull request flows automatically through <strong>Dev → Test → Prod</strong>, with a service principal doing the deployment and a human approval gate guarding production.</p>
      <p>This guide shows you how to build that exact pipeline, end to end, with working code.</p>
    </section>

    <div style="border-left:4px solid #0284c7;background:rgba(2,132,199,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
      <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">📋 What you'll build</p>
      <p>A Git-backed Power BI workflow where developers branch, raise PRs, and merge — and Azure Pipelines automatically deploys the <strong>same code</strong> to three Fabric workspaces (Dev, Test, Prod), parameterized per environment, authenticated by a service principal, with manual approval before Prod.</p>
    </div>
    `,`
    <section class="mb-12">
      <h2>Why PBIP Changes Everything</h2>
      <p>The <code>.pbip</code> format saves your work as a <strong>folder of text files</strong> instead of one binary <code>.pbix</code>. The semantic model is serialized as <strong>TMDL</strong> (Tabular Model Definition Language), and the report as JSON-based definition files.</p>
      <pre><code>SalesReport.pbip
├─ SalesReport.Report/
│   └─ definition.pbir
└─ SalesReport.SemanticModel/
    └─ definition/
        ├─ model.tmdl
        ├─ tables/
        │   ├─ Sales.tmdl
        │   └─ Date.tmdl
        └─ relationships.tmdl
      </code></pre>
      <p>Why this matters:</p>
      <table>
        <thead>
          <tr><th>Old way (<code>.pbix</code>)</th><th>New way (<code>.pbip</code> + TMDL)</th></tr>
        </thead>
        <tbody>
          <tr><td>Binary blob — no diffs</td><td>Plain text — line-by-line Git diffs</td></tr>
          <tr><td>No meaningful code review</td><td>Real pull requests on measures &amp; model changes</td></tr>
          <tr><td>Merge = overwrite &amp; pray</td><td>Branch, merge, resolve conflicts properly</td></tr>
          <tr><td>Manual Publish to Prod</td><td>Automated, repeatable, audited deployment</td></tr>
        </tbody>
      </table>
      <div style="border-left:4px solid #10b981;background:rgba(16,185,129,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">💡 Enable PBIP</p>
        <p>In Power BI Desktop: <strong>File → Options and settings → Options → Preview features → Power BI Project (.pbip) save option</strong>. Then <strong>Save as → .pbip</strong>.</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>The Big Picture</h2>
      <figure style="margin:1.5rem 0;">
        <img src="/pbip-cicd-pipeline.png" alt="End-to-end PBIP CI/CD pipeline: Power BI Desktop to Azure Repos, pull request, multi-stage Azure Pipelines deploying Dev, Test and Prod Fabric workspaces with fabric-cicd" loading="lazy" style="width:100%;height:auto;border-radius:0.75rem;border:1px solid rgba(148,163,184,0.15);" />
        <figcaption style="text-align:center;font-size:0.85rem;color:#64748b;margin-top:0.5rem;">End-to-end flow: author in Power BI Desktop → PR review → multi-stage Fabric deployment.</figcaption>
      </figure>
      <p>Here's the full flow the diagram above illustrates:</p>
      <ol>
        <li><strong>Author</strong> the report/model in Power BI Desktop, save as <code>.pbip</code>.</li>
        <li><strong>Branch &amp; push</strong> to Azure Repos on a <code>feature/*</code> branch.</li>
        <li><strong>Pull Request</strong> → teammates review the TMDL diff; a CI build validates it.</li>
        <li><strong>Merge to <code>main</code></strong> — this is the <strong>trigger</strong>.</li>
        <li>Azure Pipelines runs a <strong>multi-stage</strong> deployment: Dev → Test → (approval) → Prod.</li>
        <li>Each stage runs <code>deploy.py</code>, which calls <strong><code>fabric-cicd</code></strong>, authenticates with a <strong>service principal</strong>, and uses <strong><code>parameter.yml</code></strong> to point at the correct workspace and data sources.</li>
      </ol>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;margin:1.5rem 0;font-size:0.85rem;">
        <span style="background:rgba(2,132,199,0.15);border:1px solid rgba(2,132,199,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">Power BI Desktop (.pbip)</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(2,132,199,0.15);border:1px solid rgba(2,132,199,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">Azure Repos (feature branch)</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">Pull Request (review + CI)</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(2,132,199,0.15);border:1px solid rgba(2,132,199,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">Azure Pipelines (trigger: main)</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">DEV</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">TEST</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">Manual Approval</span>
        <span style="color:#64748b;">→</span>
        <span style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:#e2e8f0;padding:0.4rem 0.7rem;border-radius:0.5rem;">PROD Workspace</span>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Prerequisites</h2>
      <div style="border-left:4px solid #0ea5e9;background:rgba(14,165,233,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">ℹ️ What you need before starting</p>
        <ul>
          <li>A <strong>Microsoft Fabric</strong> capacity (or Power BI Premium / Fabric trial) with <strong>three workspaces</strong>: Dev, Test, Prod.</li>
          <li>An <strong>Azure DevOps</strong> project with a Git repo.</li>
          <li>An <strong>Entra ID service principal</strong> (app registration) added as a <strong>Member/Admin</strong> on all three workspaces.</li>
          <li>Tenant setting <strong>"Service principals can use Fabric APIs"</strong> enabled.</li>
          <li>Python 3.9+ available on the pipeline agent (the Microsoft-hosted <code>ubuntu-latest</code> agent works).</li>
        </ul>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Step 1 — Connect the Repo &amp; Structure It</h2>
      <p>Put your PBIP project under a clear source folder so the pipeline knows what to deploy:</p>
      <pre><code>repo-root/
├─ src/
│   ├─ SalesReport.Report/
│   └─ SalesReport.SemanticModel/
├─ deploy.py
├─ parameter.yml
├─ requirements.txt
└─ azure-pipelines.yml
      </code></pre>
      <p><code>requirements.txt</code>:</p>
      <pre><code>fabric-cicd&gt;=0.1.0
      </code></pre>
      <p>Developers work locally, commit to a <code>feature/*</code> branch, and open a PR into <code>main</code>. Because TMDL is text, reviewers see exactly which measure or column changed.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>Step 2 — Parameterize Per Environment (<code>parameter.yml</code>)</h2>
      <p>The core idea of multi-stage deployment is <strong>one set of code, many environments</strong>. You never hardcode a workspace ID or a connection string — <code>fabric-cicd</code> swaps them at deploy time using <code>parameter.yml</code>.</p>
      <pre><code class="language-yaml"># parameter.yml
find_replace:
  # Re-point the data source connection per environment
  - find_value: "dev-sql.database.windows.net"
    replace_value:
      DEV: "dev-sql.database.windows.net"
      TEST: "test-sql.database.windows.net"
      PROD: "prod-sql.database.windows.net"

  # Swap a referenced semantic model GUID (e.g. in a thin report)
  - find_value: "00000000-dev-model-guid"
    replace_value:
      DEV: "00000000-dev-model-guid"
      TEST: "11111111-test-model-guid"
      PROD: "22222222-prod-model-guid"
      </code></pre>
      <div style="border-left:4px solid #6366f1;background:rgba(99,102,241,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">📝 How it works</p>
        <p><code>fabric-cicd</code> scans your TMDL/report files, finds each <code>find_value</code>, and replaces it with the value matching the <strong>current <code>environment</code></strong> before publishing. The same commit therefore deploys correctly to Dev, Test, and Prod.</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Step 3 — The Deployment Script (<code>deploy.py</code>)</h2>
      <p>This single script is reused by every stage. The environment name is passed in, so the script stays identical across Dev/Test/Prod.</p>
      <pre><code class="language-python"># deploy.py
import os
from fabric_cicd import FabricWorkspace, publish_all_items

# These come from pipeline variables / variable groups
workspace_id = os.environ["FABRIC_WORKSPACE_ID"]
environment  = os.environ["TARGET_ENVIRONMENT"]   # DEV | TEST | PROD

target_workspace = FabricWorkspace(
    workspace_id=workspace_id,
    environment=environment,
    repository_directory="./src",
    item_type_in_scope=["SemanticModel", "Report"],
)

# Publishes/updates all in-scope items, applying parameter.yml swaps
publish_all_items(target_workspace)

print(f"✅ Deployed PBIP items to {environment} workspace {workspace_id}")
      </code></pre>
      <div style="border-left:4px solid #10b981;background:rgba(16,185,129,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">💡 Service principal authentication</p>
        <p><code>fabric-cicd</code> builds on <code>azure-identity</code>. When you set the standard env vars <code>AZURE_CLIENT_ID</code>, <code>AZURE_CLIENT_SECRET</code>, and <code>AZURE_TENANT_ID</code>, <code>DefaultAzureCredential</code> picks them up automatically — no interactive login on the agent. Store the secret in a <strong>Variable Group linked to Azure Key Vault</strong>, never in the YAML.</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Step 4 — The Multi-Stage Pipeline (<code>azure-pipelines.yml</code>)</h2>
      <p>This is where it all comes together. One YAML file, <strong>triggered on merge to <code>main</code></strong>, with three stages. Test depends on Dev; Prod depends on Test <strong>and</strong> a manual approval (configured via a DevOps <strong>Environment</strong>).</p>
      <pre><code class="language-yaml"># azure-pipelines.yml
trigger:
  branches:
    include:
      - main          # fires when a PR is merged into main

pool:
  vmImage: ubuntu-latest

variables:
  - group: fabric-cicd-secrets   # holds AZURE_CLIENT_SECRET (from Key Vault)

stages:
# ───────────────────────────── DEV ─────────────────────────────
- stage: Deploy_DEV
  displayName: "Deploy to DEV"
  jobs:
    - job: deploy
      steps:
        - template: templates/deploy-steps.yml
          parameters:
            targetEnv: DEV
            workspaceId: $(DEV_WORKSPACE_ID)

# ───────────────────────────── TEST ────────────────────────────
- stage: Deploy_TEST
  displayName: "Deploy to TEST"
  dependsOn: Deploy_DEV
  condition: succeeded()
  jobs:
    - job: deploy
      steps:
        - template: templates/deploy-steps.yml
          parameters:
            targetEnv: TEST
            workspaceId: $(TEST_WORKSPACE_ID)

# ───────────────────────────── PROD ────────────────────────────
- stage: Deploy_PROD
  displayName: "Deploy to PROD"
  dependsOn: Deploy_TEST
  condition: succeeded()
  jobs:
    - deployment: deploy
      environment: fabric-prod      # ← attach approval checks here
      strategy:
        runOnce:
          deploy:
            steps:
              - template: templates/deploy-steps.yml
                parameters:
                  targetEnv: PROD
                  workspaceId: $(PROD_WORKSPACE_ID)
      </code></pre>
      <p>The reusable step template keeps each stage to a few lines:</p>
      <pre><code class="language-yaml"># templates/deploy-steps.yml
parameters:
  - name: targetEnv
    type: string
  - name: workspaceId
    type: string

steps:
  - checkout: self

  - task: UsePythonVersion@0
    inputs:
      versionSpec: '3.11'

  - script: pip install -r requirements.txt
    displayName: "Install fabric-cicd"

  - script: python deploy.py
    displayName: "Deploy to \${{ parameters.targetEnv }}"
    env:
      TARGET_ENVIRONMENT: \${{ parameters.targetEnv }}
      FABRIC_WORKSPACE_ID: \${{ parameters.workspaceId }}
      AZURE_CLIENT_ID: $(AZURE_CLIENT_ID)
      AZURE_TENANT_ID: $(AZURE_TENANT_ID)
      AZURE_CLIENT_SECRET: $(AZURE_CLIENT_SECRET)   # from Key Vault-linked group
      </code></pre>
      <div style="border-left:4px solid #f59e0b;background:rgba(245,158,11,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">⚠️ The approval gate is the whole point</p>
        <p>The Prod stage uses a <code>deployment</code> job bound to an <strong>Environment</strong> named <code>fabric-prod</code>. In Azure DevOps, open <strong>Pipelines → Environments → fabric-prod → Approvals and checks</strong>, and add a required approver. Now Dev and Test deploy automatically, but <strong>nothing reaches Prod until a human clicks Approve.</strong></p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Step 5 — The Trigger in Action</h2>
      <p>Once configured, the day-to-day loop is beautifully boring:</p>
      <div style="border-left:4px solid #a855f7;background:rgba(168,85,247,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">🔧 A typical change</p>
        <ol>
          <li>Analyst adds a <code>Profit Margin %</code> measure in Power BI Desktop, saves the <code>.pbip</code>.</li>
          <li><code>git commit</code> → <code>git push</code> on <code>feature/profit-margin</code>.</li>
          <li>Opens a PR. A reviewer sees the <strong>exact TMDL diff</strong> for the new measure and approves.</li>
          <li><strong>Merge to <code>main</code></strong> → the pipeline fires.</li>
          <li>DEV deploys (seconds). TEST deploys. The pipeline <strong>pauses at the Prod gate</strong>.</li>
          <li>The BI lead reviews TEST, clicks <strong>Approve</strong> → PROD updates. Done.</li>
        </ol>
      </div>
      <p>No one opened Power BI Desktop to publish. No one touched production by hand.</p>
    </section>
    `,`
    <section class="mb-12">
      <h2>Best Practices &amp; Gotchas</h2>
      <div style="border-left:4px solid #ef4444;background:rgba(239,68,68,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">🚫 Common pitfalls</p>
        <ul>
          <li><strong>Service principal not on the workspace</strong> → 401/403 errors. Add the SP as a workspace <strong>Admin/Member</strong> in all three.</li>
          <li><strong>Tenant setting disabled</strong> → enable <em>"Service principals can use Fabric APIs"</em> in the admin portal (scoped to a security group).</li>
          <li><strong>Secret in YAML</strong> → never. Use a Variable Group linked to <strong>Azure Key Vault</strong>.</li>
          <li><strong>Data source credentials</strong> → <code>fabric-cicd</code> deploys the <em>definition</em>; you still bind gateway/cloud connection credentials once per workspace.</li>
          <li><strong>Branch policies</strong> → protect <code>main</code> so the only way in is a reviewed PR. That's what makes the trigger trustworthy.</li>
        </ul>
      </div>
      <div style="border-left:4px solid #22c55e;background:rgba(34,197,94,0.08);border-radius:0 0.5rem 0.5rem 0;padding:1rem 1.25rem;margin:1.5rem 0;">
        <p style="font-weight:700;color:#fff;margin:0 0 0.5rem;">✅ Checklist</p>
        <p style="margin:0.25rem 0;">✓ PBIP saved as text (TMDL) and committed</p>
        <p style="margin:0.25rem 0;">✓ <code>parameter.yml</code> covers all per-environment values</p>
        <p style="margin:0.25rem 0;">✓ <code>deploy.py</code> reads env + workspace from pipeline variables</p>
        <p style="margin:0.25rem 0;">✓ Three stages with <code>dependsOn</code> chaining</p>
        <p style="margin:0.25rem 0;">✓ Prod stage bound to an Environment with an approval check</p>
        <p style="margin:0.25rem 0;">✓ Secrets sourced from Key Vault, not YAML</p>
      </div>
    </section>
    `,`
    <section class="mb-12">
      <h2>Conclusion</h2>
      <p>PBIP turns Power BI into proper source code; <code>fabric-cicd</code> turns Azure DevOps into a proper deployment engine. Together they give you what every serious data team wants: <strong>reviewed changes, repeatable deployments, environment isolation, and a human gate on production</strong> — all kicked off by nothing more than merging a pull request.</p>
      <p>Set it up once, and "publishing a report" becomes a code review instead of a click-and-pray.</p>
    </section>
    `],category:"Power BI",date:"Jun 23, 2026",dateISO:"2026-06-23",readTime:"11 min read",image:"/pbip-cicd-cover.png"},{slug:"medallion-architecture-microsoft-fabric",title:"Medallion Architecture in Microsoft Fabric: A Complete Implementation Guide",excerpt:"In the modern data engineering landscape, the challenge is rarely about getting data—it’s about making it trustworthy, organized, and ready for action. Enter the Medallion Architecture.",preview:`
    <p>In the modern data engineering landscape, the challenge is rarely about getting data—it’s about making it trustworthy, organized, and ready for action. Enter the <strong>Medallion Architecture</strong>, a design pattern that has become the gold standard for structuring data lakes.</p>

    <p>With the rise of <strong>Microsoft Fabric</strong>, implementing this multi-hop pattern has never been cleaner. Because Fabric centers everything around <strong>OneLake</strong> (a unified, logical data lake for your entire organization), you can seamlessly process data from raw ingestion to production-ready dashboards in a single environment.</p>
  `,content:[`
    <section class="mb-12">
      <p>In the modern data engineering landscape, the challenge is rarely about getting data—it’s about making it trustworthy, organized, and ready for action. Enter the <strong>Medallion Architecture</strong>, a design pattern that has become the gold standard for structuring data lakes.</p>

      <p>With the rise of <strong>Microsoft Fabric</strong>, implementing this multi-hop pattern has never been cleaner. Because Fabric centers everything around <strong>OneLake</strong> (a unified, logical data lake for your entire organization), you can seamlessly process data from raw ingestion to production-ready dashboards in a single environment.</p>

      <p>Whether you are a data engineer building robust pipelines or an architect mapping out an enterprise data estate, this comprehensive guide will show you how to design and build a Medallion Architecture natively in Microsoft Fabric.</p>
    </section>

    <figure style="margin:1.5rem 0;">
      <img src="/Medallion.png" alt="Microsoft Fabric Medallion Architecture: Bronze (raw data) to Silver (filtered, cleaned data) to Gold (business-level aggregates) feeding Power BI" loading="lazy" style="width:100%;height:auto;border-radius:0.75rem;border:1px solid rgba(148,163,184,0.15);" />
      <figcaption style="text-align:center;font-size:0.85rem;color:#64748b;margin-top:0.5rem;">The Medallion Architecture in Microsoft Fabric — Bronze → Silver → Gold, feeding Power BI.</figcaption>
    </figure>

    <section class="mb-12">
      <h2>What is the Medallion Architecture?</h2>
      <p>The Medallion Architecture is a data design pattern that organizes data into three progressive layers: <strong>Bronze</strong>, <strong>Silver</strong>, and <strong>Gold</strong>. Think of it as a refinement pipeline where data flows incrementally, improving in structure, reliability, and quality at every stop.</p>
      <pre><code>  ┌────────────────┐      ┌────────────────┐      ┌────────────────┐
  │  BRONZE LAYER  │ ───> │  SILVER LAYER  │ ───> │   GOLD LAYER   │
  │   (Raw Truth)  │      │ (Refined Truth)│      │(Business Truth)│
  └────────────────┘      └────────────────┘      └────────────────┘
      </code></pre>
      <div class="py-6"></div>
      <table>
        <thead>
          <tr><th>Feature</th><th>🥉 Bronze Layer</th><th>🥈 Silver Layer</th><th>🥇 Gold Layer</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Focus</strong></td><td>Raw Data Ingestion</td><td>Data Cleaning & Validation</td><td>Dimensional Modeling & Aggregation</td></tr>
          <tr><td><strong>State</strong></td><td>Raw, immutable, historical</td><td>Cleansed, enriched, deduplicated</td><td>Highly refined, business-ready</td></tr>
          <tr><td><strong>Format</strong></td><td>Source format (JSON, CSV, Parquet)</td><td>Delta Lake (Standardized)</td><td>Delta Lake / Data Warehouse</td></tr>
          <tr><td><strong>Target Audience</strong></td><td>Data Engineers, Auditors</td><td>Data Scientists, Analytics Engineers</td><td>Business Analysts, Power BI Users, Executives</td></tr>
        </tbody>
      </table>
    </section>

    <section class="mb-12">
      <h3>🥉 1. The Bronze Layer: The Raw Truth</h3>
      <p>The Bronze layer is your data landing zone. Here, data arrives in its original format directly from operational databases, APIs, IoT streams, or SaaS applications.</p>
      <ul>
        <li><strong>Key Characteristics:</strong> Appends data incrementally over time, preserving full historical records.
          <ul>
            <li>Minimal to no transformations applied to prevent data loss.</li>
            <li>Acts as the single source of truth for downstream auditing and reprocessing.</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="mb-12">
      <h3>🥈 2. The Silver Layer: The Refined Truth</h3>
      <p>The Silver layer is your organization’s “Single Source of Truth.” It takes append-only raw data from Bronze and applies essential data hygiene workflows.</p>
      <ul>
        <li><strong>Key Transformations:</strong>
          <ul>
            <li>Enforcing schemas, type casting, and standardizing date formats.</li>
            <li>Removing duplicates and handling null or missing values.</li>
            <li>Quarantining or filtering out corrupt records.</li>
            <li>Restructuring heavily nested data into flat, queryable tables.</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="mb-12">
      <h3>🥇 3. The Gold Layer: The Business Truth</h3>
      <p>The Gold layer contains highly refined, denormalized data optimized for specific business domains (e.g., Marketing, Finance, HR).</p>
      <ul>
        <li><strong>Key Characteristics:</strong>
          <ul>
            <li>Uses dimensional modeling (Star Schemas) to define clean relationships and business measures.</li>
            <li>Features pre-aggregated metrics (e.g., monthly revenue by region, daily active users) to ensure lightning-fast dashboard performance.</li>
            <li>Feeds directly into downstream consumers like Power BI, Excel reports, and Machine Learning models.</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="mb-12">
      <h2>Medallion Architecture in Microsoft Fabric</h2>
      <p>Implementing this architecture in Fabric leverages <strong>OneLake</strong>, which natively standardizes on the <strong>Delta Lake</strong> storage format. Delta Lake wraps Parquet files with a transaction log, granting you advanced capabilities like time travel, schema evolution, and ACID reliability.</p>
    </section>

    <section class="mb-12">
      <h3>Deployment Patterns: Lakehouse vs. Data Warehouse</h3>
      <p>Fabric offers flexibility in how you physically segment these layers. The recommended best practice is to separate your layers into <strong>different workspaces</strong> to enable robust access control and governance.</p>
      <ul>
        <li><strong>Pattern 1 (Pure Lakehouse):</strong> Create three distinct Lakehouses (<code>LH_Bronze</code>, <code>LH_Silver</code>, <code>LH_Gold</code>) in OneLake. Business analysts query the Gold layer using Fabric’s auto-generated <strong>SQL Analytics Endpoint</strong>.</li>
        <li><strong>Pattern 2 (Hybrid Lakehouse to Warehouse):</strong> Build Bronze and Silver as Lakehouses, but spin up a Fabric <strong>Data Warehouse</strong> for the Gold layer. This is ideal if your business users and BI developers prefer a traditional, full-T-SQL development experience.</li>
      </ul>
    </section>

    <section class="mb-12">
      <h2>Step-by-Step Implementation via Fabric PySpark</h2>
      <p>Let’s look at how data transformations execute programmatically inside a Microsoft Fabric Synapse Notebook using Spark.</p>

      <h3 class="mb-4">Step 1: Ingesting into Bronze (Simulated JSON Raw Load)</h3>
      <p><strong>Python</strong></p>
      <pre><code class="language-python"># Spark Notebook: Ingesting raw application events into Bronze
from pyspark.sql.functions import current_timestamp, input_file_name

# Read raw JSON files from your OneLake Files directory
raw_sales_df = spark.read.json("Files/Data/Ingest/sales_logs/*.json")

# Add auditing metadata columns to track lineage
bronze_df = raw_sales_df     .withColumn("source_file", input_file_name())     .withColumn("ingested_at", current_timestamp())

# Write directly to the Bronze Delta table
bronze_df.write.format("delta").mode("append").saveAsTable("bronze_sales")
      </code></pre>

      <h3 class="mb-4">Step 2: Cleansing and Transforming from Bronze to Silver</h3>
      <p><strong>Python</strong></p>
      <pre><code class="language-python">from pyspark.sql.functions import col, current_date, trim, upper

# Read incremental or full data from Bronze
df_bronze = spark.read.table("bronze_sales")

# Apply cleaning, deduplication, and parsing business rules
df_silver = df_bronze     .filter(col("customer_id").isNotNull())     .dropDuplicates(["order_id"])     .withColumn("customer_id", trim(col("customer_id")))     .withColumn("country", upper(col("country")))     .withColumn("processed_date", current_date())

# Save into the Silver Lakehouse layer
df_silver.write.format("delta").mode("overwrite").saveAsTable("silver_sales")

# Optimize the Delta table structure for fast processing
spark.sql("OPTIMIZE silver_sales")
      </code></pre>

      <h3 class="mb-4">Step 3: Aggregating from Silver to Gold</h3>
      <p><strong>Python</strong></p>
      <pre><code class="language-python">from pyspark.sql.functions import sum, count, date_trunc

# Load cleansed data from Silver
df_silver_source = spark.read.table("silver_sales")

# Compute Monthly Revenue and Order Volumes by Region
df_gold_monthly_summary = df_silver_source     .groupBy(date_trunc("month", col("order_date")).alias("sales_month"), col("country"))     .agg(
        sum("amount").alias("total_revenue"),
        count("order_id").alias("total_orders")
    )

# Write to Gold table optimized for BI consumption
df_gold_monthly_summary.write.format("delta").mode("overwrite").saveAsTable("gold_monthly_sales_summary")
      </code></pre>
    </section>

    <section class="mb-12">
      <h2>Fabric Pro-Tip: Declarative Pipelines via Materialized Lake Views</h2>
      <p>If building manual PySpark/Data Factory pipelines between your layers sounds tedious, Microsoft Fabric provides a cutting-edge alternative: <strong>Materialized Lake Views</strong>.</p>
      <ul>
        <li><strong>Automatic Dependency Management:</strong> It maps out your view lineage and determines execution order.</li>
        <li><strong>Optimal Refreshing:</strong> It automatically chooses whether an incremental or full refresh is needed based on underlying source data modifications.</li>
      </ul>
    </section>

    <section class="mb-12">
      <h2>Top 4 Best Practices for Medallion Architectures</h2>
      <ol>
        <li><strong>Leverage Shortcuts to Eliminate Redundancy:</strong> If your raw data already resides in Azure Data Lake Gen2, Amazon S3, or Google Cloud Storage, don't copy it. Use Fabric <strong>Shortcuts</strong> to reference it directly within your Bronze layer to minimize storage footprint and network overhead.</li>
        <li><strong>Shift to Liquid Clustering:</strong> While legacy systems partition data tables strictly by folder structures (e.g., Year/Month), modern Delta Lake implementations in Silver and Gold should use <strong>Liquid Clustering</strong>. This dynamically scales layout performance and eliminates the risk of small-file bottlenecks.</li>
        <li><strong>Maintain Healthy File Sizes:</strong> Aim for underlying Parquet data files that are roughly <strong>1 GB</strong> in size. Smaller files degrade the performance of Fabric query engines like Power BI Direct Lake. Run the <code>VACUUM</code> and <code>OPTIMIZE</code> commands routinely to clean up historical transaction leftovers.</li>
        <li><strong>Implement Robust Quality Checks:</strong> Don't let bad data compromise downstream BI confidence. Embed conditional error validation directly into your pipelines:</li>
      </ol>
      <pre><code class="language-python"># Simple operational quality check gate
if df_silver.filter(col("total_amount") < 0).count() > 0:
    raise ValueError("Data pipeline halted: Negative transaction amounts detected in Silver layer.")
      </code></pre>
    </section>

    <section class="mb-12">
      <h2>Conclusion</h2>
      <p>The Medallion Architecture paired with Microsoft Fabric provides a robust, scalable, and highly performant foundation for data estates. By segmenting your data pipeline into logical Bronze, Silver, and Gold layers, you ensure absolute data reliability, granular pipeline governance, and swift analytics delivery.</p>
      <p>Whether your goal is building comprehensive Customer 360 data views or accelerating automated machine learning pipelines, the medallion model guarantees your data stays organized, optimized, and ready to drive strategic decision-making.</p>
    </section>
    `],category:"Data Engineering",date:"Jun 1, 2026",dateISO:"2026-06-01",readTime:"12 min read",image:"/medallion-cover.png"},{slug:"why-fabric-is-a-new-analytics-platform-in-the-age-of-ai",title:"Why Fabric is a New Analytics Platform in the Age of AI",excerpt:"Discover why Microsoft Fabric represents a major strategic shift toward a unified enterprise analytics operating model designed specifically for the generative AI era.",content:["<p>Today’s world is awash with data—constantly streaming from the devices we use, the applications we build, and the interactions we have. Organizations across every industry have harnessed this data to digitally transform and gain competitive advantages. And now, as we enter a new era defined by AI, this data is becoming even more important.</p>","<p>Generative AI and language model services are enabling customers to create everyday AI experiences that reinvent how employees spend their time. However, powering these organization-specific AI experiences requires a constant supply of clean, trusted data from a well-managed and highly integrated analytics system.</p>","<p>Unfortunately, most legacy analytics environments have evolved into a highly complex landscape and a labyrinth of specialized, disconnected services from hundreds of vendors. Customers have traditionally been forced to stitch together separate tools for data integration (ETL), data warehouses, independent reporting platforms, data lakes, and AI tooling ecosystems. This fragmentation incurs massive operational overhead, integration complexity, data duplication, and skyrocketing cloud costs.</p>","<p><strong>Microsoft Fabric</strong> emerges as a true disruptor for this shift. It is not simply another standalone analytics tool; it represents a major strategic shift toward a <strong>unified enterprise analytics operating model</strong> designed specifically for the AI era.</p>",'<figure style="margin:1.5rem 0;"><img src="/Fabric.png" alt="Microsoft Fabric — the unified data platform for AI transformation: Data Factory, Analytics, Databases, Real-Time Intelligence, IQ, Power BI, plus Copilot, OneLake, and Governance" loading="lazy" style="width:100%;height:auto;border-radius:0.75rem;border:1px solid rgba(148,163,184,0.15);" /><figcaption style="text-align:center;font-size:0.85rem;color:#64748b;margin-top:0.5rem;">Microsoft Fabric — the unified data platform for AI transformation.</figcaption></figure>',"<hr />","<h2>1. A Complete, Unified SaaS Experience</h2>","<p>Instead of forcing enterprises to absorb the heavy burden of making disconnected services function together, Microsoft Fabric introduces a unified Software as a Service (SaaS) ecosystem. Everything is automatically integrated and optimized, allowing users to sign up within seconds and get real business value within minutes.</p>","<p>Fabric empowers every team in the analytics process—data engineers, data warehousing professionals, data scientists, data analysts, and business users—by bringing together <strong>core, role-specific workloads</strong> into a single product:</p>","<ul>","  <li><strong>Data Factory:</strong> Provides more than 150 connectors to cloud and on-premises data sources, drag-and-drop experiences for data transformation, and the ability to orchestrate data pipelines.</li>","  <li><strong>Synapse Data Engineering:</strong> Enables great authoring experiences for Apache Spark, instant start with live pools, and seamless team collaboration.</li>","  <li><strong>Synapse Data Science:</strong> Provides an end-to-end workflow for data scientists to build sophisticated AI models, collaborate easily, and train, deploy, and manage machine learning models.</li>","  <li><strong>Synapse Data Warehousing:</strong> Provides a converged lakehouse and data warehouse experience with industry-leading SQL performance on open data formats.</li>","  <li><strong>Synapse Real-Time Analytics:</strong> Enables developers to work with data streaming in from IoT devices, telemetry, logs, and more, analyzing massive volumes of semi-structured data with high performance and low latency.</li>","  <li><strong>Power BI:</strong> Provides industry-leading visualization and AI-driven analytics that enable business analysts and users to gain insights right where they already work.</li>","  <li><strong>Data Activator:</strong> Provides real-time detection and monitoring of data to trigger notifications and automated business actions when specified patterns are found—all in a no-code experience.</li>","</ul>","<hr />","<h2>2. Unlocking Enterprise Intelligence: IQ & Ontology</h2>","<p>To truly future-proof data for generative AI, a platform needs to understand not just where data lives, but what it <em>means</em>. Fabric addresses this by introducing deep semantic intelligence through <strong>IQ & Ontology</strong> frameworks.</p>","<ul>","  <li><strong>Fabric IQ:</strong> Functions as the cognitive engine of the platform, enhancing metadata discovery and automating the translation of raw data into business context. It allows the platform to intelligently index, recommend, and optimize data assets across the entire organization automatically.</li>",'  <li><strong>Business Ontology:</strong> Rather than dealing with disconnected tables, Fabric enables organizations to map out an enterprise-wide "Ontology"—a living semantic web of relationships between data entities (e.g., customers, products, processes, and locations). This structural clarity ensures that when AI Copilots query your data, they fully comprehend your unique business logic, drastically reducing hallucinations and accelerating semantic consistency.</li>',"</ul>","<hr />",'<h2>3. OneLake: The "OneDrive for Data"</h2>',"<p>Historically, organizations repeatedly copied data across different systems to satisfy different tools, resulting in storage duplication, data inconsistencies, and fragmented governance. Fabric completely changes enterprise data accessibility through <strong>OneLake</strong>—a built-in, SaaS, multi-cloud data lake automatically available to every Fabric tenant.</p>","<p>Just as all Microsoft 365 applications are wired into OneDrive, all Fabric workloads are automatically wired into OneLake.</p>","<ul>","  <li><strong>Eliminating Silos:</strong> OneLake provides a single, unified storage system for all developers, eliminating pervasive and chaotic data silos created by isolated storage accounts.</li>",'  <li><strong>Multi-Cloud Shortcuts:</strong> A key capability called "Shortcuts" allows OneLake to virtualize data lake storage across Azure Data Lake Storage Gen2 (ADLSg2), Amazon S3, and Google Storage. This enables developers to compose and analyze data across clouds without moving or duplicating information unnecessarily.</li>',"  <li><strong>Universal Security:</strong> Fabric provides a universal security model managed centrally in OneLake, enforcing table, column, and row-level security uniformly across all data engines.</li>","</ul>","<hr />","<h2>4. Integrated Fabric Planning & Advanced Intelligence Visuals</h2>","<p>The separation between looking at historical data (BI) and acting on it (Planning/Budgeting) has long been a source of operational friction. Fabric bridges this gap by embedding <strong>Fabric Planning</strong> directly into the analytics workflow.</p>","<p>Instead of jumping out to standalone financial or operational planning software, users can run write-back scenarios, top-down forecasting, and bottom-up budgeting natively within the platform.</p>","<p>To support these intensive planning and diagnostic workflows, Fabric utilizes an advanced <strong>Intelligence visualization suite featuring over 100+ specialized charts</strong>. This robust visualization layer goes far beyond standard bar and pie charts, providing data professionals and executive leadership with:</p>","<ul>","  <li>Dynamic decomposition trees and network graphs for tracing semantic Ontologies.</li>","  <li>Advanced variance and financial planning charts built specifically for write-back forecasting.</li>","  <li>Low-latency streaming visuals for real-time operation tracking.</li>","</ul>","<hr />","<h2>5. Embracing the Lakehouse Architecture with Open Formats</h2>","<p>Traditionally, organizations faced a strict architectural trade-off: data warehouses delivered structured analytics and performance, while data lakes delivered scalability and flexibility.</p>","<p>Fabric natively aligns with the rising <strong>Lakehouse architecture model</strong>, meaning it does not force enterprises to choose between flexibility and structure. It achieves this through a deep commitment to open data formats, treating <strong>Delta on top of Parquet files</strong> as the native default format across all workloads.</p>","<p>Because every engine operates on the exact same open format, a single copy of the data in OneLake can directly power databases, data lakes, data warehousing, real-time analytics, and business intelligence. You load the data into the lake only once, providing a data stack unified at the most fundamental layer. This is critical for modern AI initiatives, which require large-scale, multi-format data processing and rapid experimentation.</p>","<hr />","<h2>6. Infused with Generative AI from the Ground Up</h2>","<p>Fabric is purpose-built for the modern era by embedding <strong>Azure OpenAI Service</strong> at every layer. With Copilot woven into every data experience, users can leverage conversational language to:</p>","<ul>","  <li>Create dataflows and data pipelines</li>","  <li>Generate code and entire functions</li>","  <li>Build and train machine learning models</li>","  <li>Visualize results and generate reports instantly</li>","</ul>","<p>Crucially, Copilot is built on strict enterprise commitments to data security and privacy. It inherits an organization's existing security, compliance, and privacy policies, and Microsoft does not use an organization's tenant data to train the base language models.</p>","<hr />","<h2>7. Empowering Every Business User & Optimizing Costs</h2>","<p>To help organizations foster a genuine data culture, Fabric deeply integrates with the Microsoft 365 applications people use every day. Through Power BI's native connections, relevant data from OneLake is easily discoverable and actionable directly within <strong>Excel, Microsoft Teams, PowerPoint, and SharePoint</strong>. Excel users can generate a Power BI report with a single click, and PowerPoint users can embed live, interactive reports directly into presentations.</p>","<p>Beyond driving business agility, Fabric fundamentally rewrites cloud economics through <strong>unified capacities</strong>. In traditional setups, purchasing separate computing capacities for data integration, warehousing, and BI leads to significant waste when one system sits idle. With Fabric, organizations purchase a single pool of computing power that dynamically scales and shifts across whatever workload needs it most, significantly reducing costs and simplifying resource management.</p>","<hr />","<h2>Navigating the Shift: Best Practices for Success</h2>",'<p>While Fabric offers an unparalleled leap forward, technology alone does not transform an enterprise. Industry experience shows that treating Fabric as a simple "lift-and-shift" of your existing stack undermines its potential. To maximize ROI and future-proof your data operations, organizations should adopt a structured implementation roadmap:</p>',"<ul>","  <li><strong>Adopt a Lakehouse-First Strategy:</strong> Focus on consolidating data into OneLake using Delta Parquet open formats to eliminate data duplication.</li>","  <li><strong>Map Your Semantic Ontology Early:</strong> Leverage the IQ framework to establish clear organizational data relationships before spinning up AI pilots.</li>","  <li><strong>Establish Governance Early:</strong> Put security, compliance, data quality discipline, and cost controls in place before moving the first workload.</li>","  <li><strong>Unify BI and Planning:</strong> Take advantage of integrated Fabric Planning to bring your finance, operations, and data teams into the same workspace.</li>","</ul>","<hr />","<h2>Let's Build Your Next-Gen Data Solution</h2>","<p>The future of enterprise analytics belongs to organizations that can reduce architectural complexity while increasing intelligence, planning agility, and governance maturity. Microsoft Fabric delivers exactly on that promise, offering a unified, end-to-end ecosystem built for the age of AI.</p>",'<p><strong>Looking to optimize your data infrastructure?</strong> Let’s connect on <a href="#upwork">Upwork</a> or explore my latest end-to-end projects right here on my <a href="#portfolio">Portfolio Site</a>.</p>'],category:"Microsoft Fabric",date:"Jun 1, 2026",dateISO:"2026-06-01",readTime:"10 min read",image:"/fabric-ai-cover.png"},{slug:"supercharging-power-bi-microsoft-fabric-development-with-ai-mcp",title:"Power BI & Microsoft Fabric Development with AI: Introducing the Model Context Protocol (MCP)",excerpt:"Discover how the Model Context Protocol (MCP) bridges the gap between LLMs and Power BI/Fabric ecosystems, reducing complex data modeling workflows from days to minutes.",content:["<p>Imagine reducing the time it takes to build, document, translate, or refactor a complex Power BI semantic model from days to mere minutes.</p>","<p>As a Microsoft Certified Power BI Data Analyst Associate, I am constantly looking for ways to deliver faster, more reliable insights to my clients. The biggest bottleneck in business intelligence has never been writing a single measure—it is the repetitive, meticulous engineering work required to keep enterprise models clean, documented, and optimized.</p>","<p>Enter the <strong>Model Context Protocol (MCP)</strong>. Released as an open standard, MCP completely changes how we interact with data models. By bridging the gap between Large Language Models (LLMs) and Power BI/Fabric ecosystems, MCP allows us to programmatically manage semantic models using structured natural language.</p>","<p>Here is a deep dive into how I use this cutting-edge AI architecture to execute complex modeling workflows at lightning speed, and why it matters for your business.</p>","<hr />","<h2>What is the Model Context Protocol (MCP)?</h2>",'<p>The Model Context Protocol is an open standard that defines a secure, structured way for AI assistants (like Claude Desktop or GitHub Copilot in VS Code) to interact with external tools and data sources. Instead of an AI just "guessing" code, MCP establishes a bidirectional communication channel directly into the heart of the data model.</p>',"<p>The architecture relies on three primary components:</p>","<ul>","  <li><strong>The Host:</strong> The application running the environment (e.g., VS Code or Claude Desktop).</li>","  <li><strong>The Client:</strong> The component inside the host connecting to the server (e.g., GitHub Copilot or Claude).</li>","  <li><strong>The Server:</strong> The local or hosted program that securely exposes tools and resources to the client (in this case, the Power BI MCP Server).</li>","</ul>","<p>By decoupling these layers, we can plug any advanced LLM into our local Power BI Desktop files, local Power BI Project (<code>.pbip</code>) folders containing TMDL definitions, or cloud-hosted Microsoft Fabric workspaces.</p>","<hr />","<h2>Local vs. Remote MCP Servers: A Dual-Engine Approach</h2>","<p>Microsoft provides two distinct methods for leveraging MCP servers, depending on the stage of the development cycle:</p>","<h3>1. The Power BI Modeling MCP Server (Local)</h3>","<p>This server runs locally on the development machine and connects directly to open <code>.pbix</code> files or local Tabular Model Definition Language (TMDL) structures. It is built for <strong>heavy-duty model engineering</strong>. It allows an AI agent to autonomously plan and execute structural changes—like creating tables, altering relationships, or bulk-editing properties—with full transactional support and error handling.</p>","<h3>2. The Remote Power BI MCP Server (Cloud Preview)</h3>","<p>Introduced as a secure, hosted cloud endpoint, the Remote MCP server allows AI agents to securely connect to semantic models directly within cloud environments like Microsoft Fabric workspaces without local software prerequisites. Powered by the same underlying intelligence engine as Copilot for Power BI, it excels at <strong>schema-aware querying and natural language data analysis</strong>.</p>","<hr />","<h2>6 Practical Scenarios: How AI Accelerates Delivery</h2>","<p>By incorporating MCP into my development stack, I can automate complex, multi-step modeling processes. Below are real-world scenarios showing exactly how this cuts down development cycles:</p>","<h3>1. Architectural Audits & Bulk Renaming</h3>","<p>Instead of manually clicking through dozens of columns to enforce clean, user-friendly business naming conventions, I instruct the AI agent to audit the schema.</p>",`<blockquote><strong>AI Prompt Example:</strong> <em>"Analyze the naming convention of the 'Sales' table and apply the same pattern across the entire model to ensure absolute consistency."</em></blockquote>`,"<h3>2. Automated End-to-End Documentation</h3>","<p>Documenting a semantic model is critical for enterprise governance but notoriously time-consuming. Using MCP, the AI agent can inspect the model structure, parse Power Query M-code, read DAX formulas, and instantly output clean documentation.</p>",`<blockquote><strong>AI Prompt Example:</strong> <em>"Generate a Markdown document (.md) providing professional documentation for this model. Use a simple Mermaid diagram to illustrate table relationships, document every measure's business logic, note row-level filters, and analyze Power Query code to list data sources."</em></blockquote>`,"<h3>3. Rapid Enterprise Translations</h3>","<p>For global organizations, translating metadata (tables, columns, measures) is a tedious necessity. MCP allows me to push multi-language metadata translations directly into the model file in seconds.</p>",'<blockquote><strong>AI Prompt Example:</strong> <em>"Generate a German and French translation for my model including all tables, columns, and measures."</em></blockquote>',"<h3>4. Advanced DAX Refactoring (Calculation Groups)</h3>","<p>Refactoring repetitive measures into clean, scalable architecture used to require extensive manual setup via Tabular Editor. MCP automates this by handling the underlying TMDL or model metadata directly.</p>",`<blockquote><strong>AI Prompt Example:</strong> <em>"Refactor measures 'Sales Amount 12M Avg' and 'Sales Amount 6M Avg' into a single calculation group, and include new time-intelligence variants: 24M and 3M."</em></blockquote>`,"<h3>5. Data Source Parameterization</h3>","<p>Transitioning a model from a development environment to production requires parameterizing connections. The MCP server can scan the Power Query layers across all tables and refactor them automatically.</p>",'<blockquote><strong>AI Prompt Example:</strong> <em>"Analyze the Power Query code for all tables, identify the data source configuration, and create semantic model parameters to enable easy switching of the data source location."</em></blockquote>',"<h3>6. Rigorous DAX Query Benchmarking</h3>","<p>To ensure high performance across large enterprise datasets, DAX queries must be tested under different modeling conditions. MCP can run performance benchmarks across multiple versions of a model simultaneously.</p>",`<blockquote><strong>AI Prompt Example:</strong> <em>"Connect to semantic model 'V1' and 'V2', and benchmark the following DAX query against both models to isolate performance variations: [Insert DAX Query]"</em></blockquote>`,"<hr />","<h2>Why This Matters for Clients: The Business Value</h2>","<p>When you hire a data consultant, you are paying for an outcome: clean, reliable, and high-performance reporting that drives business decisions. By mastering AI-driven development via frameworks like the Model Context Protocol, I pass three massive advantages directly to my clients:</p>","<ol>","  <li><strong>Unmatched Speed-to-Market:</strong> Standard data modeling tasks that usually consume hours of billable development time are completed in seconds. This allows us to move from raw data to rich dashboards faster than ever before.</li>","  <li><strong>Drastically Lower Error Rates:</strong> Humans make typos when renaming 100 columns or documenting 50 measures. AI agents executing bulk transactions via structured MCP tools apply rules flawlessly across the entire model.</li>","  <li><strong>Focus on High-Value Strategy:</strong> Because I don't have to spend days writing boilerplate documentation or translating metadata manually, 100% of my billable time is focused on what truly matters—advanced data engineering, deep statistical modeling, and designing business-critical metrics.</li>","</ol>","<hr />","<h2>Let's Build Your Next-Gen Data Solution</h2>","<p>The future of business intelligence isn't just about dragging and dropping visuals; it's about building scalable, AI-orchestrated semantic foundations. Whether you need a complex Galaxy Schema deployed across millions of rows, or an optimized Microsoft Fabric architecture, I bring the modern technical stack required to build it efficiently.</p>",'<p><strong>Looking to optimize your data infrastructure?</strong> Let’s connect on <a href="#upwork">Upwork</a> or explore my latest end-to-end projects right here on my <a href="#portfolio">Portfolio Site</a>.</p>'],category:"Power BI",date:"May 30, 2026",dateISO:"2026-05-30",readTime:"6 min read",image:"/mcp-cover.png"}];export{e as b};
