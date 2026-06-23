import { Link } from 'react-router-dom'

// TODO: Replace with your actual YouTube video embed URL
const FEATURED_VIDEO_URL = 'https://www.youtube.com/embed/W_2z0b7Tyvk'
const FEATURED_VIDEO_TITLE = 'Web Data to Excel (Power Query) : Get, Clean & Analyze Web Data in Excel (PL300)'

export default function FeaturedVideo() {
  return (
    <section className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="label mb-3">See It In Action</p>
          <h2 className="heading-md">
            Featured{' '}
            <span className="text-gradient">Video</span>
          </h2>
          <p className="text-surface-400 mt-4 max-w-xl mx-auto">
            Watch how I approach real data challenges and build solutions from scratch.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass overflow-hidden">
            {/* 16:9 responsive container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={FEATURED_VIDEO_URL}
                title={FEATURED_VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Caption bar */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white">{FEATURED_VIDEO_TITLE}</h3>
                <p className="text-xs text-surface-500 mt-1">
                  Step-by-step walkthrough of my dashboard development process
                </p>
              </div>
              <Link
                to="/videos"
                className="btn-outline text-sm px-5 py-2.5 shrink-0 inline-flex items-center gap-2"
              >
                Watch More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
