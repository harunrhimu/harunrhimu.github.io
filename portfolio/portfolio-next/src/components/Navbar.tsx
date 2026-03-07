"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'Case Studies', to: '/case-studies' },
  { name: 'Blog', to: '/blog' },
  { name: 'About Me', to: '/about' },
  { name: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (to: string) => pathname === to || pathname?.startsWith(to + '/')

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-surface-950/90 backdrop-blur-xl border-b border-surface-800/50 shadow-xl shadow-surface-950/30' : 'bg-transparent'}`}>
        <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-18 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                H
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">Harun</span>
                <span className="text-brand-400 font-bold text-lg">.</span>
                <p className="text-[10px] text-surface-500 font-medium -mt-1 tracking-wider uppercase">Data & BI</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link key={link.name} href={link.to} className={`text-sm font-medium transition-colors duration-200 ${isActive(link.to) ? 'text-brand-400' : 'text-surface-400 hover:text-brand-400'}`}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900/60 border border-surface-800/50">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-xs text-surface-400 font-medium">Open to work</span>
              </div>
              <Link href="/contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/20">
                Let's Talk
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-surface-900/60 border border-surface-800/50 flex items-center justify-center text-surface-400 hover:text-white transition-colors">
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

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-surface-950/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
            {links.map((link) => (
              <Link key={link.name} href={link.to} onClick={() => setMobileOpen(false)} className={`text-2xl font-semibold transition-colors ${isActive(link.to) ? 'text-brand-400' : 'text-surface-200 hover:text-brand-400'}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white rounded-xl">
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
