import { useParams, Link } from 'react-router-dom'
import blogPosts from '../data/blog'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import { getArticleSchema, getBreadcrumbSchema } from '../utils/structuredData'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="pt-20 section-pad">
        <div className="container-xl text-center">
          <h1 className="heading-md mb-4">Article Not Found</h1>
          <p className="text-muted mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">View All Articles</Link>
        </div>
      </main>
    )
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <main className="pt-20">
      <SEO
        title={`${post.title} | Harun's Data Analytics Blog`}
        description={post.excerpt}
        image={post.image}
        type="article"
        article={{ publishedTime: post.dateISO, author: 'Md Harun Or Roshid' }}
        jsonLd={[
          getArticleSchema({ title: post.title, description: post.excerpt, image: post.image, datePublished: post.dateISO, url: `/blog/${post.slug}` }),
          getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug}` }]),
        ]}
      />
      {/* Hero */}
      <article>
      <section className="pt-10 md:pt-14 pb-10">
        <div className="container-xl max-w-4xl">
          <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug}` }]} />

          <div className="flex items-center gap-3 mb-5">
            <span className="badge bg-brand-500/15 text-accent-soft border border-brand-500/20">{post.category}</span>
            <span className="text-sm text-muted">{post.readTime}</span>
            <span className="text-sm text-muted">{post.date}</span>
          </div>

          <h1 className="heading-lg mb-6">{post.title}</h1>
          <p className="text-lg text-muted leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-10">
        <div className="container-xl max-w-4xl">
          <div className="rounded-2xl overflow-hidden border border-line/40">
            <img src={post.image} alt={post.title} loading="lazy" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad pt-0">
        <div className="container-xl max-w-4xl">
          <div className="glass p-8 md:p-12">
            <div className="space-y-6">
              {post.content.map((elementHtml, i) => {
                const trimmedHtml = elementHtml.trim()

                // Fallback: If it's your old blog post format without HTML tags, render standard paragraph
                if (!trimmedHtml.startsWith('<')) {
                  return (
                    <p key={i} className="text-body leading-relaxed">
                      {elementHtml}
                    </p>
                  )
                }

                // Normalize HTML: move any heading tags that accidentally appear inside code blocks
                let safeHtml = elementHtml
                try {
                  const preCodeRegex = /(<pre><code(?:[^>]*)>)([\s\S]*?)(<\/code><\/pre>)/gi
                  const headingRegex = /(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)/gi

                  safeHtml = safeHtml.replace(preCodeRegex, (full, open, inner, close) => {
                    const headings = []
                    let newInner = inner
                    let m
                    while ((m = headingRegex.exec(inner)) !== null) {
                      headings.push(m[1])
                    }
                    if (headings.length) {
                      headings.forEach(h => { newInner = newInner.replace(h, '') })
                      return headings.join('') + open + newInner + close
                    }
                    return full
                  })
                } catch (e) {
                  // if anything goes wrong, fall back to original HTML
                  safeHtml = elementHtml
                }

                // New format: If it contains HTML elements, dynamically compile them cleanly
                return (
                  <div
                    key={i}
                    className="text-body leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: safeHtml }}
                  />
                )
              })}
            </div>
          </div>

          {/* Author */}
          <div className="glass p-6 mt-8 flex items-center gap-4">
            <img src="/harunrhimu.jpg" alt="Harun" loading="lazy" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-heading font-semibold">Md Harun Or Roshid</p>
              <p className="text-sm text-muted">Power BI Developer & Data Analyst</p>
            </div>
          </div>
        </div>
      </section>

      </article>
      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="section-pad bg-card/20">
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
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="badge bg-brand-500/10 text-accent-soft border border-brand-500/20 mb-2">{p.category}</span>
                    <h3 className="text-sm font-bold text-heading group-hover:text-accent-soft transition-colors line-clamp-2">{p.title}</h3>
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
