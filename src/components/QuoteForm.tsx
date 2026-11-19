'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { submitQuoteRequest, QuoteFormState } from '@/app/actions/quote'
import { CheckCircleIcon, SparklesIcon } from './Icons'

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

  useEffect(() => {
    setRenderedAt(Date.now())
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
      {state.success ? (
        <div className="text-center py-12 space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Quotation Request Received!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-sm">
            {state.message}
          </p>
          {state.referenceId && (
            <div className="inline-block px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-semibold">
              Quotation Reference: #{state.referenceId}
            </div>
          )}
          <div className="pt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Request Another Quote
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {/* Honeypot & Timestamp */}
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

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Michael Harrison"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.fullName && (
                <p className="text-xs text-red-600 mt-1">{state.errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. michael@company.com"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.email && (
                <p className="text-xs text-red-600 mt-1">{state.errors.email}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                UAE Contact Number <span className="text-amber-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+971 50 000 0000"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.phone && (
                <p className="text-xs text-red-600 mt-1">{state.errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Primary Service of Interest
              </label>
              <select
                name="service"
                defaultValue={services[0]?.slug || ''}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white"
              >
                <option value="">Select a Service Category</option>
                {services.map((s) => (
                  <option key={s.id || s.slug} value={s.id || s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Property Type & Approximate Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Classification <span className="text-amber-600">*</span>
              </label>
              <select
                name="propertyType"
                required
                defaultValue="villa"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white"
              >
                <option value="apartment">Apartment / Penthouse</option>
                <option value="villa">Villa / Townhouse / Estate</option>
                <option value="office">Commercial Office</option>
                <option value="retail">Retail Storefront / Restaurant</option>
                <option value="warehouse">Industrial / Warehouse</option>
                <option value="building">Entire Commercial Building / Tower</option>
                <option value="other">Other Unique Property</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Approximate Size (Sq. Ft. - Optional)
              </label>
              <input
                type="number"
                name="approximateSizeSqFt"
                placeholder="e.g. 4500"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          {/* Row 4: Emirate & Community */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Emirate <span className="text-amber-600">*</span>
              </label>
              <select
                name="emirate"
                required
                defaultValue="dubai"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white"
              >
                <option value="dubai">Dubai</option>
                <option value="abu_dhabi">Abu Dhabi</option>
                <option value="sharjah">Sharjah</option>
                <option value="ajman">Ajman</option>
                <option value="ras_al_khaimah">Ras Al Khaimah</option>
                <option value="umm_al_quwain">Umm Al Quwain</option>
                <option value="fujairah">Fujairah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Neighborhood / Community
              </label>
              <input
                type="text"
                name="areaOrCommunity"
                placeholder="e.g. Palm Jumeirah, Downtown, Dubai Hills"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          {/* Row 5: Preferred Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Execution Date (Optional)
            </label>
            <input
              type="date"
              name="preferredDate"
              min={new Date().toISOString().split('T')[0]}
              className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
            />
          </div>

          {/* Details / Scope */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Scope of Work & Requirements
            </label>
            <textarea
              name="details"
              rows={4}
              placeholder="Describe your property specifications, special finishes (e.g. travertine, marble, parquet), urgency, or recurring AMC requirements..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Calculating Proposal...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 text-slate-950" />
                  <span>Request Custom Quotation</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              ⚡ Guaranteed response within 2 business hours. Transparent pricing with no hidden charges.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
