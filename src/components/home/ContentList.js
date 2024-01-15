import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollButton from "../ScrollButton.js";
import star from "../../media/star.svg";
import { useNavigate } from "react-router-dom";

export default function ContentList({ contentType, id }) {
  const [contentData, setContentData] = useState([]);
  const [genres, setGenres] = useState({});
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const API_URL_TRENDING = `https://api.themoviedb.org/3/trending/${contentType}/day?language=en-US&api_key=${apiKey}`;
  const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularResponse, genreResponse] = await Promise.all([
          axios.get(API_URL_TRENDING),
          axios.get(GENRE_URL),
        ]);
        setContentData(popularResponse.data.results);
        const genresMap = {};
        genreResponse.data.genres.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL_TRENDING, GENRE_URL]);

  return (
    <div className="list" style={{ marginTop: "100px" }}>
      <h1>{contentType === "tv" ? "Series" : "Movies"}</h1>
      <ScrollButton Bdirection="left" listId={id} />
      {contentType === "Movies" ? (
        <div className="list-container" id={id}>
          {contentData.map((content) => (
            <ContentCard
              key={content.id}
              link={IMG_PATH + content.backdrop_path}
              title={content.title}
              rating={Number(content.vote_average.toFixed(1))}
              genreIds={content.genre_ids}
              genres={genres}
              id={content.id}
              contentType={contentType}
            />
          ))}
        </div>
      ) : (
        <div className="list-container" id={id}>
          {contentData.map((content) => (
            <ContentCard
              key={content.id}
              link={IMG_PATH + content.backdrop_path}
              title={content.name || content.title}
              rating={Number(content.vote_average.toFixed(1))}
              genreIds={content.genre_ids}
              genres={genres}
              id={content.id}
              contentType={contentType}
            />
          ))}
        </div>
      )}
      <ScrollButton Bdirection="right" listId={id} />
    </div>
  );
}

function ContentCard({
  link,
  title,
  rating,
  genreIds,
  genres,
  id,
  contentType,
}) {
  let navigate = useNavigate();
  const genreNames = genreIds
    .map((id) => (genres[id] !== undefined ? genres[id] : ""))
    .filter((genre) => genre !== "");

  return (
    <div className="content-card">
      <div className="poster-content">
        <img
          className="content-img"
          src={link}
          alt="poster"
          onClick={() => navigate(`/gcmd/${contentType}/${id}`)}
          style={{ cursor: "pointer" }}
        />
        <div className="card-info-content">
          <h3>{title}</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
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
