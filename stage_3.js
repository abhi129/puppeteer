const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  const pageSource = await page.content();
  console.log(pageSource);
  const textContent = await page.evaluate(() => {
    return document.body.textContent;
  });
  console.log(textContent);
  await browser.close();
})();

