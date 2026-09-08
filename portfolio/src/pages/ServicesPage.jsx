import { Link } from 'react-router-dom'
import services from '../data/services'
import SEO from '../components/SEO'
import SectionDivider from '../components/SectionDivider'
import { getProfessionalServiceSchema, getBreadcrumbSchema } from '../utils/structuredData'
import ScarcityBadge from '../components/ScarcityBadge'

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <SEO
        title="Power BI & Microsoft Fabric Services | Dashboard Development, ETL, Data Modeling"
        description="Professional Power BI and Microsoft Fabric services including dashboard development, ETL data pipelines, data modeling, analytics consulting, and BI training. Get measurable results from your data."
        jsonLd={[getProfessionalServiceSchema(), getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])]}
      />
      {/* Hero Banner */}
      <section className="pt-10 md:pt-14 pb-10">
        <div className="container-xl">
          <ScarcityBadge className="mb-6" />
          <p className="label mb-3">What I Offer</p>
          <h1 className="heading-lg mb-4">
            Power BI & Fabric
            <span className="text-gradient"> Services</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            From initial data discovery to polished dashboards, I provide end-to-end analytics services
            tailored to your business needs. Every engagement is focused on measurable impact.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Flagship Offer */}
      <section className="pb-10">
        <div className="container-xl">
          <div className="glass p-8 md:p-12 border-brand-500/30 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/[0.07] rounded-full blur-[100px]" />
            <div className="relative z-10">
              <span className="badge bg-brand-500/15 text-accent-soft border border-brand-500/30 mb-4 inline-block">Flagship Offer</span>
              <h2 className="heading-md mb-4">
                4-Week E-Commerce Sales Intelligence
                <span className="text-gradient"> on Power BI &amp; Fabric</span>
              </h2>
              <p className="text-muted max-w-2xl leading-relaxed mb-8">
                A done-for-you sales dashboard that turns scattered e-commerce data into one trusted
                number — live by week 3, fully handed over by week 4. Power BI is the default delivery
                vehicle; Fabric is the upgrade path used when your data volume or sources call for it.
                The same 4-week methodology also applies to Inventory, Procurement &amp; Rebate Analytics.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* What's included */}
                <div>
                  <h3 className="text-sm font-bold text-heading mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {[
                      'Data sourcing & ETL from your existing systems (Shopify, spreadsheets, SQL, or Power BI)',
                      'Star-schema data modeling built for fast, accurate reporting',
                      'A custom Power BI sales dashboard with drill-through and mobile-friendly views',
                      'Hands-on training, documentation, and handover for your team',
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-muted">
                        <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-inset/30 rounded-2xl p-6 border border-line/30">
                  <h3 className="text-sm font-bold text-heading mb-4">Timeline</h3>
                  <ol className="space-y-4">
                    {[
                      { week: 'Week 1-2', label: 'Discovery, data sourcing & modeling' },
                      { week: 'Week 3', label: 'Live dashboard' },
                      { week: 'Week 4', label: 'Refinement, training & full handover' },
                    ].map((step) => (
                      <li key={step.week} className="flex items-center gap-3 text-sm text-muted">
                        <span className="w-16 shrink-0 text-xs font-bold text-accent">{step.week}</span>
                        {step.label}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Guarantee */}
              <div className="p-5 rounded-2xl bg-brand-500/[0.06] border border-brand-500/20 mb-6">
                <p className="text-sm font-bold text-heading mb-1">The 4-Week Live Guarantee</p>
                <p className="text-sm text-muted leading-relaxed">
                  If your dashboard isn't live and adopted by your team within 4 weeks, I keep working for free until it is.
                </p>
              </div>

              {/* Bonus */}
              <div className="p-5 rounded-2xl bg-warm-500/[0.06] border border-warm-500/20 mb-6">
                <p className="text-sm font-bold text-heading mb-1">Included Free: Handover Confidence Kit <span className="text-accent-warm font-normal">(a $400–600 value)</span></p>
                <p className="text-sm text-muted leading-relaxed">
                  So your team is never stuck without you — includes a hands-on training session, full documentation, and video walkthroughs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Book a Free Discovery Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Supporting Capabilities */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="mb-8">
            <p className="label mb-3">Supporting Capabilities</p>
            <p className="text-muted max-w-2xl leading-relaxed">
              The flagship engagement above draws on these core capabilities — each is also available
              as a standalone engagement if that's a better fit for your needs.
            </p>
          </div>
          <div className="space-y-6">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="glass p-8 md:p-10 hover:bg-inset/40 transition-all duration-300 hover:border-brand-500/30"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Icon + Title + Description */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={`w-14 h-14 rounded-2xl shrink-0 ${service.accent === 'brand' ? 'bg-brand-500/10 border-brand-500/20 text-accent' : 'bg-warm-500/10 border-warm-500/20 text-accent-warm'} border flex items-center justify-center`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                        </svg>
                      </div>
                      <div>
                        <h2 className="heading-sm mb-2">{service.title}</h2>
                        <span className="text-xs text-muted font-mono">0{idx + 1}</span>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed mb-6">{service.longDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((d) => (
                        <span key={d} className="badge bg-inset/60 text-body border border-line/40">{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Process */}
                  <div className="bg-inset/30 rounded-2xl p-6 border border-line/30">
                    <h3 className="text-sm font-bold text-heading mb-4">Process</h3>
                    <ol className="space-y-3">
                      {service.process.map((step, i) => (
                        <li key={step} className="flex items-center gap-3 text-sm text-muted">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${service.accent === 'brand' ? 'bg-brand-500/15 text-accent' : 'bg-warm-500/15 text-accent-warm'}`}>
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

      <SectionDivider />

      {/* CTA */}
      <section className="section-pad bg-card/20">
        <div className="container-xl text-center">
          <h2 className="heading-md mb-4">
            Ready to
            <span className="text-gradient"> Get Started?</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
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
