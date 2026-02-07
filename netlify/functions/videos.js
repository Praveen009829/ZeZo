// netlify/functions/videos.js

exports.handler = async function (event) {
  const key = process.env.TMDB_API_KEY;
  const { type, id } = event.queryStringParameters || {};

  if (!type || !id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing type or id" }),
    };
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch videos" }),
    };
  }
};
