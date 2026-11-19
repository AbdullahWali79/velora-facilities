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
// Fallback Defaults (ensures website always displays premium content even
// before CMS admin has entered records)
// -----------------------------------------------------------------------------

export const DEFAULT_SITE_SETTINGS = {
  companyName: 'Velora Facilities',
  tagline: 'Premium UAE Cleaning & Facility Management',
  tradeLicense: 'CN-4892104-DXB',
  contactInfo: {
    phonePrimary: '+971 4 399 9090',
    whatsappNumber: '+971 50 882 1940',
    email: 'info@velorafacilities.ae',
    supportEmail: 'support@velorafacilities.ae',
    address: 'Office 1402, Opal Tower, Business Bay, Dubai, United Arab Emirates',
    workingHours: 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: On-Call Emergency Service',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115563.29292850935!2d55.18567545929237!3d25.183424606132034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93f69d!2sBusiness%20Bay%2C%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae',
  },
  socialMedia: {
    instagram: 'https://instagram.com/velorafacilities',
    facebook: 'https://facebook.com/velorafacilities',
    linkedin: 'https://linkedin.com/company/velora-facilities',
    youtube: 'https://youtube.com/@velorafacilities',
    tiktok: 'https://tiktok.com/@velorafacilities',
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
    'Velora Facilities delivers European-standard residential and commercial cleaning, deep sanitation, and MEP technical maintenance across Dubai, Abu Dhabi, and the UAE. Committed to excellence, vetted professionals, and premium service delivery.',
  copyright: '© 2026 Velora Facilities LLC. All rights reserved. Registered & Licensed in the United Arab Emirates.',
  columns: [
    {
      title: 'Our Services',
      links: [
        { label: 'Deep Cleaning Services', url: '/services/deep-cleaning' },
        { label: 'Luxury Villa Maintenance', url: '/services/villa-maintenance' },
        { label: 'AC Duct Cleaning & MEP', url: '/services/ac-duct-cleaning' },
        { label: 'Move-In / Move-Out Turnkey', url: '/services/move-in-move-out' },
        { label: 'Commercial Facility Care', url: '/services/commercial-cleaning' },
        { label: 'Upholstery & Carpet Care', url: '/services/upholstery-cleaning' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'About Our Company', url: '/about' },
        { label: 'Transformation Gallery', url: '/gallery' },
        { label: 'Request a Fast Quote', url: '/quote' },
        { label: 'Book an Appointment', url: '/book' },
        { label: 'Contact Customer Care', url: '/contact' },
      ],
    },
    {
      title: 'UAE Service Areas',
      links: [
        { label: 'Dubai Marina & JBR', url: '/services' },
        { label: 'Downtown & Business Bay', url: '/services' },
        { label: 'Palm Jumeirah & Emirates Hills', url: '/services' },
        { label: 'Dubai Hills & Arabian Ranches', url: '/services' },
        { label: 'Abu Dhabi City & Saadiyat', url: '/services' },
      ],
    },
  ],
}

export const DEFAULT_HOMEPAGE = {
  heroBanners: [
    {
      badge: 'Premier Cleaning & Facility Management Across UAE',
      headline: 'Excellence in Every Detail for Luxury UAE Properties',
      subheadline:
        'European-standard deep cleaning, MEP technical maintenance, and facility care for luxury villas, penthouses, and commercial spaces across Dubai and Abu Dhabi.',
      primaryCtaText: 'Book a Service',
      primaryCtaUrl: '/book',
      secondaryCtaText: 'Request a Free Quote',
      secondaryCtaUrl: '/quote',
    },
  ],
  trustBadges: [
    {
      title: 'European Standard Sanitation',
      subtitle: 'Hospital-grade certified disinfectants & protocols',
    },
    {
      title: '100% Vetted & Insured Staff',
      subtitle: 'Background-checked, uniform-compliant technicians',
    },
    {
      title: 'Eco-Friendly & Surface-Safe',
      subtitle: 'Safe for children, pets, marble, and luxury fabrics',
    },
    {
      title: 'Rapid UAE-Wide Dispatch',
      subtitle: 'Same-day emergency & scheduled maintenance coverage',
    },
  ],
  stats: [
    { number: '5,000+', label: 'UAE Properties Maintained' },
    { number: '99.4%', label: 'Customer Satisfaction Score' },
    { number: '150+', label: 'Trained & Certified Technicians' },
    { number: '7', label: 'Emirates Seamlessly Covered' },
  ],
  ctaBanner: {
    heading: 'Ready for an Uncompromising Standard of Cleanliness?',
    description:
      'Connect with our UAE scheduling coordinators for an instant quote or confirmed service booking. We guarantee punctual arrival and flawless execution.',
    buttonText: 'Schedule Your Appointment',
    buttonUrl: '/book',
  },
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Deep Cleaning & Sanitization',
    slug: 'deep-cleaning',
    category: 'cleaning',
    tagline: 'Hospital-grade intensive decontamination for luxury villas and apartments',
    shortDescription:
      'Comprehensive top-to-bottom deep cleaning covering kitchen degreasing, bathroom descaling, grout restoration, and HEPA particulate removal.',
    features: [
      { title: 'Kitchen & Appliance Restoration', description: 'Steam degreasing of ovens, hoods, filters, and cabinetry' },
      { title: 'Sanitary Descaling & Disinfection', description: 'Lime scale removal, high-pressure steam, and sanitary sealing' },
      { title: 'Air & Surface Purification', description: 'HEPA filtration air scrubbing and antimicrobial treatment' },
      { title: 'Detailed Window & Balcony Cleaning', description: 'Interior glass, track vacuuming, and terrace pressure washing' },
    ],
    pricing: { startingPrice: 499, priceUnit: 'per_session' },
    faqs: [
      {
        question: 'What is included in a Velora Deep Cleaning session?',
        answer: 'Our deep cleaning covers all ceiling corners, light fixtures, switchboards, AC vent exteriors, kitchen cabinetry (inside/out), appliances, bathrooms with steam descaling, and high-pressure floor scrubbing.'
      },
      {
        question: 'Do you provide your own cleaning supplies and equipment?',
        answer: 'Yes, our team arrives fully equipped with commercial-grade single-disc scrubbers, steam machines, HEPA vacuums, and eco-certified chemicals safe for luxury surfaces.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Luxury Villa Maintenance & Technical MEP',
    slug: 'villa-maintenance',
    category: 'maintenance',
    tagline: 'End-to-end technical maintenance for high-value residential estates',
    shortDescription:
      'Certified electrical, plumbing, HVAC maintenance, and preventive inspections tailored for luxury villas and private estates in Dubai and Abu Dhabi.',
    features: [
      { title: 'HVAC Air Balancing & Motor Check', description: 'Comprehensive diagnostics, capacitor testing, and thermostat calibration' },
      { title: 'Electrical Safety Inspection', description: 'DB panel thermal checks, breaker safety, and load distribution analysis' },
      { title: 'Plumbing & Water Pressure Optimization', description: 'Boiler inspection, pump maintenance, and drainage descaling' },
      { title: 'Quarterly Preventive Maintenance Plans', description: 'Scheduled routine checkups to prevent costly breakdowns' },
    ],
    pricing: { startingPrice: 350, priceUnit: 'per_session' },
    faqs: [
      {
        question: 'Are your technicians licensed in the UAE?',
        answer: 'All our MEP specialists are certified technicians with extensive experience in luxury villa communities such as Emirates Hills, Palm Jumeirah, and Saadiyat Island.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 3,
    title: 'AC Duct Cleaning & Indoor Air Quality',
    slug: 'ac-duct-cleaning',
    category: 'cleaning',
    tagline: 'Pure, allergen-free air with rotary brush duct decontamination',
    shortDescription:
      'High-vacuum rotobrush cleaning of supply and return air ducts, coil disinfection, mold remediation, and organic sanitization.',
    features: [
      { title: 'Rotary Brush Robotic Decontamination', description: 'Mechanically dislodges dust, sand, and allergen accumulation' },
      { title: 'Evaporator Coil Deep Cleaning', description: 'Chemical-safe coil wash restoring cooling efficiency and airflow' },
      { title: 'Antimicrobial Fogging', description: 'Hospital-grade organic fogging that eliminates mold spores and bacteria' },
      { title: 'Blower & Drain Line Flushing', description: 'Prevents water leaks and eliminates microbial stagnation' },
    ],
    pricing: { startingPrice: 650, priceUnit: 'per_session' },
    faqs: [
      {
        question: 'How often should AC ducts be cleaned in the UAE?',
        answer: 'Due to high humidity and fine desert dust, Dubai Municipality recommends professional AC duct cleaning every 12 to 18 months.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Move-In / Move-Out Turnkey Cleaning',
    slug: 'move-in-move-out',
    category: 'cleaning',
    tagline: 'Guaranteed inspection-ready handover cleaning for tenants & landlords',
    shortDescription:
      'Exhaustive cleaning designed to secure full security deposit returns and prepare properties for immediate, pristine occupancy.',
    features: [
      { title: 'Interior Wardrobe & Cabinet Sanitization', description: 'Thorough vacuuming and wipe down of all storage units' },
      { title: 'Paint & Silicon Stain Removal', description: 'Safe removal of light contractor residues, tape marks, and scuffs' },
      { title: 'Floor Buffing & Polishing', description: 'Rotary machine polishing for marble, tile, and parquet surfaces' },
      { title: 'Handover Certification Checklist', description: 'Structured audit aligned with major UAE real estate agency standards' },
    ],
    pricing: { startingPrice: 550, priceUnit: 'per_session' },
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
    title: 'Commercial Facility & Corporate Cleaning',
    slug: 'commercial-cleaning',
    category: 'commercial',
    tagline: 'Discreet, high-standard maintenance for offices, retail & clinics',
    shortDescription:
      'Scheduled after-hours or dedicated daytime facility care for corporate headquarters, luxury boutiques, clinics, and commercial premises.',
    features: [
      { title: 'High-Touch Zone Sterilization', description: 'Hourly antimicrobial wipe-downs of biometric scanners, handles, and desks' },
      { title: 'After-Hours Flexible Scheduling', description: 'Zero disruption to corporate operations and client confidentiality' },
      { title: 'Dedicated Uniformed Facility Teams', description: 'Managed teams equipped with industrial floor polishers and scrubbers' },
      { title: 'B2B SLAs & Monthly Invoicing', description: 'Standardized service level agreements with dedicated account managers' },
    ],
    pricing: { startingPrice: 0, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Do you offer annual maintenance contracts (AMC)?',
        answer: 'Yes, we provide flexible monthly and annual commercial maintenance contracts tailored to your facility square footage and operating hours.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Upholstery & Luxury Carpet Steam Cleaning',
    slug: 'upholstery-cleaning',
    category: 'cleaning',
    tagline: 'Revitalize fine Italian fabrics, silk rugs, and leather suites',
    shortDescription:
      'Deep hot-water extraction, fabric-safe stain lifting, and fiber conditioning for luxury sofas, mattresses, and delicate carpets.',
    features: [
      { title: 'pH-Balanced Extraction', description: 'Safe for wool, silk, velvet, linen, and delicate organic weaves' },
      { title: 'Dust Mite & Allergen Eradication', description: 'Thermodynamic steam killing 99.9% of microscopic allergens' },
      { title: 'Stain & Odor Neutralization', description: 'Enzyme-based solutions targeting pet stains, coffee, and moisture marks' },
      { title: 'Rapid Moisture Extraction', description: 'Specialized high-vacuum blowers ensuring dry times in 2 to 4 hours' },
    ],
    pricing: { startingPrice: 250, priceUnit: 'per_session' },
    faqs: [
      {
        question: 'How long does it take for carpets and sofas to dry?',
        answer: 'Thanks to our high-powered dual-vacuum extraction machines, drying typically takes only 2 to 3 hours.'
      }
    ],
    isFeatured: false,
  },
]

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: 'Luxury Villa Marble Restoration & Deep Clean',
    location: 'Emirates Hills, Dubai',
    description: 'Complete high-pressure steam cleaning, grout revitalization, and diamond polishing for a 6-bedroom signature villa.',
    beforeImage: '/images/gallery-marble-before.jpg',
    afterImage: '/images/gallery-marble-after.jpg',
    serviceTitle: 'Deep Cleaning & Sanitization',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Penthouse AC Duct Mold Remediation & Sanitization',
    location: 'Palm Jumeirah, Dubai',
    description: 'Full rotary brush decontamination and antimicrobial fogging of 14 ceiling duct branches with air quality certification.',
    beforeImage: '/images/gallery-ac-before.jpg',
    afterImage: '/images/gallery-ac-after.jpg',
    serviceTitle: 'AC Duct Cleaning & Indoor Air Quality',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Commercial Office Handover Deep Sanitization',
    location: 'Business Bay, Dubai',
    description: 'Turnkey handover cleaning for a 12,000 sq ft corporate office including carpet steam cleaning and architectural glass washing.',
    beforeImage: '/images/gallery-office-before.jpg',
    afterImage: '/images/gallery-office-after.jpg',
    serviceTitle: 'Commercial Facility & Corporate Cleaning',
    isFeatured: true,
  },
]

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    clientName: 'Tariq Al-Mansoor',
    clientRole: 'Villa Owner',
    company: 'Private Residence',
    location: 'Palm Jumeirah, Dubai',
    rating: 5,
    content:
      'Velora Facilities exceeded all our expectations. Their deep cleaning team handled our Italian marble and bespoke woodwork with extraordinary care. Punctual, meticulous, and impeccably polite.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 2,
    clientName: 'Sarah Jenkins',
    clientRole: 'Operations Director',
    company: 'Apex Media FZ-LLC',
    location: 'Dubai Media City',
    rating: 5,
    content:
      'We engaged Velora for our annual commercial facility maintenance. The improvement in indoor air quality after their AC duct service was noticeable within 24 hours. A top-tier team.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 3,
    clientName: 'Hamad Al-Suwaidi',
    clientRole: 'Property Investor',
    company: 'Suwaidi Estates',
    location: 'Saadiyat Island, Abu Dhabi',
    rating: 5,
    content:
      'The move-in cleaning for our 5-bedroom villa was flawless. Every bathroom was steam-sanitized, windows were crystal clear, and the scheduling team communicated every detail via WhatsApp.',
    isVerified: true,
    isFeatured: true,
  },
]

// -----------------------------------------------------------------------------
// CMS Fetch Helpers (Queries DB first, gracefully falls back to defaults)
// -----------------------------------------------------------------------------

export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'site-settings' })
    if (data && data.companyName) {
      return {
        companyName: data.companyName || DEFAULT_SITE_SETTINGS.companyName,
        tagline: data.tagline || DEFAULT_SITE_SETTINGS.tagline,
        tradeLicense: data.tradeLicense || DEFAULT_SITE_SETTINGS.tradeLicense,
        contactInfo: {
          phonePrimary: data.contactInfo?.phonePrimary || DEFAULT_SITE_SETTINGS.contactInfo.phonePrimary,
          whatsappNumber: data.contactInfo?.whatsappNumber || DEFAULT_SITE_SETTINGS.contactInfo.whatsappNumber,
          email: data.contactInfo?.email || DEFAULT_SITE_SETTINGS.contactInfo.email,
          supportEmail: data.contactInfo?.supportEmail || DEFAULT_SITE_SETTINGS.contactInfo.supportEmail,
          address: data.contactInfo?.address || DEFAULT_SITE_SETTINGS.contactInfo.address,
          workingHours: data.contactInfo?.workingHours || DEFAULT_SITE_SETTINGS.contactInfo.workingHours,
          googleMapsEmbedUrl: data.contactInfo?.googleMapsEmbedUrl || DEFAULT_SITE_SETTINGS.contactInfo.googleMapsEmbedUrl,
        },
        socialMedia: {
          instagram: data.socialMedia?.instagram || DEFAULT_SITE_SETTINGS.socialMedia.instagram,
          facebook: data.socialMedia?.facebook || DEFAULT_SITE_SETTINGS.socialMedia.facebook,
          linkedin: data.socialMedia?.linkedin || DEFAULT_SITE_SETTINGS.socialMedia.linkedin,
          youtube: data.socialMedia?.youtube || DEFAULT_SITE_SETTINGS.socialMedia.youtube,
          tiktok: data.socialMedia?.tiktok || DEFAULT_SITE_SETTINGS.socialMedia.tiktok,
        },
      }
    }
  } catch (err) {
    console.error('Error fetching site-settings global from CMS:', err)
  }
  return DEFAULT_SITE_SETTINGS
}

