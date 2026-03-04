import { Link } from 'react-router-dom'
import { categories, certifications } from '../data/skills'

export default function SkillsPreview() {
  return (
    <section className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="label mb-3">Tech Stack</p>
            <h2 className="heading-md">
              Tools &
              <span className="text-gradient"> Technologies</span>
            </h2>
            <p className="text-surface-400 mt-4 max-w-2xl">
              The technologies I use daily to build data solutions and deliver business intelligence.
            </p>
          </div>
          <Link to="/skills" className="btn-outline shrink-0 self-start">
            View Full Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.title} className="glass p-6 md:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="sm:w-48 shrink-0">
                  <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                  <div className={`w-8 h-0.5 ${cat.accent === 'brand' ? 'bg-brand-500' : 'bg-warm-500'} rounded-full mt-2`} />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center text-sm px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105 cursor-default ${
                        cat.accent === 'brand'
                          ? 'bg-brand-500/5 text-brand-300 border-brand-500/15 hover:bg-brand-500/10 hover:border-brand-500/30'
                          : 'bg-warm-500/5 text-warm-400 border-warm-500/15 hover:bg-warm-500/10 hover:border-warm-500/30'
                      } ${skill === 'Microsoft Fabric' ? 'ring-1 ring-brand-500/30 font-semibold' : ''}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-10 glass p-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="sm:w-48 shrink-0">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                Certifications
              </h3>
            </div>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-sm text-surface-300">
                  <svg className="w-4 h-4 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
