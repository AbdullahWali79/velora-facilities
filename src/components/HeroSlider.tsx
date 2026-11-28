'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, CheckCircleIcon } from './Icons'
import { trackInspectionClick } from '@/lib/tracking'

interface BannerSlide {
  badge?: string | null
  headline: string
  subheadline: string
  backgroundImage?: unknown
  primaryCtaText?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaText?: string | null
  secondaryCtaUrl?: string | null
}

interface HeroSliderProps {
  banners: BannerSlide[]
  trustBadges: Array<{ title: string; subtitle?: string | null }>
  stats: Array<{ number: string; label: string }>
}

export function HeroSlider({ banners, trustBadges, stats }: HeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [banners.length])

  const slide = banners[activeSlide] || banners[0]

  return (
    <section className="relative bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white overflow-hidden border-b border-amber-500/20">
      {/* Subtle luxury ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            {slide?.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur-sm shadow-inner">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{slide.badge}</span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-heading">
              Exceptional Cleaning. Elevated Living.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {slide?.subheadline || 'Dubai’s premier luxury cleaning specialists delivering hospital-grade sanitization, Italian marble crystallization, and white-glove estate care with uncompromising precision.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/book?type=inspection"
                onClick={() => trackInspectionClick('hero_primary')}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 shimmer-gold opacity-40 pointer-events-none group-hover:opacity-75 transition-opacity" />
                <span className="relative z-10">Book a Free Inspection</span>
                <ArrowRightIcon className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/quote"
                className="relative group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-amber-300 bg-black/60 hover:bg-black/90 border border-amber-500/40 hover:border-amber-400 transition-all hover:text-white hover:scale-[1.02] shadow-sm hover:shadow-amber-500/10"
              >
                <span>Get a Quote</span>
              </Link>
            </div>

            {/* Key Bullet Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-amber-400" />
                <span>Uniformed & Vetted Cleaning Specialists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-amber-400" />
                <span>Hospital-Grade Eco Solutions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-amber-400" />
                <span>Free On-Site Inspection (0 AED)</span>
              </div>
            </div>

            {/* Slide navigation dots if multiple banners */}
            {banners.length > 1 && (
              <div className="flex items-center gap-2 pt-4">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === i ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Hero Visual from Client's Official Flyer */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none animate-float-slow">
              {/* Outer decorative breathing gold aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/35 via-yellow-400/20 to-amber-600/35 rounded-3xl blur-xl opacity-70 animate-gold-pulse"></div>
              
              <div className="relative spotlight-card rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-900 shadow-[0_15px_40px_-10px_rgba(197,160,89,0.3)] group transition-transform duration-500 hover:scale-[1.015]">
                <Image
                  src="/images/hero-cleaner.jpg"
                  alt="Velora Elite - A Higher Standard of Clean"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                {/* Floating banner on top of hero image */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <SparklesIcon className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      A Higher Standard of Clean
                    </p>
                    <p className="text-xs text-slate-200 font-medium mt-0.5">
                      Villa, Office & Deep Cleaning in Dubai
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-amber-500/25 text-amber-300 border border-amber-400/50 px-2.5 py-1 rounded-full font-bold shadow-xs">
                      VIP Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges Strip */}
      {trustBadges && trustBadges.length > 0 && (
        <div className="border-t border-slate-800/90 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-wide">
                      {badge.title}
                    </h4>
                    {badge.subtitle && (
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {badge.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Counter Bar */}
      {stats && stats.length > 0 && (
        <div className="bg-slate-950 border-t border-slate-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
