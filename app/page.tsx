import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatIsSpaSection } from "@/components/what-is-spa-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ProductsCollaborationsSection } from "@/components/products-collaborations-section"
import { SpaExperienceSection } from "@/components/spa-experience-section"
import { MichiFriendlySection } from "@/components/michi-friendly-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientsSection } from "@/components/clients-section"
import { StoreLocationSection } from "@/components/store-location-section"
import { BlogTeaserSection } from "@/components/blog-teaser-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
  <main className="min-h-screen overflow-x-hidden">
      <Header />
      {/* Hero Section - Black background */}
      <HeroSection />

      <WhatIsSpaSection />

      <CertificationsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-white">
        <ProductsCollaborationsSection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-white">
        <SpaExperienceSection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-gray-100">
        <MichiFriendlySection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-brand-black">
        <GallerySection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-black">
        <TestimonialsSection />
      </div>


      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-brand-yellow">
        <StoreLocationSection />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="bg-brand-black">
        <BlogTeaserSection />
      </div>

      <div className="bg-brand-pink">
        <ContactSection />
      </div>

    </main>
  )
}
