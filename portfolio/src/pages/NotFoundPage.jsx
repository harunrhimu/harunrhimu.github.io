import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <main className="pt-20">
      <SEO
        title="Page Not Found | 404"
        description="The page you're looking for doesn't exist. Return to the homepage to explore Power BI case studies, services, and more."
        noIndex
      />
      <section className="min-h-[70vh] flex items-center">
        <div className="container-xl text-center">
          <p className="text-8xl md:text-9xl font-extrabold text-gradient mb-4">404</p>
          <h1 className="heading-md mb-4">Page Not Found</h1>
          <p className="text-surface-400 max-w-md mx-auto mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Back to Home
            </Link>
            <Link to="/case-studies" className="btn-outline">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
