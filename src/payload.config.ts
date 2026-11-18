import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Gallery } from './collections/Gallery'
import { Testimonials } from './collections/Testimonials'
import { QuoteRequests } from './collections/QuoteRequests'
import { BookingRequests } from './collections/BookingRequests'
import { ContactMessages } from './collections/ContactMessages'
import { Pages } from './collections/Pages'

// Globals
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { TrackingSettings } from './globals/TrackingSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Velora Facilities Admin',
    },
  },
  collections: [
    Pages,
    Services,
    Gallery,
    Testimonials,
    BookingRequests,
    QuoteRequests,
    ContactMessages,
    Media,
    Users,
  ],
  globals: [
    Homepage,
    SiteSettings,
    Header,
    Footer,
    TrackingSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'temp-secret-key-at-least-32-chars-long-velora',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@localhost:5432/velora_facilities',
      ssl: process.env.DATABASE_URI?.includes('supabase.co') ? { rejectUnauthorized: false } : false,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'services'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const title = (doc as { title?: string })?.title
        return title ? `${title} | Velora Facilities UAE` : 'Velora Facilities — Premium Cleaning & Maintenance'
      },
      generateDescription: ({ doc }) => {
        const shortDescription = (doc as { shortDescription?: string; heroSubheading?: string })?.shortDescription
        return shortDescription || 'Leading professional cleaning, deep cleaning, and technical maintenance services across Dubai, Abu Dhabi, and the UAE.'
      },
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://velorafacilities.ae'
        const slug = (doc as { slug?: string })?.slug
        if (collectionSlug === 'pages') {
          return slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
        }
        return `${baseUrl}/${collectionSlug}/${slug}`
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
