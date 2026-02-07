// netlify/functions/season.js

exports.handler = async function (event) {
  const key = process.env.TMDB_API_KEY;
  const { id, season } = event.queryStringParameters || {};

  if (!id || !season) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing id or season" }),
    };
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${key}&language=en-US`
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch season details" }),
    };
  }
};
