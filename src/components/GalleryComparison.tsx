'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPinIcon, SparklesIcon, ArrowRightIcon } from './Icons'

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

  // Visual gradients and textures to authentically represent before and after surface conditions
  const visualProfiles: Record<number, { beforeBg: string; afterBg: string; beforeBadge: string; afterBadge: string }> = {
    0: {
      beforeBg: 'from-stone-900 via-zinc-800 to-neutral-900',
      afterBg: 'from-amber-950/90 via-zinc-900 to-black',
      beforeBadge: 'Dull Etched Marble · Scratched Surface',
      afterBadge: 'Mirror Klindex Crystallization · 95+ Gloss',
    },
    1: {
      beforeBg: 'from-amber-950 via-stone-900 to-black',
      afterBg: 'from-slate-900 via-zinc-900 to-black',
      beforeBadge: 'Heavy Grease Carbon Residue · Fire Hazard',
      afterBadge: 'Bare Metal Sanitized · Dubai Civil Defence Compliant',
    },
    2: {
      beforeBg: 'from-zinc-900 via-neutral-800 to-stone-900',
      afterBg: 'from-black via-zinc-950 to-amber-950/60',
      beforeBadge: 'Gypsum Dust · Paint Overspray · Contractor Scuffs',
      afterBadge: 'Inspection-Ready Handover · Architectural Polish',
    },
    3: {
      beforeBg: 'from-stone-950 via-stone-900 to-neutral-950',
      afterBg: 'from-amber-950/80 via-zinc-900 to-black',
      beforeBadge: 'Embedded Dust Mites · Water Stains · Odor',
      afterBadge: '180°C Thermodynamic Steam Cleaned & Conditioned',
    },
    4: {
      beforeBg: 'from-neutral-950 via-zinc-900 to-stone-950',
      afterBg: 'from-black via-slate-950 to-zinc-900',
      beforeBadge: 'Commercial Cookline Grease · Greasy Floor Tiles',
      afterBadge: 'Food Safety Audit Ready · High-Heat Decontaminated',
    },
    5: {
      beforeBg: 'from-zinc-900 via-neutral-900 to-stone-900',
      afterBg: 'from-slate-950 via-zinc-950 to-black',
      beforeBadge: 'Desert Dust Weathering · Hard Water Limescale',
      afterBadge: 'High-Pressure Pure Water Washed · Hydrophobic Seal',
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, idx) => {
        const itemId = item.id || idx
        const currentMode = modes[itemId] || 'after'
        const profile = visualProfiles[idx % 6]

        return (
          <div
            key={itemId}
            className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Visual Box with Mode Switcher */}
            <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
              {/* Dynamic Texture/Visual representation */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 bg-gradient-to-br ${
                  currentMode === 'before' ? profile.beforeBg : profile.afterBg
                }`}
              >
                {/* Visual Grid Lines and Sheen for 'After' */}
                {currentMode === 'after' && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />
                )}

                <div className="relative z-10 space-y-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      currentMode === 'before'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {currentMode === 'before' ? 'BEFORE TREATMENT' : 'AFTER VELORA ELITE CARE'}
                  </span>

                  <h4 className="text-white font-bold text-base max-w-xs mx-auto drop-shadow-md leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 max-w-xs mx-auto opacity-90 leading-relaxed font-mono">
                    {currentMode === 'before' ? profile.beforeBadge : profile.afterBadge}
                  </p>
                </div>
              </div>

              {/* Interactive Toggle Switch Pills */}
              <div className="absolute top-4 right-4 z-20 flex rounded-xl bg-black/80 backdrop-blur-md p-1 border border-white/15 text-xs font-bold shadow-lg">
                <button
                  type="button"
                  onClick={() => toggleMode(itemId, 'before')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentMode === 'before'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => toggleMode(itemId, 'after')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentMode === 'after'
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  After
                </button>
              </div>

              {/* Status Badge Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                  <SparklesIcon className="w-3 h-3 text-amber-400" />
                  <span>Verified Dubai Project</span>
                </span>
              </div>
            </div>

            {/* Information Card Body */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {item.serviceTitle && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {item.serviceTitle}
                  </span>
                )}
                <Link
                  href="/book?type=inspection"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Book Free Inspection</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