export async function getHeader() {
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
    console.error('Error fetching header global from CMS:', err)
  }
  return DEFAULT_HEADER
}

export async function getFooter() {
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
    console.error('Error fetching footer global from CMS:', err)
  }
  return DEFAULT_FOOTER
}

export async function getHomepageSettings() {
  try {
    const payload = await getPayloadClient()
    const data = await payload.findGlobal({ slug: 'homepage' })
    if (data && data.heroBanners && data.heroBanners.length > 0) {
      return {
        heroBanners: data.heroBanners,
        trustBadges: (data.trustBadges && data.trustBadges.length > 0) ? data.trustBadges : DEFAULT_HOMEPAGE.trustBadges,
        stats: (data.stats && data.stats.length > 0) ? data.stats : DEFAULT_HOMEPAGE.stats,
        ctaBanner: data.ctaBanner?.heading ? data.ctaBanner : DEFAULT_HOMEPAGE.ctaBanner,
      }
    }
  } catch (err) {
    console.error('Error fetching homepage global from CMS:', err)
  }
  return DEFAULT_HOMEPAGE
}

export async function getTrackingSettings() {
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
    console.error('Error fetching tracking settings:', err)
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
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      sort: 'order',
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
    console.error('Error fetching services from CMS:', err)
  }
  return DEFAULT_SERVICES
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
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
    console.error(`Error fetching service with slug ${slug}:`, err)
  }
  return DEFAULT_SERVICES.find(s => s.slug === slug) || null
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
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
    console.error('Error fetching gallery items from CMS:', err)
  }
  return DEFAULT_GALLERY
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'testimonials',
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
    console.error('Error fetching testimonials from CMS:', err)
  }
  return DEFAULT_TESTIMONIALS
}

export async function getPageBySlug(slug: string) {
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
    console.error(`Error fetching page with slug ${slug}:`, err)
  }
  return null
}
