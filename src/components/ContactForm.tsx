'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { submitContactMessage, ContactFormState } from '@/app/actions/contact'
import { CheckCircleIcon, MailIcon } from './Icons'

const initialState: ContactFormState = {
  success: false,
  message: '',
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState)
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
            Message Sent Successfully!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-sm">
            {state.message}
          </p>
          <div className="pt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {/* Honeypot & Timestamp */}
          <input type="hidden" name="_renderedAt" value={renderedAt} />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_subject_field">Leave blank</label>
            <input
              type="text"
              id="hp_subject_field"
              name="hp_subject_field"
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
                Your Full Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. James Campbell"
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
                placeholder="e.g. james@example.ae"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.email && (
                <p className="text-xs text-red-600 mt-1">{state.errors.email}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+971 50 000 0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Inquiry Subject <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="e.g. Villa Deep Cleaning in Palm Jumeirah"
                className={`w-full px-4 py-3 rounded-xl border ${
                  state.errors?.subject ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
              />
              {state.errors?.subject && (
                <p className="text-xs text-red-600 mt-1">{state.errors.subject}</p>
              )}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Message <span className="text-amber-600">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="How can Velora Elite assist you today? Please share any relevant property or schedule details..."
              className={`w-full px-4 py-3 rounded-xl border ${
                state.errors?.message ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
              } focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm`}
            />
            {state.errors?.message && (
              <p className="text-xs text-red-600 mt-1">{state.errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <MailIcon className="w-5 h-5 text-slate-950" />
                  <span>Send Message to Customer Care</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
