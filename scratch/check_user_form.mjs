import { chromium } from 'playwright';

async function checkUserForm() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://veloraelite.ae/admin/login');
  await page.fill('input[type="email"], input[name="email"]', 'cloudspace559@gmail.com');
  await page.fill('input[type="password"], input[name="password"]', 'Cloud123@');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin');
  await page.goto('https://veloraelite.ae/admin/collections/users/1');
  await page.waitForLoadState('networkidle');

  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
      name: el.getAttribute('name'),
      type: el.getAttribute('type'),
      id: el.getAttribute('id'),
      placeholder: el.getAttribute('placeholder'),
      value: el.getAttribute('value') || el.value,
      label: el.closest('.field-type, .field')?.querySelector('label')?.innerText || ''
    }));
  });
  console.log('User Form Inputs:', JSON.stringify(inputs, null, 2));

  // Also check if there is an explicit "Change Password" or "Reset Password" button/section
  const buttonsAndLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href'),
      class: el.className
    })).filter(b => b.text.toLowerCase().includes('password') || b.text.toLowerCase().includes('save') || b.text.toLowerCase().includes('edit'));
  });
  console.log('Relevant Buttons/Links:', JSON.stringify(buttonsAndLinks, null, 2));

  // Click Change Password button
  const changePasswordBtn = page.locator('button:has-text("Change Password")');
  if (await changePasswordBtn.count() > 0) {
    console.log('Clicking Change Password button...');
    await changePasswordBtn.click();
    await page.waitForTimeout(1000);

    const modalInputs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
        name: el.getAttribute('name'),
        type: el.getAttribute('type'),
        id: el.getAttribute('id'),
        placeholder: el.getAttribute('placeholder'),
        label: el.closest('.field-type, .field')?.querySelector('label')?.innerText || ''
      }));
    });
    console.log('Inputs after clicking Change Password:', JSON.stringify(modalInputs, null, 2));

    await page.screenshot({ path: 'C:/Users/premier/.gemini/antigravity/brain/758b4587-b5cf-4c29-8fe0-6668bdeef398/screenshots/audit-07c-change-password-modal.png' });
    console.log('Password modal screenshot captured.');
  }

  await browser.close();
}

checkUserForm().catch(console.error);
