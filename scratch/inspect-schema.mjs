import pg from 'pg';
const pool = new pg.Pool({
  connectionString: 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});
async function inspect() {
  const cols = await pool.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'services' ORDER BY ordinal_position;");
  console.log('Services Columns:');
  console.table(cols.rows);

  const features = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'services_features';");
  console.log('\nServices Features Columns:');
  console.table(features.rows);

  const faqs = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'services_faqs';");
  console.log('\nServices FAQs Columns:');
  console.table(faqs.rows);

  await pool.end();
}
inspect();

async function inspectEnums() {
  const enums = await pool.query("SELECT e.enumlabel FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname LIKE '%category%';");
  console.log('Category Enums:', enums.rows.map(r => r.enumlabel));
  const units = await pool.query("SELECT e.enumlabel FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname LIKE '%price_unit%';");
  console.log('Price Unit Enums:', units.rows.map(r => r.enumlabel));
}
inspectEnums();
