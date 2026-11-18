# Velora Facilities — Web Platform & CMS

Enterprise-grade, SEO-optimized web application and content management system for **Velora Facilities**, a premier UAE-based cleaning and maintenance services provider.

---

## 1. Technology Stack & Versions

- **Framework**: [Next.js](https://nextjs.org/) `15.4.11` (App Router, React Server Components)
- **CMS**: [Payload CMS](https://payloadcms.com/) `3.90.0` (Directly integrated native App Router CMS)
- **Database Adapter**: `@payloadcms/db-postgres` `3.90.0` (PostgreSQL with Drizzle ORM engine)
- **Rich Text Editor**: `@payloadcms/richtext-lexical` `3.90.0`
- **SEO Engine**: `@payloadcms/plugin-seo` `3.90.0` + Next.js App Router Metadata API (`sitemap.ts`, `robots.ts`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) `v4` with `@tailwindcss/postcss`
- **Language**: [TypeScript](https://www.typescriptlang.org/) `5.x`
- **Runtime**: Node.js `^20.9.0 || ^22.0.0 || ^24.0.0` (Verified on Node `v24.11.1` & npm `11.6.2`)

---

## 2. Project Architecture & Directory Structure

The application adopts the official Next.js 15 + Payload 3 route group pattern, isolating CMS admin and API routing from the customer-facing frontend.

```
velora-facilities/
├── .env.example                       # Documented environment variable template (no secrets)
├── .gitignore                         # Strict exclusion for secrets, build artifacts, and node_modules
├── eslint.config.mjs                  # ESLint flat config with Next.js Core Web Vitals & TypeScript
├── next.config.ts                     # Next.js configuration wrapped with withPayload()
├── package.json                       # Scripts, dependencies, and project metadata
├── postcss.config.mjs                 # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json                      # TypeScript config with @/* and @payload-config aliases
├── public/                            # Static public assets (icons, media uploads)
│   └── media/                         # Local storage target for Payload image uploads
└── src/
    ├── app/
    │   ├── (frontend)/                # Public customer-facing website routes
    │   │   ├── favicon.ico
    │   │   ├── globals.css            # Global Tailwind styling
    │   │   ├── layout.tsx             # Public Root Layout (Geist fonts, OpenGraph, Canonical metadata)
    │   │   ├── page.tsx               # Homepage placeholder / verification screen
    │   │   ├── robots.ts              # Dynamic robots.txt route handler
    │   │   └── sitemap.ts             # Dynamic XML sitemap route handler
    │   └── (payload)/                 # Payload CMS dashboard and backend APIs
    │       ├── admin/
    │       │   ├── [[...segments]]/   # Dynamic admin panel router
    │       │   └── importMap.js       # Auto-generated Payload component import map
    │       ├── api/
    │       │   ├── [...slug]/         # Payload REST API endpoints
    │       │   └── graphql/           # Payload GraphQL API endpoint
    │       ├── custom.scss            # Admin dashboard branding & styles
    │       └── layout.tsx             # Admin layout wrapper
    ├── collections/                   # Payload CMS Collections
    │   ├── BookingRequests.ts         # Customer booking inquiries (manual staff confirmation workflow)
    │   ├── ContactMessages.ts         # General contact inquiries
    │   ├── Gallery.ts                 # Before-and-after project showcase
    │   ├── Media.ts                   # Image asset management (alt text, responsive crops)
    │   ├── Pages.ts                   # Dynamic website pages (About, Gallery, etc.)
    │   ├── QuoteRequests.ts           # Residential & Commercial quote inquiries
    │   ├── Services.ts                # Service catalog with SEO detail page support
    │   ├── Testimonials.ts            # Client reviews & star ratings
    │   └── Users.ts                   # Admin & Editor user accounts
    ├── globals/                       # Payload CMS Global Settings
    │   ├── Footer.ts                  # Footer links, company registration, copyright
    │   ├── Header.ts                  # Navigation menu items, CTA button, branding
    │   ├── Homepage.ts                # Hero banners, trust badges, stats, banner CTA
    │   ├── SiteSettings.ts            # UAE business address, phone, WhatsApp, working hours
    │   └── TrackingSettings.ts        # GA4, GTM, Meta Pixel, GSC, Google Ads tracking
    ├── payload-types.ts               # Auto-generated TypeScript interfaces for all collections/globals
    └── payload.config.ts              # Payload CMS master configuration
```

---

## 3. Payload CMS Collections & Globals

### Collections
1. **Pages** (`/admin/collections/pages`): Custom content pages with rich text, hero headings, and SEO metadata.
2. **Services** (`/admin/collections/services`): Individual cleaning and maintenance service offerings with slug, category, pricing guides, feature lists, FAQs, and detail-page metadata.
3. **Gallery** (`/admin/collections/gallery`): Before-and-after transformations with location tagging (e.g. Dubai Marina, Palm Jumeirah) and service relations.
4. **Testimonials** (`/admin/collections/testimonials`): Client feedback, star ratings, verification status, and optional client avatars.
5. **Booking Requests** (`/admin/collections/booking-requests`): Allows customers to select a service, preferred date, and time slot. Configured with a manual confirmation workflow (no automated booking or payment processing).
6. **Quote Requests** (`/admin/collections/quote-requests`): Detailed lead collection for apartments, villas, offices, and commercial facilities across UAE emirates.
7. **Contact Messages** (`/admin/collections/contact-messages`): General inquiries submitted through the contact form.
8. **Media** (`/admin/collections/media`): Image uploads with automated thumbnail, card, and hero dimensions with required alt text.
9. **Users** (`/admin/collections/users`): Secure authentication for admin and editorial staff.

### Globals
1. **Homepage & Banners** (`/admin/globals/homepage`): Hero slider banners, trust badges, statistics counter, and call-to-action sections.
2. **Company & Contact Info** (`/admin/globals/site-settings`): UAE trade license, primary phone, WhatsApp hotline, email, office address, and Google Maps embed URL.
3. **Header & Navigation** (`/admin/globals/header`): Menu links, phone badge, and primary CTA.
4. **Footer Content** (`/admin/globals/footer`): Link columns, company registration disclaimer, and legal links.
5. **SEO & Tracking Settings** (`/admin/globals/tracking-settings`): Centralized management for Google Analytics 4 (`G-XXXXXXXXXX`), Google Tag Manager (`GTM-XXXXXXX`), Google Search Console verification, Google Ads conversions, and Meta Pixel.

---

## 4. Environment Variables

Create `.env.local` based on `.env.example`:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | **Yes** | PostgreSQL connection string (`postgresql://user:pass@host:5432/dbname`) |
| `PAYLOAD_SECRET` | **Yes** | Cryptographic secret key for session JWTs (minimum 32 characters) |
| `NEXT_PUBLIC_SERVER_URL` | **Yes** | Canonical base URL (`http://localhost:3000` locally, `https://velorafacilities.ae` in production) |
| `PORT` | No | Server port (default: `3000`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 ID override (optional, can be managed in CMS) |
| `NEXT_PUBLIC_GTM_ID` | No | Google Tag Manager ID override |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel ID override |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | GSC verification token |

---

## 5. Local Development Instructions

### Prerequisites
- Node.js `20.9.0` or higher (verified on Node `v24.11.1`)
- PostgreSQL instance running locally or via cloud (Neon, Supabase, Docker, etc.)

### Setup Steps

1. **Clone and Navigate**:
   ```bash
   git clone <repo-url>
   cd velora-facilities
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local PostgreSQL credentials and a secure PAYLOAD_SECRET
   ```

4. **Generate Types & Import Map**:
   ```bash
   npm run generate:types
   npx payload generate:importmap
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

6. **Access Public Site & Admin**:
   - Public Website: [http://localhost:3000](http://localhost:3000)
   - Payload Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
   - The first time you visit `/admin`, Payload will prompt you to create your initial Super Admin account.

---

## 6. Hosting Requirements & Infrastructure Limitations

### Runtime Requirements
- Next.js 15 App Router combined with Payload CMS 3 is a **full-stack Node.js application** that requires a continuous Node.js runtime (`Node.js >= 20.9.0`) and server-side execution for API routes, database connections, and Server Components.
- It **cannot** be deployed to traditional static-only FTP web hosting (such as standard shared cPanel or basic Hostinger shared web hosting plans that only support PHP/Apache static files).

### Recommended Production Deployment Options
1. **PaaS / Serverless**:
   - Web App: [Vercel](https://vercel.com/) (Native Next.js host with Edge & Serverless functions)
   - Database: [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) (Managed Serverless PostgreSQL with connection pooling)
   - Blob Storage: AWS S3 / Cloudflare R2 / Supabase Storage via `@payloadcms/storage-s3` (for production image persistence across serverless cold starts)
2. **Container / VPS Hosting**:
   - [Railway](https://railway.app/), [Render](https://render.com/), or an Ubuntu VPS (DigitalOcean / Hetzner / AWS EC2) running Docker / PM2 with persistent PostgreSQL.
   - If Hostinger is used in later phases, it **must** be a **Hostinger VPS (Virtual Private Server)** with Docker or Node.js enabled, rather than standard Hostinger Shared Web Hosting.
