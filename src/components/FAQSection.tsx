'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SparklesIcon } from './Icons'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How does the "Book a Free Inspection" work?',
      a: 'For luxury villas, large penthouses, and commercial venues, a senior technical supervisor visits your property anywhere in Dubai at zero cost and with zero obligation. We assess marble conditions, surface staining, or ductwork requirements to provide an exact itemized quotation with no surprise charges.',
    },
    {
      q: 'Why does Velora Elite charge zero advance fees online?',
      a: 'We believe in accountability and luxury execution. Unlike automated platforms that bill upfront before service, Velora Elite requires payment only after the service is fully completed and thoroughly inspected by our on-site supervisor alongside you.',
    },
    {
      q: 'What positions Velora Elite as a premium cleaning company rather than a low-cost service?',
      a: 'Standard low-cost services deploy hourly untrained labor with household mops and generic chemicals. Velora Elite deploys 100% in-house, visa-sponsored technicians equipped with Italian Klindex diamond grinders, German Kärcher 180°C thermodynamic steam machines, true HEPA 14 negative air filtration, and Dubai Municipality approved organic biocides.',
    },
    {
      q: 'Are your cleaning chemicals safe for children, pets, and delicate marble?',
      a: 'Yes, absolutely. We use eco-certified, non-toxic, and biodegradable agents that are free of harsh abrasive acids. Our marble crystallization process hardens calcium carbonate naturally without chemical burning, and all upholstery solutions are child- and pet-safe.',
    },
    {
      q: 'Can your team perform after-hours or overnight commercial cleaning in Dubai?',
      a: 'Yes. For restaurants, cafes, corporate offices, and clinics, we operate 24/7 overnight shifts to clean, degrease, and sanitize without interrupting your operating hours.',
    },
    {
      q: 'What areas and communities across Dubai do you cover?',
      a: 'From our central operations at Aspin Commercial Tower on Sheikh Zayed Road, we cover Palm Jumeirah, Emirates Hills, Downtown Dubai, Dubai Hills Estate, Arabian Ranches, DIFC, Dubai Marina, JBR, Jumeirah Golf Estates, Al Barari, and beyond.',
    },
    {
      q: 'What is your cancellation and rescheduling policy?',
      a: 'We offer full schedule flexibility: you can reschedule or cancel your appointment free of charge with at least 12 hours advance notice. We do not enforce cancellation penalties.',
    },
    {
      q: 'Do you offer monthly and annual commercial cleaning contracts (AMC)?',
      a: 'Yes. We provide flexible daily, weekly, or monthly commercial cleaning contracts (AMC) with dedicated Service Level Agreements (SLAs), assigned supervisors, and corporate VAT invoicing.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our luxury cleaning standards, free site inspections, and Dubai operations.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300' : ''
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Have a custom property requirement or unique architectural surfaces?
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/book?type=inspection"
              className="text-xs font-bold text-amber-900 dark:text-amber-400 hover:text-amber-700 underline"
            >
              Book a Free On-Site Inspection
            </Link>
            <span className="text-slate-300 dark:text-slate-600">&bull;</span>
            <a
              href="https://wa.me/971556751854"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Ask on WhatsApp (+971 55 675 1854)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
