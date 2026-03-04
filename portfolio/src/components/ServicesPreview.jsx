import { Link } from 'react-router-dom'
import services from '../data/services'

export default function ServicesPreview() {
  return (
    <section className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
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
          <Link to="/services" className="btn-outline shrink-0 self-start">
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass p-7 group hover:bg-surface-800/50 transition-all duration-300 hover:border-brand-500/30 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.accent === 'brand' ? 'bg-brand-500/10 border-brand-500/20 text-brand-400' : 'bg-warm-500/10 border-warm-500/20 text-warm-400'} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                </svg>
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
