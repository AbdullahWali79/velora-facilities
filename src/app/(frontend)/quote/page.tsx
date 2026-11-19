import React from 'react'
import type { Metadata } from 'next'
import { getServices } from '@/lib/cms'
import { QuoteForm } from '@/components/QuoteForm'
import { SparklesIcon, ShieldCheckIcon, PhoneIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Request a Quote — Bespoke Cleaning & Maintenance Proposals UAE',
  description:
    'Receive a tailored quotation for residential or commercial cleaning, technical MEP maintenance, and facility management across Dubai, Abu Dhabi, and the UAE.',
}

export default async function QuotePage() {
  const services = await getServices()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fast, Transparent Estimation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Request a Custom Quotation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Provide your property details and service scope below. An estimator from Velora Facilities will calculate your transparent proposal within 2 business hours.
          </p>
        </div>
      </section>

      {/* Form & Value Proposition Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 Cols): Assurances & Guidance */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">What Happens Next?</h3>
                    <p className="text-xs text-slate-500">Our 3-step quotation review process</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Scope Evaluation</span>
                      Our senior estimator reviews your square footage, property type, and requirements against standard UAE rates.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Transparent Written Proposal</span>
                      You receive an itemized breakdown with zero hidden fees via WhatsApp or email.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Manual Dispatch Scheduling</span>
                      Once approved, our team locks in your preferred arrival window and supervisor assignment.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone Support */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold tracking-wide uppercase text-slate-300">
                    Need an Immediate Phone Estimate?
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For emergency requirements, large commercial buildings, or urgent tenant handovers, call our desk directly:
                </p>
                <a
                  href="tel:+97143999090"
                  className="block text-2xl font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  +971 4 399 9090
                </a>
                <span className="text-[11px] text-slate-500 block">
                  Available Mon–Sat: 8:00 AM – 8:00 PM
                </span>
              </div>
            </div>

            {/* Right Column (7 Cols): Quote Form */}
            <div className="lg:col-span-7">
              <QuoteForm services={services} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
