import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getSiteSettings } from '@/lib/cms'
import { ServiceCard, ServiceItem } from '@/components/ServiceCard'
import { SparklesIcon, PhoneIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Services Catalog — Luxury Cleaning & Technical Services Dubai',
  description:
    'Explore our official service offerings: Home & Villa Cleaning, Deep Cleaning, Office Cleaning, Move-In/Out Cleaning, Glass & Window Cleaning, and Sofa & Carpet Care.',
}

export default async function ServicesPage() {
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()])

  const cleaningServices = services.filter((s) => s.category === 'cleaning')
  const maintenanceServices = services.filter((s) => s.category === 'maintenance')
  const commercialServices = services.filter((s) => s.category === 'commercial')

  const phoneHref = siteSettings.contactInfo.phonePrimary
    ? `tel:${siteSettings.contactInfo.phonePrimary.replace(/[^0-9+]/g, '')}`
    : 'tel:+97145792137'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-20 sm:py-24 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Velora Elite Service Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Specialized Cleaning & Technical Services
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            A Higher Standard of Clean for luxury villas, residential communities, and executive corporate offices across Dubai.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all hover:scale-[1.02]"
            >
              Book Any Service
            </Link>
            <Link
              href="/quote"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-amber-300 bg-black/60 hover:bg-black/80 border border-amber-500/40 transition-colors"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services List by Categories */}
      <div className="py-20 bg-slate-50 space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {/* Cleaning Category */}
          {cleaningServices.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Category 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Residential & Villa Deep Cleaning
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Intensive steam cleaning, deep sanitization, and surface revitalization for villas and luxury apartments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cleaningServices.map((service, idx) => (
                  <ServiceCard key={service.id || idx} service={service as unknown as ServiceItem} />
                ))}
              </div>
            </div>
          )}

          {/* Maintenance Category */}
          {maintenanceServices.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Category 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Commercial & Technical MEP Maintenance
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Comprehensive office sanitization, retail care, and certified building technical maintenance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {maintenanceServices.map((service, idx) => (
                  <ServiceCard key={service.id || idx} service={service as unknown as ServiceItem} />
                ))}
              </div>
            </div>
          )}

          {/* Commercial / Specialized Category */}
          {commercialServices.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Category 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Specialized Surface & Move-In Solutions
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  End of tenancy turnkey sanitization, crystal-clear facade glazing, and bespoke upholstery care.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialServices.map((service, idx) => (
                  <ServiceCard key={service.id || idx} service={service as unknown as ServiceItem} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Need Help Choosing Banner */}
      <section className="bg-black text-white py-14 border-t border-amber-500/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Unsure which service matches your property?
            </h3>
            <p className="text-sm text-slate-400">
              Our Dubai scheduling coordinators will assess your property scope and recommend an optimal package.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={phoneHref}
              className="px-6 py-3 rounded-xl font-bold text-sm text-amber-300 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 transition-colors inline-flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4 text-amber-400" />
              <span>Call: 04 579 2137</span>
            </a>
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-colors"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
