import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollButton from "../ScrollButton.js";
import Button from "../Button.js";
import star from "../../media/star.svg";

export default function PopularWeekList({ id }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`;
  const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(GENRE_URL);
        const genresMap = {};
        response.data.genres.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchTrailer = async (movieId) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );

        const trailerKey = response.data.results[0]?.key || null;

        return trailerKey
          ? `https://www.youtube.com/watch?v=${trailerKey}`
          : null;
      } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
      }
    };

    const fetchData = async () => {
      try {
        await fetchGenres();
        const response = await axios.get(API_URL_POPULAR);

        const moviesWithTrailers = await Promise.all(
          response.data.results.map(async (movie) => {
            const trailerLink = await fetchTrailer(movie.id);
            return { ...movie, trailerLink };
          })
        );

        setMovies(moviesWithTrailers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL_POPULAR, GENRE_URL]);

  return (
    <div className="list" style={{ marginTop: "100px" }}>
      <h1>Popular this week</h1>
      <ScrollButton Bdirection="left" listId={id} />
      <div className="list-container" id={id}>
        {movies.map((movie) => (
          <MovieCardSquare
            key={movie.id}
            link={IMG_PATH + movie.poster_path}
            title={movie.title}
            genreIds={movie.genre_ids.slice(0, 3)}
            rating={Number(movie.vote_average.toFixed(1))}
            genres={genres}
            trailerLink={movie.trailerLink}
          />
        ))}
      </div>
      <ScrollButton Bdirection="right" listId={id} />
    </div>
  );
}

function MovieCardSquare({
  link,
  title,
  genreIds,
  rating,
  genres,
  trailerLink,
}) {
  const genreNames = genreIds.map((id) => genres[id] || "");

  return (
    <div className="movie-card-square">
      <div className="poster-square">
        <img className="star" src={link} alt="poster" />
        <div className="card-info-square">
          <h3>{title}</h3>
          <h4>{genreNames.join(", ")}</h4>
          <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
            <img className="logo" src={star} alt="star" />
            <p>{rating} | Movie</p>
          </div>
          {trailerLink && (
            <Button
              borderColor="white"
              logo="play"
              classN="square-movie-button"
              onClick={() => window.open(trailerLink, "_blank")}
            >
              Watch trailer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
