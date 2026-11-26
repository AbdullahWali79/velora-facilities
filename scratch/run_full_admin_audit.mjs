import { chromium } from 'playwright';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/premier/.gemini/antigravity/brain/758b4587-b5cf-4c29-8fe0-6668bdeef398/screenshots';

async function runAudit() {
  console.log('--- STARTING PLAYWRIGHT ADMIN AUDIT ---');
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // 1. Login
  console.log('Navigating to admin login...');
  await page.goto('https://veloraelite.ae/admin/login', { waitUntil: 'networkidle', timeout: 45000 });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-00-login.png') });

  console.log('Entering credentials...');
  await page.fill('input[type="email"], input[name="email"]', 'cloudspace559@gmail.com');
  await page.fill('input[type="password"], input[name="password"]', 'Cloud123@');
  await page.click('button[type="submit"]');

  console.log('Waiting for navigation to dashboard...');
  await page.waitForURL('**/admin', { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-01-dashboard.png') });
  console.log('Dashboard screenshot captured.');

  const modules = [
    { name: 'Pages', path: '/admin/collections/pages', file: 'audit-02-pages.png' },
    { name: 'Services', path: '/admin/collections/services', file: 'audit-03-services.png' },
    { name: 'Galleries', path: '/admin/collections/gallery', file: 'audit-04-galleries.png' },
    { name: 'Testimonials', path: '/admin/collections/testimonials', file: 'audit-05-testimonials.png' },
    { name: 'Media', path: '/admin/collections/media', file: 'audit-06-media.png' },
    { name: 'Users', path: '/admin/collections/users', file: 'audit-07-users.png' },
    { name: 'User Edit & Password Form', path: '/admin/collections/users/1', file: 'audit-07b-user-edit-password.png' },
    { name: 'Booking Requests', path: '/admin/collections/booking-requests', file: 'audit-08-booking-requests.png' },
    { name: 'Quotation Requests', path: '/admin/collections/quote-requests', file: 'audit-09-quote-requests.png' },
    { name: 'Contact Inquiries', path: '/admin/collections/contact-messages', file: 'audit-10-contact-inquiries.png' },
    { name: 'Homepage & Banners', path: '/admin/globals/homepage', file: 'audit-11-homepage.png' },
    { name: 'Company & Contact Info', path: '/admin/globals/site-settings', file: 'audit-12-site-settings.png' },
    { name: 'Header & Navigation', path: '/admin/globals/header', file: 'audit-13-header.png' },
    { name: 'Footer Content', path: '/admin/globals/footer', file: 'audit-14-footer.png' },
    { name: 'SEO & Tracking Settings', path: '/admin/globals/tracking-settings', file: 'audit-15-tracking-settings.png' },
  ];

  const auditResults = [];

  for (const mod of modules) {
    try {
      console.log(`Auditing module: ${mod.name} (${mod.path})...`);
      await page.goto(`https://veloraelite.ae${mod.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      // Give UI 1.5s to stabilize any client-rendered rich tables
      await page.waitForTimeout(1500);
      const screenshotPath = path.join(SCREENSHOTS_DIR, mod.file);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const title = await page.title();
      const contentSnippet = await page.evaluate(() => {
        const h1 = document.querySelector('h1')?.innerText || '';
        const bodyText = document.body.innerText.substring(0, 300).replace(/\n+/g, ' ');
        return { h1, bodyText };
      });

      auditResults.push({
        module: mod.name,
        path: mod.path,
        screenshot: mod.file,
        status: 'SUCCESS',
        title,
        heading: contentSnippet.h1,
      });
      console.log(`✓ ${mod.name} captured successfully.`);
    } catch (err) {
      console.error(`✗ Failed auditing ${mod.name}: ${err.message}`);
      auditResults.push({
        module: mod.name,
        path: mod.path,
        screenshot: mod.file,
        status: 'FAILED: ' + err.message,
      });
    }
  }

  // Check search & filters on Quote Requests
  console.log('Testing search and filter on Quote Requests...');
  try {
    await page.goto('https://veloraelite.ae/admin/collections/quote-requests', { waitUntil: 'networkidle' });
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('Regression');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-09b-quote-search-filter.png') });
      console.log('✓ Quote search filter tested and captured.');
    }
  } catch (err) {
    console.warn('Search test error:', err.message);
  }

  console.log('\n--- AUDIT RUN COMPLETED ---');
  console.log(JSON.stringify(auditResults, null, 2));

  await browser.close();
}

runAudit().catch(err => {
  console.error('Fatal audit runner error:', err);
  process.exit(1);
});
