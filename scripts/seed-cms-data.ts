import fs from 'fs'
import path from 'path'

for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), envFile)
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim()
          let val = trimmed.slice(eqIdx + 1).trim()
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1)
          }
          if (!process.env[key]) {
            process.env[key] = val
          }
        }
      }
    }
  }
}

import { getPayload } from 'payload'

async function seed() {
  console.log('Connecting to Payload CMS & PostgreSQL database...')
  console.log('DATABASE_URI is:', process.env.DATABASE_URI ? 'FOUND (length ' + process.env.DATABASE_URI.length + ')' : 'MISSING')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  console.log('\n--- 1. SEEDING PAGES COLLECTION ---')
  const pagesData = [
    {
      title: 'Home',
      slug: 'home',
      heroHeading: 'A Higher Standard of Clean for Luxury UAE Properties',
      heroSubheading:
        'European-standard home & villa cleaning, hospital-grade deep sanitization, and technical facility care across Dubai and the UAE. Headquartered at Aspin Commercial Tower, Sheikh Zayed Road.',
    },
    {
      title: 'About Us',
      slug: 'about',
      heroHeading: 'Excellence, Integrity & A Higher Standard of Clean',
      heroSubheading:
        'Velora Elite Technical Services L.L.C. was founded to set the gold standard in cleaning and maintenance across Dubai. Stationed on Sheikh Zayed Road, we deliver unmatched care for premium villas, residences, and executive offices.',
    },
    {
      title: 'Services Catalog',
      slug: 'services',
      heroHeading: 'Specialized Cleaning & Technical Services',
      heroSubheading:
        'A Higher Standard of Clean for luxury villas, residential communities, and executive corporate offices across Dubai.',
    },
    {
      title: 'Transformation Gallery',
      slug: 'gallery',
      heroHeading: 'Before & After Transformation Gallery',
      heroSubheading:
        'Real documented results across Palm Jumeirah, Emirates Hills, Downtown Dubai, and Dubai Hills. Witness the Velora Elite standard.',
    },
    {
      title: 'Request a Quote',
      slug: 'quote',
      heroHeading: 'Request a Custom Quotation',
      heroSubheading:
        'Provide your property details and service scope below. An estimator from Velora Elite will calculate your transparent proposal within 2 business hours.',
    },
    {
      title: 'Book Online',
      slug: 'book',
      heroHeading: 'Schedule a Service Appointment',
      heroSubheading:
        'Select your service, preferred appointment date, and time slot. Our Velora Elite scheduling coordinator will manually confirm your technician team.',
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      heroHeading: 'Connect with Velora Elite',
      heroSubheading:
        'Our scheduling desk and client relations team are available 6 days a week to support your residential, villa, and corporate cleaning requirements.',
    },
  ]

  for (const page of pagesData) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'pages',
        data: page,
      })
      console.log(`✓ Created page: "${created.title}" (slug: ${created.slug})`)
    } else {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: page,
      })
      console.log(`✓ Updated page: "${page.title}" (slug: ${page.slug})`)
    }
  }

  console.log('\n--- 2. SEEDING SERVICES COLLECTION (6 OFFICIAL FLYER SERVICES) ---')
  const servicesData = [
    {
      title: 'Home & Villa Cleaning',
      slug: 'home-villa-cleaning',
      category: 'cleaning' as const,
      tagline: 'Meticulous sanitation for luxury villas and residences',
      shortDescription:
        'Comprehensive, European-protocol deep sanitization for villas, townhouses, and luxury apartments across Dubai. Safe for children, pets, and fine luxury finishes.',
      features: [
        { title: 'Full Villa Sanitization', description: 'Steam disinfection of kitchens, washrooms, living areas, and terraces' },
        { title: 'Fine Finish Surface Protection', description: 'Neutral pH eco-certified solutions for marble, travertine, and hardwood' },
        { title: 'Allergen & Dust Extraction', description: 'HEPA filtered machinery eliminating indoor desert particulates' },
        { title: 'Punctual Dispatch Guarantee', description: 'Experienced, vetted in-house staff with supervisor quality audit' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Deep Cleaning Services',
      slug: 'deep-cleaning',
      category: 'cleaning' as const,
      tagline: 'Intensive restorative decontamination for residential & commercial spaces',
      shortDescription:
        'Hospital-grade intensive restoration designed to eliminate embedded dirt, grease, mold, and airborne dust throughout the property.',
      features: [
        { title: 'High-Temperature Steam Vapor', description: '300°F dry steam sanitization for tile grout, silicone seals, and drains' },
        { title: 'Degreasing & Kitchen Canopy', description: 'Kitchen extractor exhaust hood degreasing and appliance detailing' },
        { title: 'Heavy Limescale Dissolution', description: 'Restoration of tempered shower glass, bathroom ceramics, and fittings' },
        { title: 'Pre-Occupancy Sterilization', description: 'Total surface decontamination prior to moving in' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Office Cleaning & Commercial Care',
      slug: 'office-cleaning',
      category: 'commercial' as const,
      tagline: 'Discreet, high-standard maintenance for offices, retail & clinics',
      shortDescription:
        'Flexible after-hours or daytime facility care for corporate offices, executive suites, boutiques, clinics, and commercial premises across Dubai.',
      features: [
        { title: 'High-Touch Zone Sterilization', description: 'Antimicrobial wipe-downs of biometric scanners, handles, and desks' },
        { title: 'After-Hours Flexible Scheduling', description: 'Zero disruption to corporate operations and client confidentiality' },
        { title: 'Floor Buffing & Reception Detailing', description: 'Polished welcome lobbies, marble care, and spotless meeting rooms' },
        { title: 'B2B SLAs & Monthly Invoicing', description: 'Standardized service level agreements with dedicated account managers' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Move-In & Move-Out Cleaning',
      slug: 'move-in-move-out',
      category: 'cleaning' as const,
      tagline: 'Guaranteed inspection-ready handover cleaning for tenants & landlords',
      shortDescription:
        'Turnkey handover cleaning designed to secure full security deposit returns and prepare properties for immediate, pristine occupancy.',
      features: [
        { title: 'Interior Wardrobe & Cabinet Detailing', description: 'Thorough vacuuming and wipe down of all storage units inside and out' },
        { title: 'Residue & Scuff Removal', description: 'Safe removal of light contractor residues, tape marks, and scuffs' },
        { title: 'Floor Rotary Machine Polishing', description: 'Machine scrub and buff for marble, tile, and parquet surfaces' },
        { title: 'Handover Certification Checklist', description: 'Structured audit aligned with major UAE real estate agency standards' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 4,
    },
    {
      title: 'Glass & Window Cleaning',
      slug: 'glass-window-cleaning',
      category: 'maintenance' as const,
      tagline: 'Crystal-clear architectural glass and facade wash',
      shortDescription:
        'Professional streak-free window cleaning, frame restoration, glass balcony washing, and facade care for residential villas and commercial buildings.',
      features: [
        { title: 'Interior & Exterior Window Washing', description: 'Streak-free pure water cleaning for floor-to-ceiling glass panels' },
        { title: 'Frame & Track Detailing', description: 'Deep vacuuming and scrubbing of sliding tracks, rubber gaskets, and sills' },
        { title: 'Balcony Glass Balustrade Cleaning', description: 'Removal of sand, dust buildup, and mineral water spots' },
        { title: 'Hard Water Spot Removal', description: 'Specialized mineral stain lifting safe for tinted and double-glazed glass' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 5,
    },
    {
      title: 'Sofa & Carpet Cleaning',
      slug: 'sofa-carpet-cleaning',
      category: 'commercial' as const,
      tagline: 'Deep injection-extraction shampooing and stain neutralization',
      shortDescription:
        'Advanced restorative shampooing, hot water injection-extraction, and fabric revitalization for sofas, silk carpets, wool rugs, mattresses, and curtains.',
      features: [
        { title: 'Deep Extraction Shampooing', description: 'Industrial German injection-extraction lifting embedded grit and hair' },
        { title: 'Targeted Stain & Odor Treatment', description: 'Safe enzymatic neutralization of coffee, wine, and pet stains' },
        { title: 'Fabric & Leather Conditioning', description: 'Bespoke care for linen, velvet, nubuck, and genuine Italian leather' },
        { title: 'Rapid Moisture Extraction', description: 'Fast drying turnaround suitable for immediate living comfort' },
      ],
      pricing: { startingPrice: null, priceUnit: 'custom_quote' as const },
      isFeatured: true,
      order: 6,
    },
  ]

  for (const s of servicesData) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'services',
        data: s,
      })
      console.log(`✓ Created service: "${created.title}" (slug: ${created.slug})`)
    } else {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: s,
      })
      console.log(`✓ Updated service: "${s.title}" (slug: ${s.slug})`)
    }
  }

  console.log('\n--- 3. SEEDING GLOBALS ---')

  // 3A. Homepage Global
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
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
        { title: 'Licensed Dubai Operations', subtitle: 'VELORA ELITE TECHNICAL SERVICES L.L.C.' },
        { title: '100% In-House Technicians', subtitle: 'Visa-sponsored & background vetted' },
        { title: 'Hospital-Grade Sanitization', subtitle: 'Eco-certified child & pet safe chemistry' },
        { title: 'Zero Advance Online Fees', subtitle: 'Pay only upon supervisor inspection' },
      ],
      stats: [
        { number: '100%', label: 'Vetted UAE Staff' },
        { number: '< 2 Hrs', label: 'Emergency Response' },
        { number: 'Dubai Hub', label: 'Sheikh Zayed Road' },
        { number: '0 AED', label: 'Online Advance Fee' },
      ],
      ctaBanner: {
        heading: 'A Higher Standard of Clean For Your Home & Business',
        description:
          'Connect with our Dubai team for a bespoke cleaning plan or immediate booking confirmation. We guarantee punctual arrival and flawless execution.',
        buttonText: 'Schedule Your Appointment',
        buttonUrl: '/book',
      },
    },
  })
  console.log('✓ Seeded Global: Homepage & Banners')

  // 3B. Site Settings Global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Velora Elite',
      tagline: 'A Higher Standard of Clean',
      contactInfo: {
        phonePrimary: '04 579 2137',
        whatsappNumber: '+971 55 675 1854',
        email: 'info@veloraelite.ae',
        supportEmail: 'info@veloraelite.ae',
        address: 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai, UAE',
        workingHours: 'Monday – Saturday: 8:00 AM – 8:00 PM',
        googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786221193375!2d55.2721867!3d25.2157522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428ce0a9f5c1%3A0x6b4cf99863c33dc6!2sAspin%20Commercial%20Tower!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae',
      },
      socialMedia: {
        instagram: 'https://instagram.com/veloraelite',
        facebook: 'https://facebook.com/veloraelite',
        tiktok: 'https://tiktok.com/@veloraelite',
      },
    },
  })
  console.log('✓ Seeded Global: Company & Contact Info')

  // 3C. Header Global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Gallery', url: '/gallery' },
        { label: 'Request a Quote', url: '/quote' },
        { label: 'Book Online', url: '/book' },
        { label: 'Contact Us', url: '/contact' },
      ],
      ctaButton: {
        text: 'Book Now',
        url: '/book',
      },
    },
  })
  console.log('✓ Seeded Global: Header & Navigation')

  // 3D. Footer Global
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      aboutSummary:
        'Velora Elite Technical Services L.L.C. delivers European-standard residential and commercial cleaning, deep sanitization, and technical services across Dubai and the UAE. Committed to precision, vetted professionals, and a higher standard of clean.',
      copyright:
        '© 2026 Velora Elite Technical Services L.L.C. All rights reserved. Registered & Licensed in Dubai, United Arab Emirates.',
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
          title: 'Dubai Service Areas',
          links: [
            { label: 'Downtown & Business Bay', url: '/services' },
            { label: 'Sheikh Zayed Rd & DIFC', url: '/services' },
            { label: 'Palm Jumeirah & Emirates Hills', url: '/services' },
            { label: 'Dubai Marina & JBR', url: '/services' },
            { label: 'Dubai Hills & Arabian Ranches', url: '/services' },
          ],
        },
      ],
    },
  })
  console.log('✓ Seeded Global: Footer Content')

  console.log('\n==========================================')
  console.log('ALL CMS COLLECTIONS & GLOBALS SYNCED 100%!')
  console.log('==========================================\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
