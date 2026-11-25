import React from 'react'
import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/cms'
import { ContactForm } from '@/components/ContactForm'
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, WhatsAppIcon, SparklesIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Contact Us — Customer Care & Corporate Office Dubai UAE',
  description:
    'Contact Velora Elite Technical Services L.L.C. for luxury cleaning and maintenance inquiries. Visit our Aspin Commercial Tower office on Sheikh Zayed Road, Dubai, call 04 579 2137, or WhatsApp +971 55 675 1854.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const phone = settings.contactInfo.phonePrimary || '04 579 2137'
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const whatsapp = settings.contactInfo.whatsappNumber || '+971 55 675 1854'
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`
  const email = settings.contactInfo.email || 'info@veloraelite.ae'
  const address = settings.contactInfo.address || 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai, UAE'
  const workingHours = settings.contactInfo.workingHours || 'Monday – Saturday: 8:00 AM – 6:00 PM'
  const mapUrl =
    settings.contactInfo.googleMapsEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786221193375!2d55.2721867!3d25.2157522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428ce0a9f5c1%3A0x6b4cf99863c33dc6!2sAspin%20Commercial%20Tower!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Customer Care</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Connect with Velora Elite
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Our scheduling desk and client relations team are available 6 days a week to support your residential, villa, and corporate cleaning requirements.
          </p>
        </div>
      </section>

      {/* Main Content: Info Cards & Form */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 Cols): Contact Details Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Direct Channels */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Direct Communication Channels
                </h3>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                        Landline Telephone
                      </div>
                      <a href={telHref} className="font-bold text-slate-900 hover:text-amber-700 transition-colors">
                        {phone}
                      </a>
                      <span className="text-xs text-slate-500 block">Immediate dispatch coordinator</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                        Mobile & WhatsApp Hotline
                      </div>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        {whatsapp}
                      </a>
                      <span className="text-xs text-slate-500 block">Fast booking, location pin & photos</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                        Official Email
                      </div>
                      <a href={`mailto:${email}`} className="font-bold text-slate-900 hover:text-amber-700 transition-colors">
                        {email}
                      </a>
                      <span className="text-xs text-slate-500 block">Corporate RFPs & customer inquiries</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                        Operating Hours
                      </div>
                      <div className="font-medium text-slate-800">{workingHours}</div>
                      <span className="text-xs text-slate-500 block">Sunday: On-call emergency dispatch only</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Card 2: Physical Hub Address */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Head Office</h4>
                    <span className="text-xs text-slate-500">Aspin Commercial Tower, Sheikh Zayed Road</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {address}
                </p>
              </div>
            </div>

            {/* Right Column (7 Cols): Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-amber-500/25 shadow-lg bg-white">
            <div className="p-6 bg-black text-white border-b border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white">Velora Elite Central Operations Office</h4>
                <p className="text-xs text-slate-400">Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai</p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-colors"
              >
                Directions via WhatsApp
              </a>
            </div>

            <div className="aspect-16/7 sm:aspect-21/9 w-full bg-slate-200">
              <iframe
                title="Velora Elite Location Map"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
