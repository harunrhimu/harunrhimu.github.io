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
            <p className="text-surface-400 mt-4 max-w-2xl">
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

        {/* Featured */}
        {featured && (
          <Link
            to={`/case-studies/${featured.slug}`}
            className="block glass p-8 md:p-10 mb-8 border-brand-500/20 hover:border-brand-500/40 transition-all group"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="badge bg-brand-500/15 text-brand-300 border border-brand-500/20">Featured</span>
              <span className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">{featured.industry}</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="heading-sm mb-3 group-hover:text-brand-300 transition-colors">{featured.title}</h3>
                <p className="text-sm text-surface-500 font-medium mb-4">Client: {featured.client}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-surface-300 leading-relaxed">{featured.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-surface-300 leading-relaxed">{featured.solution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {featured.results.map((r) => (
                    <div key={r.label} className="text-center p-5 bg-surface-800/40 rounded-2xl border border-surface-700/30">
                      <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-1">{r.metric}</p>
                      <p className="text-xs text-surface-400 font-medium">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Other Case Studies */}
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((cs) => (
            <Link
              key={cs.slug}
              to={`/case-studies/${cs.slug}`}
              className="glass p-6 hover:bg-surface-800/40 transition-all duration-300 hover:border-surface-600/50 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="badge bg-surface-800/60 text-surface-300 border border-surface-700/40">{cs.industry}</span>
                <span className="text-xs text-surface-500">{cs.client}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{cs.title}</h3>

              <div className="flex gap-4 mb-4">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <p className="text-lg font-bold text-gradient">{r.metric}</p>
                    <p className="text-[10px] text-surface-500 font-medium">{r.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-surface-800/60 text-surface-400 border border-surface-700/30">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
