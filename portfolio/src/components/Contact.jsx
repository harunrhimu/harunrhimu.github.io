import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS credentials from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMsg(error?.text || 'Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">Get In Touch</p>
          <h2 className="heading-md">
            Let's Build Something
            <span className="text-gradient"> Together</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-xl mx-auto">
            Have a data challenge or need a BI solution? I'd love to hear about your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass p-6">
              <h3 className="text-white font-semibold mb-4">Let's work together</h3>
              <p className="text-sm text-surface-400 leading-relaxed mb-6">
                Whether you need a dashboard, a complete BI solution, or data consultation --
                I'm here to help transform your data into business value.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Email', value: 'harunrhimu@gmail.com', href: 'mailto:harunrhimu@gmail.com', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> },
                  { label: 'LinkedIn', value: 'linkedin.com/in/harunrhimu', href: 'https://www.linkedin.com/in/harunrhimu/', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.5 8.257m7.5 0L8.257 12" /> },
                  { label: 'Location', value: 'Dhaka, Bangladesh', href: null, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-surface-500 uppercase tracking-widest font-semibold">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-surface-200 hover:text-brand-400 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-surface-200">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
              <p className="text-sm text-surface-400">
                Usually responds within <span className="text-white font-medium">24 hours</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="glass p-7 space-y-5">
              {/* Success Message */}
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-500/10 border border-brand-500/30">
                  <svg className="w-5 h-5 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-brand-300">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-red-300">{errorMsg}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-surface-400 mb-1.5 font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm placeholder:text-surface-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-surface-400 mb-1.5 font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm placeholder:text-surface-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-surface-400 mb-1.5 font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm placeholder:text-surface-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Dashboard Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-surface-400 mb-1.5 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm placeholder:text-surface-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
