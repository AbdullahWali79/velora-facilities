'use client'

import React from 'react'
import { WhatsAppIcon } from './Icons'

interface FloatingWhatsAppProps {
  whatsappNumber: string
}

export function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  // Strip all non-numeric characters for wa.me link
  // e.g. "+971 50 882 1940" -> "971508821940"
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const prefilledMessage = encodeURIComponent(
    'Hello Velora Facilities, I would like to inquire about your cleaning and maintenance services in the UAE.'
  )
  const href = `https://wa.me/${cleanNumber}?text=${prefilledMessage}`

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with Velora UAE 👋
      </span>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Contact Velora Facilities on WhatsApp"
      >
        {/* Pulsing online ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
        </span>

        <WhatsAppIcon className="w-8 h-8 text-white fill-current" />
      </a>
    </aside>
  )
}
