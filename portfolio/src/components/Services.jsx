const services = [
  {
    title: 'Dashboard Development',
    description: 'Custom Power BI dashboards with interactive visuals, drill-through navigation, and mobile-optimized layouts that tell your data story.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    deliverables: ['Interactive Reports', 'KPI Tracking', 'Mobile Views'],
    accent: 'brand',
  },
  {
    title: 'Data Analysis & Reporting',
    description: 'Deep-dive analysis into your data to uncover trends, patterns, and actionable insights that fuel strategic decision-making.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    deliverables: ['Trend Analysis', 'Forecasting', 'Executive Reports'],
    accent: 'warm',
  },
  {
    title: 'ETL & Data Pipelines',
    description: 'Automated data extraction, transformation, and loading pipelines using Power Query, SSIS, and Azure Data Factory for reliable data flow.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    deliverables: ['Data Integration', 'Automated Refresh', 'Quality Checks'],
    accent: 'brand',
  },
  {
    title: 'Data Modeling & Architecture',
    description: 'Designing efficient star/snowflake schemas, optimizing DAX calculations, and building scalable data models for enterprise analytics.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    deliverables: ['Star Schema', 'DAX Optimization', 'Performance Tuning'],
    accent: 'warm',
  },
  {
    title: 'Training & Consultation',
    description: 'One-on-one or team training sessions on Power BI, DAX, and data visualization best practices to level up your team\'s skills.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    deliverables: ['Workshops', 'Documentation', 'Best Practices'],
    accent: 'brand',
  },
  {
    title: 'Automation Solutions',
    description: 'Streamline repetitive workflows with Power Automate, Python scripts, and scheduled data refresh pipelines to save hours every week.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    deliverables: ['Power Automate', 'Scheduled Jobs', 'Alert Systems'],
    accent: 'warm',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="mb-14">
          <p className="label mb-3">What I Offer</p>
          <h2 className="heading-md">
            Services That
            <span className="text-gradient"> Drive Results</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-2xl">
            From initial data discovery to polished dashboards, I provide end-to-end analytics services
            tailored to your business needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass p-7 group hover:bg-surface-800/50 transition-all duration-300 hover:border-brand-500/30 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.accent === 'brand' ? 'bg-brand-500/10 border-brand-500/20 text-brand-400' : 'bg-warm-500/10 border-warm-500/20 text-warm-400'} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-surface-400 leading-relaxed mb-5 flex-1">{service.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-700/40">
                {service.deliverables.map((d) => (
                  <span key={d} className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
