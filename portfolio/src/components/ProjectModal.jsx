import { useEffect, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    setActiveImg(0)
  }, [project])

  if (!project) return null

  const hasImages = project.images && project.images.length > 0

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 mt-[5vh] rounded-2xl bg-dark-900 border border-dark-700/60 shadow-2xl shadow-dark-950/80 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-20 w-10 h-10 rounded-full bg-dark-800/90 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-white hover:bg-red-500/80 hover:border-red-500/50 transition-all group cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        {hasImages ? (
          <div className="relative">
            <img
              src={project.images[activeImg]}
              alt={`${project.title} - screenshot ${activeImg + 1}`}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            {/* Nav arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 border border-dark-700/50 flex items-center justify-center text-white hover:bg-dark-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setActiveImg((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 border border-dark-700/50 flex items-center justify-center text-white hover:bg-dark-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center border-b border-dark-700/40">
            <div className="w-20 h-20 rounded-2xl bg-dark-800 border border-dark-700/50 flex items-center justify-center text-dark-500">
              {project.icon}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Title & Tags */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.metrics.map((metric) => (
              <span key={metric} className="text-sm font-mono px-4 py-2 rounded-xl bg-dark-800 border border-dark-700/50 text-primary-400">
                {metric}
              </span>
            ))}
          </div>

          {/* Full Description */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">About This Project</h3>
            <p className="text-dark-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                    <svg className="w-4 h-4 text-accent-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Embedded Video */}
          {project.videoUrl && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">Video Walkthrough</h3>
              <div className="relative w-full rounded-xl overflow-hidden border border-dark-700/50" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} video`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* GitHub Link */}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-800 hover:bg-dark-700 border border-dark-700/50 text-dark-200 text-sm font-medium rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              View Source on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
