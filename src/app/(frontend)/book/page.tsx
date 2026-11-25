import React from 'react'
import type { Metadata } from 'next'
import { getServices } from '@/lib/cms'
import { BookingForm } from '@/components/BookingForm'
import { SparklesIcon, ShieldCheckIcon, CheckCircleIcon, ClockIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ service?: string; type?: string }>
}

export const metadata: Metadata = {
  title: 'Book a Free Inspection & Service Appointment — Velora Elite Dubai',
  description:
    'Schedule your elite villa cleaning, marble polishing, or book a complimentary site inspection in Dubai. Zero advance payment with Velora Elite.',
}

export default async function BookOnlinePage({ searchParams }: PageProps) {
  const { service: initialServiceSlug, type } = await searchParams
  const services = await getServices()
  const isInspection = type === 'inspection'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{isInspection ? 'Complimentary On-Site Assessment' : 'Punctual Dubai Scheduling'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            {isInspection ? 'Book a Free Site Inspection' : 'Schedule a Service Appointment'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isInspection
              ? 'Request a complimentary, zero-obligation site inspection in Dubai. Our technical supervisor will inspect your property, diagnose surfaces or ductwork, and provide an exact quotation.'
              : 'Select your service, preferred appointment date, and time slot. Our Velora Elite scheduling coordinator will manually confirm your technician team.'}
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
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Why Manual Confirmation?</h3>
                    <p className="text-xs text-slate-500">Punctuality and custom team allocation</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike automated booking platforms that dispatch untrained workers, Velora Elite manually reviews your property specifications and assigns a dedicated, background-checked team equipped with the precise machinery required for your surfaces.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Zero advance payment charged online</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Supervisor on-site inspection before payment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Eco-friendly, child- and pet-safe products</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>Flexible rescheduling with zero penalty fees</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Help */}
              <div className="bg-black text-white p-8 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-bold tracking-wide uppercase text-amber-300">
                    Direct Dispatch Desk
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need an urgent cleaning or technical team dispatched? Reach our direct dispatch desk via WhatsApp or landline:
                </p>
                <div className="space-y-2 pt-1">
                  <a
                    href="https://wa.me/971556751854"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    💬 WhatsApp: +971 55 675 1854
                  </a>
                  <a
                    href="tel:+97145792137"
                    className="block text-lg font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    📞 Phone: 04 579 2137
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): Booking Form */}
            <div className="lg:col-span-7">
              <BookingForm
                services={services}
                initialServiceSlug={initialServiceSlug}
                isInspection={isInspection}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
