import React from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, SparklesIcon } from './Icons'
import type { RichTextProps } from './RichText'

export interface ServiceItem {
  id?: number | string
  title: string
  slug: string
  category: 'cleaning' | 'maintenance' | 'commercial'
  tagline?: string | null
  shortDescription: string
  content?: RichTextProps['content']
  pricing?: {
    startingPrice?: number | null
    priceUnit?: 'hourly' | 'per_session' | 'per_sqft' | 'custom_quote' | null
  } | null
  features?: Array<{
    title: string
    description?: string | null
    id?: string | null
  }> | null
  faqs?: Array<{
    question: string
    answer: string
    id?: string | null
  }> | null
  isFeatured?: boolean | null
}

const CATEGORY_LABELS: Record<string, { label: string; badgeClass: string }> = {
  cleaning: {
    label: 'Deep Cleaning',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
  },
  maintenance: {
    label: 'Technical MEP',
    badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-300',
  },
  commercial: {
    label: 'Commercial Care',
    badgeClass: 'bg-amber-100/70 text-amber-950 border-amber-400',
  },
}

const PRICE_UNIT_LABELS: Record<string, string> = {
  hourly: '/ hour',
  per_session: '/ visit',
  per_sqft: '/ sq. ft.',
  custom_quote: 'Custom Quote',
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const cat = CATEGORY_LABELS[service.category] || CATEGORY_LABELS.cleaning
  const startingPrice = service.pricing?.startingPrice
  const priceUnit = service.pricing?.priceUnit ? PRICE_UNIT_LABELS[service.pricing.priceUnit] : 'Custom Quote'

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      {/* Top Banner Accent - Luxury Gold */}
      <div className="h-2.5 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500" />

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Category Tag & Featured Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${cat.badgeClass}`}>
              {cat.label}
            </span>
            {service.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">
                <SparklesIcon className="w-3 h-3 text-amber-500" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            <Link href={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </Link>
          </h3>

          {/* Tagline or Description */}
          {service.tagline && (
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              {service.tagline}
            </p>
          )}

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Feature Highlights Preview */}
          {service.features && service.features.length > 0 && (
            <div className="pt-2 space-y-1.5 border-t border-slate-100">
              {service.features.slice(0, 3).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="truncate">{feat.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              {startingPrice && startingPrice > 0 ? 'Starting from' : 'Service Pricing'}
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              {startingPrice && startingPrice > 0 ? (
                <>
                  AED {startingPrice}{' '}
                  <span className="text-xs font-normal text-slate-500">{priceUnit}</span>
                </>
              ) : (
                <span className="text-sm font-semibold text-amber-700">Custom Proposal</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/services/${service.slug}`}
              className="p-2.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              title="View full service specifications"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href={`/book?service=${service.slug}`}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-colors shadow-xs"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
