import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { name: 'About', to: '/#about' },
  { name: 'Services', to: '/services' },
  { name: 'Case Studies', to: '/case-studies' },
  { name: 'Skills', to: '/skills' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isActive = (to) => {
    if (to.startsWith('/#')) return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(to + '/')
  }

  const handleNavClick = (to) => {
    if (to.startsWith('/#')) {
      const hash = to.replace('/', '')
      if (location.pathname === '/') {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileOpen(false)
  }

  const renderLink = (link, className, key) => {
    if (link.to.startsWith('/#')) {
      if (location.pathname === '/') {
        return (
          <a
            key={key}
            href={link.to.replace('/', '')}
            onClick={() => handleNavClick(link.to)}
            className={className}
          >
            {link.name}
          </a>
        )
      }
      return (
        <Link key={key} to="/" onClick={() => handleNavClick(link.to)} className={className}>
          {link.name}
        </Link>
      )
    }
    return (
      <Link key={key} to={link.to} className={className}>
        {link.name}
      </Link>
    )
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-surface-950/90 backdrop-blur-xl border-b border-surface-800/50 shadow-xl shadow-surface-950/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                H
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">Harun</span>
                <span className="text-brand-400 font-bold text-lg">.</span>
                <p className="text-[10px] text-surface-500 font-medium -mt-1 tracking-wider uppercase">Data & BI</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) =>
                renderLink(
                  link,
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive(link.to)
                      ? 'text-brand-400'
                      : 'text-surface-400 hover:text-brand-400'
                  }`,
                  link.name
                )
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900/60 border border-surface-800/50">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-xs text-surface-400 font-medium">Open to work</span>
              </div>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/20"
              >
                Let's Talk
              </Link>
              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-surface-900/60 border border-surface-800/50 flex items-center justify-center text-surface-400 hover:text-white transition-colors"
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-surface-950/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
            {links.map((link) =>
              renderLink(
                link,
                `text-2xl font-semibold transition-colors ${
                  isActive(link.to) ? 'text-brand-400' : 'text-surface-200 hover:text-brand-400'
                }`,
                `mobile-${link.name}`
              )
            )}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 btn-primary"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
