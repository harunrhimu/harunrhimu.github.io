import { Link } from 'react-router-dom'
import { categories, certifications, experiences, education } from '../data/skills'

export default function SkillsPage() {
  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="section-pad pb-16">
        <div className="container-xl">
          <p className="label mb-3">Tech Stack & Experience</p>
          <h1 className="heading-lg mb-4">
            Skills &
            <span className="text-gradient"> Expertise</span>
          </h1>
          <p className="text-lg text-surface-400 max-w-2xl leading-relaxed">
            The tools, technologies, and experience I bring to every project.
            From Power BI and Microsoft Fabric to Python and cloud platforms.
          </p>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <h2 className="heading-sm mb-8">Technologies</h2>
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

      {/* Experience Timeline */}
      <section className="section-pad bg-surface-900/20">
        <div className="container-xl">
          <h2 className="heading-sm mb-8">Work Experience</h2>
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-px h-full bg-surface-700/50" />
                )}
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    exp.current
                      ? 'border-brand-500 bg-brand-500/20'
                      : 'border-surface-600 bg-surface-800'
                  }`}
                >
                  {exp.current && <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />}
                </div>

                <div className="glass p-6 hover:bg-surface-800/40 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-brand-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-surface-400 font-mono bg-surface-800/80 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                      <p className="text-xs text-surface-500 mt-1">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-surface-400 flex gap-2">
                        <span className="text-brand-500/60 mt-1 shrink-0">&#9656;</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-surface-800/80 text-surface-300 border border-surface-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="heading-sm mb-6">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="glass p-6">
                  <h3 className="text-white font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-brand-400 text-sm font-medium mb-1">{edu.institution}</p>
                  <p className="text-xs text-surface-500 font-mono mb-3">{edu.period}</p>
                  <p className="text-sm text-surface-400">{edu.details}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="heading-sm mb-6">Let's Work Together</h2>
              <div className="glass p-6">
                <p className="text-surface-400 leading-relaxed mb-6">
                  Looking for a skilled Power BI developer and data analyst? I'm always open to discussing new projects and opportunities.
                </p>
                <Link to="/contact" className="btn-primary">
                  Get In Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
