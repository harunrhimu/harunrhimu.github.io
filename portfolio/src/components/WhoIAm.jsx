import { Link } from 'react-router-dom'

const highlights = [
  'End-to-end: from data ingestion to dashboard',
  'Microsoft Fabric & Power BI specialist',
  'SQL, Python, DAX & Power Query expert',
  'Training & knowledge transfer included',
]

export default function WhoIAm() {
  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Who I Am</p>
          <h2 className="heading-md">
            Your Data,{' '}
            <span className="text-gradient">Transformed Into Decisions</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg md:text-xl text-body leading-relaxed text-center">
            I help businesses <span className="text-heading font-medium">stop drowning in spreadsheets</span> and
            start making data-driven decisions. As a <span className="text-accent font-medium"> Microsoft Certified Fabric Analytics Engineer (DP-600), Fabric Data Engineer (DP-700) and Power BI Data Analyst (PL-300)</span>,
            I build end-to-end data platforms that turn your scattered, messy data into clear, actionable dashboards
            your entire team can use.
          </p>
          <p className="text-lg md:text-xl text-body leading-relaxed text-center">
            Whether you need a <span className="text-heading font-medium">Lakehouse architecture</span> from scratch,
            automated ETL pipelines, or executive dashboards that update in real time — I handle the full data
            journey so you can focus on what you do best: <span className="text-accent font-medium">running your business</span>.
          </p>

          {/* Key differentiators */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 max-w-2xl mx-auto">
            {highlights.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm text-body">{text}</span>
              </div>
            ))}
          </div>

          {/* Speaking */}
          <div className="max-w-2xl mx-auto">
            <div className="glass p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-brand-500/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-warm-500/10 border border-warm-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-heading mb-1">
                  Power BI Git Integration &amp; CI/CD with Microsoft Fabric
                </p>
                <p className="text-xs text-accent-warm font-medium">
                  Speaker &mdash; Global Fabric Data Day 2026, Dhaka
                </p>
              </div>
              <span className="text-[10px] text-muted font-mono bg-inset/80 px-2 py-1 rounded shrink-0 self-start sm:self-center">
                27 June 2026
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link to="/case-studies" className="btn-primary">
              See My Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
