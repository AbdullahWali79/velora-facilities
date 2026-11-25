import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const APPROVED_SERVICES = [
  {
    title: 'Marble Polishing & Italian Crystallization',
    slug: 'marble-polishing',
    category: 'cleaning',
    order: 1,
    tagline: 'Italian Klindex diamond grinding, scratch removal & mirror crystallization',
    short_description: 'Premier restoration for Italian marble, onyx, travertine, and terrazzo floors across Dubai villas and luxury properties. Eliminates acid etching, traffic wear, and scratches.',
    features: [
      { title: 'Diamond Disk Grinding & Honing', description: 'Multi-grit sequential diamond grinding removing deep scratches, lippage, and surface stains' },
      { title: 'Italian Mirror Crystallization', description: 'Thermal reaction crystallization producing an impenetrable wet-look mirror gloss' },
      { title: 'Hydrophobic Sealant Impregnation', description: 'Deep-penetrating seal protecting delicate marble from coffee, oil, and citrus stains' },
      { title: 'Edge & Countertop Detailing', description: 'Hand-held diamond polishing for vanity counters, marble stairs, and bathroom walls' },
    ],
    faqs: [
      { question: 'Does your marble polishing use harsh acids?', answer: 'No. We use European diamond abrasives and pH-balanced Italian crystallization solutions that harden the calcium carbonate stone naturally without structural degradation.' },
      { question: 'Do you offer a free on-site inspection for marble?', answer: 'Yes! Our technical supervisor visits your property anywhere in Dubai to inspect the stone type, wear level, and test gloss levels before quoting.' }
    ]
  },
  {
    title: 'Kitchen Hood & Commercial Exhaust Duct Cleaning',
    slug: 'kitchen-hood-cleaning',
    category: 'cleaning',
    order: 2,
    tagline: 'Certified grease removal & fire risk mitigation adhering to Dubai Civil Defence standards',
    short_description: 'Certified extraction hood, grease filter, and horizontal/vertical duct degreasing for commercial restaurants and luxury residential show kitchens.',
    features: [
      { title: 'Exhaust Hood & Canopy Degreasing', description: 'Scraping and chemical dissolution of hardened carbon and grease deposits down to bare metal' },
      { title: 'Internal Duct Scraping & Washing', description: 'Access-panel insertion, mechanical brushing, and high-pressure steam cleaning of entire duct lines' },
      { title: 'Exhaust Fan & Blower Decontamination', description: 'Disassembly and degreasing of centrifugal fan blades to restore optimal airflow and eliminate motor strain' },
      { title: 'Inspection Certificate Issuance', description: 'Before-and-after photographic documentation and certified service report for municipal records' },
    ],
    faqs: [
      { question: 'How often should commercial kitchen ducts be cleaned in Dubai?', answer: 'According to Dubai Civil Defence and Municipality regulations, high-volume cooking operations require hood and duct degreasing every 3 to 6 months.' }
    ]
  },
  {
    title: 'Restaurant Deep Cleaning & Kitchen Sanitation',
    slug: 'restaurant-cleaning',
    category: 'cleaning',
    order: 3,
    tagline: 'Dubai Municipality hygiene compliance & commercial kitchen decontamination',
    short_description: 'Turnkey commercial kitchen and dining room deep cleaning for Dubai restaurants, hotels, cafes, and cloud kitchens. Guaranteed compliance with Dubai Food Safety standards.',
    features: [
      { title: 'Heavy Cookline Degreasing', description: 'High-temperature steam and food-safe chemical degreasing of fryers, flat-tops, ovens, and grills' },
      { title: 'Prep Station & Storage Sanitation', description: 'Complete decontamination of stainless steel tables, walk-in cold rooms, and dry storage' },
      { title: 'Kitchen Floor & Drain Flushing', description: 'Rotary machine scrubbing of non-slip tile flooring and biocidal drain degreasing' },
      { title: 'Dining Area & Furniture Detailing', description: 'Bespoke front-of-house detailing, banquet upholstery steam cleaning, and glass shine' },
    ],
    faqs: [
      { question: 'Can you work during restaurant closing hours?', answer: 'Yes. Our commercial teams operate 24/7 overnight shifts to clean thoroughly without disrupting regular service hours.' }
    ]
  },
  {
    title: 'Post-Construction Deep Cleaning & Handover',
    slug: 'post-construction-cleaning',
    category: 'cleaning',
    order: 4,
    tagline: 'Pristine architectural handover cleaning for newly renovated luxury properties',
    short_description: 'Intensive post-renovation and post-construction cleaning removing gypsum dust, paint splatters, silicone haze, and grout residues for flawless handover.',
    features: [
      { title: 'Airborne Micro-Dust HEPA Extraction', description: 'Negative air scrubbers and industrial HEPA vacuums clearing fine drywall and silica dust' },
      { title: 'Paint & Adhesive Splatter Removal', description: 'Safe non-abrasive lifting of paint overspray, grout haze, and protective tape residue from windows and joinery' },
      { title: 'Floor Scrubbing & Polishing', description: 'Single-disc rotary scrubbing of all tile, stone, and wood surfaces removing contractor residue' },
      { title: 'Architectural Glazing Wash', description: 'Interior and exterior streak-free window cleaning including track and frame vacuuming' },
    ],
    faqs: [
      { question: 'When should we schedule post-construction cleaning?', answer: 'Ideally after all contractors, painters, and snagging teams have finished their main work, 24 to 48 hours prior to furnishing or handover.' }
    ]
  },
  {
    title: 'Luxury Villa & Residence Deep Cleaning',
    slug: 'home-villa-cleaning',
    category: 'cleaning',
    order: 5,
    tagline: 'Precision cleaning tailored for luxury UAE villas and residences',
    short_description: 'Exhaustive top-to-bottom deep sanitization covering kitchen degreasing, bathroom steam descaling, tile grout scrubbing, and living area revitalization.',
    features: [
      { title: 'Living & Dining Room Detailing', description: 'Fine dusting, marble floor buffing, chandelier wipe-down, and architectural moldings' },
      { title: 'Kitchen Intensive Sanitization', description: 'Oven interior steam degreasing, extractor filter wash, and food-grade cabinet decontamination' },
      { title: 'Luxury Bathroom Steam Descaling', description: 'High-pressure thermodynamic steam descaling of marble walls, grout lines, and shower glass' },
      { title: 'Balcony & Terrace Pressure Wash', description: 'High-pressure wash for outdoor tiled verandas, balustrades, and patio furniture' },
    ],
    faqs: [
      { question: 'Are your cleaning products safe for marble and children?', answer: 'Yes. We utilize European eco-certified, non-toxic, and neutral pH solutions safe for fine stone, pets, and family members.' }
    ]
  },
  {
    title: 'Sofa, Rug & Upholstery Thermodynamic Steam Care',
    slug: 'sofa-carpet-cleaning',
    category: 'cleaning',
    order: 6,
    tagline: 'Deep injection-extraction shampooing and stain neutralization',
    short_description: 'Advanced restorative shampooing, hot water injection-extraction, and fabric revitalization for sofas, silk carpets, wool rugs, mattresses, and curtains.',
    features: [
      { title: 'Deep Extraction Shampooing', description: 'Industrial German injection-extraction lifting embedded grit and hair' },
      { title: 'Targeted Stain & Odor Treatment', description: 'Safe enzymatic neutralization of coffee, wine, and pet stains' },
      { title: 'Fabric & Leather Conditioning', description: 'Bespoke care for linen, velvet, nubuck, and genuine Italian leather' },
      { title: 'Rapid Moisture Extraction', description: 'Fast drying turnaround suitable for immediate living comfort' },
    ],
    faqs: [
      { question: 'How long does sofa and carpet drying take?', answer: 'With our high-velocity moisture extraction units, fabrics dry fully within 2 to 4 hours in climate-controlled indoor environments.' }
    ]
  }
];

