const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;

async function scrapeData() {
  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the web page
  await page.goto('https://www.google.com/');

  // Extract the data
  const data = await page.evaluate(() => {
    // Extract the data from the web page and return it
    const title = document.querySelector('title').innerText;
    const description = document.querySelector('meta[name="description"]').getAttribute('content');
    return { title, description };
  });

  // Convert data to JSON format
  const jsonData = JSON.stringify(data);

  console.log()

//   // Connect to MongoDB database
//   const client = await MongoClient.connect('mongodb://localhost:27017');
//   const db = client.db('mydatabase');

//   // Insert data into the database
//   const result = await db.collection('mycollection').insertOne(JSON.parse(jsonData));

  // Close the database connection
  client.close();

  // Close Puppeteer
  await browser.close();
}

scrapeData();
