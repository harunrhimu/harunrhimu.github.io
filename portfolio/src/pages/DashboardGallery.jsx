import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dashboards from '../data/dashboards'
import SEO from '../components/SEO'
import SectionDivider from '../components/SectionDivider'
import { getBreadcrumbSchema } from '../utils/structuredData'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(dashboards.map((d) => d.category)))]

function Lightbox({ slide, onClose, onPrev, onNext, hasPrev, hasNext, onJumpToPage }) {
  const { dashboard: item, image, pageIndex, totalPages, pageSrcs } = slide
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex items-start justify-center p-4 pt-16 md:p-8 md:pt-20 bg-overlay/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-xl bg-inset/60 border border-line/40 flex items-center justify-center text-muted hover:text-heading hover:bg-inset/60 transition-all z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev / Next */}
        {(hasPrev || hasNext) && (
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between pointer-events-none px-3 z-10">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="pointer-events-auto w-10 h-10 rounded-xl bg-page/80 border border-line/40 flex items-center justify-center text-muted hover:text-heading disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="pointer-events-auto w-10 h-10 rounded-xl bg-page/80 border border-line/40 flex items-center justify-center text-muted hover:text-heading disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}

        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-line/40 shadow-2xl">
          <img
            src={image}
            alt={`${item.title} — page ${pageIndex + 1}`}
            className="w-full object-contain max-h-[72vh]"
          />
        </div>

        {/* Page dots */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {pageSrcs.map((_, i) => (
              <button
                key={i}
                onClick={() => onJumpToPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === pageIndex ? 'w-6 bg-brand-500' : 'w-2 bg-inset hover:bg-line-strong'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Info strip */}
        <div className="mt-5 rounded-2xl bg-card/90 border border-line/40 backdrop-blur-md p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">{item.category}</span>
                {totalPages > 1 && (
                  <span className="text-xs text-subtle">· Page {pageIndex + 1} of {totalPages}</span>
                )}
              </div>
              <h2 className="text-lg font-bold text-heading">{item.title}</h2>
              <p className="text-sm text-accent mt-1 italic max-w-2xl">"{item.question}"</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.caseStudySlug && (
                <Link
                  to={`/case-studies/${item.caseStudySlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all"
                  onClick={onClose}
                >
                  Full Case Study
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 bg-inset/60 hover:bg-inset/60 border border-line/40 text-body hover:text-heading text-sm font-medium rounded-xl transition-all"
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Business problem */}
          {item.problem && (
            <div className="mt-5 pt-5 border-t border-line/30">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                The Business Problem
              </p>
              <p className="text-sm text-muted leading-relaxed max-w-3xl">
                {item.problem}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardGallery() {
  const navigate = useNavigate()
  const { dashboardId } = useParams()
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = filter === 'All'
    ? dashboards
    : dashboards.filter((d) => d.category === filter)

  // Flatten every dashboard's pages into one continuous slide list so prev/next
  // pages through all images of a dashboard before moving to the next one.
  const slides = useMemo(() => {
    const list = []
    filtered.forEach((dashboard, dashboardIndex) => {
      const pageSrcs = dashboard.images && dashboard.images.length ? dashboard.images : [dashboard.image]
      pageSrcs.forEach((image, pageIndex) => {
        list.push({ dashboard, dashboardIndex, image, pageIndex, totalPages: pageSrcs.length, pageSrcs })
      })
    })
    return list
  }, [filtered])

  // Auto-open lightbox if dashboardId is in URL
  useEffect(() => {
    if (dashboardId) {
      const dashboard = dashboards.find((d) => d.id === dashboardId)
      if (dashboard) {
        const dashboardIndex = filtered.findIndex((d) => d.id === dashboardId)
        if (dashboardIndex !== -1) {
          const slideIndex = slides.findIndex((s) => s.dashboardIndex === dashboardIndex)
          setLightboxIndex(slideIndex)
        }
      }
    }
  }, [dashboardId, filtered, slides])

  const openLightbox = useCallback(
    (dashboardIndex) => {
      const dashboard = filtered[dashboardIndex]
      navigate(`/dashboard-gallery/${dashboard.id}`)
    },
    [filtered, navigate]
  )
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    navigate('/dashboard-gallery')
  }, [navigate])
  const prevItem = useCallback(() => setLightboxIndex((i) => (i > 0 ? i - 1 : i)), [])
  const nextItem = useCallback(
    () => setLightboxIndex((i) => (i < slides.length - 1 ? i + 1 : i)),
    [slides.length]
  )
  const jumpToPage = useCallback(
    (targetPageIndex) => {
      setLightboxIndex((i) => {
        const current = slides[i]
        return slides.findIndex(
          (s) => s.dashboardIndex === current.dashboardIndex && s.pageIndex === targetPageIndex
        )
      })
    },
    [slides]
  )

  const activeSlide = lightboxIndex !== null ? slides[lightboxIndex] : null

  return (
    <main className="pt-20">
      <SEO
        title="Dashboard Gallery | Power BI Work by Harun"
        description="A visual gallery of Power BI dashboards built by Harun — each one answering a real business question with clean, executive-grade data design."
        jsonLd={[getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Dashboard Gallery', url: '/dashboard-gallery' }])]}
      />

      {/* Hero */}
      <section className="pt-10 md:pt-14 pb-10">
        <div className="container-xl">
          <p className="label mb-3">My Work</p>
          <h1 className="heading-lg mb-4">
            Dashboard
            <span className="text-gradient"> Gallery</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Real Power BI reports built to answer specific business questions. Click any dashboard to see it full size.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Filters */}
      <section className="py-8">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-card/60 text-muted border border-line/40 hover:border-brand-500/30 hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          {filtered.length === 0 ? (
            <p className="text-muted text-sm">No dashboards match this filter.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((item, idx) => {
                const isFullWidth = item.featured && filtered.length > 1
                return (
                  <div
                    key={item.id}
                    className={`group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300 cursor-pointer ${
                      isFullWidth ? 'md:col-span-2' : ''
                    }`}
                    onClick={() => openLightbox(idx)}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isFullWidth ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-page/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-page/80 text-heading text-sm font-semibold backdrop-blur-sm border border-line/40">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                          </svg>
                          View Full Size
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="badge bg-card/80 text-body border border-line/40 backdrop-blur-sm">
                          {item.category}
                        </span>
                        {item.pages && (
                          <span className="badge bg-card/80 text-muted border border-line/40 backdrop-blur-sm">
                            {item.pages} pages
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-heading mb-2 group-hover:text-accent-soft transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-sm text-accent italic mb-3 leading-relaxed">
                        "{item.question}"
                      </p>
                      <p className="text-sm text-muted leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-line/30">
                        <div className="flex flex-wrap gap-2">
                          {item.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[10px] font-medium px-2 py-1 rounded-md bg-inset/60 text-muted border border-line/30"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-subtle flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                          Click to expand
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="glass p-8 md:p-12 text-center border-brand-500/20">
            <p className="label mb-3">Let's build yours</p>
            <h2 className="heading-md mb-4">
              Need a dashboard like
              <span className="text-gradient"> these?</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-8">
              Tell me what question your data needs to answer and I'll design a dashboard around it — clean, fast, and built to actually get used.
            </p>
            <Link to="/contact" className="btn-primary">
              Let's Talk
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeSlide && (
        <Lightbox
          slide={activeSlide}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
          onJumpToPage={jumpToPage}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < slides.length - 1}
        />
      )}
    </main>
  )
}
