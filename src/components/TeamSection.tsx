'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheckIcon, CheckCircleIcon } from './Icons'

export function TeamSection() {
  const credentials = [
    {
      title: '100% In-House Direct Sponsorship',
      desc: 'We never outsource to day-labor agencies. Every technician is directly employed, visa-sponsored, and insured under Velora Elite Technical Services L.L.C.',
    },
    {
      title: 'Comprehensive Background & Police Clearance',
      desc: 'Complete criminal background screening, security clearances, and UAE Ministry of Health fitness certifications for total client trust.',
    },
    {
      title: '80+ Hours Surface-Care Academy Training',
      desc: 'Rigorous certification on delicate finishes: pH values, stone porosity, diamond grit progressions, and thermodynamic steam handling.',
    },
    {
      title: 'English-Speaking On-Site Supervisors',
      desc: 'Every dispatched team is led by an experienced field supervisor who oversees safety protocols, client walk-throughs, and quality sign-off.',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Vetted Professionals You Can Trust</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Our Professional Team in Branded Uniforms
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              When you invite a cleaning team into your private villa or commercial facility, integrity and professionalism are paramount. Velora Elite takes pride in deploying impeccably groomed, background-checked specialists trained to treat your property with absolute respect.
            </p>

            {/* Credential Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {credentials.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <h4 className="text-xs font-bold text-white">{c.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pl-6">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/book?type=inspection"
                className="px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                Meet Our Team on Free Inspection
              </Link>
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-950 border border-slate-800 transition-colors"
              >
                Learn About Our Standards
              </Link>
            </div>
          </div>

          {/* Right Image: Authentic Uniformed Staff Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-950 group">
              <Image
                src="/images/hero-cleaner.jpg"
                alt="Velora Elite Uniformed Professional Cleaning Team Dubai"
                width={600}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-500/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Official Branded Uniform
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    Verified Crew
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Full PPE equipment, branded high-visibility apparel, shoe covers, and sanitized toolkits on every deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
