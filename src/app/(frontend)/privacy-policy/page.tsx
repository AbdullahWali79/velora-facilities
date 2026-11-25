import React from 'react'
import type { Metadata } from 'next'
import { ShieldCheckIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Privacy Policy — Velora Elite Technical Services L.L.C.',
  description:
    'Official privacy policy of Velora Elite Technical Services L.L.C. compliant with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>UAE Compliance & Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Last Updated: November 2026 &bull; Velora Elite Technical Services L.L.C. (Dubai, UAE)
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Introduction & Scope</h2>
              <p>
                Velora Elite Technical Services L.L.C. (&ldquo;Velora Elite&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered in the Emirate of Dubai, United Arab Emirates, is dedicated to protecting the confidentiality, security, and integrity of your personal information.
              </p>
              <p>
                This Privacy Policy outlines how we collect, use, process, and safeguard your personal data when you visit our website (<strong>veloraelite.ae</strong>), book cleaning or technical inspections, request quotations, or communicate with us via telephone, email, or WhatsApp.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. Legal Framework (UAE PDPL)</h2>
              <p>
                We adhere strictly to UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (&ldquo;PDPL&rdquo;) and Dubai data governance guidelines. We process personal data solely on lawful grounds including contract performance, legal compliance, and legitimate business interests.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Full name, telephone/WhatsApp number, optional email address, and community or property address required to dispatch service vehicles.
                </li>
                <li>
                  <strong>Property Specifications:</strong> Approximate property square footage, property type (villa, apartment, restaurant, commercial office), and specific surface characteristics (e.g. Italian marble, commercial duct lines).
                </li>
                <li>
                  <strong>Client Communication Records:</strong> Notes, floorplans, or photos provided willingly by clients over WhatsApp or web forms to evaluate cleaning requirements.
                </li>
                <li>
                  <strong>Technical Browsing Data:</strong> Anonymized analytical data (page interaction, device type, geographic region) used strictly for performance optimization and conversion measurement.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. How We Utilize Your Data</h2>
              <p>Your data is used exclusively to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Schedule and dispatch certified cleaning technicians and supervisors to your designated Dubai address.</li>
                <li>Deliver customized quotations and service proposals.</li>
                <li>Communicate dispatch confirmations, arrival times, and post-service quality check-ins.</li>
                <li>Comply with municipal audit and fire-safety compliance requirements where applicable (e.g. commercial kitchen duct cleaning).</li>
              </ul>
              <p className="font-semibold text-slate-900 pt-1">
                We never sell, rent, monetize, or lease your personal data to any third-party marketing companies.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. Data Retention & Security Protocols</h2>
              <p>
                We implement enterprise-grade technical safeguards including SSL/TLS 256-bit encryption, strict access controls, and firewall defenses. Customer information is stored on secure databases with authenticated administrative access restricted solely to authorized dispatch and operations coordinators.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">6. Your Rights Under UAE Law</h2>
              <p>
                Under the UAE PDPL, you possess the right to access, rectify, restrict, or request the deletion of your personal data stored within our records. To exercise these rights, email our data desk at <a href="mailto:info@veloraelite.ae" className="text-amber-800 font-bold hover:underline">info@veloraelite.ae</a>.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">7. Contact Data Concierge Desk</h2>
              <p>
                Velora Elite Technical Services L.L.C.<br />
                Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Road, Dubai, United Arab Emirates.<br />
                Telephone: <a href="tel:+97145792137" className="text-amber-800 font-bold">04 579 2137</a> | Email: <a href="mailto:info@veloraelite.ae" className="text-amber-800 font-bold">info@veloraelite.ae</a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
