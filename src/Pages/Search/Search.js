import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Slider from "../../Components/Slider/Slider";
import {
  fetchTrendingMovies,
  fetchPopularTVShows
} from "../../Api/Moviesapi";

const Search = () => {
  const { query } = useParams();
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedTV, setRecommendedTV] = useState([]);

  useEffect(() => {
    const searchData = async () => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=810956bc58bd77494f5bb7313c720908&query=${query}`
        );
        const movieData = await movieRes.json();

        const tvRes = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=810956bc58bd77494f5bb7313c720908&query=${query}`
        );
        const tvData = await tvRes.json();

        setMovieResults(movieData.results || []);
        setTvResults(tvData.results || []);

        if ((!movieData.results || movieData.results.length === 0) &&
            (!tvData.results || tvData.results.length === 0)) {
          setNoResults(true);
          const recMovies = await fetchTrendingMovies();
          setRecommendedMovies(recMovies);
          const recTV = await fetchPopularTVShows();
          setRecommendedTV(recTV);
        } else {
          setNoResults(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    searchData();
  }, [query]);

  return (
    <Container
      fluid
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#111", // dark background
        minHeight: "100vh"
      }}
    >
      {noResults && <h3 className="text-light mb-3 ps-3">No results found for "{query}"</h3>}

      {movieResults.length > 0 && (
        <Slider title={`Movie Results for "${query}"`} movies={movieResults} />
      )}

      {tvResults.length > 0 && (
        <Slider title={`TV Show Results for "${query}"`} movies={tvResults} />
      )}

      {noResults && (
        <>
          <Slider title="Trending Movies" movies={recommendedMovies} />
          <Slider title="Popular TV Shows" movies={recommendedTV} />
        </>
      )}
    </Container>
  );
};

export default Search;
