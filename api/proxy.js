import fetch from 'node-fetch';

export default async function handler(req, res) {
  const now = new Date();
  const estOffset = -4 * 60; // EDT offset in minutes
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
    const response = await fetch(targetUrl);
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Error fetching attendance page.");
  }
}
