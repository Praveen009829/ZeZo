import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaPlay, FaYoutube, FaStar } from "react-icons/fa";
import {
  fetchDetail,
  fetchVideos,
  fetchCredits,
  fetchSeason
} from "../../Api/Moviesapi";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { type, id } = useParams();

  const [data, setData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const EMBED_BASE = "https://vidsrcme.su";

  // 🔹 Load movie / TV details
  useEffect(() => {
    const load = async () => {
      const detail = await fetchDetail(type, id);
      setData(detail);

      const videoData = await fetchVideos(type, id);
      const trailer = videoData.results?.find(
        (v) => v.type === "Trailer" || v.type === "Teaser"
      );
      setTrailerKey(trailer?.key || null);

      const creditData = await fetchCredits(type, id);
      setCast(creditData.cast?.slice(0, 8) || []);

      if (type === "tv") {
        const seasonData = await fetchSeason(id, 1);
        setEpisodes(seasonData.episodes || []);
      }
    };

    load();
  }, [id, type]);

  // 🔹 Load TV episodes when season changes
  useEffect(() => {
    if (type === "tv") {
      fetchSeason(id, selectedSeason).then((data) =>
        setEpisodes(data.episodes || [])
      );
    }
  }, [selectedSeason, type, id]);

  if (!data) {
    return <div className="text-light text-center py-5">Loading...</div>;
  }

  const imageUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://via.placeholder.com/500x750";

  return (
    <div className="movie-detail-page text-light">
      <Container className="py-5">
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
              {data.genres?.map((g) => g.name).join(", ")}
            </p>

            <p>
              <strong>
                {type === "movie" ? "Release Date:" : "First Air Date:"}
              </strong>{" "}
              {data.release_date || data.first_air_date}
            </p>

            <div className="d-flex gap-3 mt-3 flex-wrap">
              {trailerKey && (
                <Button variant="danger" onClick={() => setShowTrailer(!showTrailer)}>
                  <FaYoutube /> {showTrailer ? "Close Trailer" : "Watch Trailer"}
                </Button>
              )}

              <Button variant="primary" onClick={() => setShowPlayer(!showPlayer)}>
                <FaPlay /> {showPlayer ? "Close Player" : "Watch Now"}
              </Button>
            </div>

            {type === "tv" && (
              <div className="mt-4">
                <Dropdown onSelect={(v) => setSelectedSeason(Number(v))}>
                  <Dropdown.Toggle variant="secondary">
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
                  onSelect={(v) => setSelectedEpisode(Number(v))}
                >
                  <Dropdown.Toggle variant="secondary">
                    Episode {selectedEpisode}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {episodes.map((ep) => (
                      <Dropdown.Item
                        key={ep.episode_number}
                        eventKey={ep.episode_number}
                      >
                        Episode {ep.episode_number}: {ep.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Col>
        </Row>

        {showTrailer && trailerKey && (
          <Row className="mt-4">
            <Col>
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                width="100%"
                height="500"
                allowFullScreen
                title="Trailer"
              />
            </Col>
          </Row>
        )}

        {showPlayer && (
          <Row className="mt-4">
            <Col>
              <iframe
                src={
                  type === "movie"
                    ? `${EMBED_BASE}/embed/movie/${id}`
                    : `${EMBED_BASE}/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`
                }
                width="100%"
                height="500"
                allowFullScreen
                title="Player"
              />
            </Col>
          </Row>
        )}

        <div className="cast-section mt-5">
          <h3>Cast</h3>
          <Row>
            {cast.map((actor) => (
              <Col key={actor.id} xs={6} md={3} lg={2} className="text-center mb-4">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300"
                  }
                  alt={actor.name}
                  className="cast-img"
                />
                <h6 className="mt-2">{actor.name}</h6>
                <p className="text-muted">{actor.character}</p>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetail;
