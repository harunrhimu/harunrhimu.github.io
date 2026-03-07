import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-800/50 bg-surface-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm">H</div>
              <div>
                <span className="text-white font-bold text-lg">Harun</span>
                <span className="text-brand-400 font-bold text-lg">.</span>
              </div>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed mb-4">Turning raw data into business intelligence. Power BI Developer & Data Analyst based in Dhaka.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {['Home','Services','Case Studies','Blog','About Me','Contact'].map((label) => (
                <li key={label}><Link href={`/${label === 'Home' ? '' : label.toLowerCase().replace(/ /g,'-')}`} className="text-sm text-surface-400 hover:text-brand-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Dashboard Development', 'Data Analysis', 'ETL Pipelines', 'Data Modeling', 'BI Training', 'Automation'].map((s) => (
                <li key={s}><Link href="/services" className="text-sm text-surface-400 hover:text-brand-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">&copy; {currentYear} harunrhimu. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 text-xs text-surface-500 hover:text-brand-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
