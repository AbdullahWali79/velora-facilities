import { chromium } from 'playwright';

async function testWithSidebar() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
  });
  const page = await context.newPage();

  // Start next server
  await page.goto('http://localhost:3005/admin/login');
  await page.fill('input[type="email"], input[name="email"]', 'cloudspace559@gmail.com');
  await page.fill('input[type="password"], input[name="password"]', 'Cloud123@');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/admin');
  await page.waitForLoadState('networkidle');

  // If sidebar is collapsed, click the hamburger toggle button
  const toggleBtn = page.locator('button.nav-toggler, button[aria-label*="menu"], .nav-toggler');
  if (await toggleBtn.count() > 0) {
    console.log('Clicking sidebar toggle button to expand...');
    await toggleBtn.first().click();
    await page.waitForTimeout(1000);
  }

  const screenshotPath = 'C:/Users/premier/.gemini/antigravity/brain/758b4587-b5cf-4c29-8fe0-6668bdeef398/screenshots/redesign-02-sidebar-expanded.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Sidebar expanded screenshot saved to:', screenshotPath);

  await browser.close();
}

testWithSidebar().catch(console.error);
