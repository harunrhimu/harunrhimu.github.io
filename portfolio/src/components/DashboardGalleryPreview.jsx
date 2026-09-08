import { Link } from 'react-router-dom'
import dashboards from '../data/dashboards'

export default function DashboardGalleryPreview() {
  const preview = dashboards.slice(0, 3)

  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="label mb-3">Visual Work</p>
            <h2 className="heading-md">
              Dashboard
              <span className="text-gradient"> Gallery</span>
            </h2>
            <p className="text-muted mt-4 max-w-2xl">
              Real Power BI reports built around specific business questions. Every layout, every visual, every number earns its place.
            </p>
          </div>
          <Link to="/dashboard-gallery" className="btn-outline shrink-0 self-start">
            View Full Gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {preview.map((item, idx) => {
            const isFullWidth = idx === 0 && preview.length > 1
            return (
              <Link
                key={item.id}
                to="/dashboard-gallery"
                className={`group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300 ${
                  isFullWidth ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isFullWidth ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-page/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600/90 text-white text-sm font-semibold backdrop-blur-sm">
                      View in Gallery
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="badge bg-card/80 text-body border border-line/40 backdrop-blur-sm">
                      {item.category}
                    </span>
                    {item.pages && (
                      <span className="badge bg-card/80 text-muted border border-line/40 backdrop-blur-sm">
                        {item.pages} pages
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-heading mb-2 group-hover:text-accent-soft transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-accent italic mb-3 line-clamp-2">
                    "{item.question}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-medium px-2 py-1 rounded-md bg-inset/60 text-muted border border-line/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
