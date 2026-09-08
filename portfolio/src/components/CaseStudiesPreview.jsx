import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies'

export default function CaseStudiesPreview() {
  const featured = caseStudies.find(c => c.featured)
  const others = caseStudies.filter(c => !c.featured).slice(0, 2)

  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="label mb-3">Portfolio</p>
            <h2 className="heading-md">
              Case
              <span className="text-gradient"> Studies</span>
            </h2>
            <p className="text-muted mt-4 max-w-2xl">
              Real projects with measurable impact. Here's how I've helped businesses unlock the power of their data.
            </p>
          </div>
          <Link to="/case-studies" className="btn-outline shrink-0 self-start">
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Featured Case Study with Video */}
        {featured && (
          <div className="group glass overflow-hidden mb-8 border-brand-500/20 hover:border-brand-500/40 transition-all">
            {/* Dashboard Image with hover overlay */}
            <Link to={`/case-studies/${featured.slug}`} className="block relative aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-page/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600/90 text-white text-sm font-semibold backdrop-blur-sm">
                  See Full Case Study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="badge bg-brand-500/15 text-accent-soft border border-brand-500/20">Featured</span>
                <span className="badge bg-inset/60 text-body border border-line/40">{featured.industry}</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="heading-sm mb-3">{featured.title}</h3>
                  <p className="text-sm text-muted font-medium mb-4">Client: {featured.client}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-sm text-body leading-relaxed">{featured.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-sm text-body leading-relaxed">{featured.solution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="badge bg-brand-500/10 text-accent-soft border border-brand-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {featured.results.map((r) => (
                      <div key={r.label} className="text-center p-5 bg-inset/40 rounded-2xl border border-line/30">
                        <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-1">{r.metric}</p>
                        <p className="text-xs text-muted font-medium">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Case Studies with Video */}
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((cs) => (
            <div
              key={cs.slug}
              className="group glass overflow-hidden hover:bg-inset/40 transition-all duration-300 hover:border-line-strong/50"
            >
              {/* Dashboard Image with hover overlay */}
              <Link to={`/case-studies/${cs.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-page/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600/90 text-white text-sm font-semibold backdrop-blur-sm">
                    See Full Case Study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge bg-inset/60 text-body border border-line/40">{cs.industry}</span>
                  <span className="text-xs text-muted">{cs.client}</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-3">{cs.title}</h3>

                <div className="flex gap-4 mb-4">
                  {cs.results.map((r) => (
                    <div key={r.label}>
                      <p className="text-lg font-bold text-gradient">{r.metric}</p>
                      <p className="text-[10px] text-muted font-medium">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-inset/60 text-muted border border-line/30">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
