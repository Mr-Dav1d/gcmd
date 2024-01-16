import React, { useState, useEffect } from "react";
import releaseDateBanner from "../../media/releaseDateBanner.jpg";

export default function ReleaseDate() {
  const [monthlyMovies, setMonthlyMovies] = useState([]);
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

  useEffect(() => {
    const fetchMonthlyMovies = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const monthsToFetch = Array.from(
          { length: 12 },
          (_, index) => index + 1
        );
        const totalPages = 4;

        const promises = monthsToFetch.map((month) => {
          const endOfMonth = new Date(currentYear, month, 0);

          return Promise.all(
            Array.from({ length: totalPages }, (_, page) =>
              fetch(
                `https://api.themoviedb.org/3/discover/movie?` +
                  `api_key=${apiKey}&` +
                  `primary_release_date.gte=${currentYear}-${month}-01&` +
                  `primary_release_date.lte=${currentYear}-${month}-${endOfMonth.getDate()}&` +
                  `page=${page + 1}`
              ).then((response) => response.json())
            )
          ).then((pagesData) => {
            const allMovies = pagesData.reduce(
              (acc, currentPage) => acc.concat(currentPage.results),
              []
            );

            return {
              month,
              movies:
                allMovies.length > 0 ? allMovies : [{ placeholder: true }],
            };
          });
        });

        const monthlyMoviesData = await Promise.all(promises);
        setMonthlyMovies(monthlyMoviesData);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchMonthlyMovies();
  }, [apiKey]);

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
          <h1>Release Schedule</h1>
          <p style={{ color: "rgba(255, 255, 255, 0.66)" }}>
            Find out what you will be watching
          </p>
        </div>
      </div>
      <div className="release-list">
        <h2>UPCOMING RELEASES</h2>
        {monthlyMovies.map(({ month, movies }) => (
          <MonthComponent
            key={month}
            month={month}
            upcomingMovies={movies}
            IMG_PATH={IMG_PATH}
          />
        ))}
      </div>
    </>
  );
}

function MonthComponent({ month, upcomingMovies, IMG_PATH }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const sortedMovies = upcomingMovies
    .slice()
    .sort((a, b) => {
      const releaseDateA = new Date(a.release_date);
      const releaseDateB = new Date(b.release_date);
      return releaseDateA - releaseDateB;
    })
    .filter((movie) => {
      if (movie.backdrop_path && !movie.backdrop_path.includes("null")) {
        return true;
      }
      const releaseDate = new Date(movie.release_date);
      return !isNaN(releaseDate.getTime());
    });

  return (
    <>
      <h3
        style={{
          borderBottom: "1px solid white",
          paddingBottom: "10px",
          margin: "30px 0",
        }}
      >
        {monthNames[month - 1].toUpperCase()}
      </h3>
      <div className="releases-div">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie) => (
            <MonthReleaseComponent
              key={movie.id}
              movie={movie}
              IMG_PATH={IMG_PATH}
            />
          ))
        ) : (
          <p>No upcoming movies for this month.</p>
        )}
      </div>
    </>
  );
}

function MonthReleaseComponent({ movie, IMG_PATH }) {
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const dayOfMonth = releaseDate ? releaseDate.getDate() : null;

  if (
    IMG_PATH + movie.backdrop_path ===
    "https://image.tmdb.org/t/p/w1280/null"
  ) {
    return null;
  }

  return (
    <div className="release-div">
      <div className="date">
        <h1>{dayOfMonth}</h1>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          className="release-poster"
          src={IMG_PATH + movie.backdrop_path}
          alt={movie.title + " poster"}
        />
        <div className="release-info">
          <h2>{movie.title}</h2>
          <p>
            {movie.production_companies && movie.production_companies.length > 0
              ? movie.production_companies[0].name
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
