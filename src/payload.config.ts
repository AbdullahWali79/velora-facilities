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

const databaseURI =
  process.env.DATABASE_URI || 'postgresql://postgres:postgres@localhost:5432/velora_facilities'
const isSupabase = databaseURI.includes('supabase')

// pg lets `sslmode` in the connection string replace the `ssl` pool option, so
// it has to be removed for the Supabase SSL settings below to take effect.
const getConnectionString = () => {
  if (!isSupabase) return databaseURI

  const url = new URL(databaseURI)
  url.searchParams.delete('sslmode')
  return url.toString()
}

const getSslConfig = () => {
  if (!isSupabase) return false

  // If a custom CA certificate is provided in environment variables
  if (process.env.DATABASE_SSL_CA) {
    return {
      ca: process.env.DATABASE_SSL_CA,
      rejectUnauthorized: true,
    }
  }

  // If strict certificate validation is explicitly demanded
  if (process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true') {
    return { rejectUnauthorized: true }
  }

  // Default Supabase pooled connection setting (accommodates intermediate AWS pooler certificates)
  return { rejectUnauthorized: false }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Velora Elite Admin',
    },
    components: {
      views: {
        dashboard: {
          Component: './components/admin/DashboardView#DashboardView',
        },
      },
      graphics: {
        Logo: './components/admin/AdminLogo#AdminLogo',
        Icon: './components/admin/AdminIcon#AdminIcon',
      },
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
      connectionString: getConnectionString(),
      ssl: getSslConfig(),
      // Stay within Supabase's pooler limits. Payload keeps one client checked
      // out for the life of the process, so this allows four for queries.
      max: 6,
      connectionTimeoutMillis: 30_000,
      idleTimeoutMillis: 30_000,
    },
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'services'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const title = (doc as { title?: string })?.title
        return title ? `${title} | Velora Elite Dubai` : 'Velora Elite — Luxury Cleaning & Technical Services'
      },
      generateDescription: ({ doc }) => {
        const shortDescription = (doc as { shortDescription?: string; heroSubheading?: string })?.shortDescription
        return shortDescription || 'A Higher Standard of Clean — luxury villa, residential, deep cleaning, and technical services across Dubai.'
      },
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.veloraelite.ae'
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
