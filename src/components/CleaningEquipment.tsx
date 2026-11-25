'use client'

import React from 'react'
import Link from 'next/link'
import { SparklesIcon, CheckCircleIcon } from './Icons'

export function CleaningEquipment() {
  const machinery = [
    {
      title: 'Italian Klindex Diamond Stone Restorers',
      origin: 'Engineered in Italy',
      application: 'Marble, Onyx & Terrazzo Polishing',
      description: 'Heavy planetary rotary grinders with sequential diamond abrasive discs (grit 400 to 3000) that remove lippage and scratches without acid damage, followed by thermal crystallization.',
      highlights: ['Variable speed rotary torque', 'Natural diamond-encrusted pads', 'Mirror gloss 95+ reflectometer rating'],
    },
    {
      title: 'Kärcher Industrial 180°C Steam Extractors',
      origin: 'German Engineering',
      application: 'Tile Descaling, Grout & Upholstery',
      description: 'Thermodynamic dry steam vaporizers delivering 8 bar pressure at 180°C. Eradicates 99.9% of bacteria, viruses, and dust mites while deeply lifting grease and limescale without chemicals.',
      highlights: ['8-bar dual-boiler system', 'Deep extraction vacuum pump', 'Sub-3-hour fabric drying time'],
    },
    {
      title: 'Negative-Air HEPA 14 Filtration & Duct Vacuums',
      origin: 'Certified Cleanroom Grade',
      application: 'Post-Construction & Kitchen Ducts',
      description: 'Commercial negative-air scrubbers fitted with true HEPA 14 filters capturing 99.995% of airborne particulates down to 0.3 microns, paired with rotary brush duct extraction machines.',
      highlights: ['2,000 CFM airflow capacity', 'NFPA 96 & Dubai Civil Defence compliant', 'Zero dust re-contamination'],
    },
    {
      title: 'Pure Water Telescopic Window Systems',
      origin: 'Architectural Glazing Care',
      application: 'Villa Glass, Balustrades & Skylights',
      description: 'Multi-stage reverse osmosis and de-ionization filtration units delivering 100% de-mineralized pure water through carbon fiber water-fed poles up to 4 stories without scaffolding.',
      highlights: ['Streak-free mineral spot elimination', 'Carbon fiber telescopic reach (15m)', 'Zero detergent residue on tints'],
    },
    {
      title: 'Rotary Single-Disc Scrubbers & Buffers',
      origin: 'Heavy-Duty Floor Restoration',
      application: 'Deep Floor Sanitization & Handover',
      description: 'Precision weighted floor machines designed to scrub textured non-slip tiles, strip old wax/sealant build-ups, and polish timber, travertine, and epoxy surfaces.',
      highlights: ['High-torque oscillating action', 'Bespoke pad selection for delicate stone', 'Deep grout line rejuvenation'],
    },
    {
      title: 'Hospital-Grade Eco-Certified Bio-Sanitizers',
      origin: 'Dubai Municipality Approved',
      application: 'Surface Disinfection & Food Prep Areas',
      description: 'EPA-registered, non-toxic broad-spectrum biocidal solutions safe for children, infants, pets, and organic food contact zones, leaving behind zero hazardous chemical odor.',
      highlights: ['100% biodegradable & pet-safe', 'Kills 99.99% of enveloped pathogens', 'pH-neutral luxury surface safe'],
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>European & Industrial Machinery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Professional Cleaning Equipment
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              True luxury cleaning is impossible with household tools. We invest in top-tier European machinery and certified technology to guarantee flawless surface restoration.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/book?type=inspection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Schedule Equipment Assessment</span>
            </Link>
          </div>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machinery.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all duration-300 space-y-4 shadow-xs hover:shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 border border-amber-300 px-3 py-0.5 rounded-full">
                  {item.origin}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Tool 0{idx + 1}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-amber-700 mt-0.5">
                  Target: {item.application}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-3 border-t border-slate-200/60 space-y-1.5">
                {item.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
