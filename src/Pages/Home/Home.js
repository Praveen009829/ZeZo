import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Slider from '../../Components/Slider/Slider';
import {
    fetchTrendingMovies,
    fetchTopRatedMovies,
    fetchMoviesByGenre,
    fetchPopularTVShows,
    fetchTopRatedTVShows
} from '../../Api/Moviesapi';
import './Home.css';

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [topTV, setTopTV] = useState([]);

    useEffect(() => {
        const load = async () => {
            const trending = await fetchTrendingMovies();
            setTrendingMovies(trending);

            const top = await fetchTopRatedMovies();
            setTopRatedMovies(top);

            const action = await fetchMoviesByGenre(28);
            setActionMovies(action);

            const tv = await fetchPopularTVShows();
            setPopularTV(tv);

            const topTvShows = await fetchTopRatedTVShows();
            setTopTV(topTvShows);
        };
        load();
    }, []);

    return (
        <Container fluid style={{ margin: 0, padding: 0, backgroundColor: '#111' }}>
            <Slider title="Trending Movies" movies={trendingMovies} />
            <Slider title="Top Rated Movies" movies={topRatedMovies} />
            <Slider title="Action Movies" movies={actionMovies} />
            <Slider title="Popular TV Shows" movies={popularTV} />
            <Slider title="Top Rated TV Shows" movies={topTV} />
        </Container>
    );
};

export default Home;
