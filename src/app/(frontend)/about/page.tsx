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
    title: page?.title || 'About Us — Velora Elite Dubai',
    description:
      page?.heroSubheading ||
      'Learn about Velora Elite Technical Services L.L.C.: our heritage of luxury cleaning, hospital-grade disinfection, and specialized care across Dubai.',
    openGraph: {
      title: `${page?.title || 'About Us'} | ${settings.companyName}`,
      description: 'A Higher Standard of Clean across Dubai and the UAE.',
    },
  }
}

export default async function AboutPage() {
  const page = (await getPageBySlug('about')) || (await getPageBySlug('about-us'))

  const heroHeading = page?.heroHeading || 'Excellence, Integrity & A Higher Standard of Clean'
  const heroSubheading =
    page?.heroSubheading ||
    'Velora Elite Technical Services L.L.C. was founded to set the gold standard in cleaning and maintenance across Dubai. Stationed on Sheikh Zayed Road, we deliver unmatched care for premium villas, residences, and executive offices.'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-20 sm:py-24 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
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
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Operating Principles
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Built on Three Foundational Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900">Elite Standards</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We adopt the strict hygiene, surface care, and chemical handling protocols utilized across top-tier Dubai luxury residences and hospitality suites.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900">100% In-House Technicians</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We never outsource or subcontract. Every team member wears the official Velora Elite uniform, is directly employed, visa-sponsored, and background-vetted.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900">Transparent Accountability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear checklists, supervisor inspection, and direct communication ensure you only pay when completely satisfied with the completed work.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Certifications Bar */}
          <div className="p-8 sm:p-10 rounded-3xl bg-black text-white border border-amber-500/30 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold">Licensed & Compliant UAE Operations</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              VELORA ELITE TECHNICAL SERVICES L.L.C. (م.م.ذ فيلورا إيليت للخدمات الفنية ش.ذ.م.م) is an officially licensed Dubai commercial technical entity operating from Office 4301F, Aspin Commercial Tower, Sheikh Zayed Road, Dubai.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 font-semibold text-amber-200">
                Dubai Economy & Tourism
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 font-semibold text-amber-200">
                Technical Services LLC
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 font-semibold text-amber-200">
                Commercial Tower Hub
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 font-semibold text-amber-200">
                Eco-Certified Chemicals
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="text-center space-y-6 pt-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Experience the Velora Elite Standard on Your Next Project
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all hover:scale-[1.02]"
              >
                Book an Appointment
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center justify-center gap-2"
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
