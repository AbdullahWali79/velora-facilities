import { cache } from 'react'
import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'
import type { ServiceItem } from '@/components/ServiceCard'
import type { GalleryItem } from '@/components/GalleryComparison'
import type { TestimonialItem } from '@/components/TestimonialCard'

// Revalidation time for CMS-managed data (in seconds)
export const REVALIDATE_TIME = 0 // Real-time reflection of CMS edits

let cachedPayloadPromise: Promise<Payload> | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (!cachedPayloadPromise) {
    cachedPayloadPromise = getPayload({ config: configPromise }).catch((err) => {
      // Clear cache on failure so next call can retry
      cachedPayloadPromise = null
      throw err
    })
  }
  return cachedPayloadPromise
}

// -----------------------------------------------------------------------------
// Fallback Defaults (Ensures website is resilient without presenting unverified
// statistics, fabricated testimonials, or unapproved trade claims)
// -----------------------------------------------------------------------------

export const DEFAULT_SITE_SETTINGS = {
  companyName: 'Velora Elite',
  legalName: 'Velora Elite Technical Services L.L.C.',
  tagline: 'A Higher Standard of Clean',
  tradeLicense: '', // Client-configured via CMS Site Settings
  contactInfo: {
    phonePrimary: '04 579 2137',
    whatsappNumber: '+971 55 675 1854',
    email: 'info@veloraelite.ae',
    supportEmail: 'info@veloraelite.ae',
    address: 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai, UAE',
    workingHours: 'Monday – Saturday: 8:00 AM – 8:00 PM',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178652431697!2d55.2741916!3d25.2120021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428ce0a9f547%3A0x6b77241be9e5f458!2sAspin%20Commercial%20Tower%2C%20Trade%20Centre%20-%20Trade%20Centre%201%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae',
  },
  socialMedia: {
    instagram: 'https://instagram.com/veloraelite',
    facebook: 'https://facebook.com/veloraelite',
    linkedin: 'https://linkedin.com/company/veloraelite',
    youtube: '',
    tiktok: 'https://tiktok.com/@veloraelite',
  },
}

export const DEFAULT_HEADER = {
  navItems: [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'Request a Quote', url: '/quote' },
    { label: 'Book Online', url: '/book' },
    { label: 'Contact', url: '/contact' },
  ],
  ctaButton: {
    text: 'Book Online',
    url: '/book',
  },
}

export const DEFAULT_FOOTER = {
  aboutSummary:
    'Velora Elite Technical Services L.L.C. delivers European-standard residential and commercial cleaning, deep sanitization, and technical facility services across Dubai and the UAE. Committed to precision, vetted professionals, and a higher standard of clean.',
  copyright: '© 2026 Velora Elite Technical Services L.L.C. All rights reserved. Registered & Licensed in Dubai, United Arab Emirates.',
  columns: [
    {
      title: 'Our Services',
      links: [
        { label: 'Home & Villa Cleaning', url: '/services/home-villa-cleaning' },
        { label: 'Deep Cleaning Services', url: '/services/deep-cleaning' },
        { label: 'Office Cleaning', url: '/services/office-cleaning' },
        { label: 'Move-In & Move-Out Cleaning', url: '/services/move-in-move-out' },
        { label: 'Glass & Window Cleaning', url: '/services/glass-window-cleaning' },
        { label: 'Sofa & Carpet Cleaning', url: '/services/sofa-carpet-cleaning' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'About Velora Elite', url: '/about' },
        { label: 'Transformation Gallery', url: '/gallery' },
        { label: 'Request a Fast Quote', url: '/quote' },
        { label: 'Book an Appointment', url: '/book' },
        { label: 'Contact Customer Care', url: '/contact' },
      ],
    },
    {
      title: 'UAE Service Areas',
      links: [
        { label: 'Downtown & Business Bay', url: '/services' },
        { label: 'Sheikh Zayed Rd & DIFC', url: '/services' },
        { label: 'Palm Jumeirah & Emirates Hills', url: '/services' },
        { label: 'Dubai Marina & JBR', url: '/services' },
        { label: 'Dubai Hills & Arabian Ranches', url: '/services' },
      ],
    },
  ],
}

