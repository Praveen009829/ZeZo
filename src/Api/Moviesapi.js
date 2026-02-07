// const API_KEY = '810956bc58bd77494f5bb7313c720908';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export const fetchTrendingMovies = async () => {
//   const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
//   const data = await response.json();
//   return data.results;
// };

// export const fetchTopRatedMovies = async () => {
//   const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
//   const data = await response.json();
//   return data.results;
// };

// export const fetchMoviesByGenre = async (genreId) => {
//   const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
//   const data = await response.json();
//   return data.results;
// };

// export const fetchPopularTVShows = async () => {
//   const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
//   const data = await res.json();
//   return data.results;
// };

// export const fetchTopRatedTVShows = async () => {
//   const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
//   const data = await res.json();
//   return data.results;
// };

// // ✅ Add this export for TV shows by genre
// export const fetchTVShowsByGenre = async (genreId) => {
//   const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`);
//   const data = await res.json();
//   return data.results;
// };

// src/Api/Moviesapi.js

/**
 * NOTE:
 * All requests go through Netlify Functions.
 * This avoids Jio CGNAT + TMDB blocking issues.
 */
// src/Api/Moviesapi.js

const fetchSafe = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// MOVIES
export const fetchTrendingMovies = () =>
  fetchSafe("/.netlify/functions/trending");

export const fetchTopRatedMovies = () =>
  fetchSafe("/.netlify/functions/topRatedMovies");

export const fetchMoviesByGenre = (genreId) =>
  fetchSafe(`/.netlify/functions/moviesByGenre?genreId=${genreId}`);

// TV
export const fetchPopularTVShows = () =>
  fetchSafe("/.netlify/functions/popularTV");

export const fetchTopRatedTVShows = () =>
  fetchSafe("/.netlify/functions/topRatedTV");

export const fetchTVShowsByGenre = (genreId) =>
  fetchSafe(`/.netlify/functions/tvByGenre?genreId=${genreId}`);

// DETAILS
export const fetchDetail = (type, id) =>
  fetchSafe(`/.netlify/functions/detail?type=${type}&id=${id}`);

export const fetchVideos = (type, id) =>
  fetchSafe(`/.netlify/functions/videos?type=${type}&id=${id}`);

export const fetchCredits = (type, id) =>
  fetchSafe(`/.netlify/functions/credits?type=${type}&id=${id}`);

export const fetchSeason = (id, season) =>
  fetchSafe(`/.netlify/functions/season?id=${id}&season=${season}`);

// SEARCH
export const searchMulti = (query) =>
  fetchSafe(`/.netlify/functions/search?query=${query}`);
