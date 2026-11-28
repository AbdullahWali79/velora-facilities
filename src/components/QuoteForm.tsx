'use client'

import React, { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { submitQuoteRequest, QuoteFormState } from '@/app/actions/quote'
import { CheckCircleIcon, SparklesIcon, WhatsAppIcon, ShieldCheckIcon } from './Icons'
import { trackQuoteSubmission, trackWhatsAppClick } from '@/lib/tracking'

interface QuoteFormProps {
  services: Array<{
    id?: number | string
    title: string
    slug: string
  }>
}

const initialState: QuoteFormState = {
  success: false,
  message: '',
}

export function QuoteForm({ services }: QuoteFormProps) {
  const [state, formAction, isPending] = useActionState(submitQuoteRequest, initialState)
  const [renderedAt, setRenderedAt] = useState<number>(0)
  const [selectedService, setSelectedService] = useState<string>('')

  useEffect(() => {
    setRenderedAt(Date.now())
  }, [])

  useEffect(() => {
    if (state.success) {
      trackQuoteSubmission(state.referenceId, selectedService)
    }
  }, [state.success, state.referenceId, selectedService])

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
      {/* Top Gold Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600" />

      {state.success ? (
        <div className="text-center py-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Quotation Request Received!
            </h3>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-sm">
              {state.message}
            </p>
          </div>

          {state.referenceId && (
            <div className="inline-block px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-mono text-sm font-bold shadow-xs">
              Quotation Reference: #{state.referenceId}
            </div>
          )}

          {/* Expedite via WhatsApp */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 max-w-md mx-auto space-y-3">
            <p className="text-xs font-semibold leading-relaxed">
              Want immediate dispatch or need to send property photos right now?
            </p>
            <a
              href={`https://wa.me/971556751854?text=${encodeURIComponent(
                `Hello Velora Elite, I just submitted Quotation Request #${state.referenceId}. I would like to confirm my estimate and send property photos.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('quote_success_banner')}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all hover:scale-[1.01]"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Submit Another Inquiry
            </button>
            <Link
              href="/book?type=inspection"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
            >
              Book Free Site Inspection Instead
            </Link>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {/* Form Header */}
          <div className="text-center sm:text-left border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Tailored Dubai Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Request Your Free Quote
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Zero advance payment · Same-day evaluation for Dubai villas, apartments & commercial venues
            </p>
          </div>

          {/* Honeypot & Timestamp for Anti-Spam */}
          <input type="hidden" name="_renderedAt" value={renderedAt} />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_organization">Company Extension</label>
            <input
              type="text"
              id="hp_organization"
              name="hp_organization"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {state.message && !state.success && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {state.message}
            </div>
          )}

          {/* Field 1: Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Enter your name"
              className={`w-full px-4 py-3.5 rounded-xl border ${
                state.errors?.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
              } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-slate-50/50 hover:bg-white transition-colors`}
            />
            {state.errors?.fullName && (
              <p className="text-xs text-red-600 mt-1">{state.errors.fullName}</p>
            )}
          </div>

          {/* Field 2: WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              WhatsApp Number <span className="text-amber-600">*</span>
            </label>
            <div className="relative flex rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 bg-slate-50/50 hover:bg-white transition-colors overflow-hidden">
              <span className="inline-flex items-center px-4 bg-slate-100 border-r border-slate-300 text-xs font-bold text-slate-700 select-none">
                🇦🇪 +971
              </span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="50 123 4567"
                className="w-full px-4 py-3.5 text-sm bg-transparent focus:outline-hidden"
              />
            </div>
            {state.errors?.phone && (
              <p className="text-xs text-red-600 mt-1">{state.errors.phone}</p>
            )}
            <p className="text-[11px] text-slate-500 mt-1">
              We send quotations and dispatch details directly via WhatsApp or phone call.
            </p>
          </div>

          {/* Field 3: Service Required (Dropdown) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2">
              Choose Your Service
            </label>
            <div className="relative">
              <select
                name="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white dark:bg-slate-900 cursor-pointer"
              >
                <option value="">Choose your service</option>
                <option value="marble-polishing">Marble Polishing & Italian Crystallization</option>
                <option value="kitchen-hood-cleaning">Kitchen Hood & Commercial Exhaust Duct Cleaning</option>
                <option value="restaurant-cleaning">Restaurant Deep Cleaning & Kitchen Sanitation</option>
                <option value="post-construction-cleaning">Post-Construction Deep Cleaning & Handover</option>
                <option value="home-villa-cleaning">Luxury Villa & Residence Deep Cleaning</option>
                <option value="sofa-carpet-cleaning">Sofa, Rug & Upholstery Thermodynamic Steam Care</option>
                <option value="office-cleaning">Commercial Office & AMC Contracts</option>
                <option value="move-in-move-out">Move-In & Move-Out Handover Cleaning</option>
                {services
                  .filter(
                    (s) =>
                      ![
                        'marble-polishing',
                        'restaurant-cleaning',
                        'kitchen-hood-cleaning',
                        'post-construction-cleaning',
                        'home-villa-cleaning',
                        'move-in-move-out',
                        'sofa-carpet-cleaning',
                        'office-cleaning',
                      ].includes(s.slug)
                  )
                  .map((s) => (
                    <option key={s.id || s.slug} value={s.id || s.slug}>
                      {s.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Field 4 & 5: Property Size & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Size (Sq. Ft.)
              </label>
              <input
                type="number"
                name="approximateSizeSqFt"
                placeholder="Enter property size (e.g. 3500)"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Location / Community
              </label>
              <input
                type="text"
                name="areaOrCommunity"
                placeholder="Enter your community (e.g. Palm Jumeirah)"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 6: Email Address (OPTIONAL - Requirement #2) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <span className="text-[11px] text-slate-400">Optional for proposal PDF</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email (optional)"
              className={`w-full px-4 py-3.5 rounded-xl border ${
                state.errors?.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
              } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-slate-50/50 hover:bg-white transition-colors`}
            />
            {state.errors?.email && (
              <p className="text-xs text-red-600 mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* Hidden Required defaults for payload */}
          <input type="hidden" name="propertyType" value="villa" />
          <input type="hidden" name="emirate" value="dubai" />

          {/* Upload Photos note / Special Scope */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Project Notes / Upload Photos (Optional)
            </label>
            <textarea
              name="details"
              rows={2}
              placeholder="Note any specific areas (marble etchings, duct layout, handover deadline). You can also WhatsApp photos after submitting..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="font-medium">Zero Online Advance Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="font-medium">Hospital-Grade Eco Products</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Your Proposal...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 text-slate-950" />
                  <span>Get My Free Quote</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              🔒 By submitting, you agree to our{' '}
              <Link href="/privacy-policy" className="text-amber-800 hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms-and-conditions" className="text-amber-800 hover:underline">
                Terms
              </Link>.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
