import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    const bRows = await pool.query('SELECT * FROM booking_requests LIMIT 5;');
    console.log('booking_requests count:', bRows.rows.length);
    if (bRows.rows.length > 0) console.log(bRows.rows);

    const cRows = await pool.query('SELECT * FROM contact_messages LIMIT 5;');
    console.log('contact_messages count:', cRows.rows.length);
    if (cRows.rows.length > 0) console.log(cRows.rows);

    const qRows = await pool.query('SELECT id, full_name, phone, email, details, created_at FROM quote_requests;');
    console.log('quote_requests count:', qRows.rows.length);
    console.table(qRows.rows);

  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    await pool.end();
  }
}

main();
