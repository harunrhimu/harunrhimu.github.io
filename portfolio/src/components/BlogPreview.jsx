import { Link } from 'react-router-dom'
import blogPosts from '../data/blog'

export default function BlogPreview() {
  const previewPosts = blogPosts.slice(0, 3)

  return (
    <section className="section-pad bg-surface-900/20">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="label mb-3">Insights</p>
            <h2 className="heading-md">
              Latest
              <span className="text-gradient"> Articles</span>
            </h2>
            <p className="text-surface-400 mt-4 max-w-xl">
              Thoughts on data analytics, Power BI best practices, and lessons learned from real projects.
            </p>
          </div>
          <Link to="/blog" className="btn-outline shrink-0 self-start">
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
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
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
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
  )
}
