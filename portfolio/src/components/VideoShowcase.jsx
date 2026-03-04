import { Link } from 'react-router-dom'
import videos from '../data/videos'

export default function VideoShowcase() {
  const previewVideos = videos.slice(0, 4)

  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="label mb-3">Watch & Learn</p>
            <h2 className="heading-md">
              Video
              <span className="text-gradient"> Content</span>
            </h2>
            <p className="text-surface-400 mt-4 max-w-xl">
              Tutorials, walkthroughs, and deep dives into data analytics and Power BI development.
            </p>
          </div>
          <Link to="/videos" className="btn-outline shrink-0 self-start">
            View All Videos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {previewVideos.map((video) => (
            <a
              key={video.title}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-surface-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-brand-500/90 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-surface-950/80 rounded text-[10px] text-white font-mono font-medium">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="badge bg-surface-950/70 text-surface-200 backdrop-blur-sm">{video.category}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-brand-300 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-surface-500 line-clamp-2">{video.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
