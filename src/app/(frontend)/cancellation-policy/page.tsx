import React from 'react'
import type { Metadata } from 'next'
import { ClockIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Cancellation & Rescheduling Policy — Velora Elite Dubai',
  description:
    'Transparent, customer-friendly cancellation and rescheduling policy for Velora Elite Technical Services L.L.C. Free rescheduling up to 12 hours prior.',
}

export default function CancellationPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Fair & Transparent Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Cancellation & Rescheduling Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Designed for flexibility, convenience, and mutual respect for scheduled technician teams.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Client-Centric Flexibility</h2>
              <p>
                At Velora Elite, we recognize that schedules can shift unexpectedly due to flight delays, construction handovers, or corporate obligations. Our policy is designed to offer maximum flexibility with zero predatory penalties.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. Free Rescheduling Protocol</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-900">Notice of 12+ Hours:</strong> You may reschedule your residential deep cleaning, marble polishing, or commercial service visit free of charge with at least 12 hours advance notice before the designated time slot.
                </li>
                <li>
                  <strong className="text-slate-900">Same-Day Notice (&lt; 6 Hours):</strong> If rescheduled within 6 hours of dispatch, our scheduling desk will make every effort to reallocate the crew to an alternate slot within the next 7 business days without penalties.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Cancellation of Service</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-900">Free Cancellation (12+ Hours):</strong> Any service or inspection appointment may be cancelled without any fee if requested at least 12 hours prior to the confirmed window.
                </li>
                <li>
                  <strong className="text-slate-900">Arrival at Inaccessible Site:</strong> Should our technician team arrive at the premises at the agreed time, but access is denied (e.g., gate permit not issued, tenant absent, utilities shut off), our coordinator will wait for up to 30 minutes. If access cannot be obtained, a nominal call-out fee of AED 150 may apply to offset vehicle and personnel dispatch costs.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. Free Site Inspections</h2>
              <p>
                Complimentary site inspections carry <strong className="text-slate-900">zero financial obligation</strong>. If you decide not to proceed with the proposed quotation after our technical supervisor evaluates your property, no charges whatsoever are incurred.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. How to Reschedule or Cancel</h2>
              <p>To request a change of schedule or cancellation, simply contact our concierge desk in Dubai:</p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div>📞 <strong>Telephone:</strong> <a href="tel:045792137" className="text-amber-800 font-bold">04 579 2137</a></div>
                <div>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/971556751854" className="text-amber-800 font-bold">+971 55 675 1854</a></div>
                <div>✉️ <strong>Email:</strong> <a href="mailto:info@veloraelite.ae" className="text-amber-800 font-bold">info@veloraelite.ae</a></div>
                <div className="text-slate-500 pt-1">Please quote your reference ID for immediate assistance.</div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">6. Jurisdiction & Consumer Rights in the United Arab Emirates</h2>
              <p>
                This cancellation and rescheduling policy adheres to the consumer protection frameworks of the Emirate of Dubai and the federal laws of the United Arab Emirates. Disputes, if any, shall be subject to the exclusive jurisdiction of the competent courts of Dubai.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
