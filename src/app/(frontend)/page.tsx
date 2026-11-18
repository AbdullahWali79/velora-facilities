import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-3xl w-full text-center space-y-8 bg-slate-800/60 p-8 sm:p-12 rounded-2xl border border-slate-700 backdrop-blur shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Phase 1 Architecture Initialized
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Velora Facilities
        </h1>

        <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Premium UAE Cleaning & Maintenance Services Platform. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Payload CMS 3 backed by PostgreSQL.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
            <h3 className="text-sm font-semibold text-emerald-400">Payload CMS Collections</h3>
            <p className="text-xs text-slate-400 mt-1">
              Pages, Services, Gallery (Before/After), Testimonials, Booking Requests (Manual Confirmation), Quote Requests, Contact Messages, Media, Users.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
            <h3 className="text-sm font-semibold text-emerald-400">SEO & Tracking Engine</h3>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic Metadata, XML Sitemap, Robots.txt, Schema.org ready, GA4, Meta Pixel, GSC verification configurable via environment or CMS.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/admin"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-semibold text-white transition-colors text-sm shadow-lg shadow-emerald-500/20"
          >
            Access Payload Admin Dashboard →
          </Link>
          <a
            href="https://payloadcms.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-medium transition-colors text-sm"
          >
            Payload Documentation
          </a>
        </div>
      </div>
    </main>
  )
}
