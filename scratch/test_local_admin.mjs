import { chromium } from 'playwright';
import path from 'path';

async function captureRedesign() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to local admin...');
  await page.goto('http://localhost:3005/admin/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'C:/Users/premier/.gemini/antigravity/brain/758b4587-b5cf-4c29-8fe0-6668bdeef398/screenshots/redesign-00-login.png' });
  console.log('Login screenshot taken.');

  console.log('Logging in...');
  await page.fill('input[type="email"], input[name="email"]', 'cloudspace559@gmail.com');
  await page.fill('input[type="password"], input[name="password"]', 'Cloud123@');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/admin', { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const screenshotPath = 'C:/Users/premier/.gemini/antigravity/brain/758b4587-b5cf-4c29-8fe0-6668bdeef398/screenshots/redesign-01-dashboard.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Redesigned dashboard screenshot captured at:', screenshotPath);

  await browser.close();
}

captureRedesign().catch(console.error);
