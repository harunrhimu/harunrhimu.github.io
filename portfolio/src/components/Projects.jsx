import { useState } from 'react'
import ProjectModal from './ProjectModal'

const projects = [
  {
    title: 'Sales Performance Dashboard',
    description:
      'Interactive Power BI dashboard tracking sales KPIs across 5 regions with drill-through analysis, dynamic filtering, and YoY comparisons. Reduced reporting time by 60%.',
    fullDescription:
      'This comprehensive sales analytics dashboard was built to give executive leadership a single-pane view of the entire sales operation across 5 regions.\n\nThe dashboard features dynamic slicers for date range, region, and product category. Users can drill through from a summary page into detailed regional breakdowns, individual rep performance, and product-level analysis.\n\nAdvanced DAX measures power YoY comparisons, running totals, and moving averages. The data model follows a star schema with a fact table containing 100K+ transaction records connected to dimension tables for products, regions, and time.\n\nThe end result reduced manual reporting time by 60% and enabled real-time decision making for the sales team.',
    features: [
      'Drill-through from summary to regional details',
      'Dynamic date range & category slicers',
      'YoY comparison with DAX time intelligence',
      'Star schema data model (100K+ records)',
      'Automated daily data refresh via gateway',
      'Mobile-optimized layout for field reps',
    ],
    tags: ['Power BI', 'DAX', 'SQL Server', 'Data Modeling'],
    color: 'primary',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    metrics: ['5 Regions', '100K+ Records', '60% Faster'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
  {
    title: 'HR Analytics Report',
    description:
      'Comprehensive workforce analytics solution featuring attrition prediction, diversity metrics, and employee satisfaction scoring with automated data refresh.',
    fullDescription:
      'This HR analytics solution was designed to help the People Operations team understand workforce trends and predict employee attrition before it happens.\n\nThe report combines data from the HRIS system, employee surveys, and performance reviews into a unified data model. Python scripts handle the ML prediction pipeline, generating attrition risk scores that are imported into Power BI.\n\nKey dashboards include: Headcount Overview, Diversity & Inclusion Metrics, Attrition Analysis with prediction scores, Employee Satisfaction Trends, and Compensation Benchmarking.\n\nThe automated refresh pipeline pulls data daily from Azure SQL Database via Power BI Gateway, ensuring stakeholders always see up-to-date information.',
    features: [
      'ML-powered attrition prediction model',
      'Diversity & inclusion scorecards',
      'Employee satisfaction trend analysis',
      'Automated daily data refresh via Azure',
      'Role-based access for HR managers',
      'Compensation benchmarking views',
    ],
    tags: ['Power BI', 'Python', 'Power Query', 'Azure'],
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    metrics: ['500+ Employees', 'ML Prediction', 'Auto Refresh'],
    images: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
  {
    title: 'Financial Reporting Suite',
    description:
      'Multi-page financial reporting suite with P&L statements, cash flow analysis, and budget vs actuals comparison. Features row-level security for different departments.',
    fullDescription:
      'A multi-page Power BI reporting suite built for the finance department to replace manual Excel-based reporting.\n\nThe suite includes five interconnected report pages: Executive Summary, Profit & Loss Statement, Cash Flow Analysis, Budget vs Actuals Comparison, and Department Drilldown.\n\nRow-level security (RLS) ensures each department head only sees their own financial data, while the CFO has a global view. The data model connects to SSAS tabular models for fast aggregation across millions of transaction records.\n\nDAX calculations handle complex financial logic including cumulative totals, variance analysis, and rolling forecasts. The reports refresh automatically and are distributed via Power BI App to 8 department stakeholders.',
    features: [
      'P&L, Cash Flow, and Budget vs Actuals pages',
      'Row-level security per department',
      'SSAS tabular model integration',
      'Complex DAX for financial calculations',
      'Automated distribution via Power BI App',
      'Drill-down from company to department level',
    ],
    tags: ['Power BI', 'DAX', 'Excel', 'SSAS'],
    color: 'green',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    metrics: ['RLS Security', '8 Departments', 'Real-time'],
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
  {
    title: 'Supply Chain Dashboard',
    description:
      'End-to-end supply chain visibility dashboard with inventory tracking, supplier performance metrics, and demand forecasting using historical trends.',
    fullDescription:
      'An end-to-end supply chain analytics dashboard providing full visibility across procurement, warehousing, and distribution operations.\n\nThe dashboard tracks inventory levels in real-time across 3 warehouses, monitors supplier performance against SLAs, and uses Python-based demand forecasting models to predict stock requirements.\n\nKey views include: Inventory Heatmap, Supplier Scorecard, Order Fulfillment Tracker, Demand Forecast vs Actuals, and Logistics Cost Analysis.\n\nData is pulled from the ERP system via SQL queries, transformed in Power Query, and modeled using a snowflake schema optimized for supply chain analytics.',
    features: [
      'Real-time inventory tracking across 3 warehouses',
      'Supplier performance scorecard with SLA tracking',
      'Python-based demand forecasting model',
      'Order fulfillment and delivery time analysis',
      'Logistics cost breakdown and optimization',
      'Snowflake schema data model from ERP',
    ],
    tags: ['Power BI', 'SQL', 'Python', 'Forecasting'],
    color: 'yellow',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    metrics: ['50+ Suppliers', 'Forecast Model', '3 Warehouses'],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
  {
    title: 'Customer Segmentation Analysis',
    description:
      'Data-driven customer segmentation using RFM analysis and K-Means clustering, visualized through interactive Power BI reports with actionable marketing insights.',
    fullDescription:
      'A data science project combining Python analytics with Power BI visualization to segment 10,000+ customers into actionable marketing groups.\n\nThe analysis uses RFM (Recency, Frequency, Monetary) scoring as input features for a K-Means clustering algorithm. Python handles the data processing and model training, outputting segment labels that are imported into Power BI.\n\nThe Power BI report shows each segment\'s characteristics, spending patterns, and recommended marketing strategies. Interactive filters let the marketing team explore individual customer profiles within each segment.\n\nThe result: 5 distinct customer segments with tailored marketing playbooks that improved campaign ROI by 35%.',
    features: [
      'RFM scoring for customer behavior analysis',
      'K-Means clustering with optimal K selection',
      'Interactive segment explorer in Power BI',
      'Individual customer profile drill-through',
      'Marketing strategy recommendations per segment',
      'Campaign ROI tracking dashboard',
    ],
    tags: ['Python', 'Power BI', 'Machine Learning', 'Pandas'],
    color: 'primary',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    metrics: ['10K Customers', 'RFM + K-Means', '5 Segments'],
    images: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
  {
    title: 'COVID-19 Data Tracker',
    description:
      'Real-time pandemic tracking dashboard with geospatial mapping, trend analysis, and vaccination progress monitoring using public API data sources.',
    fullDescription:
      'A real-time COVID-19 tracking dashboard built to visualize pandemic data across 200+ countries using public REST API sources.\n\nThe dashboard connects directly to public health APIs and refreshes data multiple times daily. Power Query handles the API connections and data transformation, while DAX measures calculate 7-day moving averages, per-capita rates, and growth trends.\n\nKey pages include: Global Overview with interactive map, Country Comparison Tool, Vaccination Progress Tracker, and Historical Trend Analysis.\n\nThe ArcGIS map visual enables geospatial drill-down from continent to country to state level, providing granular insights into pandemic spread patterns.',
    features: [
      'Live REST API data connection',
      'ArcGIS geospatial mapping with drill-down',
      'Country-by-country comparison tool',
      'Vaccination progress tracker',
      '7-day moving averages and growth rates',
      'Historical trend analysis with forecasting',
    ],
    tags: ['Power BI', 'REST API', 'DAX', 'Map Visual'],
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    metrics: ['200+ Countries', 'Live API', 'Geo Mapping'],
    images: [
      'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&h=500&fit=crop',
    ],
    videoUrl: '',
    github: '#',
  },
]

const colorMap = {
  primary: {
    iconBg: 'bg-primary-500/10',
    iconBorder: 'border-primary-500/20',
    iconText: 'text-primary-400',
    tag: 'bg-primary-500/10 text-primary-300 border-primary-500/20',
    metric: 'text-primary-400',
  },
  purple: {
    iconBg: 'bg-accent-purple/10',
    iconBorder: 'border-accent-purple/20',
    iconText: 'text-accent-purple',
    tag: 'bg-accent-purple/10 text-purple-300 border-accent-purple/20',
    metric: 'text-accent-purple',
  },
  green: {
    iconBg: 'bg-accent-green/10',
    iconBorder: 'border-accent-green/20',
    iconText: 'text-accent-green',
    tag: 'bg-accent-green/10 text-green-300 border-accent-green/20',
    metric: 'text-accent-green',
  },
  yellow: {
    iconBg: 'bg-accent-yellow/10',
    iconBorder: 'border-accent-yellow/20',
    iconText: 'text-accent-yellow',
    tag: 'bg-accent-yellow/10 text-yellow-300 border-accent-yellow/20',
    metric: 'text-accent-yellow',
  },
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">Dashboards and analytics solutions I've built</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const colors = colorMap[project.color]
            return (
              <div
                key={project.title}
                className="glass-card glow-border group hover:bg-dark-800/60 transition-all duration-300 flex flex-col"
              >
                {/* Header */}
                <div className="p-6 pb-0">
                  <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center ${colors.iconText} mb-4 group-hover:scale-110 transition-transform`}>
                    {project.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{project.description}</p>
                </div>

                {/* Metrics */}
                <div className="px-6 py-4 flex flex-wrap gap-3">
                  {project.metrics.map((metric) => (
                    <span key={metric} className={`text-xs font-mono ${colors.metric}`}>
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Tags & Links */}
                <div className="mt-auto p-6 pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2.5 py-1 rounded-full border ${colors.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-sm text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View Details
                    </button>
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
