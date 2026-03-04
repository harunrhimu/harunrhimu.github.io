import { useState } from 'react'
import videos from '../data/videos'

const videoCategories = ['All', ...new Set(videos.map(v => v.category))]

export default function VideosPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? videos : videos.filter(v => v.category === filter)

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="section-pad pb-16">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="label mb-3">Watch & Learn</p>
              <h1 className="heading-lg mb-4">
                Video
                <span className="text-gradient"> Content</span>
              </h1>
              <p className="text-lg text-surface-400 max-w-2xl leading-relaxed">
                Tutorials, walkthroughs, and deep dives into data analytics, Power BI, and Microsoft Fabric development.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline shrink-0 self-start"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Visit Channel
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2">
            {videoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-surface-900/60 text-surface-400 border border-surface-700/40 hover:border-brand-500/30 hover:text-brand-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video) => (
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
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-surface-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-brand-500/90 flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-surface-950/80 rounded text-xs text-white font-mono font-medium">
                    {video.duration}
                  </div>
                  {/* Category */}
                  <div className="absolute top-2 left-2">
                    <span className="badge bg-surface-950/70 text-surface-200 backdrop-blur-sm">{video.category}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-surface-500 line-clamp-2">{video.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
