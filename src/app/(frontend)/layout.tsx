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
      default: `${settings.companyName || 'Velora Elite'} | Luxury Cleaning & Technical Services Dubai`,
    },
    description:
      settings.tagline ||
      'Velora Elite delivers a higher standard of clean — premium residential, villa, deep cleaning, and technical maintenance services across Dubai and the UAE.',
    keywords: [
      'velora elite dubai',
      'luxury cleaning services dubai',
      'home and villa cleaning dubai',
      'deep cleaning dubai',
      'office cleaning dubai',
      'move in move out cleaning dubai',
      'glass and window cleaning dubai',
      'sofa and carpet cleaning dubai',
      'technical services dubai',
      'aspin commercial tower dubai',
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
      title: `${settings.companyName || 'Velora Elite'} | Luxury Cleaning & Technical Services Dubai`,
      description:
        'A Higher Standard of Clean — luxury villa, residential, commercial office, and deep cleaning services across Dubai.',
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

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <LuxuryEffects />
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
