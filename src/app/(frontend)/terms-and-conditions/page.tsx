import React from 'react'
import type { Metadata } from 'next'
import { ShieldCheckIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Booking Terms and Conditions — Velora Elite Dubai',
  description:
    'Official booking terms, service guarantees, inspection protocols, and payment conditions for Velora Elite Technical Services L.L.C. in Dubai, UAE.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Service Standards & Mutual Commitments</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Booking Terms & Conditions
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Applicable to all residential, villa, commercial, and technical cleaning services across the UAE.
          </p>
        </div>
      </section>

      {/* Terms Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By requesting a quotation, booking a site inspection, or confirming a service appointment with Velora Elite Technical Services L.L.C. (&ldquo;Velora Elite&rdquo;), the client agrees to be bound by these Booking Terms & Conditions.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. Free Site Inspection Protocol</h2>
              <p>
                To maintain our uncompromising standard of service, Velora Elite offers complimentary, zero-obligation on-site inspections for villas, commercial kitchens, and post-construction handover projects across Dubai. A senior technical supervisor conducts the evaluation to determine exact surface needs (marble condition, duct layout, square footage) prior to issuing a final quotation.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Confirmation & Dispatch Protocol</h2>
              <p>
                Website submissions are registered as requests. Appointments are officially confirmed only after our scheduling coordinator contacts the client via telephone (<a href="tel:045792137" className="text-amber-800 font-bold">04 579 2137</a>) or WhatsApp (<a href="https://wa.me/971556751854" className="text-amber-800 font-bold">+971 55 675 1854</a>) to confirm technician availability, parking/gate access, and operational specifics.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. Zero Online Advance Fee & Payment Terms</h2>
              <p>
                Unlike generic consumer platforms, Velora Elite charges <strong className="text-slate-900">zero advance fees online</strong>. Payment is settled only upon completion of the service and after a comprehensive on-site quality inspection conducted alongside our on-site team leader.
              </p>
              <p>
                Accepted payment methods include UAE corporate bank transfer, credit/debit card, or cash upon invoice issuance. Commercial AMC contracts are billed monthly or quarterly per signed SLA.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. Quality Guarantee & Inspection</h2>
              <p>
                Our supervisor reviews all work against our rigorous multi-point checklist before departure. Should any agreed area require touch-ups, our on-site crew addresses it immediately at zero additional charge.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">6. Utilities & Property Access</h2>
              <p>
                Clients agree to ensure active water and electricity supplies in the premises during the service execution, and provide necessary community security or gate passes (e.g. Palm Jumeirah, Emirates Hills, Dubai Hills).
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">7. Staff Welfare & Safety</h2>
              <p>
                All Velora Elite personnel are 100% directly sponsored, legally visa-compliant, background-screened, and medically certified under UAE Ministry of Human Resources and Emiratisation (MOHRE) regulations. We never subcontract or deploy day-laborers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">8. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Any dispute shall be subject to the exclusive jurisdiction of the Courts of Dubai.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
