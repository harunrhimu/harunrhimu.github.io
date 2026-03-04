import { useParams, Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies'

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const cs = caseStudies.find(c => c.slug === slug)

  if (!cs) {
    return (
      <main className="pt-24 section-pad">
        <div className="container-xl text-center">
          <h1 className="heading-md mb-4">Case Study Not Found</h1>
          <p className="text-surface-400 mb-8">The case study you're looking for doesn't exist.</p>
          <Link to="/case-studies" className="btn-primary">View All Case Studies</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-pad pb-10">
        <div className="container-xl">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-400 transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Case Studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge bg-brand-500/15 text-brand-300 border border-brand-500/20">{cs.industry}</span>
            {cs.featured && <span className="badge bg-warm-500/15 text-warm-300 border border-warm-500/20">Featured</span>}
          </div>

          <h1 className="heading-lg mb-4">{cs.title}</h1>
          <p className="text-lg text-surface-400">Client: <span className="text-white font-medium">{cs.client}</span></p>
        </div>
      </section>

      {/* Image */}
      <section className="pb-10">
        <div className="container-xl">
          <div className="rounded-2xl overflow-hidden border border-surface-700/40">
            <img src={cs.image} alt={cs.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="pb-10">
        <div className="container-xl">
          <div className="grid grid-cols-3 gap-4">
            {cs.results.map((r) => (
              <div key={r.label} className="glass p-6 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{r.metric}</p>
                <p className="text-xs text-surface-400 font-medium">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <div className="glass p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-500/10 border border-warm-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  The Challenge
                </h2>
                <p className="text-surface-400 leading-relaxed">{cs.challenge}</p>
              </div>

              {/* Solution */}
              <div className="glass p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  The Solution
                </h2>
                <p className="text-surface-400 leading-relaxed mb-6">{cs.solution}</p>
                {cs.details && (
                  <ul className="space-y-3">
                    {cs.details.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-sm text-surface-400">
                        <svg className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="glass p-6">
                <h3 className="text-sm font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="glass p-6">
                <h3 className="text-sm font-bold text-white mb-3">Have a Similar Challenge?</h3>
                <p className="text-sm text-surface-400 mb-5">Let's discuss how I can help solve your data problems.</p>
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
