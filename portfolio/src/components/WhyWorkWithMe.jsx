import { Link } from 'react-router-dom'

const valueProps = [
  {
    accent: 'brand',
    title: 'Problems Get Solved',
    iconPath: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
    problem:
      'Scattered data across dozens of spreadsheets, no single source of truth, and hours wasted on manual reporting every week.',
    solution:
      'I build centralized data platforms on Microsoft Fabric with automated pipelines that consolidate all your data into one reliable source.',
    benefit:
      'Decisions backed by accurate, real-time data instead of gut feelings.',
  },
  {
    accent: 'warm',
    title: 'Costs Get Minimized',
    iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    problem:
      'Teams spend 40%+ of their time gathering and cleaning data instead of analyzing it. That is expensive labor wasted on manual work.',
    solution:
      'Automated ETL pipelines and self-service dashboards eliminate repetitive data prep, freeing your team for high-value work.',
    benefit:
      'Reclaim hundreds of hours per quarter and reduce operational costs by up to 40%.',
  },
  {
    accent: 'brand',
    title: 'You Get More Value',
    iconPath: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
    problem:
      'Existing reports are static, hard to read, and only accessible to a handful of technical users.',
    solution:
      'Interactive Power BI dashboards with drill-downs, filters, and role-based access so every stakeholder sees what matters to them.',
    benefit:
      'A data-driven culture where everyone from the CEO to frontline staff makes informed decisions daily.',
  },
]

export default function WhyWorkWithMe() {
  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Why Work With Me</p>
          <h2 className="heading-md">
            Real Problems,{' '}
            <span className="text-gradient">Real Solutions</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            Every engagement is focused on delivering measurable business impact —
            not just pretty charts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
          {valueProps.map((item) => (
            <div
              key={item.title}
              className="glass p-7 group hover:bg-inset/50 transition-all duration-300 hover:border-brand-500/30 flex flex-col"
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

              <h3 className="text-lg font-bold text-heading mb-5">{item.title}</h3>

              {/* Problem */}
              <div className="mb-4">
                <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-1.5">
                  The Problem
                </p>
                <p className="text-sm text-muted leading-relaxed">{item.problem}</p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-1.5">
                  My Solution
                </p>
                <p className="text-sm text-body leading-relaxed">{item.solution}</p>
              </div>

              {/* Benefit */}
              <div className="mt-auto pt-4 border-t border-line/40">
                <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1.5 ${
                  item.accent === 'brand' ? 'text-accent' : 'text-accent-warm'
                }`}>
                  Your Benefit
                </p>
                <p className="text-sm text-heading font-medium leading-relaxed">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            Let's Solve Your Data Challenge
          </Link>
          <p className="text-sm text-muted mt-3">Free initial consultation — no strings attached</p>
        </div>
      </div>
    </section>
  )
}
