'use client'

import React from 'react'
import Link from 'next/link'
import { WhatsAppIcon, PhoneIcon, SparklesIcon } from './Icons'
import { trackWhatsAppClick, trackPhoneCallClick, trackInspectionClick } from '@/lib/tracking'

interface FloatingWhatsAppProps {
  whatsappNumber: string
  phonePrimary?: string
}

export function FloatingWhatsApp({ whatsappNumber, phonePrimary = '04 579 2137' }: FloatingWhatsAppProps) {
  const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')
  const cleanPhone = (phonePrimary || '').replace(/[^0-9+]/g, '')

  const prefilledMessage = encodeURIComponent(
    'Hello Velora Elite, I would like to inquire about your luxury cleaning services in Dubai.'
  )
  const whatsappHref = `https://wa.me/${cleanNumber}?text=${prefilledMessage}`
  const telHref = `tel:${cleanPhone}`

  return (
    <>
      {/* 1. Desktop Floating WhatsApp Button (Bottom Right) */}
      <aside
        aria-label="WhatsApp Support"
        className="hidden sm:flex fixed bottom-8 right-6 z-50 items-center group"
      >
        {/* Tooltip on hover */}
        <span className="mr-3 px-3.5 py-2 text-xs font-bold text-slate-900 bg-white border border-amber-400/40 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Chat with Concierge Desk 👋
        </span>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('floating_desktop_widget')}
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Contact Velora Elite on WhatsApp"
        >
          {/* Pulsing online ring */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
          </span>

          <WhatsAppIcon className="w-8 h-8 text-white fill-current" />
        </a>
      </aside>

      {/* 2. Mobile Bottom Quick Action Bar (Click-to-Call + WhatsApp + Book Free Inspection) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/30 px-3 py-2.5 flex items-center gap-2 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        {/* Click to Call */}
        <a
          href={telHref}
          onClick={() => trackPhoneCallClick('mobile_sticky_bar')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 text-xs font-bold active:scale-95 transition-transform"
        >
          <PhoneIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Call Hub</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 text-white text-xs font-bold active:scale-95 transition-transform shadow-md shadow-emerald-600/30"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current flex-shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Book Free Inspection */}
        <Link
          href="/book?type=inspection"
          onClick={() => trackInspectionClick('mobile_sticky_bar')}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black active:scale-95 transition-transform shadow-md shadow-amber-500/25 text-center leading-none"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />
          <span>Free Inspect</span>
        </Link>
      </div>
    </>
  )
}
