const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to GitHub login page
  await page.goto('https://github.com/login');

  // Enter login credentials and submit form
  await page.type('#login_field', 'your-username');
  await page.type('#password', 'your-password');
  await page.click('[name="commit"]');

  // Wait for page to load
  await page.waitForNavigation();

  // Check if 2FA is required
  if (page.url().startsWith('https://github.com/sessions/verified-device')) {
    await page.goto('https://github.com/sessions/two-factor/recovery');
  }

  // Take a screenshot of the repository page
  await page.screenshot({ path: 'screenshot.png' });

  // Close the browser
  await browser.close();
}

run();
