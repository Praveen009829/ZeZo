import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FaStar, FaHeart, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const API_KEY = '810956bc58bd77494f5bb7313c720908'; 

const MovieCard = ({ movie }) => {
    const [hover, setHover] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const navigate = useNavigate();

    const genreMap = {
        28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary",
        18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
        9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller",
        10752: "War", 37: "Western", 10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News',
        10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics',
    };

    const genres = movie.genre_ids?.map(id => genreMap[id] || 'Unknown').join(', ');

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

    // Fetch trailer only when hovering
    useEffect(() => {
        if (hover && !trailerUrl) {
            const fetchTrailer = async () => {
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}`
                    );
                    const data = await res.json();
                    const trailer = data.results.find(
                        v => v.type === 'Trailer' && v.site === 'YouTube'
                    );
                    if (trailer) {
                        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`);
                    }
                } catch (err) {
                    console.error('Failed to load trailer:', err);
                }
            };
            fetchTrailer();
        }
    }, [hover, movie.id, type, trailerUrl]);

    return (
        <Card
            className="movie-card"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(`/detail/${type}/${movie.id}`)}
        >
            {/* Poster image as default */}
            <Card.Img src={imageUrl} alt={movie.title || movie.name} className="poster-img" />

            {hover && (
                <div className="overlay">
                    {trailerUrl ? (
                        <iframe
                            className="trailer-bg"
                            src={trailerUrl}
                            title="Trailer"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <Card.Img src={imageUrl} alt="Poster" className="poster-img blur" />
                    )}

                    <div className="overlay-content">
                        <h6 className="text-center">{movie.title || movie.name}</h6>
                        <div className="icons mb-2 d-flex justify-content-center align-items-center gap-3">
                            <FaStar title="Rating" /> <span>{movie.vote_average}</span>
                            <FaPlus title="Add to List" />
                            <FaHeart title="Like" />
                        </div>
                        <p className="genres text-center">{genres}</p>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default MovieCard;
