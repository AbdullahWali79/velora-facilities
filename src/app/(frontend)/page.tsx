import React from 'react'
import Link from 'next/link'
import { getHomepageSettings, getServices, getGalleryItems, getTestimonials, getSiteSettings } from '@/lib/cms'
import { HeroSlider } from '@/components/HeroSlider'
import { ServiceCard } from '@/components/ServiceCard'
import { GalleryComparison } from '@/components/GalleryComparison'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, CheckCircleIcon } from '@/components/Icons'

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

  const featuredGallery = gallery.filter((g) => g.isFeatured).slice(0, 3)
  const displayGallery = featuredGallery.length > 0 ? featuredGallery : gallery.slice(0, 3)

  const featuredTestimonials = testimonials.filter((t) => t.isFeatured).slice(0, 3)
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSlider
        banners={homepage.heroBanners || []}
        trustBadges={homepage.trustBadges || []}
        stats={homepage.stats || []}
      />

      {/* Services Showcase Section */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>A Higher Standard of Clean</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Signature Services
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Hospital-grade sanitation, meticulous villa care, and specialized cleaning executed by vetted Velora Elite professionals in Dubai.
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

      {/* Why Choose Velora Elite - High Impact Value Proposition */}
      <section className="py-20 sm:py-24 bg-white border-y border-slate-200">
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
                We deliver a higher standard of clean for Dubai&apos;s most demanding residences and commercial spaces. Whether managing an Emirates Hills or Palm Jumeirah villa, a luxury penthouse, or a corporate suite on Sheikh Zayed Road, our team guarantees flawless results.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital-Grade Decontamination</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Using EPA-certified, organic antimicrobial agents safe for children, pets, and sensitive luxury finishes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Punctual Dispatch with Zero Advance Fees</h4>
                    <p className="text-xs text-slate-600 mt-0.5">We confirm dispatch details manually over the phone or WhatsApp. You inspect the completed work before payment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Certified Multi-Skilled Technicians</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Our staff undergo rigorous background screening, health certification, and continuous technical training in UAE facility standards.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  Book Your Appointment
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            {/* Right Feature Card Box */}
            <div className="relative">
              <div className="spotlight-card bg-gradient-to-br from-black via-zinc-950 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-amber-500/30 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    Enterprise Capability
                  </span>
                  <h3 className="text-2xl font-bold">
                    Dubai Central Operations & Rapid Dispatch
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Stationed at Aspin Commercial Tower on Sheikh Zayed Road for rapid deployment across Dubai, Downtown, Palm Jumeirah, Dubai Hills, and beyond.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">100%</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Vetted UAE Staff</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">&lt; 2 Hrs</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Emergency Response</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Dubai Hub</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Sheikh Zayed Road</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20">
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">0 AED</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Online Advance Fee</div>
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

      {/* Before & After Transformation Showcase - Only displays when real CMS media is uploaded */}
      {displayGallery && displayGallery.length > 0 ? (
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Verified Transformations</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Before & After Project Showcase
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Witness the transformative impact of our specialized deep cleaning, marble care, and sofa revitalization across premier UAE properties.
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

      {/* Testimonials Section - Only displays when client-verified reviews exist in CMS */}
      {displayTestimonials && displayTestimonials.length > 0 ? (
        <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Client Endorsements</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Trusted by UAE Homeowners & Businesses
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Read verified feedback from villa owners, corporate managers, and property investors who rely on Velora Elite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayTestimonials.map((t, idx) => (
                <TestimonialCard key={t.id || idx} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Call to Action Banner (from homepage global) */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-black via-zinc-950 to-slate-950 text-white border-t border-amber-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {homepage.ctaBanner?.heading || 'A Higher Standard of Clean For Your Home & Business'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {homepage.ctaBanner?.description ||
              'Connect with our Dubai team for a bespoke cleaning plan or immediate booking confirmation. We guarantee punctual arrival and flawless execution.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={homepage.ctaBanner?.buttonUrl || '/book'}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {homepage.ctaBanner?.buttonText || 'Schedule Your Appointment'}
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
