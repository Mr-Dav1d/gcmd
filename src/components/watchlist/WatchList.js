import React, { useState } from "react";
import releaseDateBanner from "../../media/releaseDateBanner.jpg";
import Button from "../Button.js";
import star from "../../media/star.svg";

export default function Test() {
  // Extract movies from local storage
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const handleDelete = (index) => {
    // Create a copy of the watchlist array
    const updatedWatchlist = [...watchlist];

    // Remove the movie at the specified index
    updatedWatchlist.splice(index, 1);

    // Update state and localStorage
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <>
      <div className="banner-div">
        <div className="banner-container">
          <img
            className="banner-release"
            src={releaseDateBanner}
            alt="banner"
          />
          <div className="banner-gradient"></div>
        </div>
        <div className="info-div">
          <h1>Your Watchlist</h1>
          <p style={{ color: "rgba(255, 255, 255, 0.77)" }}>
            Warning: movies are stored in your localStorage
          </p>
        </div>
      </div>
      <div className="watch-list-desktop ">
        <div className="list-movies">
          {watchlist.map((movie, index) => (
            <MovieCardSquare
              key={index}
              movie={movie}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
        <div className="addition">
          <h1>{`You have ${watchlist.length} ${
            watchlist.length === 1 ? "movie" : "movies"
          } in your watchlist`}</h1>
        </div>
      </div>

      <div className="watch-list-mobile ">
        <div className="addition">
          <h1>{`You have ${watchlist.length} ${
            watchlist.length === 1 ? "movie" : "movies"
          } in your watchlist`}</h1>
        </div>
        <div className="list-movies">
          {watchlist.map((movie, index) => (
            <MovieCardSquare
              key={index}
              movie={movie}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function MovieCardSquare({ movie, onDelete }) {
  const { name, title, overview, vote_average, poster_path } = movie;

  return (
    <div className="movie-card-watchlist watchlist-align">
      <div className="poster-square">
        <img
          className="watchlist-poster"
          src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
          alt="poster"
          style={{ cursor: "pointer" }}
        />
        <div className="watchList-info">
          <h3>{title || name}</h3>
          <h4>{overview.slice(0, 100)}</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <img className="logo" src={star} alt="star" />
            <p>{`${vote_average} | Movie`}</p>
          </div>
        </div>
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
    </div>
  );
}
