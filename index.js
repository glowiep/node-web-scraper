// @ts-nocheck
const axios = require('axios');
const cheerio = require('cheerio');

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
  const title = $('head > title').text();
  console.log(`Title: ${title}`);

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
}

// Invoke the scraper function
scrapeData();