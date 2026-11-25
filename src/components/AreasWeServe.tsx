'use client'

import React from 'react'
import Link from 'next/link'
import { MapPinIcon, SparklesIcon, CheckCircleIcon } from './Icons'

export function AreasWeServe() {
  const communities = [
    {
      name: 'Palm Jumeirah',
      type: 'Signature Villas & Luxury Penthouses',
      description: 'Full-service villa deep sanitization, exterior facade washing, and oceanfront marble descaling.',
      badge: 'Daily Rapid Dispatch',
    },
    {
      name: 'Emirates Hills',
      type: 'Ultra-Luxury Private Estates',
      description: 'Master stone restoration, travertine crystallization, and bespoke seasonal deep care.',
      badge: 'VIP Care',
    },
    {
      name: 'Dubai Hills Estate',
      type: 'Golf Place & Parkway Villas',
      description: 'Post-handover cleaning, architectural glazing washes, and routine villa detailing.',
      badge: 'High Demand',
    },
    {
      name: 'Downtown Dubai & DIFC',
      type: 'Executive Towers & Fine Dining Venues',
      description: 'Commercial restaurant kitchen hood degreasing, boutique cleaning, and penthouse care.',
      badge: 'Central Hub',
    },
    {
      name: 'Dubai Marina & JBR',
      type: 'Waterfront Penthouses & Balconies',
      description: 'Streak-free architectural glass washing, sand extraction, and upholstery refresh.',
      badge: 'Daily Fleet',
    },
    {
      name: 'Arabian Ranches & Damac Hills',
      type: 'Family Residences & Townhouses',
      description: 'Deep tile grout steam descaling, pet-safe sofa extraction, and move-in deep cleaning.',
      badge: 'Full Coverage',
    },
    {
      name: 'Jumeirah Golf Estates & Al Barari',
      type: 'Lush Botanical Estates',
      description: 'Patio pressure washing, pollen removal, and comprehensive villa disinfection.',
      badge: 'Specialized Care',
    },
    {
      name: 'Business Bay & Sheikh Zayed Rd',
      type: 'Corporate Headquarters & Commercial',
      description: 'Stationed at Aspin Commercial Tower for rapid response across corporate suites.',
      badge: 'HQ Station',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-t border-amber-500/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Dubai Prime Community Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Areas We Serve in Dubai
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Operating centrally from Aspin Commercial Tower on Sheikh Zayed Road, our fully equipped service vans provide rapid dispatch across Dubai’s most prestigious residential enclaves.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/book?type=inspection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <SparklesIcon className="w-4 h-4 text-slate-950" />
              <span>Book Free Inspection in Your Area</span>
            </Link>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((area, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 space-y-3 group hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  {area.badge}
                </span>
                <MapPinIcon className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {area.name}
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {area.type}
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2.5">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Gate Passes & Security Note */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Community gate pass documentation and security clearance coordinated seamlessly by our team.</span>
          </div>
          <div className="text-amber-300 font-semibold">
            Covering all 7 Emirates for commercial projects by appointment
          </div>
        </div>
      </div>
    </section>
  )
}