async function sync() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Update site_settings working hours
    console.log('1. Updating site_settings working hours...');
    const resSettings = await client.query(`
      UPDATE site_settings 
      SET 
        contact_info_working_hours = 'Monday – Saturday: 8:00 AM – 6:00 PM',
        updated_at = NOW()
      WHERE id = 1
      RETURNING id, contact_info_working_hours;
    `);
    console.log('Updated site_settings:', resSettings.rows);

    // 2. Adjust legacy services orders to 10+
    console.log('2. Adjusting legacy services orders...');
    await client.query(`
      UPDATE services 
      SET "order" = "order" + 10, updated_at = NOW()
      WHERE slug NOT IN ('home-villa-cleaning', 'sofa-carpet-cleaning', 'marble-polishing', 'kitchen-hood-cleaning', 'restaurant-cleaning', 'post-construction-cleaning');
    `);

    // 3. Upsert the 6 approved services
    console.log('3. Upserting the 6 approved services...');
    for (const s of APPROVED_SERVICES) {
      // Check if service exists by slug
      const existing = await client.query('SELECT id FROM services WHERE slug = $1;', [s.slug]);
      let serviceId;

      if (existing.rows.length > 0) {
        serviceId = existing.rows[0].id;
        console.log(`Updating existing service ${s.slug} (id: ${serviceId})...`);
        await client.query(`
          UPDATE services
          SET 
            title = $1,
            category = $2,
            "order" = $3,
            tagline = $4,
            short_description = $5,
            pricing_price_unit = 'custom_quote',
            is_featured = true,
            updated_at = NOW()
          WHERE id = $6;
        `, [s.title, s.category, s.order, s.tagline, s.short_description, serviceId]);
      } else {
        console.log(`Inserting new service ${s.slug}...`);
        const insertRes = await client.query(`
          INSERT INTO services (
            title, slug, category, "order", tagline, short_description,
            pricing_price_unit, is_featured, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, 'custom_quote', true, NOW(), NOW()
          ) RETURNING id;
        `, [s.title, s.slug, s.category, s.order, s.tagline, s.short_description]);
        serviceId = insertRes.rows[0].id;
      }

      // Upsert features
      await client.query('DELETE FROM services_features WHERE _parent_id = $1;', [serviceId]);
      for (let i = 0; i < s.features.length; i++) {
        const f = s.features[i];
        const featId = `${s.slug.slice(0, 10)}_${i + 1}`;
        await client.query(`
          INSERT INTO services_features (_order, _parent_id, id, title, description)
          VALUES ($1, $2, $3, $4, $5);
        `, [i + 1, serviceId, featId, f.title, f.description]);
      }

      // Upsert FAQs
      await client.query('DELETE FROM services_faqs WHERE _parent_id = $1;', [serviceId]);
      for (let i = 0; i < s.faqs.length; i++) {
        const faq = s.faqs[i];
        const faqId = `faq_${s.slug.slice(0, 8)}_${i + 1}`;
        await client.query(`
          INSERT INTO services_faqs (_order, _parent_id, id, question, answer)
          VALUES ($1, $2, $3, $4, $5);
        `, [i + 1, serviceId, faqId, faq.question, faq.answer]);
      }
    }

    await client.query('COMMIT');
    console.log('Database synchronization completed successfully!');

    // Verify resulting services
    const finalServices = await client.query('SELECT id, title, slug, category, "order" FROM services ORDER BY "order" ASC, id ASC;');
    console.log('\nFinal Services in DB:');
    console.table(finalServices.rows);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed, rolled back:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

sync();
