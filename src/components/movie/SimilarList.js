import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollButton from "../ScrollButton.js";
import star from "../../media/star.svg";

export default function SimilarList({
  ContentType,
  id,
  MovieId,
  setMovieId,
  setContentType,
}) {
  const [similarContent, setSimilarContent] = useState([]);
  const [genres, setGenres] = useState({});
  const [apologyMessage, setApologyMessage] = useState(null);
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";

  const API_URL_REC = `https://api.themoviedb.org/3/${
    ContentType === "movie" ? "movie" : "tv"
  }/${MovieId}/recommendations?api_key=${apiKey}&page=1`;

  const API_URL_SIMILAR = `https://api.themoviedb.org/3/${
    ContentType === "movie" ? "movie" : "tv"
  }/${MovieId}/similar?api_key=${apiKey}&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [similarResponse, genreResponse] = await Promise.all([
          axios.get(API_URL_REC),
          axios.get(
            `https://api.themoviedb.org/3/genre/${ContentType}/list?api_key=${apiKey}`
          ),
        ]);

        if (
          !similarResponse.data.results ||
          similarResponse.data.results.length === 0
        ) {
          console.warn(
            `No similar movies found for movie ID ${MovieId}. Trying similar content.`
          );

          const similarResponseFromSimilar = await axios.get(API_URL_SIMILAR);

          if (
            !similarResponseFromSimilar.data.results ||
            similarResponseFromSimilar.data.results.length === 0
          ) {
            console.warn(
              `No similar or related movies found for movie ID ${MovieId}.`
            );
            setApologyMessage("Sorry, no similar or related movies found.");
            return;
          }

          setSimilarContent(similarResponseFromSimilar.data.results);
        } else {
          setSimilarContent(similarResponse.data.results);
        }

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
  }, [API_URL_REC, API_URL_SIMILAR, MovieId, ContentType]);

  function EmptyGifComponent({ link }) {
    return <img className="empty-gif" src={link} alt="even this is empty 😭" />;
  }

  return (
    <div className="list" style={{ marginTop: "100px" }}>
      {apologyMessage ? (
        <>
          <h1>Similar {ContentType === "tv" ? "Series" : "Movies"}</h1>
          <ScrollButton Bdirection="left" listId={id} />
          <div className="list-container" id={id}>
            <EmptyGifComponent link="https://media1.tenor.com/m/q-E5wj1K6OYAAAAC/monsters-inc-sully.gif" />
            <EmptyGifComponent link="https://media1.tenor.com/m/NmfLO475DXYAAAAC/its-blank.gif" />
            <EmptyGifComponent link="https://media1.tenor.com/m/tzi_t7qHMNkAAAAd/fucking-nothing-leonard-geist.gif" />
            <EmptyGifComponent link="https://media1.tenor.com/m/gYfWrdObmDkAAAAC/brendan-fraser-nothing.gif" />
            <EmptyGifComponent link="https://media1.tenor.com/m/fCmRkmtxWCoAAAAC/nothing-mate-butcher.gif" />
          </div>
          <ScrollButton Bdirection="right" listId={id} />
        </>
      ) : (
        <>
          <h1>Similar {ContentType === "tv" ? "Series" : "Movies"}</h1>
          <ScrollButton Bdirection="left" listId={id} />
          <div className="list-container" id={id}>
            {similarContent.map((content) => (
              <ContentCard
                key={content.id}
                link={`https://image.tmdb.org/t/p/w1280/${content.backdrop_path}`}
                title={content.name || content.title}
                rating={Number(content.vote_average.toFixed(1))}
                genreIds={content.genre_ids}
                id={content.id}
                contentType={ContentType}
                setMovieId={setMovieId}
                setContentType={setContentType}
                genres={genres}
              />
            ))}
          </div>
          <ScrollButton Bdirection="right" listId={id} />
        </>
      )}
    </div>
  );
}

function ContentCard({
  link,
  title,
  rating,
  genreIds,
  id,
  contentType,
  setMovieId,
  setContentType,
  genres,
}) {
  if (link === "https://image.tmdb.org/t/p/w1280/null") {
    return null;
  }

  function newContentSetter() {
    setMovieId(id);
    setContentType(contentType);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const genreNames = genreIds.map((id) =>
    genres[id] !== undefined ? genres[id] : ""
  );

  return (
    <div className="content-card" onClick={newContentSetter}>
      <div className="poster-content">
        <img className="content-img" src={link} alt="poster" />
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
