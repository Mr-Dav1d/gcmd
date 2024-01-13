import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Button from "../Button.js";

const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
const API_URL_TOP = `https://api.themoviedb.org/3/movie/upcoming?&api_key=${apiKey}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

export default function TopHome() {
  const [topData, setTopData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDot, setSelectedDot] = useState(0);
  const [trailerLink, setTrailerLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_TOP);
        setTopData(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topData.length);
      setTrailerLink(null);

      setSelectedDot((prevDot) => (prevDot + 1) % topData.length);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [topData]);

  useEffect(() => {
    if (topData[currentIndex]) {
      fetchTrailer(topData[currentIndex].id);
    }
  }, [currentIndex, topData]);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );

      const videoKey = response.data.results[0]?.key;
      if (videoKey) {
        const youtubeLink = `https://www.youtube.com/watch?v=${videoKey}`;
        setTrailerLink(youtubeLink);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!topData.length) {
    return null;
  }

  const currentMovie = topData[currentIndex];

  return (
    <div className="banner-div">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: "0%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1 }}
          className="banner-container"
        >
          <img
            className="banner"
            src={IMG_PATH + currentMovie.backdrop_path}
            alt="banner"
          />
          <div className="banner-gradient"></div>
        </motion.div>
      </AnimatePresence>
      <InfoComponent info={currentMovie} trailerLink={trailerLink} />
      <DotsDivComponent
        totalDots={topData.length}
        onSelectDot={(index) => {
          setCurrentIndex(index);
          setTrailerLink(null);
        }}
        selectedDot={currentIndex}
      />
    </div>
  );
}

function InfoComponent({ info, trailerLink }) {
  return (
    <div className="info-div">
      <h1>{info.title}</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.66)" }}>
        Release Year: {info.release_date}
      </p>
      <p>{info.overview}</p>

      <div className="button-div">
        {trailerLink && (
          <Button
            color="#00925d"
            borderColor="#00925d"
            logo="play"
            classN="info-button"
            onClick={() => window.open(trailerLink, "_blank")}
          >
            Watch Trailer
          </Button>
        )}
        <Button borderColor="white" logo="watchlist" classN="info-button">
          Add to watchlist
        </Button>
      </div>
    </div>
  );
}

function DotsDivComponent({ totalDots, onSelectDot, selectedDot }) {
  return (
    <div className="dots-div">
      {[...Array(totalDots)].map((_, index) => (
        <button
          key={index}
          className={index === selectedDot ? "active" : ""}
          onClick={() => onSelectDot(index)}
        ></button>
      ))}
    </div>
  );
}
