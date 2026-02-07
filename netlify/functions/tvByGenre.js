// netlify/functions/tvByGenre.js

exports.handler = async function (event) {
  const key = process.env.TMDB_API_KEY;
  const genreId = event.queryStringParameters?.genreId;

  if (!genreId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing genreId" }),
    };
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_genres=${genreId}`
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch TV shows by genre" }),
    };
  }
};
