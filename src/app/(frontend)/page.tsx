import React from 'react'
import Link from 'next/link'
import {
  getHomepageSettings,
  getServices,
  getGalleryItems,
  getTestimonials,
  getSiteSettings,
} from '@/lib/cms'
import { HeroSlider } from '@/components/HeroSlider'
import { ServiceCard } from '@/components/ServiceCard'
import { CleaningEquipment } from '@/components/CleaningEquipment'
import { VideoShowcase } from '@/components/VideoShowcase'
import { GalleryComparison } from '@/components/GalleryComparison'
import { TeamSection } from '@/components/TeamSection'
import { CommercialContracts } from '@/components/CommercialContracts'
import { AreasWeServe } from '@/components/AreasWeServe'
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection'
import { FAQSection } from '@/components/FAQSection'
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const [homepage, services, gallery, testimonials, siteSettings] = await Promise.all([
    getHomepageSettings(),
    getServices(),
    getGalleryItems(),
    getTestimonials(),
    getSiteSettings(),
  ])

  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 6)
  const displayServices = featuredServices.length > 0 ? featuredServices : services.slice(0, 6)

  const featuredGallery = gallery.filter((g) => g.isFeatured).slice(0, 6)
  const displayGallery = featuredGallery.length > 0 ? featuredGallery : gallery.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Free Inspection CTA */}
      <HeroSlider
        banners={homepage.heroBanners || []}
        trustBadges={homepage.trustBadges || []}
        stats={homepage.stats || []}
      />

      {/* 2. Why Choose Velora Elite - 6 Luxury Pillars */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>The Velora Elite Standard of Excellence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Discerning UAE Property Owners Choose Velora Elite
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                We position Velora Elite as Dubai’s premier luxury cleaning company. Whether restoring Italian Crema Marfil marble in a Palm Jumeirah villa, degreasing a high-volume commercial kitchen in DIFC, or performing architectural post-construction handovers in Dubai Hills, our certified specialists deliver flawless results.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero Advance Payment &mdash; Inspect First</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Zero online fees charged upfront. Our on-site supervisor conducts a white-glove walk-through alongside you before any payment is settled.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital-Grade, Eco-Friendly Bio-Sanitization</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Dubai Municipality approved and EPA-registered antimicrobial biocides safe for delicate Italian marble, infants, pets, and food contact surfaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">100% In-House Uniformed Specialists</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Zero day-labor outsourcing. Every technician is directly employed, visa-sponsored, background-cleared, and trained to European surface protocols.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/book?type=inspection"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  Book a Free Inspection
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                >
                  Our Philosophy & Heritage
                </Link>
              </div>
            </div>

            {/* Right Feature Card Box */}
            <div className="relative">
              <div className="spotlight-card bg-gradient-to-br from-black via-zinc-950 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-amber-500/30 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    Central Operations & Dispatch
                  </span>
                  <h3 className="text-2xl font-bold">
                    Dubai Central Hub & Rapid Van Fleet
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Stationed at Aspin Commercial Tower on Sheikh Zayed Road with direct arterial access to Downtown, Palm Jumeirah, Dubai Hills, and DIFC.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                      100%
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Vetted In-House Staff</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                      0 AED
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Free On-Site Inspection</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                      Aspin Tower
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Sheikh Zayed Road HQ</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                      0 Advance
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Pay After Quality Check</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-amber-400">Need immediate booking?</div>
                    <div className="text-sm font-bold text-white">
                      {siteSettings.contactInfo.phonePrimary ? `Call ${siteSettings.contactInfo.phonePrimary}` : 'Dispatch: 04 579 2137'}
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-colors"
                  >
                    Contact Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Cleaning Services Showcase */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Specialized Cleaning Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Signature Cleaning Services
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Italian marble crystallization, certified kitchen duct degreasing, post-construction architectural handovers, and meticulous villa deep care across Dubai.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-900 group"
            >
              <span>Explore All Services</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, idx) => (
              <ServiceCard key={service.id || idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Professional Cleaning Equipment Section */}
      <CleaningEquipment />

      {/* 5. Live Field Video Showcase */}
      <section className="py-20 sm:py-24 bg-slate-950 text-white border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Documented Field Footage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Velora Elite Execution Videos
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the precision of our Italian Klindex planetary grinders, 180°C thermodynamic steam vaporizers, and negative-air duct cleanings in action.
            </p>
          </div>

          <VideoShowcase />
        </div>
      </section>

      {/* 6. Before & After Completed Projects Showcase */}
      {displayGallery && displayGallery.length > 0 ? (
        <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Verified Transformations</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Our Completed Projects & Transformations
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Witness the transformative impact of our specialized deep cleaning, marble restoration, and commercial kitchen degreasing across premier UAE properties.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-900 group"
              >
                <span>View Complete Gallery</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <GalleryComparison items={displayGallery} />
          </div>
        </section>
      ) : null}

      {/* 7. Our Team in Branded Uniforms */}
      <TeamSection />

      {/* 8. Monthly & Annual Commercial Cleaning Contracts (AMC) */}
      <CommercialContracts />

      {/* 9. Areas We Serve in Dubai */}
      <AreasWeServe />

      {/* 10. Customer Feedback & Google Reviews */}
      <GoogleReviewsSection testimonials={testimonials} />

      {/* 11. Frequently Asked Questions (FAQ with Schema) */}
      <FAQSection />

      {/* 12. Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-black via-zinc-950 to-slate-950 text-white border-t border-amber-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {homepage.ctaBanner?.heading || 'A Higher Standard of Clean For Your Home & Business'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {homepage.ctaBanner?.description ||
              'Connect with our Dubai concierge team for a complimentary on-site inspection or instant tailored estimate. We guarantee punctual arrival and flawless execution.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book?type=inspection"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Free Site Inspection
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-amber-300 bg-black/60 hover:bg-black/80 border border-amber-500/40 transition-colors"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
