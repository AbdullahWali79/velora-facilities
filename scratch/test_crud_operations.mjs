import pg from 'pg';

const connectionString = 'postgresql://postgres.belrfdsxtlxlahtqnwes:Abdullahwali123%40@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

async function testCRUD() {
  console.log('--- STARTING SAFE CRUD VERIFICATION ---');
  const client = new pg.Client({ connectionString });
  await client.connect();

  const testPayload = {
    full_name: 'QA Audit Disposable Test',
    email: 'qa-audit-test@veloraelite.ae',
    phone: '+971 50 000 0000',
    subject: '[AUDIT-TEST] Temporary CRUD Verification',
    message: 'Testing Create, Read, Update, Delete in a safe, disposable transaction.',
    status: 'unread',
  };

  // 1. CREATE
  console.log('1. Executing CREATE (INSERT)...');
  const insertRes = await client.query(`
    INSERT INTO contact_messages (full_name, email, phone, subject, message, status, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    RETURNING id, full_name, status, created_at
  `, [testPayload.full_name, testPayload.email, testPayload.phone, testPayload.subject, testPayload.message, testPayload.status]);
  const newId = insertRes.rows[0].id;
  console.log(`✓ Record created with ID: ${newId}`);

  // 2. READ
  console.log('2. Executing READ (SELECT)...');
  const readRes = await client.query(`SELECT id, full_name, subject, status FROM contact_messages WHERE id = $1`, [newId]);
  console.log(`✓ Record read:`, readRes.rows[0]);

  // 3. UPDATE
  console.log('3. Executing UPDATE...');
  const updateRes = await client.query(`
    UPDATE contact_messages 
    SET status = 'resolved', updated_at = NOW() 
    WHERE id = $1 
    RETURNING id, status, updated_at
  `, [newId]);
  console.log(`✓ Record updated:`, updateRes.rows[0]);

  // 4. DELETE
  console.log('4. Executing DELETE...');
  const deleteRes = await client.query(`DELETE FROM contact_messages WHERE id = $1 RETURNING id`, [newId]);
  console.log(`✓ Record deleted: ID ${deleteRes.rows[0].id}`);

  // Verify deletion
  const verifyRes = await client.query(`SELECT count(*) as count FROM contact_messages WHERE id = $1`, [newId]);
  console.log(`✓ Verified cleanup (count should be 0): ${verifyRes.rows[0].count}`);

  await client.end();
  console.log('--- CRUD VERIFICATION COMPLETED SAFELY ---');
}

testCRUD().catch(console.error);
