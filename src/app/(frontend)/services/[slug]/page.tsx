import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getSiteSettings } from '@/lib/cms'
import { RichText } from '@/components/RichText'
import { CheckCircleIcon, ArrowRightIcon } from '@/components/Icons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  const settings = await getSiteSettings()

  if (!service) {
    return { title: 'Service Not Found | Velora Facilities' }
  }

  return {
    title: `${service.title} — Velora Facilities UAE`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ${settings.companyName}`,
      description: service.shortDescription,
    },
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const startingPrice = service.pricing?.startingPrice
  const priceUnit = service.pricing?.priceUnit || 'custom_quote'
  const features = service.features || []
  const faqs = service.faqs || []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Detail Header Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              ← Services Portfolio
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-medium text-slate-400 capitalize">
              {service.category} Services
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            {service.title}
          </h1>

          {service.tagline ? (
            <p className="text-emerald-400 font-medium text-base sm:text-lg max-w-2xl">
              {service.tagline}
            </p>
          ) : null}

          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Quick CTA row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={`/book?service=${service.slug}`}
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
            >
              Book This Service
            </Link>
            <Link
              href="/quote"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Request Custom Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column (2 Cols): Scope, Content & Features */}
            <div className="lg:col-span-2 space-y-12">
              {/* Rich Text Body if CMS content exists */}
              {service.content ? (
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
                  <RichText content={service.content} />
                </div>
              ) : null}

              {/* Key Features & Execution Scope */}
              {features.length > 0 && (
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Standard Inclusions
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Scope of Work & Protocol Highlights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {features.map((feat, idx: number) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircleIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                          {feat.description && (
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {feat.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Asked Questions */}
              {faqs.length > 0 && (
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Clear Guidance
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-4 pt-2 divide-y divide-slate-100">
                    {faqs.map((faq, idx: number) => (
                      <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Pricing & Booking Sidebar */}
            <div className="space-y-6">
              {/* Pricing Box */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 sticky top-28">
                <div className="space-y-2 border-b border-slate-100 pb-6">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Pricing Transparency
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {startingPrice && startingPrice > 0 ? (
                      <>
                        AED {startingPrice}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          {priceUnit === 'hourly' ? '/ hr' : priceUnit === 'per_sqft' ? '/ sq.ft' : '/ session'}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-emerald-700">Custom Proposal</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Includes all professional machinery, supplies, and supervisor quality audit.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span>No advance booking payment needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span>100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span>Same-day & scheduled UAE dispatch</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book Online Now</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/quote"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center"
                  >
                    Request Custom Quote
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <span className="text-xs text-slate-500">Prefer speaking directly?</span>
                  <a
                    href="tel:+97143999090"
                    className="block text-sm font-bold text-slate-900 hover:text-emerald-600 mt-1"
                  >
                    +971 4 399 9090
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
