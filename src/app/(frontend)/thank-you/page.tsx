'use client'

import React, { useEffect, use } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, SparklesIcon, WhatsAppIcon } from '@/components/Icons'
import { trackConversionEvent, trackWhatsAppClick } from '@/lib/tracking'

interface PageProps {
  searchParams: Promise<{ type?: string; ref?: string }>
}

export default function ThankYouPage({ searchParams }: PageProps) {
  const { type = 'quote', ref = '' } = use(searchParams)

  useEffect(() => {
    // Only fire advertising pixel conversion events if arriving from a valid form submission with reference ID
    // Direct visits or direct URL loads without a reference ID must not record false lead conversions
    if (!ref) {
      return
    }

    trackConversionEvent('thank_you_view', {
      type,
      reference_id: ref,
      value: 1,
      currency: 'AED',
    })

    if (type === 'inspection') {
      trackConversionEvent('book_inspection', { reference_id: ref })
    } else if (type === 'booking') {
      trackConversionEvent('schedule_service', { reference_id: ref })
    } else {
      trackConversionEvent('generate_lead', { reference_id: ref })
    }
  }, [type, ref])

  const isInspection = type === 'inspection'
  const isBooking = type === 'booking'

  const title = isInspection
    ? 'Inspection Request Confirmed'
    : isBooking
    ? 'Booking Request Received'
    : 'Quotation Request Received'

  const subtitle = isInspection
    ? 'A senior Velora Elite supervisor will contact you to confirm your complimentary on-site inspection window.'
    : isBooking
    ? 'Your service booking details have been registered. Our scheduling desk will confirm dispatch logistics with you.'
    : 'Our estimating specialists are evaluating your specifications to deliver a transparent, itemized proposal.'

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Affirmation */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-amber-500/20 text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircleIcon className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Priority Customer Care</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{title}</h1>
            <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          </div>

          {ref && (
            <div className="inline-block px-5 py-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-sm font-bold shadow-lg">
              Official Reference ID: #{ref}
            </div>
          )}
        </div>
      </section>

      {/* Action / Next Steps Cards */}
      <section className="py-16 sm:py-20 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              What Happens Next?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
                  1
                </div>
                <h4 className="text-sm font-bold text-slate-900">Coordinator Review</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Dubai central dispatch at Aspin Commercial Tower reviews property specifics and surface requirements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
                  2
                </div>
                <h4 className="text-sm font-bold text-slate-900">Phone or WhatsApp Contact</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We reach out to you directly to confirm timing, property gate access, and machinery allocation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm">
                  3
                </div>
                <h4 className="text-sm font-bold text-slate-900">Supervisor Inspection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero advance fee charged online. You inspect completed work alongside our supervisor before settlement.
                </p>
              </div>
            </div>

            {/* Instant WhatsApp Priority Button */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-emerald-950">
                  Need Immediate Dispatch or Want to Send Floorplans/Photos?
                </h4>
                <p className="text-xs text-emerald-800">
                  Connect instantly with our Dubai scheduling team on WhatsApp with your reference #{ref || 'NEW'}.
                </p>
              </div>

              <a
                href={`https://wa.me/971556751854?text=${encodeURIComponent(
                  `Hello Velora Elite, I just submitted an inquiry (${title}) with reference #${ref || ''}. I would like to expedite this.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('thank_you_priority_cta')}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

            {/* Operating Hours Note */}
            <div className="text-center text-xs text-slate-500 pt-2">
              ⏰ Operating Hours: <span className="font-semibold text-slate-700">Monday – Saturday: 8:00 AM – 6:00 PM</span>. For emergency commercial inquiries, WhatsApp is monitored 24/7.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-800 transition-colors shadow-xs"
            >
              ← Back to Homepage
            </Link>
            <Link
              href="/services"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-800 transition-colors shadow-xs"
            >
              Explore Cleaning Services
            </Link>
            <Link
              href="/gallery"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-800 transition-colors shadow-xs"
            >
              View Transformation Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
