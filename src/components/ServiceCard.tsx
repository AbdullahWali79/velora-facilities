import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, SparklesIcon } from './Icons'
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
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
  },
  maintenance: {
    label: 'Technical MEP',
    badgeClass: 'bg-slate-900/80 text-slate-200 border-slate-700',
  },
  commercial: {
    label: 'Commercial Care',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
  },
}

const PRICE_UNIT_LABELS: Record<string, string> = {
  hourly: '/ hour',
  per_session: '/ visit',
  per_sqft: '/ sq. ft.',
  custom_quote: 'Custom Quote',
}

const SERVICE_IMAGES: Record<string, string> = {
  'marble-polishing': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'home-villa-cleaning': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  'kitchen-hood-cleaning': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'restaurant-cleaning': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'post-construction-cleaning': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  'sofa-carpet-cleaning': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'office-cleaning': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  'deep-cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'move-in-move-out': 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  'glass-window-cleaning': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const cat = CATEGORY_LABELS[service.category] || CATEGORY_LABELS.cleaning
  const imageUrl = SERVICE_IMAGES[service.slug] || '/images/hero-cleaner.jpg'

  return (
    <div className="spotlight-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
      {/* 1. Large High-Quality Curated Image with 16:10 Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <Image
          src={imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full backdrop-blur-md border ${cat.badgeClass}`}>
            {cat.label}
          </span>
          {service.isFeatured && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-300 bg-amber-950/90 backdrop-blur-md border border-amber-500/40 px-2.5 py-0.5 rounded-full">
              <SparklesIcon className="w-3 h-3 text-amber-400" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Body: Concise & Professional */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
            <Link href={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </Link>
          </h3>

          {/* Short Professional Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* 3. Dedicated Actions & Discover Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 group/link"
          >
            <span>Learn More</span>
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={`/book?service=${service.slug}`}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            Book Free Inspection
          </Link>
        </div>
      </div>
    </div>
  )
}
