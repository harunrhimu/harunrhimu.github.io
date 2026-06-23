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
          <p className="text-lg md:text-xl text-surface-300 leading-relaxed text-center">
            I help businesses <span className="text-white font-medium">stop drowning in spreadsheets</span> and
            start making data-driven decisions. As a <span className="text-brand-400 font-medium"> Microsoft Certified Fabric Analytics Engineer and Power BI Developer</span>,
            I build end-to-end data platforms that turn your scattered, messy data into clear, actionable dashboards
            your entire team can use.
          </p>
          <p className="text-lg md:text-xl text-surface-300 leading-relaxed text-center">
            Whether you need a <span className="text-white font-medium">Lakehouse architecture</span> from scratch,
            automated ETL pipelines, or executive dashboards that update in real time — I handle the full data
            journey so you can focus on what you do best: <span className="text-brand-400 font-medium">running your business</span>.
          </p>

          {/* Key differentiators */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 max-w-2xl mx-auto">
            {highlights.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm text-surface-300">{text}</span>
              </div>
            ))}
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
