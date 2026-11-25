import { chromium } from 'playwright';

async function testValidation() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/quote', { waitUntil: 'networkidle' });

  const fnValid = await page.$eval('input[name="fullName"]', el => el.validity.valid);
  const fnRequired = await page.$eval('input[name="fullName"]', el => el.required);
  const phValid = await page.$eval('input[name="phone"]', el => el.validity.valid);
  const phRequired = await page.$eval('input[name="phone"]', el => el.required);
  const emValid = await page.$eval('input[name="email"]', el => el.validity.valid);
  const emRequired = await page.$eval('input[name="email"]', el => el.required);

  console.log('DOM Validation Attributes:');
  console.log(`fullName: required=${fnRequired}, initiallyValid=${fnValid}`);
  console.log(`phone: required=${phRequired}, initiallyValid=${phValid}`);
  console.log(`email: required=${emRequired}, initiallyValid=${emValid}`);

  await browser.close();
}

testValidation().catch(console.error);
