import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getSiteSettings, getHeader, getFooter, getTrackingSettings } from '@/lib/cms'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { TrackingScripts } from '@/components/TrackingScripts'
import { LuxuryEffects } from '@/components/LuxuryEffects'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const tracking = await getTrackingSettings()
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.veloraelite.ae'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${settings.companyName || 'Velora Elite'}`,
      default: `${settings.companyName || 'Velora Elite'} | Luxury Cleaning & Specialized Surface Care Dubai`,
    },
    description:
      settings.tagline ||
      'Velora Elite delivers a higher standard of clean — specialized marble polishing, kitchen hood & duct degreasing, post-construction cleaning, and luxury villa deep cleaning in Dubai.',
    keywords: [
      'velora elite dubai',
      'luxury cleaning services dubai',
      'marble polishing dubai',
      'kitchen hood cleaning dubai',
      'restaurant cleaning dubai',
      'post construction cleaning dubai',
      'villa deep cleaning dubai',
      'home and villa cleaning dubai',
      'office cleaning dubai',
      'sofa and carpet cleaning dubai',
      'commercial cleaning contracts dubai amc',
      'aspin commercial tower dubai',
      'palm jumeirah cleaning services',
      'emirates hills cleaning',
      'dubai hills villa cleaning',
    ],
    authors: [{ name: settings.companyName || 'Velora Elite' }],
    creator: settings.companyName || 'Velora Elite',
    publisher: settings.companyName || 'Velora Elite',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${settings.companyName || 'Velora Elite'} | Luxury Cleaning & Specialized Care Dubai`,
      description:
        'A Higher Standard of Clean — luxury villa deep cleaning, Italian marble crystallization, restaurant hood degreasing, and post-construction handover across Dubai.',
      url: baseUrl,
      siteName: settings.companyName || 'Velora Elite',
      locale: 'en_AE',
      type: 'website',
    },
    verification: tracking.googleSearchConsoleVerification
      ? { google: tracking.googleSearchConsoleVerification }
      : undefined,
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getSiteSettings()
  const headerData = await getHeader()
  const footerData = await getFooter()
  const trackingSettings = await getTrackingSettings()

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: siteSettings.companyName || 'Velora Elite Technical Services L.L.C.',
    image: 'https://www.veloraelite.ae/images/logo.jpg',
    url: 'https://www.veloraelite.ae',
    telephone: siteSettings.contactInfo.phonePrimary || '+971-4-579-2137',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2120021,
      longitude: 55.2741916,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <LuxuryEffects />
        <TrackingScripts settings={trackingSettings} />
        <Header settings={siteSettings} headerData={headerData} />
        <main className="flex-1">
          {children}
        </main>
        <Footer settings={siteSettings} footerData={footerData} />
        <FloatingWhatsApp
          whatsappNumber={siteSettings.contactInfo.whatsappNumber}
          phonePrimary={siteSettings.contactInfo.phonePrimary}
        />
      </body>
    </html>
  )
}
