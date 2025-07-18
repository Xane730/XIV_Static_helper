export async function handler(event, context) {
  const itemId = event.queryStringParameters.id;
  const key = process.env.XIVAPI_KEY;

  if (!itemId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing id parameter' }),
    };
  }

  const url = `https://xivapi.com/item/${itemId}?columns=Name&private_key=${key}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
}
