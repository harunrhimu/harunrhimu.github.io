import { Link } from 'react-router-dom'
import services from '../data/services'

export default function ServicesPage() {
  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="section-pad pb-16">
        <div className="container-xl">
          <p className="label mb-3">What I Offer</p>
          <h1 className="heading-lg mb-4">
            Services That
            <span className="text-gradient"> Drive Results</span>
          </h1>
          <p className="text-lg text-surface-400 max-w-2xl leading-relaxed">
            From initial data discovery to polished dashboards, I provide end-to-end analytics services
            tailored to your business needs. Every engagement is focused on measurable impact.
          </p>
        </div>
      </section>

      {/* All Services */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="space-y-6">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="glass p-8 md:p-10 hover:bg-surface-800/40 transition-all duration-300 hover:border-brand-500/30"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Icon + Title + Description */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={`w-14 h-14 rounded-2xl shrink-0 ${service.accent === 'brand' ? 'bg-brand-500/10 border-brand-500/20 text-brand-400' : 'bg-warm-500/10 border-warm-500/20 text-warm-400'} border flex items-center justify-center`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                        </svg>
                      </div>
                      <div>
                        <h2 className="heading-sm mb-2">{service.title}</h2>
                        <span className="text-xs text-surface-500 font-mono">0{idx + 1}</span>
                      </div>
                    </div>
                    <p className="text-surface-400 leading-relaxed mb-6">{service.longDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((d) => (
                        <span key={d} className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Process */}
                  <div className="bg-surface-800/30 rounded-2xl p-6 border border-surface-700/30">
                    <h3 className="text-sm font-bold text-white mb-4">Process</h3>
                    <ol className="space-y-3">
                      {service.process.map((step, i) => (
                        <li key={step} className="flex items-center gap-3 text-sm text-surface-400">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${service.accent === 'brand' ? 'bg-brand-500/15 text-brand-400' : 'bg-warm-500/15 text-warm-400'}`}>
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-surface-900/20">
        <div className="container-xl text-center">
          <h2 className="heading-md mb-4">
            Ready to
            <span className="text-gradient"> Get Started?</span>
          </h2>
          <p className="text-surface-400 max-w-xl mx-auto mb-8">
            Let's discuss your project and find the right solution for your data challenges.
          </p>
          <Link to="/contact" className="btn-primary">
            Start a Conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
