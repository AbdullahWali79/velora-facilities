import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices } from '@/lib/cms'
import { ServiceCard, ServiceItem } from '@/components/ServiceCard'
import { SparklesIcon, PhoneIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Services Catalog — Premium Cleaning & Technical Maintenance UAE',
  description:
    'Explore our comprehensive service offerings: deep cleaning, AC duct decontamination, villa technical MEP maintenance, move-in/move-out, and commercial facility management.',
}

export default async function ServicesPage() {
  const services = await getServices()

  const cleaningServices = services.filter((s) => s.category === 'cleaning')
  const maintenanceServices = services.filter((s) => s.category === 'maintenance')
  const commercialServices = services.filter((s) => s.category === 'commercial')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>UAE Certified Service Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Specialized Cleaning & Technical Maintenance
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Delivering European hospital-grade sanitization, diagnostic HVAC duct decontamination, and certified MEP engineering across Dubai and Abu Dhabi.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/book"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
            >
              Book Any Service
            </Link>
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
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
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Category 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Residential Deep Cleaning & Sanitization
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Intensive steam cleaning, allergen extraction, and surface revitalization for villas and luxury penthouses.
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
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Category 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Technical MEP & Facility Maintenance
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Certified electrical diagnostics, HVAC air balancing, and preventive plumbing inspections.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {maintenanceServices.map((service, idx) => (
                  <ServiceCard key={service.id || idx} service={service as unknown as ServiceItem} />
                ))}
              </div>
            </div>
          )}

          {/* Commercial Category */}
          {commercialServices.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Category 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Commercial Facility Management
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Dedicated corporate office sanitization, clinic hygiene protocols, and retail turnkey contracts.
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
      <section className="bg-slate-900 text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">
              Unsure which service matches your property?
            </h3>
            <p className="text-sm text-slate-400">
              Our UAE technical team will assess your square footage and recommend an optimal maintenance package.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+97143999090"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4 text-emerald-400" />
              <span>Call Specialist</span>
            </a>
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
