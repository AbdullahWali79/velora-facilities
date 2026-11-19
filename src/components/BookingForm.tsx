'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { submitBookingRequest, BookingFormState } from '@/app/actions/booking'
import { CheckCircleIcon, ShieldCheckIcon, ClockIcon } from './Icons'

interface BookingFormProps {
  services: Array<{
    id?: number | string
    title: string
    slug: string
  }>
  initialServiceSlug?: string
}

const initialState: BookingFormState = {
  success: false,
  message: '',
}

export function BookingForm({ services, initialServiceSlug }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(submitBookingRequest, initialState)
  const [renderedAt, setRenderedAt] = useState<number>(0)

  useEffect(() => {
    setRenderedAt(Date.now())
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
      {/* Informational Banner on Manual Confirmation */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
        <ClockIcon className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 leading-relaxed">
          <span className="font-bold">Manual Confirmation Protocol:</span> Bookings are submitted as requests. Our Velora Elite scheduling coordinator will contact you via telephone (04 579 2137) or WhatsApp (+971 55 675 1854) to confirm the dispatch slot, team size, and location specifics.
        </div>
      </div>

      {state.success ? (
        <div className="text-center py-12 space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Booking Request Received!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-sm">
            {state.message}
          </p>
          {state.referenceId && (
            <div className="inline-block px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-semibold">
              Booking Reference: #{state.referenceId}
            </div>
          )}
          <div className="pt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {/* Hidden Spam Honeypots & Timestamp */}
          <input type="hidden" name="_renderedAt" value={renderedAt} />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_address">Do not fill this</label>
            <input
              type="text"
              id="hp_address"
              name="hp_address"
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
                name="customerName"
                required
                placeholder="e.g. Abdullah Al-Mansoor"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.customerName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.customerName && (
                <p className="text-xs text-red-600 mt-1">{state.errors.customerName}</p>
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
                placeholder="e.g. client@example.ae"
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
              <span className="text-[11px] text-slate-400 mt-1 block">
                Required for WhatsApp / phone confirmation
              </span>
              {state.errors?.phone && (
                <p className="text-xs text-red-600 mt-1">{state.errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Selected Service <span className="text-amber-600">*</span>
              </label>
              <select
                name="service"
                required
                defaultValue={initialServiceSlug || (services[0]?.slug || '1')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white"
              >
                {services.map((s) => (
                  <option key={s.id || s.slug} value={s.id || s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Preferred Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Preferred Date <span className="text-amber-600">*</span>
              </label>
              <input
                type="date"
                name="preferredDate"
                required
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.preferredDate ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.preferredDate && (
                <p className="text-xs text-red-600 mt-1">{state.errors.preferredDate}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Preferred Time Slot <span className="text-amber-600">*</span>
              </label>
              <select
                name="timeSlot"
                required
                defaultValue="morning_08_12"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white"
              >
                <option value="morning_08_12">Morning (08:00 AM – 12:00 PM)</option>
                <option value="afternoon_12_16">Afternoon (12:00 PM – 04:00 PM)</option>
                <option value="evening_16_20">Evening (04:00 PM – 08:00 PM)</option>
                <option value="flexible">Flexible / Any Available Time</option>
              </select>
            </div>
          </div>

          {/* Row 4: Emirate & Full Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1">
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

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Detailed Property Address <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                name="fullAddress"
                required
                placeholder="Building / Villa #, Street, Community (e.g. Villa 24, Palm Jumeirah)"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.fullAddress ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.fullAddress && (
                <p className="text-xs text-red-600 mt-1">{state.errors.fullAddress}</p>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Special Instructions or Access Notes (Optional)
            </label>
            <textarea
              name="specialInstructions"
              rows={3}
              placeholder="e.g. Security gate access code, visitor parking details, pet in residence, special focus on marble floor or upholstery..."
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
                  <span>Submitting Booking Request...</span>
                </>
              ) : (
                <>
                  <ShieldCheckIcon className="w-5 h-5 text-slate-950" />
                  <span>Submit Booking Request</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              🔒 No advance payment is charged online. Your appointment is confirmed manually by our team.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
