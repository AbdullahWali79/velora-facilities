import React from 'react'
import { StarIcon, ShieldCheckIcon } from './Icons'

export interface TestimonialItem {
  id?: number | string
  clientName: string
  clientRole?: string | null
  company?: string | null
  location?: string | null
  rating: number
  content: string
  isVerified?: boolean | null
  isFeatured?: boolean | null
}

export function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const rating = Math.min(5, Math.max(1, testimonial.rating || 5))

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Star Rating & Verified Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
              />
            ))}
          </div>

          {testimonial.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-600" />
              Verified Client
            </span>
          )}
        </div>

        {/* Review Quote Text */}
        <p className="text-sm text-slate-700 leading-relaxed italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Client Identity Details */}
      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
        {/* Initials Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 font-bold text-sm flex items-center justify-center flex-shrink-0 border border-amber-400/30 shadow-xs">
          {testimonial.clientName
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-bold text-slate-900 truncate">
            {testimonial.clientName}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {[testimonial.clientRole, testimonial.company, testimonial.location]
              .filter(Boolean)
              .join(' • ')}
          </div>
        </div>
      </div>
    </div>
  )
}
