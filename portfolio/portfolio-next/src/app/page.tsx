"use client"

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-surface-950 text-surface-300 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        {/* Placeholder for next sections */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <h2 className="text-2xl font-bold text-white text-center">Welcome — Prototype migration</h2>
        </div>
      </main>
      <Footer />
    </div>
  )
}
