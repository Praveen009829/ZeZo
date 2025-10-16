const API_KEY = '810956bc58bd77494f5bb7313c720908';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await response.json();
  return data.results;
};

export const fetchPopularTVShows = async () => {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
};

export const fetchTopRatedTVShows = async () => {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

// ✅ Add this export for TV shows by genre
export const fetchTVShowsByGenre = async (genreId) => {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
};
