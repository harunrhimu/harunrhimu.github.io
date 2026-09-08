import { Link } from 'react-router-dom'
import testimonials from '../data/testimonials'

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-accent-warm" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Reviews</p>
          <h2 className="heading-md">
            What Clients
            <span className="text-gradient"> Say</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Don't just take my word for it. Here's feedback from people I've worked with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass p-7 hover:bg-inset/40 transition-all duration-300 group"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 mb-6 text-body leading-relaxed text-sm italic">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-line/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-warm-500/20 flex items-center justify-center text-accent font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-heading">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after social proof */}
        <div className="text-center">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            Join 20+ Happy Clients
          </Link>
          <p className="text-sm text-muted mt-3">Your success story could be next</p>
        </div>
      </div>
    </section>
  )
}
