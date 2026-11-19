import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getSiteSettings, getHeader, getFooter, getTrackingSettings } from '@/lib/cms'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { TrackingScripts } from '@/components/TrackingScripts'

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
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://velorafacilities.ae'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${settings.companyName || 'Velora Facilities'}`,
      default: `${settings.companyName || 'Velora Facilities'} | Premium Cleaning & Maintenance Services UAE`,
    },
    description:
      settings.tagline ||
      'Velora Facilities delivers premium residential and commercial cleaning, deep cleaning, and technical maintenance services across Dubai, Abu Dhabi, and the UAE.',
    keywords: [
      'cleaning services dubai',
      'facility management uae',
      'deep cleaning dubai',
      'villa maintenance abu dhabi',
      'commercial cleaning uae',
      'ac maintenance dubai',
      'ac duct cleaning uae',
      'move in cleaning dubai',
    ],
    authors: [{ name: settings.companyName || 'Velora Facilities' }],
    creator: settings.companyName || 'Velora Facilities',
    publisher: settings.companyName || 'Velora Facilities',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${settings.companyName || 'Velora Facilities'} | Premium Cleaning & Maintenance Services UAE`,
      description:
        'European-standard cleaning and technical maintenance for luxury villas, residences, and commercial facilities across Dubai and Abu Dhabi.',
      url: baseUrl,
      siteName: settings.companyName || 'Velora Facilities',
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

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <TrackingScripts settings={trackingSettings} />
        <Header settings={siteSettings} headerData={headerData} />
        <main className="flex-1">
          {children}
        </main>
        <Footer settings={siteSettings} footerData={footerData} />
        <FloatingWhatsApp whatsappNumber={siteSettings.contactInfo.whatsappNumber} />
      </body>
    </html>
  )
}