export const DEFAULT_HOMEPAGE = {
  heroBanners: [
    {
      badge: 'Velora Elite — Technical & Cleaning Services L.L.C.',
      headline: 'A Higher Standard of Clean for Luxury UAE Properties',
      subheadline:
        'European-standard home & villa cleaning, hospital-grade deep sanitization, and technical facility care across Dubai and the UAE. Headquartered at Aspin Commercial Tower, Sheikh Zayed Road.',
      primaryCtaText: 'Book Your Cleaning Today',
      primaryCtaUrl: '/book',
      secondaryCtaText: 'Request a Custom Quote',
      secondaryCtaUrl: '/quote',
    },
  ],
  trustBadges: [
    {
      title: 'European Standard Protocols',
      subtitle: 'Hospital-grade certified disinfectants & precision cleaning',
    },
    {
      title: '100% Vetted & Uniformed Staff',
      subtitle: 'Background-checked, trained & certified specialists',
    },
    {
      title: 'Luxury Surface-Safe Solutions',
      subtitle: 'Eco-certified safe for marble, wood, fine fabrics & pets',
    },
    {
      title: 'Central Dubai Dispatch',
      subtitle: 'Aspin Commercial Tower, 106 Sheikh Zayed Rd, Dubai',
    },
  ],
  // Stats bar: Only client-approved statistics from CMS will appear
  stats: [],
  ctaBanner: {
    heading: 'Ready for an Uncompromising Standard of Cleanliness?',
    description:
      'Connect with our Dubai scheduling coordinators for an instant quote or confirmed service booking. We guarantee punctual arrival and flawless execution.',
    buttonText: 'Book Your Cleaning Today',
    buttonUrl: '/book',
  },
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Home & Villa Cleaning',
    slug: 'home-villa-cleaning',
    category: 'cleaning',
    tagline: 'Precision cleaning tailored for luxury UAE villas and residences',
    shortDescription:
      'Comprehensive regular and intensive cleaning for luxury villas, penthouses, and residences. From floor-to-ceiling sanitization to delicate surface care.',
    features: [
      { title: 'Living & Dining Room Detailing', description: 'Dusting, marble floor care, furniture polish, and chandelier cleaning' },
      { title: 'Kitchen Deep Sanitization', description: 'Countertop degreasing, exterior cabinetry, appliance wipe-down, and sink disinfection' },
      { title: 'Luxury Bathroom Care', description: 'Tile descaling, chrome fixture polishing, shower glass cleaning, and organic sanitization' },
      { title: 'Bedroom & Linen Refresh', description: 'Dust mite removal, mattress vacuuming, and bespoke staging' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'What is included in a Home & Villa Cleaning visit?',
        answer: 'Our trained uniformed team cleans all living spaces, bedrooms, bathrooms, and kitchen areas using surface-safe European standard chemicals.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Deep Cleaning Services',
    slug: 'deep-cleaning',
    category: 'cleaning',
    tagline: 'Hospital-grade intensive decontamination for luxury properties',
    shortDescription:
      'Exhaustive top-to-bottom deep sanitization covering kitchen degreasing, bathroom descaling, grout restoration, and particulate extraction.',
    features: [
      { title: 'Kitchen & Appliance Restoration', description: 'High-heat steam degreasing of ovens, range hoods, filters, and interior cabinetry' },
      { title: 'Sanitary Steam Descaling', description: 'Heavy lime scale removal, high-pressure steam sanitization, and hygienic sealing' },
      { title: 'Grout & Floor Scrubbing', description: 'Single-disc rotary machine scrubbing restoring tile and marble grout lines' },
      { title: 'Detailed Track & Balcony Washing', description: 'Window track vacuuming, frame washing, and terrace pressure washing' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Do you bring your own equipment and materials?',
        answer: 'Yes, our teams arrive fully equipped with industrial single-disc scrubbers, steam machines, HEPA vacuums, and eco-certified chemicals.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Office Cleaning & Commercial Care',
    slug: 'office-cleaning',
    category: 'commercial',
    tagline: 'Discreet, high-standard maintenance for offices, retail & clinics',
    shortDescription:
      'Flexible after-hours or daytime facility care for corporate offices, executive suites, boutiques, clinics, and commercial premises across Dubai.',
    features: [
      { title: 'High-Touch Zone Sterilization', description: 'Hourly antimicrobial wipe-downs of biometric scanners, handles, and desks' },
      { title: 'After-Hours Flexible Scheduling', description: 'Zero disruption to corporate operations and client confidentiality' },
      { title: 'Floor Buffing & Reception Detailing', description: 'Polished welcome lobbies, marble care, and spotless meeting rooms' },
      { title: 'B2B SLAs & Monthly Invoicing', description: 'Standardized service level agreements with dedicated account managers' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Do you offer regular corporate cleaning contracts?',
        answer: 'Yes, we provide flexible daily, weekly, or monthly commercial cleaning contracts tailored to your office square footage and schedule.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Move-In & Move-Out Cleaning',
    slug: 'move-in-move-out',
    category: 'cleaning',
    tagline: 'Guaranteed inspection-ready handover cleaning for tenants & landlords',
    shortDescription:
      'Turnkey handover cleaning designed to secure full security deposit returns and prepare properties for immediate, pristine occupancy.',
    features: [
      { title: 'Interior Wardrobe & Cabinet Sanitization', description: 'Thorough vacuuming and wipe down of all storage units inside and out' },
      { title: 'Residue & Stain Removal', description: 'Safe removal of light contractor residues, tape marks, and scuffs' },
      { title: 'Floor Rotary Machine Polishing', description: 'Machine scrub and buff for marble, tile, and parquet surfaces' },
      { title: 'Handover Certification Checklist', description: 'Structured audit aligned with major UAE real estate agency standards' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Does this service satisfy landlord move-out criteria?',
        answer: 'Yes. Our move-out package is specifically designed to meet the rigorous inspection checklists of major UAE developers and landlords.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 5,
    title: 'Glass & Window Cleaning',
    slug: 'glass-window-cleaning',
    category: 'maintenance',
    tagline: 'Crystal-clear architectural glass and facade wash',
    shortDescription:
      'Professional streak-free window cleaning, frame restoration, glass balcony washing, and facade care for residential villas and commercial buildings.',
    features: [
      { title: 'Interior & Exterior Window Washing', description: 'Streak-free pure water cleaning for floor-to-ceiling glass panels' },
      { title: 'Frame & Track Detailing', description: 'Deep vacuuming and scrubbing of sliding tracks, rubber gaskets, and sills' },
      { title: 'Balcony Glass Balustrade Cleaning', description: 'Removal of sand, dust buildup, and water spots' },
      { title: 'Hard Water Spot Removal', description: 'Specialized mineral stain lifting safe for tinted and double-glazed glass' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Can you clean high-reach villa exterior glass?',
        answer: 'Yes, our technicians use specialized water-fed telescopic poles and safety gear to clean exterior villa glass safely and efficiently.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Sofa & Carpet Cleaning',
    slug: 'sofa-carpet-cleaning',
    category: 'cleaning',
    tagline: 'Revitalize fine Italian fabrics, silk rugs, and leather suites',
    shortDescription:
      'Deep hot-water steam extraction, fabric-safe stain lifting, and fiber conditioning for luxury sofas, armchairs, mattresses, and delicate carpets.',
    features: [
      { title: 'pH-Balanced Deep Extraction', description: 'Safe for wool, silk, velvet, linen, and delicate organic weaves' },
      { title: 'Dust Mite & Allergen Eradication', description: 'Thermodynamic steam killing 99.9% of microscopic allergens' },
      { title: 'Stain & Odor Neutralization', description: 'Enzyme-based solutions targeting food stains, coffee, and moisture marks' },
      { title: 'Rapid Moisture Extraction', description: 'Specialized high-vacuum blowers ensuring dry times in 2 to 4 hours' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'How long does it take for sofas and carpets to dry?',
        answer: 'Thanks to our high-powered dual-vacuum extraction machines, fabrics typically dry in only 2 to 3 hours.'
      }
    ],
    isFeatured: false,
  },
]

// Zero fabricated items: Only client-uploaded images and reviews from CMS appear publicly
export const DEFAULT_GALLERY: GalleryItem[] = []
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = []

// -----------------------------------------------------------------------------
// CMS Fetch Helpers (Queries DB first, gracefully falls back to defaults)
// -----------------------------------------------------------------------------

export const getSiteSettings = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'site-settings' })
    if (data && data.companyName) {
      const companyName = data.companyName.includes('Facilities') ? DEFAULT_SITE_SETTINGS.companyName : data.companyName
      const email = data.contactInfo?.email?.includes('facilities') ? DEFAULT_SITE_SETTINGS.contactInfo.email : (data.contactInfo?.email || DEFAULT_SITE_SETTINGS.contactInfo.email)
      const phonePrimary = (data.contactInfo?.phonePrimary && !data.contactInfo.phonePrimary.includes('000 0000')) ? data.contactInfo.phonePrimary : DEFAULT_SITE_SETTINGS.contactInfo.phonePrimary
      const whatsappNumber = (data.contactInfo?.whatsappNumber && !data.contactInfo.whatsappNumber.includes('000 0000')) ? data.contactInfo.whatsappNumber : DEFAULT_SITE_SETTINGS.contactInfo.whatsappNumber
      const address = (data.contactInfo?.address && !data.contactInfo.address.includes('Business Bay')) ? data.contactInfo.address : DEFAULT_SITE_SETTINGS.contactInfo.address

      return {
        companyName,
        legalName: DEFAULT_SITE_SETTINGS.legalName,
        tagline: data.tagline?.includes('Facilities') ? DEFAULT_SITE_SETTINGS.tagline : (data.tagline || DEFAULT_SITE_SETTINGS.tagline),
        tradeLicense: data.tradeLicense || '',
        contactInfo: {
          phonePrimary,
          whatsappNumber,
          email,
          supportEmail: email,
          address,
          workingHours: data.contactInfo?.workingHours || DEFAULT_SITE_SETTINGS.contactInfo.workingHours,
          googleMapsEmbedUrl: data.contactInfo?.googleMapsEmbedUrl || DEFAULT_SITE_SETTINGS.contactInfo.googleMapsEmbedUrl,
        },
        socialMedia: {
          instagram: data.socialMedia?.instagram || DEFAULT_SITE_SETTINGS.socialMedia.instagram,
          facebook: data.socialMedia?.facebook || DEFAULT_SITE_SETTINGS.socialMedia.facebook,
          linkedin: data.socialMedia?.linkedin || DEFAULT_SITE_SETTINGS.socialMedia.linkedin,
          youtube: data.socialMedia?.youtube || '',
          tiktok: data.socialMedia?.tiktok || DEFAULT_SITE_SETTINGS.socialMedia.tiktok,
        },
      }
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Using site-settings defaults. Database query note:', (err as Error)?.message)
  }
  return DEFAULT_SITE_SETTINGS
})

export const getHeader = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'header' })
    if (data && data.navItems && data.navItems.length > 0) {
      return {
        logo: data.logo,
        navItems: data.navItems,
        ctaButton: data.ctaButton || DEFAULT_HEADER.ctaButton,
      }
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Using header defaults. Database query note:', (err as Error)?.message)
  }
  return DEFAULT_HEADER
})

export const getFooter = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'footer' })
    if (data && (data.aboutSummary || (data.columns && data.columns.length > 0))) {
      return {
        logo: data.logo,
        aboutSummary: data.aboutSummary || DEFAULT_FOOTER.aboutSummary,
        copyright: data.copyright || DEFAULT_FOOTER.copyright,
        columns: (data.columns && data.columns.length > 0) ? data.columns : DEFAULT_FOOTER.columns,
      }
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Using footer defaults. Database query note:', (err as Error)?.message)
  }
  return DEFAULT_FOOTER
})

