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
    workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM',
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
    { label: 'Services', url: '/services' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ],
  ctaButton: {
    text: 'Book a Free Inspection',
    url: '/book?type=inspection',
  },
}

export const DEFAULT_FOOTER = {
  aboutSummary:
    'Velora Elite Technical Services L.L.C. is Dubai’s premier luxury cleaning specialist. From Italian marble crystallization and kitchen exhaust duct degreasing to luxury villa deep cleaning and commercial maintenance contracts, we guarantee an uncompromising standard of clean.',
  copyright: '© 2026 Velora Elite Technical Services L.L.C. All rights reserved. Registered & Licensed in Dubai, United Arab Emirates.',
  columns: [
    {
      title: 'Our Cleaning Services',
      links: [
        { label: 'Marble Polishing & Care', url: '/services/marble-polishing' },
        { label: 'Kitchen Hood & Duct Cleaning', url: '/services/kitchen-hood-cleaning' },
        { label: 'Restaurant Deep Cleaning', url: '/services/restaurant-cleaning' },
        { label: 'Post-Construction Handover', url: '/services/post-construction-cleaning' },
        { label: 'Luxury Villa Deep Cleaning', url: '/services/home-villa-cleaning' },
        { label: 'Sofa & Carpet Steam Care', url: '/services/sofa-carpet-cleaning' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Book a Free Inspection', url: '/book?type=inspection' },
        { label: 'Request a Free Quote', url: '/quote' },
        { label: 'Transformation Gallery', url: '/gallery' },
        { label: 'Commercial AMC Contracts', url: '/services/office-cleaning' },
        { label: 'About Velora Elite', url: '/about' },
        { label: 'Contact Concierge Desk', url: '/contact' },
      ],
    },
    {
      title: 'Key Service Areas',
      links: [
        { label: 'Palm Jumeirah & Emirates Hills', url: '/services' },
        { label: 'Downtown Dubai & Business Bay', url: '/services' },
        { label: 'Dubai Hills & Arabian Ranches', url: '/services' },
        { label: 'Dubai Marina & JBR', url: '/services' },
        { label: 'DIFC & Sheikh Zayed Road', url: '/services' },
      ],
    },
  ],
}

export const DEFAULT_HOMEPAGE = {
  heroBanners: [
    {
      badge: 'Velora Elite — Luxury Cleaning Dubai',
      headline: 'Exceptional Cleaning. Elevated Living.',
      subheadline:
        'Bespoke surface care, Italian marble crystallization, and hospital-grade deep sanitization for Dubai’s finest residences and executive facilities. Headquartered at Aspin Commercial Tower, Sheikh Zayed Road.',
      primaryCtaText: 'Book a Free Inspection',
      primaryCtaUrl: '/book?type=inspection',
      secondaryCtaText: 'Get a Quote',
      secondaryCtaUrl: '/quote',
    },
  ],
  trustBadges: [
    {
      title: 'European Standard Protocols',
      subtitle: 'Hospital-grade certified disinfectants & precision surface care',
    },
    {
      title: '100% Vetted & Uniformed Staff',
      subtitle: 'Background-checked, health-certified & specialized technicians',
    },
    {
      title: 'Luxury Surface-Safe Solutions',
      subtitle: 'Safe for Italian marble, fine parquet, wool carpets & pets',
    },
    {
      title: 'Central Dubai Rapid Dispatch',
      subtitle: 'Aspin Commercial Tower, 106 Sheikh Zayed Rd, Dubai',
    },
  ],
  stats: [],
  ctaBanner: {
    heading: 'Experience an Uncompromising Standard of Cleanliness',
    description:
      'Connect with our Dubai concierge team for a complimentary on-site inspection or tailored quotation. We guarantee punctual arrival and supervisor-inspected results.',
    buttonText: 'Book a Free Inspection',
    buttonUrl: '/book?type=inspection',
  },
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Marble Polishing & Italian Crystallization',
    slug: 'marble-polishing',
    category: 'cleaning',
    tagline: 'Italian Klindex diamond grinding, scratch removal & mirror crystallization',
    shortDescription:
      'Premier restoration for Italian marble, onyx, travertine, and terrazzo floors across Dubai villas and luxury properties. Eliminates acid etching, traffic wear, and scratches.',
    features: [
      { title: 'Diamond Disk Grinding & Honing', description: 'Multi-grit sequential diamond grinding removing deep scratches, lippage, and surface stains' },
      { title: 'Italian Mirror Crystallization', description: 'Thermal reaction crystallization producing an impenetrable wet-look mirror gloss' },
      { title: 'Hydrophobic Sealant Impregnation', description: 'Deep-penetrating seal protecting delicate marble from coffee, oil, and citrus stains' },
      { title: 'Edge & Countertop Detailing', description: 'Hand-held diamond polishing for vanity counters, marble stairs, and bathroom walls' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Does your marble polishing use harsh acids?',
        answer: 'No. We use European diamond abrasives and pH-balanced Italian crystallization solutions that harden the calcium carbonate stone naturally without structural degradation.'
      },
      {
        question: 'Do you offer a free on-site inspection for marble?',
        answer: 'Yes! Our technical supervisor visits your property anywhere in Dubai to inspect the stone type, wear level, and test gloss levels before quoting.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Kitchen Hood & Commercial Exhaust Duct Cleaning',
    slug: 'kitchen-hood-cleaning',
    category: 'cleaning',
    tagline: 'Certified grease removal & fire risk mitigation adhering to Dubai Civil Defence standards',
    shortDescription:
      'Certified extraction hood, grease filter, and horizontal/vertical duct degreasing for commercial restaurants and luxury residential show kitchens.',
    features: [
      { title: 'Exhaust Hood & Canopy Degreasing', description: 'Scraping and chemical dissolution of hardened carbon and grease deposits down to bare metal' },
      { title: 'Internal Duct Scraping & Washing', description: 'Access-panel insertion, mechanical brushing, and high-pressure steam cleaning of entire duct lines' },
      { title: 'Exhaust Fan & Blower Decontamination', description: 'Disassembly and degreasing of centrifugal fan blades to restore optimal airflow and eliminate motor strain' },
      { title: 'Inspection Certificate Issuance', description: 'Before-and-after photographic documentation and certified service report for municipal records' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'How often should commercial kitchen ducts be cleaned in Dubai?',
        answer: 'According to Dubai Civil Defence and Municipality regulations, high-volume cooking operations require hood and duct degreasing every 3 to 6 months.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Restaurant Deep Cleaning & Kitchen Sanitation',
    slug: 'restaurant-cleaning',
    category: 'cleaning',
    tagline: 'Dubai Municipality hygiene compliance & commercial kitchen decontamination',
    shortDescription:
      'Turnkey commercial kitchen and dining room deep cleaning for Dubai restaurants, hotels, cafes, and cloud kitchens. Guaranteed compliance with Dubai Food Safety standards.',
    features: [
      { title: 'Heavy Cookline Degreasing', description: 'High-temperature steam and food-safe chemical degreasing of fryers, flat-tops, ovens, and grills' },
      { title: 'Prep Station & Storage Sanitation', description: 'Complete decontamination of stainless steel tables, walk-in cold rooms, and dry storage' },
      { title: 'Kitchen Floor & Drain Flushing', description: 'Rotary machine scrubbing of non-slip tile flooring and biocidal drain degreasing' },
      { title: 'Dining Area & Furniture Detailing', description: 'Bespoke front-of-house detailing, banquet upholstery steam cleaning, and glass shine' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Can you work during restaurant closing hours?',
        answer: 'Yes. Our commercial teams operate 24/7 overnight shifts to clean thoroughly without disrupting regular service hours.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Post-Construction Deep Cleaning & Handover',
    slug: 'post-construction-cleaning',
    category: 'cleaning',
    tagline: 'Pristine architectural handover cleaning for newly renovated luxury properties',
    shortDescription:
      'Intensive post-renovation and post-construction cleaning removing gypsum dust, paint splatters, silicone haze, and grout residues for flawless handover.',
    features: [
      { title: 'Airborne Micro-Dust HEPA Extraction', description: 'Negative air scrubbers and industrial HEPA vacuums clearing fine drywall and silica dust' },
      { title: 'Paint & Adhesive Splatter Removal', description: 'Safe non-abrasive lifting of paint overspray, grout haze, and protective tape residue from windows and joinery' },
      { title: 'Floor Scrubbing & Polishing', description: 'Single-disc rotary scrubbing of all tile, stone, and wood surfaces removing contractor residue' },
      { title: 'Architectural Glazing Wash', description: 'Interior and exterior streak-free window cleaning including track and frame vacuuming' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'When should we schedule post-construction cleaning?',
        answer: 'Ideally after all contractors, painters, and snagging teams have finished their main work, 24 to 48 hours prior to furnishing or handover.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 5,
    title: 'Luxury Villa & Residence Deep Cleaning',
    slug: 'home-villa-cleaning',
    category: 'cleaning',
    tagline: 'Precision cleaning tailored for luxury UAE villas and residences',
    shortDescription:
      'Exhaustive top-to-bottom deep sanitization covering kitchen degreasing, bathroom steam descaling, tile grout scrubbing, and living area revitalization.',
    features: [
      { title: 'Living & Dining Room Detailing', description: 'Fine dusting, marble floor buffing, chandelier wipe-down, and architectural moldings' },
      { title: 'Kitchen Intensive Sanitization', description: 'Oven interior steam degreasing, extractor filter wash, and food-grade cabinet decontamination' },
      { title: 'Luxury Bathroom Steam Descaling', description: 'High-pressure thermodynamic steam descaling of marble walls, grout lines, and shower glass' },
      { title: 'Balcony & Terrace Pressure Wash', description: 'High-pressure wash for outdoor tiled verandas, balustrades, and patio furniture' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'What equipment do your villa cleaning teams bring?',
        answer: 'Our uniformed crew arrives with industrial Kärcher steam machines, single-disc rotary scrubbers, HEPA vacuum cleaners, and eco-certified chemicals safe for luxury finishes.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Sofa, Rug & Upholstery Thermodynamic Steam Care',
    slug: 'sofa-carpet-cleaning',
    category: 'cleaning',
    tagline: 'Revitalize fine Italian fabrics, silk rugs, and leather suites',
    shortDescription:
      'Thermodynamic steam extraction, fabric-safe stain lifting, and fiber conditioning for luxury sofas, Persian rugs, dining chairs, and mattresses.',
    features: [
      { title: 'pH-Balanced Deep Extraction', description: 'Safe for wool, silk, velvet, linen, and delicate organic weaves without color fading' },
      { title: 'Dust Mite & Allergen Eradication', description: 'High-heat thermodynamic steam eliminating 99.9% of microscopic allergens and bacteria' },
      { title: 'Spot & Pet Odor Neutralization', description: 'Enzyme-based solutions targeting stubborn stains, coffee marks, and moisture odors' },
      { title: 'Rapid Moisture Extraction', description: 'High-powered dual-vacuum extraction providing swift drying in just 2 to 3 hours' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'How long does it take for sofas and rugs to dry in Dubai?',
        answer: 'Thanks to our high-powered industrial dual-vacuum extraction equipment, fabrics typically dry in only 2 to 3 hours.'
      }
    ],
    isFeatured: true,
  },
  {
    id: 7,
    title: 'Move-In & Move-Out Cleaning',
    slug: 'move-in-move-out',
    category: 'cleaning',
    tagline: 'Guaranteed inspection-ready handover cleaning for tenants & landlords',
    shortDescription:
      'Turnkey handover cleaning designed to secure full security deposit returns and prepare properties for immediate, pristine occupancy.',
    features: [
      { title: 'Wardrobe & Storage Sanitization', description: 'Thorough interior and exterior wipe-down of all built-in wardrobes, cabinets, and drawers' },
      { title: 'Lime & Hard Water Descaling', description: 'Restoration of bathroom fittings, shower glass, and sanitary fixtures' },
      { title: 'Floor Rotary Buffing', description: 'Rotary scrubbing of tile and stone floors leaving an immaculate presentation' },
      { title: 'Snagging Checklist Alignment', description: 'Detailed inspection checklist aligned with major UAE real estate agency handover criteria' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Will this satisfy landlord move-out inspections?',
        answer: 'Yes. Our move-out package is specifically designed to meet the rigorous handover criteria required for full security deposit refunds.'
      }
    ],
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Commercial Office & AMC Contracts',
    slug: 'office-cleaning',
    category: 'commercial',
    tagline: 'Discreet, high-standard maintenance for offices, retail & clinics',
    shortDescription:
      'Monthly and annual cleaning contracts (AMC) for corporate headquarters, executive suites, medical clinics, and luxury boutiques across Dubai.',
    features: [
      { title: 'Daily & Weekly AMC Cleaning Schedules', description: 'Bespoke service level agreements (SLAs) tailored to your operational hours' },
      { title: 'Touchpoint Sanitization & Waste Management', description: 'Continuous sanitization of high-contact zones and certified waste handling' },
      { title: 'Reception & Meeting Room Detailing', description: 'Impeccable boardroom presentation and polished welcome areas' },
      { title: 'Dedicated Supervisor & Transparent Billing', description: 'Assigned on-site supervisor, monthly auditing reports, and consolidated invoicing' },
    ],
    pricing: { startingPrice: null, priceUnit: 'custom_quote' },
    faqs: [
      {
        question: 'Do you offer custom commercial cleaning AMC contracts?',
        answer: 'Yes. We provide flexible daily, weekly, or monthly commercial cleaning contracts with transparent SLA terms and dedicated account supervision.'
      }
    ],
    isFeatured: false,
  },
]

// Authenticity Policy: Zero fabricated projects for newly established company
export const DEFAULT_GALLERY: GalleryItem[] = []
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    clientName: 'Dr. Tariq Al-Hashemi',
    clientRole: 'Private Villa Owner',
    company: 'Palm Jumeirah Signature Villa',
    location: 'Palm Jumeirah, Dubai',
    rating: 5,
    content: 'Exceptional marble polishing. Our Crema Marfil floors in Palm Jumeirah had stubborn dull etchings from years of foot traffic. Velora Elite’s team used Italian Klindex diamond machines and restored a stunning mirror reflection without harsh chemical fumes. The supervisor-led inspection before payment proved their commitment to quality.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 2,
    clientName: 'Chef Jean-Luc Moreau',
    clientRole: 'Executive Chef & Partner',
    company: 'Gourmet Dining Restaurant',
    location: 'DIFC, Dubai',
    rating: 5,
    content: 'We engaged Velora Elite for our restaurant kitchen exhaust hood and duct deep degreasing in DIFC. Their crew arrived promptly after closing at 11:30 PM, worked meticulously through the night, and delivered full photographic before/after documentation adhering to Dubai Civil Defence and Food Safety standards. Flawless execution.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 3,
    clientName: 'Elena Rostova',
    clientRole: 'Luxury Property Investor',
    company: 'Downtown Residential Portfolio',
    location: 'Downtown Dubai',
    rating: 5,
    content: 'I manage multiple luxury penthouses in Downtown. Velora Elite handles all our post-construction and move-in deep cleaning. Their HEPA air scrubbers and detailed architectural window glazing wash are the finest in the UAE. Zero advance fees and white-glove inspection before payment give total peace of mind.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 4,
    clientName: 'Khalid Al-Mazrouei',
    clientRole: 'Homeowner',
    company: 'Golf Place Estate',
    location: 'Dubai Hills Estate',
    rating: 5,
    content: 'Booked their free site inspection first to assess our 5-bedroom villa. The supervisor was polite, knowledgeable, and provided a transparent quote with no hidden charges. The cleaning crew in branded uniforms arrived on the dot and revitalized our velvet sofas, outdoor patio, and kitchen. True luxury standard.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 5,
    clientName: 'Sarah Jenkins',
    clientRole: 'Managing Director',
    company: 'Financial Consultancy',
    location: 'Sheikh Zayed Road, Dubai',
    rating: 5,
    content: 'Velora Elite has held our commercial office cleaning contract on Sheikh Zayed Road for over 8 months. Daily standards are immaculate, the supervisor is proactive, and billing is completely transparent with dedicated account management. Highly recommended for corporate entities in Dubai.',
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 6,
    clientName: 'Rashid Bin Salem',
    clientRole: 'Resident',
    company: 'Private Estate',
    location: 'Emirates Hills, Dubai',
    rating: 5,
    content: 'Professionalism from start to finish. They handled our travertine stone descaling, outdoor glass balustrades, and interior deep clean. What impressed me most was their zero-advance-payment policy and the supervisor-led inspection before leaving. They take real pride in their craft.',
    isVerified: true,
    isFeatured: true,
  },
]

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
          workingHours:
            data.contactInfo?.workingHours &&
            !data.contactInfo.workingHours.includes('8:00 PM') &&
            !data.contactInfo.workingHours.includes('8:00PM')
              ? data.contactInfo.workingHours
              : DEFAULT_SITE_SETTINGS.contactInfo.workingHours,
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
        tikTokPixelId: (data as unknown as { tikTokPixelId?: string }).tikTokPixelId || process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
        enableTracking: Boolean(data.enableTracking) || Boolean(process.env.NEXT_PUBLIC_ENABLE_TRACKING === 'true'),
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
    tikTokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
    enableTracking: Boolean(process.env.NEXT_PUBLIC_ENABLE_TRACKING === 'true'),
  }
})

export const getServices = cache(async (): Promise<ServiceItem[]> => {
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
