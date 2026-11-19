import React from 'react'
import Link from 'next/link'
import { getHomepageSettings, getServices, getGalleryItems, getTestimonials } from '@/lib/cms'
import { HeroSlider } from '@/components/HeroSlider'
import { ServiceCard } from '@/components/ServiceCard'
import { GalleryComparison } from '@/components/GalleryComparison'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, CheckCircleIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const [homepage, services, gallery, testimonials] = await Promise.all([
    getHomepageSettings(),
    getServices(),
    getGalleryItems(),
    getTestimonials(),
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <SparklesIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Precision Cleaning & Technical MEP</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Signature Services
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Hospital-grade sanitation, meticulous deep cleaning, and certified MEP maintenance executed by vetted European-standard professionals.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
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

      {/* Why Choose Velora Facilities - High Impact Value Proposition */}
      <section className="py-20 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Velora Standard of Excellence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Discerning UAE Property Owners Choose Velora Facilities
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                We bridge the gap between traditional commercial cleaners and bespoke facility management. Whether managing a Palm Jumeirah beachfront villa, a corporate penthouse, or a commercial facility in Abu Dhabi, our team adheres to strict European protocols.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital-Grade Decontamination</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Using EPA-certified, organic antimicrobial agents safe for babies, pets, and sensitive luxury finishes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Punctual Dispatch with Zero Advance Fees</h4>
                    <p className="text-xs text-slate-600 mt-0.5">We confirm dispatch details manually over the phone or WhatsApp. You inspect the completed work before payment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Certified Multi-Skilled Technicians</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Our staff undergo rigorous background screening, health certification, and continuous technical training in UAE MEP codes.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
                >
                  Book Your Appointment
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            {/* Right Feature Card Box */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-slate-800 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    Enterprise Capability
                  </span>
                  <h3 className="text-2xl font-bold">
                    Comprehensive UAE Coverage & Rapid Dispatch
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dedicated mobile maintenance units stationed strategically across Dubai and Abu Dhabi for immediate emergency response or scheduled maintenance.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-emerald-400">100%</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Vetted UAE Staff</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-emerald-400">&lt; 2 Hrs</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Emergency Response</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-emerald-400">7 Emirates</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Full Jurisdiction</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-emerald-400">0 AED</div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">Online Advance Fee</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400">Need immediate booking?</div>
                    <div className="text-sm font-bold text-white">Call +971 4 399 9090</div>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-lg text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                  >
                    Contact Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Transformation Showcase */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <SparklesIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Transformations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Before & After Project Showcase
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Witness the transformative impact of our specialized deep restoration, marble revitalization, and HVAC duct decontamination across premier UAE communities.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
            >
              <span>View Complete Gallery</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <GalleryComparison items={displayGallery} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Client Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by UAE Homeowners & Businesses
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read verified feedback from villa owners, corporate facilities managers, and property investors who rely on Velora Facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((t, idx) => (
              <TestimonialCard key={t.id || idx} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner (from homepage global) */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {homepage.ctaBanner?.heading || 'Ready for an Uncompromising Standard of Cleanliness?'}
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            {homepage.ctaBanner?.description ||
              'Connect with our team for a bespoke maintenance plan or immediate booking confirmation. We guarantee punctual arrival and flawless execution.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={homepage.ctaBanner?.buttonUrl || '/book'}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {homepage.ctaBanner?.buttonText || 'Schedule Your Appointment'}
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-white/15 hover:bg-white/20 border border-white/20 transition-colors"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
