// @ts-nocheck
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// URL of website to scrape
const url = 'https://boxingontario.com/clubs/club-directory/'

// Function to fetch the HTML of the page
async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`)
  }
}

// Function to parse the HTML and extract data
async function scrapeData() {
  const html = await fetchHTML(url);
  if (!html) {
    return;
  }

  const $ = cheerio.load(html);

  // Extract title of page
  // const title = $('head > title').text();
  // console.log(`Title: ${title}`);

  // Extract all links on the page
  // $('a').each((index, element) => {
  //   const link = $(element).attr('href');
  //   console.log(`Link ${index + 1}: ${link}`);
  // });

  // Extract all Club names
  // const clubTitle = $('.club-title').text();
  // console.log(`Club Name: ${clubTitle} \r`)
  $('.club-title').each((index, element) => {
    const club = $(element).text();
    console.log(club)
  })
  // $('.club-title').each((index, element) => {
    
  // })
  const urlTest = $('a[class=view-club]').attr('href');
  console.log(urlTest)

}

// Invoke the scraper function
// scrapeData();


async function testFetch(url) {
  try {

    // Launch puppeteer
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
  
    // Go to the initial page
    await page.goto(url);
  
    // Wait for the button then click it
    await page.waitForSelector('.view-club')
    await page.click('.view-club');

    // Wait for the new page/tab to open
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    const newPage = await newPagePromise;

    await newPage.waitForSelector('.club-info');

    // Get the HTML content of the page
    const content = await newPage.content();
    
    // Load the HTML into Cheerio
    const $ = cheerio.load(content);
  
    // Scrape data from the new page
    const data = $('.club-info').html();
    console.log(data);

    // Close the browser
    await browser.close();  
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`)
  }
}

testFetch();