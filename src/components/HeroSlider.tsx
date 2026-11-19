'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, CheckCircleIcon } from './Icons'

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
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          {slide?.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm shadow-inner">
              <SparklesIcon className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{slide.badge}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            {slide?.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {slide?.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href={slide?.primaryCtaUrl || '/book'}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{slide?.primaryCtaText || 'Book a Service'}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              href={slide?.secondaryCtaUrl || '/quote'}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 hover:border-slate-600 transition-all hover:text-white"
            >
              <span>{slide?.secondaryCtaText || 'Request a Free Quote'}</span>
            </Link>
          </div>

          {/* Key Bullet Highlights */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              <span>Certified UAE Technicians</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              <span>Eco-Friendly Disinfectants</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              <span>No Advance Payment Required</span>
            </div>
          </div>
        </div>

        {/* Slide navigation dots if multiple banners */}
        {banners.length > 1 && (
          <div className="flex items-center gap-2 pt-8">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === i ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges Strip */}
      {trustBadges && trustBadges.length > 0 && (
        <div className="border-t border-b border-slate-800 bg-slate-900/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
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
        <div className="bg-slate-950/80 border-b border-slate-800/80 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
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
