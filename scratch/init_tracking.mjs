import pg from 'pg';
const client = new pg.Client({ connectionString: 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres' });
async function main() {
  await client.connect();
  const check = await client.query('SELECT count(*) as count FROM tracking_settings');
  if (parseInt(check.rows[0].count, 10) === 0) {
    await client.query(`
      INSERT INTO tracking_settings (enable_tracking, created_at, updated_at)
      VALUES (true, NOW(), NOW())
    `);
    console.log('tracking_settings initialized with 1 default row.');
  } else {
    console.log('tracking_settings already has rows:', check.rows[0].count);
  }
  await client.end();
}
main().catch(console.error);
