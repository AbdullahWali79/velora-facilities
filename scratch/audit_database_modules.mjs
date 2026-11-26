import pg from 'pg';

const connectionString = 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

async function auditDB() {
  const client = new pg.Client({ connectionString });
  await client.connect();
  console.log('--- DATABASE CONNECTION VERIFIED ---');

  // List all tables
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log('Tables in public schema:', tablesRes.rows.map(r => r.table_name));

  // Module check list
  const modules = [
    { name: 'Pages', table: 'pages' },
    { name: 'Services', table: 'services' },
    { name: 'Galleries', table: 'gallery' },
    { name: 'Testimonials', table: 'testimonials' },
    { name: 'Media', table: 'media' },
    { name: 'Users', table: 'users' },
    { name: 'Booking Requests', table: 'booking_requests' },
    { name: 'Quotation Requests', table: 'quote_requests' },
    { name: 'Contact Inquiries', table: 'contact_messages' },
    { name: 'Homepage & Banners', table: 'homepage' },
    { name: 'Company & Contact Info (Site Settings)', table: 'site_settings' },
    { name: 'Header & Navigation', table: 'header' },
    { name: 'Footer Content', table: 'footer' },
    { name: 'SEO, Tracking & Analytics', table: 'tracking_settings' },
  ];

  const results = [];

  for (const mod of modules) {
    try {
      const countRes = await client.query(`SELECT count(*) as count FROM "${mod.table}"`);
      const colRes = await client.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = '${mod.table}'
      `);
      results.push({
        module: mod.name,
        table: mod.table,
        status: 'CONNECTED',
        rowCount: parseInt(countRes.rows[0].count, 10),
        columnCount: colRes.rows.length,
        columns: colRes.rows.map(c => c.column_name),
      });
    } catch (err) {
      results.push({
        module: mod.name,
        table: mod.table,
        status: 'ERROR: ' + err.message,
        rowCount: 0,
        columnCount: 0,
        columns: [],
      });
    }
  }

  console.log('\n--- MODULE DATABASE AUDIT RESULTS ---');
  console.log(JSON.stringify(results, null, 2));

  // Check how Free Inspection requests are stored:
  const inspectionRes = await client.query(`
    SELECT * 
    FROM booking_requests 
    ORDER BY id DESC LIMIT 5
  `);
  console.log('\n--- RECENT BOOKING / INSPECTION REQUESTS ---');
  console.log(JSON.stringify(inspectionRes.rows, null, 2));

  const quoteInspection = await client.query(`
    SELECT * 
    FROM quote_requests 
    ORDER BY id DESC LIMIT 5
  `);
  console.log('\n--- RECENT QUOTE REQUESTS ---');
  console.log(JSON.stringify(quoteInspection.rows, null, 2));

  await client.end();
}

auditDB().catch(console.error);
