const experiences = [
  {
    role: 'Senior Power BI Developer',
    company: 'Your Company Name',
    period: '2023 - Present',
    location: 'Dhaka, Bangladesh',
    description: [
      'Designed and deployed 20+ interactive Power BI dashboards serving 100+ business users across departments',
      'Optimized DAX measures and data models, reducing report load times by 40%',
      'Built automated ETL pipelines using Power Query and SQL Server for daily data refresh',
      'Collaborated with stakeholders to translate business requirements into actionable data solutions',
    ],
    tags: ['Power BI', 'DAX', 'SQL Server', 'Azure'],
    current: true,
  },
  {
    role: 'Data Analyst',
    company: 'Previous Company',
    period: '2021 - 2023',
    location: 'Dhaka, Bangladesh',
    description: [
      'Analyzed large datasets using Python and SQL to identify business trends and opportunities',
      'Created weekly and monthly reports using Power BI, replacing manual Excel processes',
      'Developed data quality monitoring dashboards to track data pipeline health',
      'Conducted A/B testing analysis and presented findings to leadership team',
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Excel'],
    current: false,
  },
  {
    role: 'Junior Data Analyst (Intern)',
    company: 'First Company',
    period: '2020 - 2021',
    location: 'Dhaka, Bangladesh',
    description: [
      'Assisted in building Excel-based reporting templates for the operations team',
      'Learned SQL fundamentals and wrote queries for ad-hoc data requests',
      'Supported data cleaning and preparation processes using Python',
      'Gained foundational experience in data visualization best practices',
    ],
    tags: ['Excel', 'SQL', 'Python', 'Data Cleaning'],
    current: false,
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering',
    institution: 'Your University Name',
    period: '2017 - 2021',
    details: 'Focused on Data Science, Statistics, and Database Management',
  },
]

const certifications = [
  'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
  'Google Data Analytics Professional Certificate',
  'Microsoft Azure Data Fundamentals (DP-900)',
]

export default function Experience() {
  return (
    <section id="experience" className="relative bg-dark-900/30">
      <div className="section-container">
        <h2 className="section-title">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-subtitle">My professional journey in data analytics</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline - Left 2 cols */}
          <div className="lg:col-span-2 space-y-0">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-10 last:pb-0 group">
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-px h-full bg-dark-700" />
                )}
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    exp.current
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-dark-600 bg-dark-800'
                  }`}
                >
                  {exp.current && <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />}
                </div>

                <div className="glass-card glow-border p-6 hover:bg-dark-800/60 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-primary-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-dark-400 font-mono bg-dark-800 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                      <p className="text-xs text-dark-500 mt-1">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-dark-400 flex gap-2">
                        <span className="text-primary-500/60 mt-1 shrink-0">&#9656;</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-dark-800 text-dark-300 border border-dark-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Education & Certs */}
          <div className="space-y-6">
            {/* Education */}
            <div className="glass-card glow-border p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                Education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="text-sm font-medium text-white">{edu.degree}</h4>
                  <p className="text-sm text-primary-400">{edu.institution}</p>
                  <p className="text-xs text-dark-500 font-mono">{edu.period}</p>
                  <p className="text-xs text-dark-400 mt-2">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="glass-card glow-border p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-4.52 1.597 6.003 6.003 0 01-4.52-1.597" />
                </svg>
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-dark-300"
                  >
                    <svg className="w-4 h-4 text-accent-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-primary-500/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
