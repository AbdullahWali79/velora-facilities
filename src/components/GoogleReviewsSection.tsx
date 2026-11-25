'use client'

import React from 'react'
import { StarIcon, CheckCircleIcon } from './Icons'
import { TestimonialItem } from './TestimonialCard'

interface GoogleReviewsSectionProps {
  testimonials: TestimonialItem[]
}

export function GoogleReviewsSection({ testimonials }: GoogleReviewsSectionProps) {
  const displayItems = testimonials.length > 0 ? testimonials.slice(0, 6) : []

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header & Google Rating Summary Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 pb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200">
              {/* Google G Logo icon SVG */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Customer Feedback & Ratings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Feedback & Google Reviews
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read authentic feedback from villa homeowners, executive restaurateurs, and property managers who trust Velora Elite in Dubai.
            </p>
          </div>

          {/* Google Summary Badge */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-amber-500/25 rounded-2xl p-5 flex items-center gap-5 shadow-xs flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">4.9</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Average client satisfaction rating across Dubai projects
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-50/80 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-850 rounded-3xl border border-slate-200/90 dark:border-amber-500/25 p-7 shadow-xs hover:shadow-xl hover:border-amber-400/50 dark:hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Stars + Google Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < item.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                    Client Review
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-100 leading-relaxed italic font-normal">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs border border-amber-500/20">
                    {item.clientName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{item.clientName}</span>
                      <CheckCircleIcon className="w-3.5 h-3.5 text-blue-500 inline" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {[item.clientRole, item.location].filter(Boolean).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review on Google Action Footer */}
        <div className="text-center pt-4">
          <a
            href="https://maps.google.com/?q=Velora+Elite+Aspin+Commercial+Tower+Dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Review Velora Elite on Google</span>
          </a>
        </div>
      </div>
    </section>
  )
}
