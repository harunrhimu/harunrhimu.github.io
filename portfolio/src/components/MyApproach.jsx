const steps = [
  { step: '01', label: 'Discover', desc: 'Understand business needs & goals', color: 'brand' },
  { step: '02', label: 'Extract', desc: 'Gather & connect data sources', color: 'brand' },
  { step: '03', label: 'Transform', desc: 'Clean, model & optimize data', color: 'warm' },
  { step: '04', label: 'Visualize', desc: 'Build interactive dashboards', color: 'warm' },
  { step: '05', label: 'Deliver', desc: 'Insights, deployment & training', color: 'brand' },
]

export default function MyApproach() {
  return (
    <section className="section-pad bg-card/20">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">My Process</p>
          <h2 className="heading-md">
            From Raw Data to{' '}
            <span className="text-gradient">Business Value</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            A proven 5-step methodology that ensures every project delivers
            measurable results, on time and within budget.
          </p>
        </div>

        {/* Steps with connected circles */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-[2px] bg-inset/60" />

            {steps.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center group">
                {/* Circle */}
                <div
                  className={`relative z-10 w-[60px] h-[60px] rounded-full ${
                    item.color === 'brand'
                      ? 'bg-brand-500/15 border-brand-500/40 group-hover:border-brand-400 group-hover:bg-brand-500/25'
                      : 'bg-warm-500/15 border-warm-500/40 group-hover:border-warm-400 group-hover:bg-warm-500/25'
                  } border-2 flex items-center justify-center transition-all duration-300`}
                >
                  <span
                    className={`text-lg font-bold font-mono ${
                      item.color === 'brand' ? 'text-accent' : 'text-accent-warm'
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Label & Description */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-heading mb-1">{item.label}</p>
                  <p className="text-xs text-muted max-w-[140px] mx-auto leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
