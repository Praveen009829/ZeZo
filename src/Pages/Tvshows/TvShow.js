import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Slider from '../../Components/Slider/Slider';
import {
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchTVShowsByGenre,
} from '../../Api/Moviesapi';
// import './TvShow.css';

const TvShow = () => {
  const [popularTV, setPopularTV] = useState([]);
  const [topTV, setTopTV] = useState([]);
  const [dramaTV, setDramaTV] = useState([]);
  const [comedyTV, setComedyTV] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const popular = await fetchPopularTVShows();
      setPopularTV(popular);

      const topRated = await fetchTopRatedTVShows();
      setTopTV(topRated);

      const drama = await fetchTVShowsByGenre(18); // Drama
      setDramaTV(drama);

      const comedy = await fetchTVShowsByGenre(35); // Comedy
      setComedyTV(comedy);
    };

    loadData();
  }, []);

  return (
    <Container fluid style={{ margin: 0, padding: 0, backgroundColor: '#111' }}>
      <Slider title="Popular TV Shows" movies={popularTV} />
      <Slider title="Top Rated TV Shows" movies={topTV} />
      <Slider title="Drama" movies={dramaTV} />
      <Slider title="Comedy" movies={comedyTV} />
    </Container>
  );
};

export default TvShow;
