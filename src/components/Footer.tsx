import React from 'react'
import Link from 'next/link'
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, SparklesIcon, ShieldCheckIcon } from './Icons'

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
  const phone = settings.contactInfo.phonePrimary || '+971 4 399 9090'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const email = settings.contactInfo.email || 'info@velorafacilities.ae'
  const address = settings.contactInfo.address || 'Office 1402, Opal Tower, Business Bay, Dubai, UAE'
  const workingHours = settings.contactInfo.workingHours || 'Monday – Saturday: 8:00 AM – 8:00 PM'
  const license = settings.tradeLicense || 'CN-4892104-DXB'

  const columns = footerData.columns || []
  const aboutSummary =
    footerData.aboutSummary ||
    'Velora Facilities delivers European-standard residential and commercial cleaning, deep sanitation, and MEP technical maintenance across Dubai, Abu Dhabi, and the UAE.'
  const copyright =
    footerData.copyright ||
    '© 2026 Velora Facilities LLC. All rights reserved. Registered & Licensed in the United Arab Emirates.'

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info (spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-emerald-800 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <SparklesIcon className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  VELORA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 -mt-1">
                  FACILITIES UAE
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {aboutSummary}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Licensed UAE Commercial Entity — License #{license}</span>
            </div>

            {/* Social links if configured */}
            {settings.socialMedia && (
              <div className="flex items-center gap-3 pt-2">
                {settings.socialMedia.instagram && (
                  <a
                    href={settings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors text-xs font-bold"
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                )}
                {settings.socialMedia.facebook && (
                  <a
                    href={settings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors text-xs font-bold"
                    aria-label="Facebook"
                  >
                    FB
                  </a>
                )}
                {settings.socialMedia.linkedin && (
                  <a
                    href={settings.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors text-xs font-bold"
                    aria-label="LinkedIn"
                  >
                    IN
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Link Columns */}
          {columns.slice(0, 2).map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links?.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.url}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
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
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
              Contact & Hub
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span className="leading-snug">{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={telHref} className="hover:text-emerald-400 transition-colors font-medium">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-emerald-400 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-snug">{workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Services
            </Link>
            <Link href="/quote" className="hover:text-slate-300 transition-colors">
              Quote
            </Link>
            <Link href="/book" className="hover:text-slate-300 transition-colors">
              Book
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-emerald-500/80 hover:text-emerald-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
