import { useState } from 'react'

const caseStudies = [
  {
    title: 'Sales Performance Dashboard',
    client: 'E-Commerce Retailer',
    industry: 'Retail',
    challenge: 'Manual weekly reporting consumed 8+ hours and data was always outdated by the time leadership saw it.',
    solution: 'Built an interactive Power BI dashboard with real-time data refresh, drill-through from regions to individual reps, and automated email delivery.',
    results: [
      { metric: '60%', label: 'Faster Reporting' },
      { metric: '5', label: 'Regions Tracked' },
      { metric: '100K+', label: 'Records Processed' },
    ],
    tags: ['Power BI', 'DAX', 'SQL Server', 'Data Modeling'],
    featured: true,
  },
  {
    title: 'HR Analytics & Attrition Prediction',
    client: 'Tech Startup',
    industry: 'Technology',
    challenge: 'High employee turnover with no visibility into patterns or early warning signs.',
    solution: 'Combined Python ML models with Power BI dashboards to create attrition risk scores and diversity metrics, refreshed daily from Azure SQL.',
    results: [
      { metric: '35%', label: 'Attrition Reduced' },
      { metric: '500+', label: 'Employees Tracked' },
      { metric: 'ML', label: 'Prediction Model' },
    ],
    tags: ['Python', 'Power BI', 'Azure', 'Machine Learning'],
    featured: false,
  },
  {
    title: 'Financial Reporting Suite',
    client: 'Manufacturing Firm',
    industry: 'Finance',
    challenge: 'Finance team relied on spreadsheets for P&L, cash flow, and budgets -- error-prone and slow.',
    solution: 'Multi-page Power BI suite with row-level security, SSAS integration, and complex DAX financial calculations distributed to 8 departments.',
    results: [
      { metric: '8', label: 'Departments Served' },
      { metric: 'RLS', label: 'Security Model' },
      { metric: '90%', label: 'Time Saved' },
    ],
    tags: ['Power BI', 'DAX', 'SSAS', 'Row-Level Security'],
    featured: false,
  },
  {
    title: 'Supply Chain Visibility Dashboard',
    client: 'Logistics Company',
    industry: 'Supply Chain',
    challenge: 'No centralized view of inventory levels, supplier performance, or delivery timelines across 3 warehouses.',
    solution: 'End-to-end dashboard tracking inventory in real-time, supplier SLA scorecards, and Python-based demand forecasting integrated with their ERP.',
    results: [
      { metric: '3', label: 'Warehouses Unified' },
      { metric: '50+', label: 'Suppliers Monitored' },
      { metric: '25%', label: 'Cost Reduction' },
    ],
    tags: ['Power BI', 'SQL', 'Python', 'Forecasting'],
    featured: false,
  },
  {
    title: 'Customer Segmentation Analysis',
    client: 'Digital Marketing Agency',
    industry: 'Marketing',
    challenge: 'Generic marketing campaigns with low ROI due to no understanding of customer behavior segments.',
    solution: 'RFM analysis and K-Means clustering in Python, visualized in Power BI with segment profiles and recommended marketing strategies per group.',
    results: [
      { metric: '35%', label: 'ROI Improvement' },
      { metric: '10K+', label: 'Customers Analyzed' },
      { metric: '5', label: 'Segments Created' },
    ],
    tags: ['Python', 'Power BI', 'K-Means', 'Pandas'],
    featured: false,
  },
]

export default function CaseStudies() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="case-studies" className="section-pad">
      <div className="container-xl">
        <div className="mb-14">
          <p className="label mb-3">Portfolio</p>
          <h2 className="heading-md">
            Case
            <span className="text-gradient"> Studies</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-2xl">
            Real projects with measurable impact. Here's how I've helped businesses unlock the power of their data.
          </p>
        </div>

        {/* Featured Case Study */}
        {caseStudies.filter(c => c.featured).map((cs) => (
          <div key={cs.title} className="glass p-8 md:p-10 mb-8 border-brand-500/20 hover:border-brand-500/40 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge bg-brand-500/15 text-brand-300 border border-brand-500/20">Featured</span>
              <span className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">{cs.industry}</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="heading-sm mb-3">{cs.title}</h3>
                <p className="text-sm text-surface-500 font-medium mb-4">Client: {cs.client}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-surface-300 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-surface-300 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {cs.results.map((r) => (
                    <div key={r.label} className="text-center p-5 bg-surface-800/40 rounded-2xl border border-surface-700/30">
                      <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-1">{r.metric}</p>
                      <p className="text-xs text-surface-400 font-medium">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Other Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {caseStudies.filter(c => !c.featured).map((cs, idx) => (
            <div
              key={cs.title}
              className="glass p-6 hover:bg-surface-800/40 transition-all duration-300 hover:border-surface-600/50 cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">{cs.industry}</span>
                <span className="text-xs text-surface-500">{cs.client}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{cs.title}</h3>

              {/* Results Row */}
              <div className="flex gap-4 mb-4">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <p className="text-lg font-bold text-gradient">{r.metric}</p>
                    <p className="text-[10px] text-surface-500 font-medium">{r.label}</p>
                  </div>
                ))}
              </div>

              {/* Expandable Content */}
              {expanded === idx && (
                <div className="space-y-3 pt-4 border-t border-surface-700/40 animate-fade-in">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-surface-400 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-surface-400 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {cs.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-surface-800/60 text-surface-400 border border-surface-700/30">{tag}</span>
                ))}
              </div>

              {/* Toggle hint */}
              <div className="flex items-center gap-1 mt-4 text-xs text-surface-500">
                <svg className={`w-3.5 h-3.5 transition-transform ${expanded === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {expanded === idx ? 'Less' : 'View details'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
