'use client'

import React from 'react'
import Link from 'next/link'
import { SparklesIcon, CheckCircleIcon, ArrowRightIcon } from './Icons'

export function CommercialContracts() {
  const tiers = [
    {
      title: 'Restaurant & Commercial Kitchen AMC',
      target: 'Fine dining, cafes, bakeries & cloud kitchens',
      schedule: 'Daily Nightly or Bi-Weekly Intensive',
      features: [
        'Nightly cookline & prep station steam degreasing',
        'Quarterly kitchen hood & exhaust duct certification',
        'Dubai Food Safety & Civil Defence audit compliance',
        'Anti-slip quarry tile machine scrubbing & drain bio-flush',
      ],
      highlight: 'Full Compliance Guaranteed',
      popular: true,
    },
    {
      title: 'Corporate Office & Executive Suite AMC',
      target: 'Commercial towers, financial firms & agencies',
      schedule: 'Daily Daytime or After-Hours Shifts',
      features: [
        'High-touch biometric & workstation sterilization',
        'Executive boardroom & welcome reception detailing',
        'Marble floor buffing & carpet steam maintenance',
        'Pantry sanitization & certified eco-waste management',
      ],
      highlight: 'Discreet & Professional',
      popular: false,
    },
    {
      title: 'Healthcare & Medical Clinic AMC',
      target: 'Dental clinics, wellness centers & aesthetics',
      schedule: 'Daily Terminal Cleaning Protocols',
      features: [
        'Hospital-grade broad-spectrum antimicrobial wipe-down',
        'Treatment room terminal cleaning & airborne disinfection',
        'Sharps & bio-waste protocol alignment',
        'Weekly audit compliance checklist & supervisor sign-off',
      ],
      highlight: 'Sterile Grade Protocols',
      popular: false,
    },
    {
      title: 'Luxury Retail & Boutique AMC',
      target: 'Fashion boutiques, jeweler showrooms & galleries',
      schedule: 'Pre-Opening or Post-Closing Care',
      features: [
        'Crystal-clear display glass & showcase streak-free wash',
        'High-gloss floor polishing & micro-dust elimination',
        'Delicate fabric & fitting room upholstery steam refresh',
        'Dedicated account manager & transparent monthly SLA',
      ],
      highlight: 'Pristine Brand Image',
      popular: false,
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Corporate B2B Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Monthly & Annual Commercial Cleaning Contracts (AMC)
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Elevate your commercial hygiene standards with customized Service Level Agreements (SLAs), dedicated on-site supervision, and consolidated monthly invoicing across Dubai.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-b from-slate-950 via-zinc-950 to-slate-950 border-amber-500/60 shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'bg-slate-950/70 border-slate-800 hover:border-amber-400/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {tier.highlight}
                  </span>
                  {tier.popular && (
                    <span className="text-[10px] font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-2 py-0.5 rounded-md">
                      POPULAR
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {tier.target}
                  </p>
                  <p className="text-xs font-semibold text-amber-300 mt-2">
                    Schedule: {tier.schedule}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-2.5">
                  {tier.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link
                  href="/quote"
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Request Contract Proposal</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Assurances Bar */}
        <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div>
            <div className="text-lg font-bold text-amber-400">Dedicated SLA</div>
            <div className="text-slate-400 mt-0.5">Strict quality benchmarks & scheduled audits</div>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-400">VAT Invoicing</div>
            <div className="text-slate-400 mt-0.5">Corporate compliant billing with 30-day terms</div>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-400">Direct Account Manager</div>
            <div className="text-slate-400 mt-0.5">Single point of contact stationed on Sheikh Zayed Rd</div>
          </div>
        </div>
      </div>
    </section>
  )
}
