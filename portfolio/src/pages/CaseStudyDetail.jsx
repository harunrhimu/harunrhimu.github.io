import { useParams, Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import Markdown from '../components/Markdown'
import { getBreadcrumbSchema } from '../utils/structuredData'

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const cs = caseStudies.find(c => c.slug === slug)

  if (!cs) {
    return (
      <main className="pt-20 section-pad">
        <div className="container-xl text-center">
          <h1 className="heading-md mb-4">Case Study Not Found</h1>
          <p className="text-muted mb-8">The case study you're looking for doesn't exist.</p>
          <Link to="/case-studies" className="btn-primary">View All Case Studies</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20">
      <SEO
        title={`${cs.title} | Power BI Case Study`}
        description={`${cs.challenge} See how Power BI and ${cs.tags.slice(0, 3).join(', ')} solved this ${cs.industry} data challenge.`}
        image={cs.image}
        type="article"
        jsonLd={[getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }, { name: cs.title, url: `/case-studies/${cs.slug}` }])]}
      />
      {/* Hero */}
      <article>
      <section className="pt-10 md:pt-14 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }, { name: cs.title, url: `/case-studies/${cs.slug}` }]} />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge bg-brand-500/15 text-accent-soft border border-brand-500/20">{cs.industry}</span>
            {cs.featured && <span className="badge bg-warm-500/15 text-accent-warm border border-warm-500/20">Featured</span>}
          </div>

          <h1 className="heading-lg mb-4">{cs.title}</h1>
          <p className="text-lg text-muted">Client: <span className="text-heading font-medium">{cs.client}</span></p>
        </div>
      </section>

      {/* Dashboard Image / PDF */}
      <section className="pb-10">
        <div className="container-xl">
          <div className="rounded-2xl overflow-hidden border border-line/40">
            <img src={cs.image} alt={cs.title} loading="lazy" className="w-full" />
          </div>
        </div>
      </section>

      {/* Video Walkthrough */}
      {cs.videoUrl && (
        <section className="pb-10">
          <div className="container-xl">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Project Walkthrough</p>
            <div className="rounded-2xl overflow-hidden border border-line/40 bg-card">
              <div className="aspect-video">
                <iframe
                  src={cs.videoUrl}
                  title={cs.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-xs text-muted mt-3 text-center">Watch the full project walkthrough and presentation</p>
          </div>
        </section>
      )}

      {/* Results Bar */}
      <section className="pb-10">
        <div className="container-xl">
          <div className="grid grid-cols-3 gap-4">
            {cs.results.map((r) => (
              <div key={r.label} className="glass p-6 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{r.metric}</p>
                <p className="text-xs text-muted font-medium">{r.label}</p>
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
              {cs.content ? (
              <div className="glass p-8">
                <Markdown>{cs.content.replace(/^#\s+.*(\r?\n)+/, '')}</Markdown>
              </div>
              ) : (
              <>
              {/* Challenge */}
              <div className="glass p-8">
                <h2 className="text-lg font-bold text-heading mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-500/10 border border-warm-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  The Challenge
                </h2>
                <p className="text-muted leading-relaxed">{cs.challenge}</p>
                {cs.challengePoints && (
                  <ul className="mt-4 space-y-3">
                    {cs.challengePoints.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-body">
                        <svg className="w-5 h-5 text-accent-warm shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {cs.challengeOutcome && (
                  <p className="text-muted leading-relaxed mt-4">{cs.challengeOutcome}</p>
                )}
              </div>

              {/* Solution */}
              <div className="glass p-8">
                <h2 className="text-lg font-bold text-heading mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  The Solution
                </h2>
                <p className="text-muted leading-relaxed mb-6">{cs.solution}</p>
                {cs.details && (
                  <ul className="space-y-3">
                    {cs.details.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted">
                        <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="glass p-6">
                <h3 className="text-sm font-bold text-heading mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="badge bg-brand-500/10 text-accent-soft border border-brand-500/20">{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="glass p-6">
                <h3 className="text-sm font-bold text-heading mb-3">Have a Similar Challenge?</h3>
                <p className="text-sm text-muted mb-5">Let's discuss how I can help solve your data problems.</p>
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </article>
    </main>
  )
}
