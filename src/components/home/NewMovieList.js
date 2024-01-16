import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollButton from "../ScrollButton.js";
import star from "../../media/star.svg";
import { useNavigate } from "react-router-dom";

export default function NewMovieList({ id }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const API_URL_POP = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
  const API_URL_NEW = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${apiKey}&page=1`;
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

    const fetchData = async () => {
      try {
        await fetchGenres();
        const response = await axios.get(API_URL_NEW);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="middle">
      <div className="list">
        <h1>New Release</h1>
        <ScrollButton Bdirection="left" listId={id} />
        <div className="list-container" id={id}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              link={IMG_PATH + movie.poster_path}
              title={movie.title}
              rating={Number(movie.vote_average.toFixed(1))}
              genreIds={movie.genre_ids.slice(0, 3)}
              genres={genres}
              id={movie.id}
            />
          ))}
        </div>
        <ScrollButton Bdirection="right" listId={id} />
      </div>
    </div>
  );
}

function MovieCard({ link, title, rating, genreIds, genres, id }) {
  const genreNames = genreIds.map((id) => genres[id] || "");
  let navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/gcmd/movie/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="poster">
        <img src={link} alt="poster" />
      </div>
      <div className="card-info">
        <div style={{ paddingLeft: "3%", paddingBottom: "3%" }}>
          <h3 style={{ marginTop: "15px", marginBottom: "3px" }}>{title}</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <img className="logo" src={star} alt="star" />
            <p>
              {rating} | {genreNames.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
