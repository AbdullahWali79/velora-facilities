'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SparklesIcon, ShieldCheckIcon } from './Icons'

export function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<'marble' | 'duct' | 'villa'>('marble')

  const videos = {
    marble: {
      title: 'Italian Klindex Marble Diamond Grinding & Crystallization',
      category: 'Marble Polishing',
      location: 'Palm Jumeirah Villa',
      description: 'Watch our certified stone technicians restore heavily etched Crema Marfil marble to a wet-look mirror reflection using Italian diamond abrasives and thermal crystallization.',
      specs: ['Rotary single-disc 175 RPM', 'Diamond grits 400 to 3000', 'Zero harsh acid corrosion', 'Hydrophobic fluoropolymer seal'],
      videoPlaceholder: 'https://assets.mixkit.co/videos/preview/mixkit-cleaning-the-floor-with-a-professional-machine-42867-large.mp4',
    },
    duct: {
      title: 'Restaurant Kitchen Hood & Exhaust Duct Degreasing',
      category: 'Commercial Kitchen Care',
      location: 'DIFC Fine Dining Venue',
      description: 'See the removal of hardened flammable grease down to bare stainless steel across 40 meters of commercial ducting, compliant with Dubai Civil Defence standards.',
      specs: ['NFPA 96 & Dubai Municipality compliant', 'Access panel inspection', 'Food-safe enzyme degreasers', 'Post-clean compliance certificate'],
      videoPlaceholder: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-cleaning-an-oven-42864-large.mp4',
    },
    villa: {
      title: 'Luxury Villa Deep Steam Sanitization & Handover',
      category: 'Post-Construction & Deep Clean',
      location: 'Dubai Hills Estate',
      description: 'Comprehensive top-to-bottom architectural clean extracting airborne micro-dust with negative-air HEPA systems and thermodynamic 180°C steam disinfection.',
      specs: ['180°C dry thermodynamic steam', 'HEPA 14 micro-filtration', 'Safe for silk, velvet & pet-safe', 'Supervisor white-glove inspection'],
      videoPlaceholder: 'https://assets.mixkit.co/videos/preview/mixkit-vacuuming-a-carpet-in-a-luxurious-hotel-room-42866-large.mp4',
    },
  }

  const current = videos[activeTab]

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Video Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-black/60 p-2 sm:p-3 gap-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('marble')
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'marble'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          ✨ Marble Crystallization
        </button>
        <button
          onClick={() => {
            setActiveTab('duct')
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'duct'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          🔥 Kitchen Hood & Duct Cleaning
        </button>
        <button
          onClick={() => {
            setActiveTab('villa')
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'villa'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          🏡 Post-Construction & Villa Clean
        </button>
      </div>

      {/* Video Container & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* Video Player Column */}
        <div className="lg:col-span-7 relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <video
            key={current.videoPlaceholder}
            src={current.videoPlaceholder}
            controls
            playsInline
            muted
            autoPlay
            loop
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-400 border border-amber-500/40">
              Live Field Execution
            </span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/80 text-slate-300">
              Dubai, UAE
            </span>
          </div>
        </div>

        {/* Video Info Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-5 bg-gradient-to-br from-slate-950 via-zinc-950 to-black">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{current.category} • {current.location}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {current.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
              Technical Protocols Followed:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {current.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-[11px]">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/book?type=inspection"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all hover:scale-[1.02]"
            >
              Book Free Site Inspection
            </Link>
            <Link
              href="/quote"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
