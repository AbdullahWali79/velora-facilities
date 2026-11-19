'use client'

import React, { useState } from 'react'
import { MapPinIcon, SparklesIcon } from './Icons'

export interface GalleryItem {
  id?: number | string
  title: string
  location?: string | null
  description?: string | null
  service?: unknown
  serviceTitle?: string | null
  beforeImage?: unknown
  afterImage?: unknown
  isFeatured?: boolean | null
}

export function GalleryComparison({ items }: { items: GalleryItem[] }) {
  // Map active view for each item: 'after' or 'before'
  const [modes, setModes] = useState<Record<string | number, 'after' | 'before'>>({})

  const toggleMode = (id: string | number, mode: 'after' | 'before') => {
    setModes((prev) => ({ ...prev, [id]: mode }))
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">
        No gallery transformations currently uploaded. Check back shortly.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, idx) => {
        const itemId = item.id || idx
        const currentMode = modes[itemId] || 'after'

        return (
          <div
            key={itemId}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Box with Mode Switcher */}
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden group">
              {/* Image presentation */}
              <div
                className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-all duration-500 ${
                  currentMode === 'before'
                    ? 'bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950'
                    : 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      currentMode === 'before'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {currentMode === 'before' ? 'Before Treatment' : 'After Execution'}
                  </div>
                  <h4 className="text-white font-semibold text-sm max-w-xs mx-auto drop-shadow-md">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto opacity-80">
                    {currentMode === 'before'
                      ? 'Heavy particulate accumulation & residue prior to deep restoration'
                      : 'Hospital-grade sanitized, sealed, and polished to European standard'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch Pills */}
              <div className="absolute top-4 right-4 z-20 flex rounded-lg bg-black/60 backdrop-blur-md p-1 border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => toggleMode(itemId, 'before')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    currentMode === 'before'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => toggleMode(itemId, 'after')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    currentMode === 'after'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  After
                </button>
              </div>

              {/* Status Badge Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <SparklesIcon className="w-3 h-3 text-emerald-400" />
                  Verified Transformation
                </span>
              </div>
            </div>

            {/* Information Card Body */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {item.serviceTitle && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-800">{item.serviceTitle}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
