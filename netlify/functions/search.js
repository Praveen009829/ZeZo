// netlify/functions/search.js

exports.handler = async function (event) {
  const key = process.env.TMDB_API_KEY;
  const query = event.queryStringParameters?.query;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to search" }),
    };
  }
};
