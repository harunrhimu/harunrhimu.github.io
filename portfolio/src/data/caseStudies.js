import ecommerceAnalyticsReportMd from '../content/case-studies/ecommerce-analytics-report.md?raw'

const caseStudies = [
  {
    slug: 'inventory-optimization-analysis',
    title: 'Inventory Optimization Analysis',
    client: 'Retail Business',
    industry: 'Retail',
    challenge: 'The business held 9.11M units of inventory with a Days Sales of Inventory of 167.54 days and an inventory turnover of only 2.18x per year — far below industry benchmarks. Stock levels at the beginning and end of the year were nearly identical, meaning purchases of $321.90M were not translating into sales velocity, locking $147.76M in idle inventory value.',
    solution: 'Built a Power BI dashboard analysing inventory performance across all store brands, SKUs, and bottle sizes for the full 2016 fiscal year. Compared beginning-of-year vs. end-of-year on-hand quantities per product to expose which items were overstocked, and surfaced the size-mix imbalance (750mL alone accounted for 60.82% of total stock).',
    details: [
      'Modelled the full inventory dataset in Power BI Desktop with slicers for Date, Store, and Size for flexible drill-down.',
      'Built KPI cards for Total On Hand (9.11M), Inventory Value ($147.76M), Total Purchases ($321.90M), Days Sales of Inventory (167.54), and Inventory Turnover (2.18).',
      'Created side-by-side bar charts comparing On Hand by Inventory at beginning vs. end of year per InventoryId to pinpoint persistent surplus items.',
      'Added a donut chart breaking total stock by bottle size, revealing 750mL dominance (60.82%) as a concentration risk.',
      'Identified the top overstocked SKUs (MOUNTMEND_5609 at 3.7K, EANVERNESS_5111 at 3.2K) and recommended targeted reorder-point reductions.',
    ],
    results: [
      { metric: '9.11M', label: 'Units On Hand' },
      { metric: '167.54', label: 'Days of Inventory' },
      { metric: '2.18x', label: 'Inventory Turnover' },
    ],
    tags: ['Power BI', 'DAX', 'Inventory Analysis', 'Retail Analytics'],
    featured: true,
    image: '/case-studies/inventory-thumbnail.png',
    pdfUrl: '/case-studies/inventory-analysis.pdf',
  },
  {
    slug: 'ecommerce-analytics-report-star-schema',
    title: 'From Snowflake to Star Schema: Re-Architecting a Power BI Data Model',
    client: 'Self-Initiated Project',
    industry: 'E-Commerce',
    challenge: 'The e-commerce dataset ships as nine separate CSVs. Wired up naively, orders, payments and reviews all became fact tables joined to each other — a snowflake that quietly breaks aggregation and confuses every business user.',
    solution: 'Consolidated nine source tables into a single star schema — one fact at line grain, order header promoted to a dimension — then built a 6-page Power BI report (47 DAX measures, 84 visuals) covering sales, product, customer, delivery and satisfaction analysis.',
    details: [
      'Profiled all 9 source CSVs to resolve grain mismatches between orders (99,441), line items (112,650), payments and reviews before writing a single relationship.',
      'Aggregated split payments and deduplicated reviews to order grain in Power Query, then consolidated both into a promoted Dim Order dimension.',
      'Carried customer and date foreign keys down to the order-line grain so Fact Orders Items joins directly to Dim Customer and Dim Date — zero fact-to-fact relationships.',
      'Authored 47 DAX measures spanning revenue, delivery performance, and review sentiment.',
      'Built a 6-page, 84-visual Power BI report (Executive Overview, Sales Trends, Product & Category, Customer Analysis, Delivery & Operations, Reviews & Satisfaction) on one consistent design system with 3 synced slicers.',
    ],
    results: [
      { metric: '47', label: 'DAX Measures' },
      { metric: '6', label: 'Report Pages' },
      { metric: '99,441', label: 'Orders Analyzed' },
    ],
    tags: ['Power BI', 'Power Query (M)', 'DAX', 'TMDL', 'Star Schema'],
    featured: false,
    image: '/case-studies/snowflake-to-star-thumbnail.png',
    content: ecommerceAnalyticsReportMd,
  },
]

export default caseStudies
