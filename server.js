const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/', async (req, res) => {
  const now = new Date();
  const estOffset = -4 * 60;
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const estMinutes = utcMinutes + estOffset;

  const morningStart = 7 * 60 + 30;
  const morningEnd = 8 * 60 + 15;
  const afternoonStart = 14 * 60 + 45;
  const afternoonEnd = 15 * 60 + 15;

  let targetUrl = "https://www.qwickly.tools/attendance/login/frisch/";

  if (estMinutes >= morningStart && estMinutes <= morningEnd) {
    targetUrl = "https://www.qwickly.tools/attendance/takerecord/?request_lms=Veracross&id=9983&domain=www.frisch.org&initial_request='initial'";
  } else if (estMinutes >= afternoonStart && estMinutes <= afternoonEnd) {
    targetUrl = "https://www.qwickly.tools/attendance/takerecord/?request_lms=Veracross&id=10344&domain=www.frisch.org&initial_request='initial'";
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (error) {
    res.status(500).send("Error loading attendance page.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