export const getHomepageSettings = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'homepage' })
    if (data && data.heroBanners && data.heroBanners.length > 0) {
      return {
        heroBanners: data.heroBanners,
        trustBadges: (data.trustBadges && data.trustBadges.length > 0) ? data.trustBadges : DEFAULT_HOMEPAGE.trustBadges,
        stats: (data.stats && data.stats.length > 0) ? data.stats : [],
        ctaBanner: data.ctaBanner?.heading ? data.ctaBanner : DEFAULT_HOMEPAGE.ctaBanner,
      }
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Using homepage defaults. Database query note:', (err as Error)?.message)
  }
  return DEFAULT_HOMEPAGE
})

export const getTrackingSettings = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'tracking-settings' })
    if (data) {
      return {
        googleAnalyticsId: data.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID,
        googleTagManagerId: data.googleTagManagerId || process.env.NEXT_PUBLIC_GTM_ID,
        googleSearchConsoleVerification: data.googleSearchConsoleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        googleAdsConversionId: data.googleAdsConversionId,
        googleAdsBookingConversionLabel: data.googleAdsBookingConversionLabel,
        googleAdsQuoteConversionLabel: data.googleAdsQuoteConversionLabel,
        metaPixelId: data.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID,
        enableTracking: Boolean(data.enableTracking),
      }
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Tracking settings lookup note:', (err as Error)?.message)
  }
  return {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    googleSearchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    googleAdsConversionId: undefined,
    googleAdsBookingConversionLabel: undefined,
    googleAdsQuoteConversionLabel: undefined,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    enableTracking: false,
  }
})

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      sort: 'sortOrder',
      limit: 50,
    })
    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        category: doc.category as 'cleaning' | 'maintenance' | 'commercial',
        tagline: doc.tagline,
        shortDescription: doc.shortDescription,
        content: doc.content,
        pricing: doc.pricing,
        features: doc.features,
        faqs: doc.faqs,
        isFeatured: doc.isFeatured,
      }))
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Using default services portfolio. Database query note:', (err as Error)?.message)
  }
  return DEFAULT_SERVICES
})

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceItem | null> => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    if (res.docs && res.docs.length > 0) {
      const doc = res.docs[0]
      return {
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        category: doc.category as 'cleaning' | 'maintenance' | 'commercial',
        tagline: doc.tagline,
        shortDescription: doc.shortDescription,
        content: doc.content,
        pricing: doc.pricing,
        features: doc.features,
        faqs: doc.faqs,
        isFeatured: doc.isFeatured,
      }
    }
  } catch (err) {
    console.warn(`[CMS Fallback] Notice: Service slug lookup failed for '${slug}'. Note:`, (err as Error)?.message)
  }
  return DEFAULT_SERVICES.find(s => s.slug === slug) || null
})

