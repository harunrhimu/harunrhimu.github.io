import { Link } from 'react-router-dom'
import ScarcityBadge from './ScarcityBadge'

export default function CtaBanner() {
  return (
    <section className="section-pad bg-card/20">
      <div className="container-xl">
        <div className="glass p-10 md:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/[0.07] rounded-full blur-[100px]" />

          <div className="relative z-10">
            <ScarcityBadge className="mb-6" />
            <p className="label mb-3">Ready to Get Started?</p>
            <h2 className="heading-md mb-4">
              Your Competitors Are Building{' '}
              <span className="text-gradient">AI-Ready Data Platforms</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-2 text-lg leading-relaxed">
              Every month without a unified data foundation is a month of decisions
              made on gut feelings, manual reports, and outdated spreadsheets.
            </p>
            <p className="text-body max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              The question isn't whether you need this — it's how soon you can start.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link to="/contact" className="btn-primary text-lg px-8 py-3.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Book a Free Discovery Call
              </Link>
            </div>

            {/* Guarantee */}
            <div className="max-w-xl mx-auto mt-8 p-5 rounded-2xl bg-brand-500/[0.06] border border-brand-500/20">
              <p className="text-sm font-bold text-heading mb-1">The 4-Week Live Guarantee</p>
              <p className="text-sm text-muted leading-relaxed">
                If your dashboard isn't live and adopted by your team within 4 weeks, I keep working for free until it is.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-sm text-muted">Free consultation. No obligation. No hard sell.</span>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-line/40">
              {[
                { value: '35+', label: 'Reports Delivered' },
                { value: '20+', label: 'Happy Clients' },
                { value: '40%', label: 'Avg. Time Saved' },
                { value: '100+', label: 'Data Sources Unified' },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-2">
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
