const puppeteer = require('puppeteer');
const request = require('request');

(async () => {
    //Launch the puppeteer browser instance
    const browser = await puppeteer.launch();
    //Create the browser instance and navigate to url
    const page = await browser.newPage();
    //Get the source and destination in case of redirect
    await page.goto('https://www.google.com/');

    page.on('response', response => {
        const status = response.status()
        if ((status >= 300) && (status <= 399)) {
          console.log('Redirect from', response.url(), 'to', response.headers()['location'])
        }
    });
    // //Wait for the response
    // const response = await page.waitForResponse(response => response.url() === 'https://bolster.ai/');
  
    // hostname = new URL(response.url()).hostname;
  
    // //This is used to get the ip address from hostname
    // request(`http://${hostname}`, (error, response) => {
    //   const ip = response.headers['x-forwarded-for'] || response.socket.remoteAddress;
    //   console.log(ip);
    // });
  
    await browser.close();
  })();