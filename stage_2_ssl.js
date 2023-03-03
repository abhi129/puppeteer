const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the IP address
  await page.goto('https://www.google.com/');
  const securityDetails = await page.target('Security.getSecurityState');
  console.log(securityDetails);
  await browser.close();
})();
