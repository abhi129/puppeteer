const puppeteer = require('puppeteer');
const request = require('request');
//Take screenshot
(async () => {
  //Launch the puppeteer browser instance
  const browser = await puppeteer.launch();
  //Create the browser instance and navigate to url
  const page = await browser.newPage();
  await page.goto('https://bolster.ai/');
  //Take the screen shot
  await page.screenshot({ path: 'bolster.png' });
  await browser.close();
})();

//Get ip address
(async () => {
  //Launch the puppeteer browser instance
  const browser = await puppeteer.launch();
  //Create the browser instance and navigate to url
  const page = await browser.newPage();
  await page.goto('https://bolster.ai/');
  //This will get the hostname
  const hostname = new URL(page.url()).hostname;

  //This is used to get the ip address from hostname
  request(`http://${hostname}`, (error, response) => {
    const ip = response.headers['x-forwarded-for'] || response.socket.remoteAddress;
    console.log(ip);
  });
  await browser.close();
})();