const features = [
  {
    accent: 'brand',
    iconPath: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
    title: 'One Platform, All Your Data',
    desc: 'Microsoft Fabric unifies 100+ data sources into a single platform — Lakehouse, Data Warehouse, OneLake — eliminating data silos and reducing infrastructure costs. No more juggling between disconnected tools.',
  },
  {
    accent: 'warm',
    iconPath: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    title: 'AI-Ready Semantic Models',
    desc: 'Build semantic models that Copilot and AI tools can understand. Your team asks plain English questions — "What caused the revenue drop last quarter?" — and gets instant, accurate answers directly from your data.',
  },
  {
    accent: 'brand',
    iconPath: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
    title: 'Enterprise-Grade, Without Enterprise Headaches',
    desc: 'Row-level security, automated pipelines, real-time dashboards, and governance built in — not bolted on. From a 5-person startup to a 5,000-employee enterprise, Fabric scales with you without multiplying complexity.',
  },
]

export default function AiFabricSection() {
  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Why Fabric & Power BI in the AI Era</p>
          <h2 className="heading-md">
            Your Business Needs an{' '}
            <span className="text-gradient">AI-Ready Data Platform</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            Spreadsheets can't talk to AI. Disconnected databases can't power Copilot.
            In the AI era, the businesses that win are the ones with a unified,
            well-modeled data foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((item) => (
            <div
              key={item.title}
              className="glass p-7 group hover:bg-inset/50 transition-all duration-300 hover:border-brand-500/30"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${
                  item.accent === 'brand'
                    ? 'bg-brand-500/10 border-brand-500/20'
                    : 'bg-warm-500/10 border-warm-500/20'
                } border flex items-center justify-center mb-5`}
              >
                <svg
                  className={`w-7 h-7 ${
                    item.accent === 'brand' ? 'text-accent' : 'text-accent-warm'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-heading mb-3">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="glass p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-warm-500/10 border border-warm-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <p className="text-heading font-semibold mb-1">The bottom line</p>
              <p className="text-sm text-muted leading-relaxed">
                Companies using AI on top of well-structured data see up to{' '}
                <span className="text-heading font-medium">3x faster decision-making</span> and{' '}
                <span className="text-accent-warm font-medium">40% lower reporting costs</span>.
                I build the data foundation that makes this possible — so when you plug in
                Copilot or any AI tool, it actually works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
