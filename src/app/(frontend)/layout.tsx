import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://velorafacilities.ae'),
  title: {
    template: '%s | Velora Facilities',
    default: 'Velora Facilities | Premium Cleaning & Maintenance Services UAE',
  },
  description:
    'Velora Facilities delivers premium residential and commercial cleaning, deep cleaning, and technical maintenance services across Dubai, Abu Dhabi, and the UAE.',
  keywords: [
    'cleaning services dubai',
    'facility management uae',
    'deep cleaning dubai',
    'villa maintenance abu dhabi',
    'commercial cleaning uae',
    'ac maintenance dubai',
  ],
  authors: [{ name: 'Velora Facilities' }],
  creator: 'Velora Facilities',
  publisher: 'Velora Facilities',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Velora Facilities | Premium Cleaning & Maintenance Services UAE',
    description:
      'Premium cleaning and maintenance services for luxury villas, residences, and commercial facilities across the UAE.',
    url: 'https://velorafacilities.ae',
    siteName: 'Velora Facilities',
    locale: 'en_AE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  )
}
