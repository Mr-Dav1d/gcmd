import React from "react";
import Button from "../Button.js";

export default function Banner({ mediaDetails, trailerKey }) {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

  return (
    <>
      <div className="banner-div">
        <div className="banner-container">
          <img
            className="banner"
            src={`${IMG_PATH}${mediaDetails.backdrop_path}`}
            alt="banner"
          />
          <div className="banner-gradient"></div>
        </div>
        <InfoComponent mediaDetails={mediaDetails} trailerKey={trailerKey} />
      </div>
    </>
  );
}

function InfoComponent({ mediaDetails, trailerKey }) {
  return (
    <div className="info-div">
      <h1>{mediaDetails.original_title || mediaDetails.original_name}</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.66)" }}>
        {mediaDetails.runtime} min |{" "}
        {mediaDetails.release_date || mediaDetails.first_air_date} |{" "}
        {mediaDetails.genres?.join(", ")}
      </p>
      <p>{mediaDetails.overview}</p>

      <div className="button-div">
        <Button
          color="#00925d"
          borderColor="#00925d"
          logo="play"
          classN="info-button"
          onClick={() =>
            trailerKey &&
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`)
          }
        >
          Watch Trailer
        </Button>
        <Button borderColor="white" logo="watchlist" classN="info-button">
          Add to watchlist
        </Button>
      </div>
    </div>
  );
}
