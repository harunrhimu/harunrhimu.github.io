import { useState } from 'react'
import { Link } from 'react-router-dom'
import faqs from '../data/faqs'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Common Questions</p>
          <h2 className="heading-md">
            Frequently{' '}
            <span className="text-gradient">Asked</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-xl mx-auto">
            Answers to the questions I hear most from potential clients.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 mb-10">
          {faqs.map((faq, i) => (
            <div key={i} className="glass overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-800/30 transition-colors"
              >
                <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-brand-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-sm text-surface-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-surface-400 mb-4">Still have questions?</p>
          <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Ask Me Directly
          </Link>
        </div>
      </div>
    </section>
  )
}
