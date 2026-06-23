const beforeItems = [
  'Dozens of disconnected Excel spreadsheets',
  'Manual copy-paste reporting every Monday',
  'Decisions based on gut feelings',
  'Hours wasted finding the "right" numbers',
  'Data silos across departments',
  'Static PDF reports nobody reads',
]

const afterItems = [
  'One unified data platform on Microsoft Fabric',
  'Automated pipelines that refresh in real-time',
  'Decisions backed by live, accurate data',
  'Self-service dashboards — answers in seconds',
  'Single source of truth for the entire org',
  'Interactive Power BI dashboards everyone loves',
]

export default function BeforeAfter() {
  return (
    <section className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">The Transformation</p>
          <h2 className="heading-md">
            From Spreadsheet Chaos to{' '}
            <span className="text-gradient">Data-Driven Clarity</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-2xl mx-auto">
            Here's what changes when you invest in a proper data foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {/* Before */}
          <div className="glass p-7 border-red-500/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-400">Before</h3>
            </div>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-surface-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="glass p-7 border-brand-500/20 bg-brand-500/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-400">After</h3>
            </div>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-sm text-surface-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
