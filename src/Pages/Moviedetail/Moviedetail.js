import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaPlay, FaYoutube, FaStar } from "react-icons/fa";
import "./MovieDetail.css";

const API_KEY = "810956bc58bd77494f5bb7313c720908";

const MovieDetail = () => {
  const { type, id } = useParams(); 
  const [data, setData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch details (movie or tv)
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setData(data);

        // Fetch trailer
        const trailerRes = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailerData = await trailerRes.json();
        const key = trailerData.results?.find(
          (vid) => vid.type === "Trailer" || vid.type === "Teaser"
        )?.key;
        setTrailerKey(key);

        // Fetch cast
        const castRes = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const castData = await castRes.json();
        setCast(castData.cast?.slice(0, 8) || []);

        // For TV shows, load first season episodes
        if (type === "tv") {
          const epRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${API_KEY}&language=en-US`
          );
          const epData = await epRes.json();
          setEpisodes(epData.episodes || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id,type]);

  // Fetch episodes when season changes
  useEffect(() => {
    if (type === "tv" && selectedSeason) {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setEpisodes(data.episodes || []))
        .catch((err) => console.error(err));
    }
  }, [selectedSeason]);

  if (!data) return <div className="text-light text-center py-5">Loading...</div>;

  const imageUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://via.placeholder.com/500x750";

  return (
    <div className="movie-detail-page text-light">
      <Container className="movie-detail-content py-5">
        <Row>
          <Col md={4}>
            <img src={imageUrl} alt={data.title || data.name} className="movie-poster" />
          </Col>
          <Col md={8}>
            <h1>{data.title || data.name}</h1>
            <p>{data.overview}</p>
            <p>
              <FaStar color="gold" /> {data.vote_average} / 10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {(data.genres || []).map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>
                {type === "movie" ? "Release Date:" : "First Air Date:"}
              </strong>{" "}
              {data.release_date || data.first_air_date}
            </p>

            <div className="d-flex gap-3 mt-3 flex-wrap">
              {trailerKey && (
                <Button
                  variant="danger"
                  onClick={() => setShowTrailer(!showTrailer)}
                >
                  <FaYoutube />{" "}
                  {showTrailer ? "Close Trailer" : "Watch Trailer"}
                </Button>
              )}
              <Button variant="primary" onClick={() => setShowPlayer(!showPlayer)}>
                <FaPlay /> {showPlayer ? "Close Player" : "Watch Now"}
              </Button>
            </div>

            {/* For TV Shows: Season & Episode Selector */}
            {type === "tv" && (
              <div className="mt-4">
                <Dropdown onSelect={(val) => setSelectedSeason(Number(val))}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Season {selectedSeason}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from({ length: data.number_of_seasons }, (_, i) => (
                      <Dropdown.Item key={i + 1} eventKey={i + 1}>
                        Season {i + 1}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  className="mt-2"
                  onSelect={(val) => setSelectedEpisode(Number(val))}
                >
                  <Dropdown.Toggle variant="secondary" id="episode-dropdown">
                    Episode {selectedEpisode}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {episodes.map((ep) => (
                      <Dropdown.Item key={ep.episode_number} eventKey={ep.episode_number}>
                        Episode {ep.episode_number}: {ep.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Col>
        </Row>

        {/* Trailer Embed */}
        {showTrailer && trailerKey && (
          <Row className="mt-4">
            <Col>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  allowFullScreen
                  title="Trailer"
                  width="100%"
                  height="500"
                ></iframe>
              </div>
            </Col>
          </Row>
        )}

        {/* Movie or TV Player Embed */}
        {showPlayer && (
          <Row className="mt-4">
            <Col>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={
                    type === "movie"
                      ? `https://vidsrc.to/embed/movie/${id}`
                      : `https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`
                  }
                  allowFullScreen
                  title="Player"
                  width="100%"
                  height="500"
                ></iframe>
              </div>
            </Col>
          </Row>
        )}

        {/* Cast Section */}
        <div className="cast-section mt-5">
          <h3>Cast</h3>
          <Row>
            {cast.map((actor) => (
              <Col key={actor.id} xs={6} md={3} lg={2} className="text-center mb-4">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={actor.name}
                  className="cast-img"
                />
                <h6 className="mt-2">{actor.name}</h6>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {actor.character}
                </p>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetail;
