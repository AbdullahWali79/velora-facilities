'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ShieldCheckIcon } from './Icons'

export interface FooterProps {
  settings: {
    companyName: string
    tagline?: string | null
    tradeLicense?: string | null
    contactInfo: {
      phonePrimary: string
      whatsappNumber: string
      email: string
      supportEmail?: string | null
      address: string
      workingHours?: string | null
    }
    socialMedia?: {
      instagram?: string | null
      facebook?: string | null
      linkedin?: string | null
      youtube?: string | null
      tiktok?: string | null
    } | null
  }
  footerData: {
    logo?: unknown
    aboutSummary?: string | null
    copyright?: string | null
    columns?: Array<{
      title: string
      links?: Array<{
        label: string
        url: string
        id?: string | null
      }> | null
      id?: string | null
    }> | null
  }
}

export function Footer({ settings, footerData }: FooterProps) {
  const [logoRotation, setLogoRotation] = useState(0)
  const phone = settings.contactInfo.phonePrimary || '04 579 2137'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const whatsapp = settings.contactInfo.whatsappNumber || '+971 55 675 1854'
  const email = settings.contactInfo.email || 'info@veloraelite.ae'
  const address = settings.contactInfo.address || 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai, UAE'
  const workingHours = settings.contactInfo.workingHours || 'Monday – Saturday: 8:00 AM – 8:00 PM'
  const license = settings.tradeLicense

  const columns = footerData.columns || []
  const aboutSummary =
    footerData.aboutSummary ||
    'Velora Elite Technical Services L.L.C. delivers European-standard residential and commercial cleaning, deep sanitation, and technical services across Dubai and the UAE. Committed to precision, vetted professionals, and a higher standard of clean.'
  const copyright =
    footerData.copyright ||
    '© 2026 Velora Elite Technical Services L.L.C. All rights reserved. Registered & Licensed in Dubai, United Arab Emirates.'

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info (spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              onClick={() => setLogoRotation((prev) => prev + 360)}
              className="flex items-center gap-3.5 group inline-flex cursor-pointer select-none"
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
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  VELORA <span className="text-amber-400">ELITE</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-amber-500/90 -mt-1">
                  TECHNICAL SERVICES L.L.C.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {aboutSummary}
            </p>

            {license ? (
              <div className="flex items-center gap-2 pt-1 text-xs text-amber-300">
                <ShieldCheckIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Licensed UAE Commercial Entity — License #{license}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                <ShieldCheckIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Registered Dubai Technical & Cleaning Services L.L.C.</span>
              </div>
            )}

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.socialMedia?.facebook || 'https://facebook.com/veloraelite'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center text-slate-300 transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={settings.socialMedia?.instagram || 'https://instagram.com/veloraelite'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center text-slate-300 transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={settings.socialMedia?.tiktok || 'https://tiktok.com/@veloraelite'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center text-slate-300 transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {columns.slice(0, 2).map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-300">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links?.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.url}
                      className="text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-300">
              Contact & Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span className="leading-snug text-xs">{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={telHref} className="hover:text-amber-400 transition-colors font-medium">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-amber-400">WA:</span>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors font-medium"
                >
                  {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-amber-400 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-snug">{workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-amber-400 transition-colors">
              Services
            </Link>
            <Link href="/quote" className="hover:text-amber-400 transition-colors">
              Quote
            </Link>
            <Link href="/book" className="hover:text-amber-400 transition-colors">
              Book
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-amber-500/80 hover:text-amber-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
