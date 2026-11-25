'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  PhoneIcon,
  MailIcon,
  ClockIcon,
  MenuIcon,
  CloseIcon,
  SparklesIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from './Icons'
import { trackPhoneCallClick, trackInspectionClick } from '@/lib/tracking'

export interface HeaderProps {
  settings: {
    companyName: string
    contactInfo: {
      phonePrimary: string
      email: string
      workingHours?: string | null
    }
  }
  headerData?: {
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

// Approved core specialized services
const SERVICES_MENU = [
  {
    title: 'Marble Polishing',
    subtitle: 'Italian Diamond Crystallization',
    desc: 'Diamond restoration & mirror-finish crystallization',
    url: '/services/marble-polishing',
    badge: 'Popular',
  },
  {
    title: 'Restaurant Cleaning',
    subtitle: 'Kitchen Sanitation & Hygiene',
    desc: 'Dubai Municipality-compliant degreasing & food-safe care',
    url: '/services/restaurant-cleaning',
    badge: 'Food Safe',
  },
  {
    title: 'Kitchen Hood & Duct Cleaning',
    subtitle: 'Commercial Exhaust Extraction',
    desc: 'Civil Defence & NFPA 96 certified degreasing',
    url: '/services/kitchen-hood-cleaning',
    badge: 'Certified',
  },
  {
    title: 'Post-Construction Cleaning',
    subtitle: 'Turnkey Handover & Snagging',
    desc: 'Paint, silicone, and fine dust removal for occupancy',
    url: '/services/post-construction-cleaning',
    badge: 'Handover',
  },
  {
    title: 'Luxury Villa Deep Cleaning',
    subtitle: 'Executive Residence Detailing',
    desc: 'Hospital-grade surface sanitization for luxury homes',
    url: '/services/home-villa-cleaning',
    badge: 'Premium',
  },
  {
    title: 'Sofa & Carpet Steam Care',
    subtitle: 'Thermodynamic Fabric Care',
    desc: '160°C dry thermodynamic steam extraction',
    url: '/services/sofa-carpet-cleaning',
    badge: 'Delicate',
  },
]

// Categorized company information links
const ABOUT_MENU = [
  {
    title: 'About Velora Elite',
    desc: 'Our luxury ethos, standards & executive leadership',
    url: '/about',
  },
  {
    title: 'Why Choose Velora Elite',
    desc: 'Vetted technicians, hospital-grade chemicals & guarantee',
    url: '/#why-choose-us',
  },
  {
    title: 'Our Professional Team',
    desc: 'Authentic 100% vetted staff in tailored uniforms',
    url: '/#our-team',
  },
  {
    title: 'Industrial Equipment',
    desc: 'Klindex, Kärcher & hospital-grade steam machinery',
    url: '/#equipment',
  },
  {
    title: 'Areas We Serve in Dubai',
    desc: 'Palm Jumeirah, Emirates Hills, Downtown & DIFC',
    url: '/#areas-we-serve',
  },
]

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'about' | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<'services' | 'about' | null>(null)
  const [logoRotation, setLogoRotation] = useState(0)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const phone = settings?.contactInfo?.phonePrimary || '04 579 2137'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const email = settings?.contactInfo?.email || 'info@veloraelite.ae'
  const workingHours = settings?.contactInfo?.workingHours || 'Monday – Saturday: 8:00 AM – 6:00 PM'

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const handleMouseEnter = (menu: 'services' | 'about') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  return (
    <header className="w-full z-50 sticky top-0 transition-all shadow-md">
      {/* 1. UPPER UTILITY BAR: Operating Hours, Contact Info & Quick Actions */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact Info, Working Hours & Dubai Hub */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-slate-300">
            <a
              href={telHref}
              onClick={() => trackPhoneCallClick('top_bar')}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium whitespace-nowrap"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Tel: <strong className="text-white">{phone}</strong></span>
            </a>

            <a
              href={`mailto:${email}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              <MailIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{email}</span>
            </a>

            <div className="hidden lg:inline-flex items-center gap-1.5 text-slate-400 whitespace-nowrap">
              <ClockIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{workingHours}</span>
            </div>

            <div className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Aspin Commercial Tower, Sheikh Zayed Rd</span>
            </div>
          </div>

          {/* Right: Get a Quote link & WhatsApp Callout */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/quote"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-amber-300 hover:text-slate-950 bg-amber-500/10 hover:bg-amber-400 border border-amber-500/30 hover:border-amber-400 transition-all whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR: Clean Categorized Menu with Professional Sub-Menus */}
      <div className="bg-white/95 backdrop-blur-md border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo - Official Circular 3D Gold Emblem */}
          <Link
            href="/"
            onClick={() => setLogoRotation((prev) => prev + 360)}
            className="flex items-center gap-3 group cursor-pointer select-none flex-shrink-0"
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
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-amber-700 transition-colors whitespace-nowrap">
                VELORA <span className="text-amber-600">ELITE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-amber-800 -mt-0.5 whitespace-nowrap">
                LUXURY CLEANING &bull; DUBAI
              </span>
            </div>
          </Link>

          {/* Categorized Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Home */}
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                pathname === '/'
                  ? 'text-amber-900 bg-amber-50/80 font-bold border-b-2 border-amber-500 shadow-2xs'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  pathname.startsWith('/services') || activeDropdown === 'services'
                    ? 'text-amber-900 bg-amber-50/80 font-bold'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-amber-600 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Services Sub-Menu Panel */}
              {activeDropdown === 'services' && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[640px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/25 p-4 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-amber-500/15">
                      <div className="flex items-center gap-1.5">
                        <SparklesIcon className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          Specialized Cleaning Services
                        </span>
                      </div>
                      <Link
                        href="/services"
                        className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1"
                      >
                        <span>All Services</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICES_MENU.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.url}
                          className="group p-3 rounded-xl hover:bg-amber-50/80 transition-all border border-slate-100 hover:border-amber-500/25 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-bold text-slate-950 group-hover:text-amber-800 transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded flex-shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-medium text-amber-700/90 block mb-0.5">
                              {item.subtitle}
                            </span>
                            <span className="text-[11px] text-slate-500 leading-snug block">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Commercial AMC Callout */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/70 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-800">
                          Commercial AMC & Corporate Contracts
                        </span>
                      </div>
                      <Link
                        href="/#commercial-contracts"
                        className="font-bold text-amber-700 hover:text-amber-900 hover:underline"
                      >
                        Learn More &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  pathname === '/about' || activeDropdown === 'about'
                    ? 'text-amber-900 bg-amber-50/80 font-bold'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
                aria-expanded={activeDropdown === 'about'}
              >
                <span>About Us</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-amber-600 transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* About Us Sub-Menu Panel */}
              {activeDropdown === 'about' && (
                <div
                  className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/25 p-3 space-y-1">
                    {ABOUT_MENU.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.url}
                        className="group flex flex-col p-2.5 rounded-xl hover:bg-amber-50/80 transition-all border border-transparent hover:border-amber-500/20"
                      >
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery */}
            <Link
              href="/gallery"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                pathname === '/gallery'
                  ? 'text-amber-900 bg-amber-50/80 font-bold border-b-2 border-amber-500 shadow-2xs'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
              }`}
            >
              Gallery
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                pathname === '/contact'
                  ? 'text-amber-900 bg-amber-50/80 font-bold border-b-2 border-amber-500 shadow-2xs'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Call Us + Book a Free Inspection Button */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={telHref}
              onClick={() => trackPhoneCallClick('header_nav')}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-amber-700 hover:bg-amber-50/60 transition-colors whitespace-nowrap"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>{phone}</span>
            </a>

            <Link
              href="/book?type=inspection"
              onClick={() => trackInspectionClick('header_nav_cta')}
              className="relative group overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <SparklesIcon className="w-4 h-4 text-slate-950" />
              <span>Book a Free Inspection</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE DRAWER MENU: Responsive Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-900/10 px-5 py-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/'
                  ? 'bg-amber-50 text-amber-900 font-bold border-l-4 border-amber-500'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Services Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-100">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'services' ? null : 'services')
                }
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-amber-600" />
                  <span>Services</span>
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileAccordion === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileAccordion === 'services' && (
                <div className="p-2 space-y-1 bg-amber-50/30 border-t border-slate-100">
                  {SERVICES_MENU.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-100/50"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-amber-200/50 flex flex-col gap-1">
                    <Link
                      href="/#commercial-contracts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-amber-800 hover:bg-amber-100/60"
                    >
                      Commercial AMC Contracts &rarr;
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-amber-900 underline"
                    >
                      View All Services Catalog &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-100">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'about' ? null : 'about')
                }
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-100"
              >
                <span>About Us</span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    mobileAccordion === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileAccordion === 'about' && (
                <div className="p-2 space-y-1 bg-amber-50/30 border-t border-slate-100">
                  {ABOUT_MENU.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-100/50"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery */}
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/gallery'
                  ? 'bg-amber-50 text-amber-900 font-bold border-l-4 border-amber-500'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Gallery (Transformations & Videos)
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/contact'
                  ? 'bg-amber-50 text-amber-900 font-bold border-l-4 border-amber-500'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/book?type=inspection"
              onClick={() => {
                trackInspectionClick('mobile_drawer')
                setMobileMenuOpen(false)
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl shadow-md transition-colors"
            >
              <SparklesIcon className="w-4 h-4 text-slate-950" />
              <span>Book a Free Inspection</span>
            </Link>

            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-xl transition-colors"
            >
              <span>Request a Custom Quote</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>

            <a
              href={telHref}
              onClick={() => trackPhoneCallClick('mobile_drawer')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-amber-50 rounded-xl transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Call Us: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
