import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "./Banner.js";
import ActorList from "./ActorList.js";
import SimilarList from "./SimilarList.js";
import { useParams } from "react-router-dom";

export default function Movie() {
  const { id, type } = useParams();
  const [MovieId, setMovieId] = useState(id);
  const [ContentType, setContentType] = useState(type);
  const [mediaDetails, setMediaDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [actors, setActors] = useState([]);
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const MEDIA_ID = MovieId;
  const API_DETAILS = `https://api.themoviedb.org/3/${ContentType}/${MEDIA_ID}?api_key=${apiKey}`;
  const GENRE_URL = `https://api.themoviedb.org/3/genre/${ContentType}/list?api_key=${apiKey}`;
  const TRAILER_URL = `https://api.themoviedb.org/3/${ContentType}/${MEDIA_ID}/videos?api_key=${apiKey}`;
  const CREDITS_URL = `https://api.themoviedb.org/3/${ContentType}/${MEDIA_ID}/credits?api_key=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          detailsResponse,
          genresResponse,
          trailerResponse,
          creditsResponse,
        ] = await Promise.all([
          axios.get(API_DETAILS),
          axios.get(GENRE_URL),
          axios.get(TRAILER_URL),
          axios.get(CREDITS_URL),
        ]);

        const genresMap = genresResponse.data.genres.reduce(
          (acc, genre) => ({ ...acc, [genre.id]: genre.name }),
          {}
        );

        const mediaDetailsWithGenres = {
          ...detailsResponse.data,
          genres: detailsResponse.data.genres.map(
            (genre) => genresMap[genre.id]
          ),
        };

        setMediaDetails(mediaDetailsWithGenres);

        const trailer = trailerResponse.data.results.find(
          (result) => result.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }

        const cast = creditsResponse.data.cast.slice(0, 20);
        setActors(cast);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_DETAILS, GENRE_URL, TRAILER_URL, CREDITS_URL]);

  return (
    <div>
      <Banner
        mediaDetails={mediaDetails}
        trailerKey={trailerKey}
        MovieId={MovieId}
        ContentType={ContentType}
      />
      <ActorList actors={actors} />
      <SimilarList
        id={MEDIA_ID}
        MovieId={MovieId}
        ContentType={ContentType}
        setContentType={setContentType}
        setMovieId={setMovieId}
      />
    </div>
  );
}
