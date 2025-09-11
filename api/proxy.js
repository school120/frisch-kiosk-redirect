export default async function handler(request) {
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

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html"
      }
    });
  } catch (error) {
    return new Response("Error fetching attendance page.", {
      status: 500
    });
  }
}
