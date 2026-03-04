import testimonials from '../data/testimonials'

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-warm-400" fill="currentColor" viewBox="0 0 20 20">
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
          <p className="text-surface-400 mt-4 max-w-xl mx-auto">
            Don't just take my word for it. Here's feedback from people I've worked with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass p-7 hover:bg-surface-800/40 transition-all duration-300 group"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 mb-6 text-surface-300 leading-relaxed text-sm italic">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-surface-700/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-warm-500/20 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-surface-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
