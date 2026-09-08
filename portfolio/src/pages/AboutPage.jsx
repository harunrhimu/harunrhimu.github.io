import { Link } from 'react-router-dom'
import { certifications, experiences, education, onlineCourses } from '../data/skills'
import SEO from '../components/SEO'
import { getPersonSchema, getBreadcrumbSchema } from '../utils/structuredData'

const skillCategories = [
  {
    title: 'Microsoft Fabric',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    skills: ['Fabric Lakehouse', 'Data Warehouse', 'Data Pipelines', 'Dataflows Gen2', 'Notebooks', 'OneLake', 'Semantic Models', 'Direct Lake'],
    accent: 'brand',
  },
  {
    title: 'Data Visualization',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    skills: ['Power BI', 'DAX', 'Power Query (M)', 'Paginated Reports', 'Excel Advanced', 'SSRS'],
    accent: 'warm',
  },
  {
    title: 'Data Engineering',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    skills: ['SQL Server', 'PostgreSQL', 'ETL / SSIS', 'Azure Data Factory', 'Data Modeling', 'SSAS', 'Spark SQL'],
    accent: 'brand',
  },
  {
    title: 'Programming & Analysis',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: ['Python', 'Pandas', 'NumPy', 'SQL', 'PySpark', 'R', 'Jupyter Notebook'],
    accent: 'warm',
  },
  {
    title: 'Cloud & Tools',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    skills: ['Azure Cloud', 'Power Automate', 'Git', 'SharePoint', 'REST APIs', 'Azure DevOps'],
    accent: 'brand',
  },
]

const interests = [
  { label: 'Data Storytelling', icon: '📊' },
  { label: 'Business Intelligence', icon: '💡' },
  { label: 'Open Source', icon: '🌐' },
  { label: 'Cloud Architecture', icon: '☁️' },
  { label: 'AI & Machine Learning', icon: '🤖' },
  { label: 'Problem Solving', icon: '🧩' },
  { label: 'Continuous Learning', icon: '📚' },
  { label: 'Tech Community', icon: '🤝' },
]

const SectionDivider = () => (
  <div className="container-xl">
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-inset/50 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-inset/50 to-transparent" />
    </div>
  </div>
)

