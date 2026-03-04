import { useState } from 'react'
import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies'

const industries = ['All', ...new Set(caseStudies.map(cs => cs.industry))]

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? caseStudies : caseStudies.filter(cs => cs.industry === filter)

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="section-pad pb-16">
        <div className="container-xl">
          <p className="label mb-3">Portfolio</p>
          <h1 className="heading-lg mb-4">
            Case
            <span className="text-gradient"> Studies</span>
          </h1>
          <p className="text-lg text-surface-400 max-w-2xl leading-relaxed">
            Real projects with measurable impact. Here's how I've helped businesses unlock the power of their data.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === ind
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-surface-900/60 text-surface-400 border border-surface-700/40 hover:border-brand-500/30 hover:text-brand-400'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((cs) => (
              <Link
                key={cs.slug}
                to={`/case-studies/${cs.slug}`}
                className="group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">{cs.industry}</span>
                    {cs.featured && (
                      <span className="badge bg-warm-500/10 text-warm-300 border border-warm-500/20">Featured</span>
                    )}
                    <span className="text-xs text-surface-500">{cs.client}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                    {cs.title}
                  </h2>

                  <p className="text-sm text-surface-400 leading-relaxed mb-5 line-clamp-2">{cs.challenge}</p>

                  {/* Results */}
                  <div className="flex gap-6 mb-5 pt-5 border-t border-surface-700/40">
                    {cs.results.map((r) => (
                      <div key={r.label}>
                        <p className="text-xl font-bold text-gradient">{r.metric}</p>
                        <p className="text-[10px] text-surface-500 font-medium">{r.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-surface-800/60 text-surface-400 border border-surface-700/30">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
