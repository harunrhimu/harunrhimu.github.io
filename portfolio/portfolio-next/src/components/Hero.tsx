"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

const roles = ['Fabric Analytics Engineer', 'Power BI Developer', 'Data Analyst', 'BI Consultant', 'Dashboard Architect']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timer: any

    if (!deleting) {
      if (displayed.length < currentRole.length) {
        timer = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80)
      } else {
        timer = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }
    return () => clearTimeout(timer)
  }, [displayed, deleting, roleIndex])

  return (
    <section className="relative min-h-screen flex items-center pt-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Hi, I'm <span className="text-gradient">Harun</span>
            </h1>

            <div className="flex items-center gap-1 mb-6 h-9">
              <span className="text-xl md:text-2xl text-surface-400 font-medium">{displayed}</span>
              <span className="w-[3px] h-7 bg-brand-400 animate-pulse rounded-full" />
            </div>

            <p className="text-lg text-surface-400 max-w-lg mb-8 leading-relaxed">
              I build end-to-end analytics solutions on Microsoft Fabric & Power BI —
              from Lakehouse architecture to compelling dashboards that drive data-driven decisions.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="/case-studies" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl">View Case Studies</a>
              <a href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border border-surface-600 hover:border-brand-500/50 text-surface-200 hover:text-white font-semibold rounded-xl">Explore Services</a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-surface-500 uppercase tracking-widest font-semibold">Connect</span>
              <div className="w-8 h-px bg-surface-700" />
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-80 h-80 mx-auto">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-500/20 via-transparent to-warm-500/10 blur-2xl animate-pulse-slow" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-surface-700/50 shadow-2xl bg-surface-900 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-surface-800/40 flex items-center justify-center text-white font-bold">H</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-[10px] text-surface-600 uppercase tracking-widest font-medium">Scroll</span>
        <svg className="w-4 h-4 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
