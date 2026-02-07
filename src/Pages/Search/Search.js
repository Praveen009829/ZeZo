import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Slider from "../../Components/Slider/Slider";
import {
  searchMulti,
  fetchTrendingMovies,
  fetchPopularTVShows,
} from "../../Api/Moviesapi";

const Search = () => {
  const { query } = useParams();

  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedTV, setRecommendedTV] = useState([]);

  useEffect(() => {
    const loadSearch = async () => {
      try {
        const results = await searchMulti(query);

        const movies = results.filter(
          (item) => item.media_type === "movie"
        );
        const tvShows = results.filter(
          (item) => item.media_type === "tv"
        );

        setMovieResults(movies);
        setTvResults(tvShows);

        if (movies.length === 0 && tvShows.length === 0) {
          setNoResults(true);

          const recMovies = await fetchTrendingMovies();
          const recTV = await fetchPopularTVShows();

          setRecommendedMovies(recMovies);
          setRecommendedTV(recTV);
        } else {
          setNoResults(false);
        }
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    loadSearch();
  }, [query]);

  return (
    <Container
      fluid
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#111",
        minHeight: "100vh",
      }}
    >
      {noResults && (
        <h3 className="text-light mb-3 ps-3">
          No results found for "{query}"
        </h3>
      )}

      {movieResults.length > 0 && (
        <Slider
          title={`Movie Results for "${query}"`}
          movies={movieResults}
        />
      )}

      {tvResults.length > 0 && (
        <Slider
          title={`TV Show Results for "${query}"`}
          movies={tvResults}
        />
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
