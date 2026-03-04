import { useParams, Link } from 'react-router-dom'
import blogPosts from '../data/blog'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="pt-24 section-pad">
        <div className="container-xl text-center">
          <h1 className="heading-md mb-4">Article Not Found</h1>
          <p className="text-surface-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">View All Articles</Link>
        </div>
      </main>
    )
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-pad pb-10">
        <div className="container-xl max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-400 transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="badge bg-brand-500/15 text-brand-300 border border-brand-500/20">{post.category}</span>
            <span className="text-sm text-surface-500">{post.readTime}</span>
            <span className="text-sm text-surface-500">{post.date}</span>
          </div>

          <h1 className="heading-lg mb-6">{post.title}</h1>
          <p className="text-lg text-surface-400 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-10">
        <div className="container-xl max-w-4xl">
          <div className="rounded-2xl overflow-hidden border border-surface-700/40">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad pt-0">
        <div className="container-xl max-w-4xl">
          <div className="glass p-8 md:p-12">
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-surface-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="glass p-6 mt-8 flex items-center gap-4">
            <img src="/harunrhimu.jpg" alt="Harun" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-white font-semibold">Md Harun Or Roshid</p>
              <p className="text-sm text-surface-400">Power BI Developer & Data Analyst</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="section-pad bg-surface-900/20">
          <div className="container-xl">
            <h2 className="heading-sm mb-8">More Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group glass overflow-hidden hover:border-brand-500/30 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="badge bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-2">{p.category}</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
