import Hero from '../components/Hero'
import MarqueeBanner from '../components/MarqueeBanner'
import About from '../components/About'
import ServicesPreview from '../components/ServicesPreview'
import CaseStudiesPreview from '../components/CaseStudiesPreview'
import SkillsPreview from '../components/SkillsPreview'
import VideoShowcase from '../components/VideoShowcase'
import BlogPreview from '../components/BlogPreview'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <About />
      <ServicesPreview />
      <CaseStudiesPreview />
      <SkillsPreview />
      <VideoShowcase />
      <BlogPreview />
      <Testimonials />
      <Contact />
    </main>
  )
}
