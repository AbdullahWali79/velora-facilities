import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function backup() {
  try {
    const siteSettings = await pool.query('SELECT * FROM site_settings;');
    const services = await pool.query('SELECT * FROM services ORDER BY id;');
    const quoteRequests = await pool.query('SELECT * FROM quote_requests ORDER BY id;');
    const bookingRequests = await pool.query('SELECT * FROM booking_requests ORDER BY id;');

    const backupData = {
      timestamp: new Date().toISOString(),
      site_settings: siteSettings.rows,
      services: services.rows,
      quote_requests: quoteRequests.rows,
      booking_requests: bookingRequests.rows,
    };

    fs.writeFileSync('scratch/backup_pre_fix.json', JSON.stringify(backupData, null, 2), 'utf8');
    console.log('Successfully backed up database tables to scratch/backup_pre_fix.json');

    // Create SQL rollback file
    const rollbackSql = `
-- ROLLBACK SCRIPT FOR VELORA ELITE DATABASE FIXES
-- Generated at ${new Date().toISOString()}

UPDATE site_settings 
SET contact_info_working_hours = 'Monday – Saturday: 8:00 AM – 8:00 PM'
WHERE id = 1;

-- To restore legacy services order or state:
-- See scratch/backup_pre_fix.json for complete row copies.
`;
    fs.writeFileSync('scratch/rollback.sql', rollbackSql, 'utf8');
    console.log('Successfully generated scratch/rollback.sql');

  } catch (err) {
    console.error('Backup failed:', err);
  } finally {
    await pool.end();
  }
}

backup();
