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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the HTTPS site
  await page.goto('https://www.whatismyip.com/');
  
  // Retrieve the SSL certificate details
  const certDetails = await page.evaluate(() => {
    const cert = window.performance.getEntriesByType("navigation")[0].serverTiming[0];
    const parsedCert = JSON.parse(cert.description);
    return {
      issuer: parsedCert.issuer,
      subject: parsedCert.subject,
      validFrom: parsedCert.valid_from,
      validTo: parsedCert.valid_to
    };
  });

  console.log(certDetails);

  await browser.close();
})();
