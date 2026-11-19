'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PhoneIcon, MailIcon, ClockIcon, MenuIcon, CloseIcon, SparklesIcon } from './Icons'

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
  const pathname = usePathname()

  const phone = settings.contactInfo.phonePrimary || '+971 4 399 9090'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const email = settings.contactInfo.email || 'info@velorafacilities.ae'

  const navItems = headerData.navItems || []
  const cta = headerData.ctaButton || { text: 'Book Online', url: '/book' }

  return (
    <header className="w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 transition-all shadow-xs">
      {/* Top Bar for Phone, Email & Hours */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium tracking-wide">{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden lg:inline-flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.contactInfo.workingHours || 'Mon–Sat: 8:00 AM – 8:00 PM'}</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Dubai & Abu Dhabi Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
            <SparklesIcon className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              VELORA
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-600 -mt-1">
              FACILITIES UAE
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
                    ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
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
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            <PhoneIcon className="w-4 h-4 text-emerald-600" />
            <span>Call Now</span>
          </a>

          <Link
            href={cta.url || '/book'}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/25 transition-all hover:shadow-lg hover:shadow-emerald-600/30"
          >
            {cta.text || 'Book Online'}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
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
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
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
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <PhoneIcon className="w-4 h-4 text-emerald-600" />
              <span>Call Us: {phone}</span>
            </a>
            <Link
              href={cta.url || '/book'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition-colors"
            >
              {cta.text || 'Book Online'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
