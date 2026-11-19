import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageBySlug, getSiteSettings } from '@/lib/cms'
import { RichText } from '@/components/RichText'
import { ShieldCheckIcon, SparklesIcon, ArrowRightIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('about')) || (await getPageBySlug('about-us'))
  const settings = await getSiteSettings()

  return {
    title: page?.title || 'About Us — Velora Facilities UAE',
    description:
      page?.heroSubheading ||
      'Learn about Velora Facilities: our heritage of European-standard cleaning, hospital-grade disinfection, and technical MEP maintenance across the UAE.',
    openGraph: {
      title: `${page?.title || 'About Us'} | ${settings.companyName}`,
      description: 'Pioneering precision cleaning and technical maintenance across Dubai and Abu Dhabi.',
    },
  }
}

export default async function AboutPage() {
  const page = (await getPageBySlug('about')) || (await getPageBySlug('about-us'))

  const heroHeading = page?.heroHeading || 'Excellence, Integrity & Uncompromising Quality'
  const heroSubheading =
    page?.heroSubheading ||
    'Velora Facilities was founded to redefine cleaning and maintenance across the United Arab Emirates. We combine European standard sanitization protocols with certified technical MEP maintenance.'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Our Heritage & Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            {heroHeading}
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            {heroSubheading}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-16">
          {/* CMS Rich Text Body if exists */}
          {page?.content && (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
              <RichText content={page.content} />
            </div>
          )}

          {/* Core Values & Commitments */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Operating Principles
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Built on Three Foundational Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900">European Standards</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We adopt the strict hygiene, chemical handling, and surface care standards utilized across top-tier European luxury hospitality.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900">100% In-House Technicians</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We never outsource or subcontract. Every team member is directly employed, visa-sponsored, background-checked, and continuous-learning trained.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900">Transparent Accountability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear scope checklists, manual supervisor inspection, and direct communication ensure you only pay when completely satisfied with the result.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Certifications Bar */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold">Licensed & Compliant UAE Operations</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Velora Facilities is fully registered and licensed to perform comprehensive commercial and residential cleaning, MEP technical contracting, and building maintenance in Dubai, Abu Dhabi, and across all seven Emirates.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-semibold text-slate-200">
                Dubai Municipality Aligned
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-semibold text-slate-200">
                MEP Code Certified
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-semibold text-slate-200">
                Public Liability Insured
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-semibold text-slate-200">
                Eco-Certified Chemicals
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="text-center space-y-6 pt-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Experience the Velora Standard on Your Next Project
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
              >
                Book an Appointment
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Browse Service Catalog</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