export default function AboutPage() {
  return (
    <main className="pt-20">
      <SEO
        title="About Harun | Certified Power BI Developer & Data Analyst"
        description="Md Harun Or Roshid is a Microsoft Certified Power BI Data Analyst (PL-300), Fabric Analytics Engineer (DP-600) and Fabric Data Engineer (DP-700) based in Dhaka. 2+ years of experience building enterprise dashboards and analytics solutions."
        jsonLd={[getPersonSchema(), getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About Me', url: '/about' }])]}
      />
      {/* Hero - Sales Optimized */}
      <section className="pt-10 md:pt-14 pb-10">
        <div className="container-xl">
          {/* Professional Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span className="text-sm font-semibold text-accent-soft">Microsoft Certified: Power BI Data Analyst (PL-300) &amp; Fabric Analytics Engineer (DP-600) &amp; Fabric Data Engineer (DP-700)</span>
            <span className="text-xs text-muted">|</span>
            <span className="text-sm text-muted">2+ Years Professional Experience</span>
          </div>

          <p className="label mb-3">Your Data Partner</p>
          <h1 className="heading-lg mb-4">
            Power BI Developer Who Turns Data Into
            <span className="text-gradient"> Revenue</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Businesses I work with see <span className="text-heading font-semibold">40-90% faster reporting</span>, eliminate data silos, and make confident decisions backed by real-time analytics.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Profile Image + Bio */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="glass p-3 rounded-2xl">
                <img
                  src="/harunrhimu.jpg"
                  alt="Harun - Power BI Developer & Microsoft Fabric Solutions Expert"
                  loading="lazy"
                  className="w-full rounded-xl object-cover aspect-[4/5]"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass p-8">
                <h2 className="text-xl font-bold text-heading mb-4">The Person Behind Your Dashboards</h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    I'm <span className="text-heading font-semibold">Md Harun Or Roshid</span> — a Power BI Developer and Fabric Analytics Engineer who helps businesses stop guessing and start knowing. I build end-to-end analytics solutions on Microsoft Fabric & Power BI that leadership teams actually use.
                  </p>
                  <p>
                    From Lakehouse architecture to executive dashboards, I handle the full data pipeline so you don't have to. My clients get dashboards that load fast, update automatically, and answer the questions that matter most to their bottom line.
                  </p>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass p-5 text-center">
                  <p className="text-2xl font-extrabold text-gradient mb-1">35+</p>
                  <p className="text-xs text-muted font-medium">Reports Delivered</p>
                </div>
                <div className="glass p-5 text-center">
                  <p className="text-2xl font-extrabold text-gradient mb-1">100+</p>
                  <p className="text-xs text-muted font-medium">Business Users Served</p>
                </div>
                <div className="glass p-5 text-center">
                  <p className="text-2xl font-extrabold text-gradient mb-1">40%</p>
                  <p className="text-xs text-muted font-medium">Avg. Time Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What You Get - Sales Section */}
      <section className="section-pad bg-card/20">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Why Hire Me</p>
            <h2 className="heading-md">
              What You
              <span className="text-gradient"> Get</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fast & Reliable Dashboards',
                desc: 'Optimized data models and DAX that load in seconds, not minutes. Your team gets answers when they need them.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: 'End-to-End Solutions',
                desc: 'From raw data to polished reports — I handle ETL, modeling, DAX, and deployment so you focus on decisions.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Clear Communication',
                desc: 'No jargon, no guesswork. I present findings in a way your entire team understands and acts on.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="glass p-7 hover:border-brand-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-accent mb-5 group-hover:bg-brand-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills & Technologies - Compact Card Layout with Icons */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Tech Stack</p>
            <h2 className="heading-md">
              Skills &
              <span className="text-gradient"> Technologies</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="glass p-6 hover:border-brand-500/30 transition-all group">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    cat.accent === 'brand'
                      ? 'bg-brand-500/10 border border-brand-500/20 text-accent'
                      : 'bg-warm-500/10 border border-warm-500/20 text-accent-warm'
                  } group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-bold text-heading">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
                        cat.accent === 'brand'
                          ? 'bg-brand-500/5 text-accent-soft border-brand-500/15'
                          : 'bg-warm-500/5 text-accent-warm border-warm-500/15'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Certifications - Dedicated Section */}
      <section className="section-pad bg-card/20">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Credentials</p>
            <h2 className="heading-md">
              Certifications &
              <span className="text-gradient"> Credentials</span>
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in data analytics, business intelligence, and cloud technologies.
            </p>
          </div>

          {/* PL-300 Featured Card */}
          {certifications.filter(c => c.name.includes('PL-300')).map((cert) => (
            <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer" className="block glass p-8 border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent mb-8 hover:border-brand-400/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/15 border-2 border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-heading">PL-300: Power BI Data Analyst Associate</h3>
                    <span className="px-3 py-1 rounded-full bg-brand-500/20 text-accent-soft text-xs font-bold uppercase tracking-wide">Featured</span>
                  </div>
                  <p className="text-accent font-medium mb-2">Microsoft Certified</p>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    Validates expertise in preparing data, modeling data, visualizing and analyzing data, and deploying and maintaining assets using Power BI. This certification demonstrates proficiency in the full Power BI workflow.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:text-accent-soft transition-colors">
                    View Credential
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}


          {/* DP-600 Featured Card (restored) */}
          {certifications.filter(c => c.name.includes('DP-600')).map((cert) => (
            <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer" className="block glass p-8 border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent mb-8 hover:border-brand-400/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/15 border-2 border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-heading">DP-600: Fabric Analytics Engineer Associate</h3>
                    <span className="px-3 py-1 rounded-full bg-brand-500/20 text-accent-soft text-xs font-bold uppercase tracking-wide">Featured</span>
                  </div>
                  <p className="text-accent font-medium mb-2">Microsoft Certified</p>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    Validates expertise in preparing data, modeling data, visualizing and analyzing data, and deploying and maintaining assets using Power BI and Fabric. This certification demonstrates proficiency in Fabric analytics engineering.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:text-accent-soft transition-colors">
                    View Credential
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}



          {/* DP-700 Featured Card */}
          {certifications.filter(c => c.name.includes('DP-700')).map((cert) => (
            <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer" className="block glass p-8 border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent mb-8 hover:border-brand-400/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/15 border-2 border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-heading">DP-700: Fabric Data Engineer Associate</h3>
                    <span className="px-3 py-1 rounded-full bg-brand-500/20 text-accent-soft text-xs font-bold uppercase tracking-wide">Newest</span>
                  </div>
                  <p className="text-accent font-medium mb-2">Microsoft Certified</p>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    Validates expertise in ingesting and transforming data, implementing and managing an analytics solution, and monitoring and optimising an analytics solution in Microsoft Fabric — covering Lakehouse, Data Warehouse, Real-Time Intelligence, and Spark-based pipelines.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:text-accent-soft transition-colors">
                    View Credential
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}


          {/* Other Certifications */}
          {/* SQLBI Featured Card */}
          {certifications.filter(c => c.name.includes('SQLBI')).map((cert) => (
            <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer" className="block glass p-8 border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent mb-8 hover:border-brand-400/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/15 border-2 border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-heading">SQLBI Data Modeling for Power BI Video Course Completion</h3>
                    <span className="px-3 py-1 rounded-full bg-brand-500/20 text-accent-soft text-xs font-bold uppercase tracking-wide">Featured</span>
                  </div>
                  <p className="text-accent font-medium mb-2">Course Completion</p>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    Completed SQLBI's data modeling video course focusing on star schema design, performance, and DAX best practices.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:text-accent-soft transition-colors">
                    View Certificate
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.filter(c => c.status === 'preparing').map((cert) => {
              const isPreparing = cert.status === 'preparing'
              return (
                <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer" className="glass p-5 flex items-start gap-4 hover:border-brand-500/20 transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isPreparing
                      ? 'bg-warm-500/10 border border-warm-500/20'
                      : 'bg-brand-500/10 border border-brand-500/20'
                  }`}>
                    {isPreparing ? (
                      <svg className="w-5 h-5 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-heading">{cert.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-muted">
                        {isPreparing ? 'In Progress' : 'Certified'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-accent/70 group-hover:text-accent transition-colors">
                        View
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Speaking & Community */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Community</p>
            <h2 className="heading-md">
              Speaking &amp;
              <span className="text-gradient"> Community</span>
            </h2>
          </div>

          <div className="glass p-7 md:p-8 border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-transparent max-w-3xl mx-auto hover:border-brand-400/50 transition-all group">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="badge bg-brand-500/20 text-accent-soft uppercase tracking-wide font-bold">Speaker</span>
                  <span className="text-xs text-muted font-mono bg-inset/80 px-2 py-1 rounded">27 June 2026</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-heading mb-2">
                  Power BI Git Integration &amp; CI/CD with Microsoft Fabric
                </h3>
                <p className="text-accent text-sm font-medium mb-3">
                  Global Fabric Data Day 2026 &mdash; Dhaka
                </p>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  A session on version control, branching strategy, and automated deployment
                  pipelines for building scalable analytics solutions.
                </p>
                <p className="text-xs text-muted">
                  Hosted by Bangladesh Fabric &amp; Power BI User Group, under the Global Fabric Community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Education & Continuous Learning */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Learning Path</p>
            <h2 className="heading-md">
              Education &
              <span className="text-gradient"> Continuous Learning</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Formal Education */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-5 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                Formal Education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="glass p-6 border-brand-500/20">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-heading mb-1">{edu.degree}</h4>
                  <p className="text-accent text-sm font-medium mb-1">{edu.institution}</p>
                  <span className="text-xs text-muted font-mono bg-inset/80 px-2 py-1 rounded inline-block mb-3">{edu.period}</span>
                  <p className="text-sm text-muted">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Online Courses */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-5 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Online Courses & Training
              </h3>
              <div className="space-y-3">
                {onlineCourses.map((course, i) => (
                  <a key={i} href={course.url} target="_blank" rel="noopener noreferrer" className="glass p-4 flex items-center gap-4 hover:border-warm-500/20 transition-all group block">
                    <div className="w-8 h-8 rounded-lg bg-warm-500/10 border border-warm-500/20 flex items-center justify-center text-accent-warm shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-heading truncate group-hover:text-accent-soft transition-colors">{course.title}</h4>
                      <p className="text-xs text-muted">{course.platform}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted font-mono">{course.year}</span>
                      <svg className="w-3.5 h-3.5 text-accent-warm/50 group-hover:text-accent-warm transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* My Interests */}
      <section className="section-pad bg-card/20">
        <div className="container-xl">
          <h2 className="heading-sm mb-8">My Interests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interests.map((item) => (
              <div
                key={item.label}
                className="glass p-5 text-center hover:bg-inset/40 hover:border-brand-500/30 transition-all duration-300 group"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <p className="text-sm font-medium text-body">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Work Experience */}
      <section className="section-pad">
        <div className="container-xl">
          <h2 className="heading-sm mb-8">Work Experience</h2>
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-10 last:pb-0">
                {index < experiences.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-px h-full bg-inset/50" />
                )}
                <div
                  className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    exp.current ? 'border-brand-500 bg-brand-500/20' : 'border-line-strong bg-inset'
                  }`}
                >
                  {exp.current && <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />}
                </div>

                <div className="glass p-6 hover:bg-inset/40 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-heading">{exp.role}</h3>
                      <p className="text-accent text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted font-mono bg-inset/80 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                      <p className="text-xs text-muted mt-1">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-muted flex gap-2">
                        <span className="text-accent/60 mt-1 shrink-0">&#9656;</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-inset/80 text-body border border-line/50">
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

      <SectionDivider />

      {/* CTA */}
      <section className="section-pad bg-card/20">
        <div className="container-xl">
          <div className="glass p-10 border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-transparent text-center max-w-3xl mx-auto">
            <h2 className="heading-sm mb-4">Ready to Get Started?</h2>
            <p className="text-muted leading-relaxed mb-6 max-w-xl mx-auto">
              Stop spending hours on manual reports. Let me build you dashboards that update automatically, load instantly, and give your team the answers they need.
            </p>
            <ul className="flex flex-wrap justify-center gap-6 mb-8">
              {['Free initial consultation', 'Custom solution tailored to your data', 'Ongoing support & optimization'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-body">
                  <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary inline-flex">
              Book a Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
