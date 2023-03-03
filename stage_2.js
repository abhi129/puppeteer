const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to a website that will display your IP address
  await page.goto('https://www.whatismyip.com/');
  
  // Get your IP address from the website
  const ipAddress = await page.$eval('#ipv4', el => el.textContent.trim());
  
  // Get the ASN information using ipgeolocation.io API
  const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=${ipAddress}`);
  const asn = response.data.asn.asn;
  console.log(`ASN: ${asn}`);
  
  await browser.close();
})();