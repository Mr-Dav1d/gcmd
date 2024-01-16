import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../media/search-icon.svg";
import menu from "../media/menu.svg";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function NavBar() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = "225e69e6fd6663b3c629a8ea6adf8d7c";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
  const navigate = useNavigate();

  const schema = yup.object().shape({
    query: yup.string().required("Input is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleSearch = () => {
    const currentURL = window.location.href;
    setSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      setSearchResults([]);
      if (currentURL.includes("movie") || currentURL.includes("tv"))
        navigate(`/gcmd/`);
    }
  };

  const handleSearch = async (data) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${data.query}`
      );

      const filteredResults = response.data.results.filter(
        (result) =>
          result.backdrop_path !== "undefined" &&
          result.backdrop_path !== "null"
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (id, media_type) => {
    console.log("Clicked on result with ID:", id);
    setSearchOpen(false);
    reset();
    navigate(`/gcmd/${media_type}/${id}`);
  };
  return (
    <>
      <div className="nav-bar desktop">
        <h1 style={{ marginLeft: "5%" }}>GCMD</h1>
        <Navigation />
        <img
          className="logo"
          src={searchIcon}
          alt="search"
          style={{ marginRight: "5%", cursor: "pointer" }}
          onClick={toggleSearch}
        />
      </div>

      <div className="nav-bar mobile">
        <h1 style={{ marginLeft: "5%" }}>GCMD</h1>
        <div style={{ display: "flex" }}>
          <img
            className="logo"
            src={searchIcon}
            alt="search"
            style={{ marginRight: "5%", cursor: "pointer" }}
            onClick={toggleSearch}
          />
          <Navigation />
        </div>
      </div>

      {/* Search Input */}
      {isSearchOpen && (
        <div className="search-input">
          <form onSubmit={handleSubmit(handleSearch)}>
            <Controller
              name="query"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Search..."
                  className="search-field"
                />
              )}
            />
            {errors.query && <p>{errors.query.message}</p>}
          </form>
          {searchResults.length > 0 ? (
            <ul className="search-results">
              {searchResults
                .filter(
                  (result) =>
                    IMG_PATH + result.backdrop_path !==
                      "https://image.tmdb.org/t/p/w1280/undefined" &&
                    IMG_PATH + result.backdrop_path !==
                      "https://image.tmdb.org/t/p/w1280/null"
                )
                .map((result) => (
                  <li
                    key={result.id}
                    onClick={() =>
                      handleResultClick(result.id, result.media_type)
                    }
                  >
                    {result.poster_path !== "undefined" &&
                      result.poster_path !== null && (
                        <img
                          className="search-poster"
                          src={`${IMG_PATH}${result.poster_path}`}
                          alt="Backdrop"
                        />
                      )}
                    <div className="search-info">
                      <h2>{result.title || result.name}</h2>
                      <p>{result.overview}</p>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <ul
              className="search-results"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <img
                className="search-gif"
                src="https://media1.tenor.com/m/q-E5wj1K6OYAAAAC/monsters-inc-sully.gif"
                alt="even this is empty 😭"
              />

              <img
                className="search-gif"
                src="https://media1.tenor.com/m/NmfLO475DXYAAAAC/its-blank.gif"
                alt="even this is empty 😭"
              />

              <img
                className="search-gif"
                src="https://media1.tenor.com/m/tzi_t7qHMNkAAAAd/fucking-nothing-leonard-geist.gif"
                alt="even this is empty 😭"
              />

              <img
                className="search-gif"
                src="https://media1.tenor.com/m/gYfWrdObmDkAAAAC/brendan-fraser-nothing.gif"
                alt="even this is empty 😭"
              />

              <img
                className="search-gif"
                src="https://media1.tenor.com/m/fCmRkmtxWCoAAAAC/nothing-mate-butcher.gif"
                alt="even this is empty 😭"
              />
            </ul>
          )}
        </div>
      )}
    </>
  );
}

function Navigation() {
  return (
    <>
      <div className="navigation desktop">
        <Button routeName="/">Home</Button>
        <Button routeName="/ReleaseDate">Movie Release</Button>
        <Button routeName="/WatchList">WatchList</Button>
        <Button routeName="/about">About</Button>
      </div>

      <div className="navigation mobile">
        <MobileNavigation />
      </div>
    </>
  );
}

function MobileNavigation({ routeName }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <button className="nav-button" onClick={toggleDropdown}>
        <img className="logo" src={menu} alt="menu" />
      </button>
      {isDropdownVisible && (
        <div className="mobile-dropdown">
          <Button routeName="/">Home</Button>
          <Button routeName="/ReleaseDate">Movie Release</Button>
          <Button routeName="/WatchList">WatchList</Button>
          <Button routeName="/about">About</Button>
        </div>
      )}
    </div>
  );
}

function Button({ children, routeName }) {
  let navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/gcmd${routeName}`);
      }}
      className="nav-button"
    >
      {children}
    </button>
  );
}
