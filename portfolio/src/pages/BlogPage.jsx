import { useState } from 'react'
import { Link } from 'react-router-dom'
import blogPosts from '../data/blog'

const blogCategories = ['All', ...new Set(blogPosts.map(p => p.category))]

export default function BlogPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? blogPosts : blogPosts.filter(p => p.category === filter)

  return (
    <main className="pt-24">
      {/* Hero Banner */}
      <section className="section-pad pb-16">
        <div className="container-xl">
          <p className="label mb-3">Insights</p>
          <h1 className="heading-lg mb-4">
            Blog &
            <span className="text-gradient"> Articles</span>
          </h1>
          <p className="text-lg text-surface-400 max-w-2xl leading-relaxed">
            Thoughts on data analytics, Power BI best practices, Microsoft Fabric, and lessons learned from real projects.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
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

      {/* Blog Grid */}
      <section className="section-pad pt-0">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20">{post.category}</span>
                    <span className="text-xs text-surface-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-surface-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-surface-700/40">
                    <span className="text-xs text-surface-500">{post.date}</span>
                    <span className="text-xs text-brand-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read More
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
