import React from 'react'
import type { Metadata } from 'next'
import { getServices } from '@/lib/cms'
import { BookingForm } from '@/components/BookingForm'
import { SparklesIcon, ShieldCheckIcon, CheckCircleIcon, ClockIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ service?: string }>
}

export const metadata: Metadata = {
  title: 'Book Online — Certified Cleaning & Maintenance Dispatch UAE',
  description:
    'Schedule your European-standard cleaning, HVAC duct decontamination, or villa maintenance appointment online. Manual phone/WhatsApp confirmation by Velora Facilities.',
}

export default async function BookOnlinePage({ searchParams }: PageProps) {
  const { service: initialServiceSlug } = await searchParams
  const services = await getServices()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Punctual UAE Scheduling</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Schedule a Service Appointment
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Select your service, preferred appointment date, and time slot. Our scheduling coordinator will manually confirm your technician team within 1 hour.
          </p>
        </div>
      </section>

      {/* Main Form & Assurances Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 Cols): Assurances & Manual Protocol */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Why Manual Confirmation?</h3>
                    <p className="text-xs text-slate-500">Punctuality and custom team allocation</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike automated booking platforms that dispatch untrained gig workers, Velora Facilities manually reviews your property specifications and assigns a dedicated, background-checked team equipped with the precise machinery required for your surfaces.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero advance payment charged online</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Supervisor on-site inspection before payment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Eco-friendly, child- and pet-safe products</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Flexible rescheduling with zero penalty fees</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Help */}
              <div className="bg-emerald-950 text-white p-8 rounded-3xl border border-emerald-800 space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold tracking-wide uppercase text-emerald-300">
                    Same-Day Emergency Dispatch
                  </h4>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Need an urgent cleaning or MEP technician dispatched today? Reach our direct dispatch desk via WhatsApp or phone:
                </p>
                <div className="space-y-1">
                  <a
                    href="https://wa.me/971508821940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    💬 WhatsApp: +971 50 882 1940
                  </a>
                  <a
                    href="tel:+97143999090"
                    className="block text-lg font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    📞 Phone: +971 4 399 9090
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): Booking Form */}
            <div className="lg:col-span-7">
              <BookingForm
                services={services}
                initialServiceSlug={initialServiceSlug}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