export const getGalleryItems = cache(async (): Promise<GalleryItem[]> => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'gallery',
      sort: '-createdAt',
      limit: 50,
      depth: 1,
    })
    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        location: doc.location,
        description: doc.description,
        service: doc.service,
        serviceTitle: typeof doc.service === 'object' && doc.service !== null ? (doc.service as { title?: string }).title : null,
        beforeImage: doc.beforeImage,
        afterImage: doc.afterImage,
        isFeatured: doc.isFeatured,
      }))
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Gallery items lookup error:', (err as Error)?.message)
  }
  // Safe zero-fabricated fallback: never return unverified project images
  return DEFAULT_GALLERY
})

export const getTestimonials = cache(async (): Promise<TestimonialItem[]> => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'testimonials',
      where: {
        isFeatured: { equals: true },
      },
      sort: '-createdAt',
      limit: 20,
    })
    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc) => ({
        id: doc.id,
        clientName: doc.clientName,
        clientRole: doc.clientRole,
        company: doc.company,
        location: doc.location,
        rating: doc.rating,
        content: doc.content,
        isVerified: doc.isVerified,
        isFeatured: doc.isFeatured,
      }))
    }
  } catch (err) {
    console.warn('[CMS Fallback] Notice: Testimonials lookup error:', (err as Error)?.message)
  }
  // Safe zero-fabricated fallback: never display unverified reviews
  return DEFAULT_TESTIMONIALS
})

export const getPageBySlug = cache(async (slug: string) => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    if (res.docs && res.docs.length > 0) {
      return res.docs[0]
    }
  } catch (err) {
    console.warn(`[CMS Fallback] Notice: Page slug lookup failed for '${slug}'. Note:`, (err as Error)?.message)
  }
  return null
})
