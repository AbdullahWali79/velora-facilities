'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PhoneIcon, MailIcon, ClockIcon, MenuIcon, CloseIcon } from './Icons'

export interface HeaderProps {
  settings: {
    companyName: string
    contactInfo: {
      phonePrimary: string
      email: string
      workingHours?: string | null
    }
  }
  headerData: {
    logo?: unknown
    navItems?: Array<{
      label: string
      url: string
      openInNewTab?: boolean | null
      id?: string | null
    }> | null
    ctaButton?: {
      text?: string | null
      url?: string | null
    } | null
  }
}

export function Header({ settings, headerData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoRotation, setLogoRotation] = useState(0)
  const pathname = usePathname()

  const phone = settings.contactInfo.phonePrimary || '04 579 2137'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const email = settings.contactInfo.email || 'info@veloraelite.ae'

  const navItems = headerData.navItems || []
  const cta = headerData.ctaButton || { text: 'Book Online', url: '/book' }

  return (
    <header className="w-full z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 sticky top-0 transition-all shadow-xs">
      {/* Top Bar for Phone, Email & Hours - Luxury Dark & Gold */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium tracking-wide">Tel: {phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden lg:inline-flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.contactInfo.workingHours || 'Mon–Sat: 8:00 AM – 8:00 PM'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Aspin Commercial Tower, Sheikh Zayed Rd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Official Circular 3D Gold Emblem (Click to Rotate 360°) */}
        <Link
          href="/"
          onClick={() => setLogoRotation((prev) => prev + 360)}
          className="flex items-center gap-3.5 group cursor-pointer select-none"
          title="Click to spin logo"
        >
          <div
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-md group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(223,183,108,0.55)] transition-all will-change-transform active:scale-95"
            style={{
              transform: `rotate(${logoRotation}deg)`,
              transition: 'transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Velora Elite Logo"
              width={48}
              height={48}
              className="object-cover w-full h-full pointer-events-none"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-amber-700 transition-colors">
              VELORA <span className="text-amber-600">ELITE</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-500 -mt-1">
              TECHNICAL SERVICES L.L.C.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
            return (
              <Link
                key={idx}
                href={item.url}
                target={item.openInNewTab ? '_blank' : undefined}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-amber-800 bg-amber-50/90 font-bold border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA & Call Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={telHref}
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200/80 hover:border-amber-300 rounded-xl transition-all"
          >
            <PhoneIcon className="w-4 h-4 text-amber-600" />
            <span>04 579 2137</span>
          </a>

          <Link
            href={cta.url || '/book'}
            className="relative group overflow-hidden inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="absolute inset-0 shimmer-gold opacity-40 pointer-events-none group-hover:opacity-80 transition-opacity" />
            <span className="relative z-10">{cta.text || 'Book Online'}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-900/10 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
              return (
                <Link
                  key={idx}
                  href={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-800 font-bold border-l-4 border-amber-500'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={telHref}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-amber-50 rounded-xl transition-colors"
            >
              <PhoneIcon className="w-4 h-4 text-amber-600" />
              <span>Call Us: {phone}</span>
            </a>
            <Link
              href={cta.url || '/book'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-colors"
            >
              {cta.text || 'Book Online'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
