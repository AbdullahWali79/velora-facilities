import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getGalleryItems } from '@/lib/cms'
import { GalleryComparison, GalleryItem } from '@/components/GalleryComparison'
import { SparklesIcon, ArrowRightIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Transformation Gallery — Before & After Project Showcase Dubai',
  description:
    'Browse verified before-and-after project transformations by Velora Elite across luxury villas, penthouses, and commercial facilities in Dubai.',
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 text-white py-20 sm:py-24 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Documented Results</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Before & After Transformation Gallery
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Real documented results across Palm Jumeirah, Emirates Hills, Downtown Dubai, and Dubai Hills. Toggle between &ldquo;Before&rdquo; and &ldquo;After&rdquo; to observe the Velora Elite standard.
          </p>
        </div>
      </section>

      {/* Gallery Showcase Content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <GalleryComparison items={items as unknown as GalleryItem[]} />

          {/* Bottom Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-6 shadow-xs">
            <h3 className="text-2xl font-bold text-slate-900">
              Ready to Transform Your Luxury Property?
            </h3>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Our specialists arrive equipped with European machinery and eco-certified chemicals to restore every surface to pristine condition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all hover:scale-[1.02]"
              >
                Book Your Transformation
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
