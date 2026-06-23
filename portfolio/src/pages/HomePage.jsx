import Hero from '../components/Hero'
import SectionDivider from '../components/SectionDivider'
import MarqueeBanner from '../components/MarqueeBanner'
import TrustedBy from '../components/TrustedBy'
import WhoIAm from '../components/WhoIAm'
import BeforeAfter from '../components/BeforeAfter'
import MyApproach from '../components/MyApproach'
import WhyWorkWithMe from '../components/WhyWorkWithMe'
import AiFabricSection from '../components/AiFabricSection'
import FeaturedVideo from '../components/FeaturedVideo'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CtaBanner from '../components/CtaBanner'
import SEO from '../components/SEO'
import faqs from '../data/faqs'
import { getPersonSchema, getProfessionalServiceSchema, getWebSiteSchema, getFAQSchema } from '../utils/structuredData'

export default function HomePage() {
  return (
    <main>
      <SEO
        title="Harun | Microsoft Fabric Analytics Engineer & Power BI Design Specialist"
        description="Hire Harun — Microsoft Fabric Analytics Engineer & Power BI Design Specialist. I build Fabric Lakehouse pipelines, Direct Lake semantic models, and executive-grade dashboards that turn raw data into decisions."
        jsonLd={[getPersonSchema(), getProfessionalServiceSchema(), getWebSiteSchema(), getFAQSchema(faqs)]}
      />
      <Hero />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <MarqueeBanner />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <TrustedBy />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <WhoIAm />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <BeforeAfter />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <MyApproach />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <WhyWorkWithMe />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <AiFabricSection />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <FeaturedVideo />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <Testimonials />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <FAQ />
      <div className="divider-spacing">
        <SectionDivider />
      </div>
      <CtaBanner />
    </main>
  )
}
