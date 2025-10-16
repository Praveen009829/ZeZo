import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Slider from '../../Components/Slider/Slider';
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchMoviesByGenre
} from '../../Api/Moviesapi';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);

      const topRated = await fetchTopRatedMovies();
      setTopRatedMovies(topRated);

      const action = await fetchMoviesByGenre(28); // Action
      setActionMovies(action);

      const comedy = await fetchMoviesByGenre(35); // Comedy
      setComedyMovies(comedy);

      const drama = await fetchMoviesByGenre(18); // Drama
      setDramaMovies(drama);
    };

    loadMovies();
  }, []);

  return (
    <Container fluid style={{ margin: 0, padding: 0, backgroundColor: '#111' }}>
      <Slider title="Trending Movies" movies={trendingMovies} />
      <Slider title="Top Rated Movies" movies={topRatedMovies} />
      <Slider title="Action Movies" movies={actionMovies} />
      <Slider title="Comedy Movies" movies={comedyMovies} />
      <Slider title="Drama Movies" movies={dramaMovies} />
    </Container>
  );
};

export default Movies;
