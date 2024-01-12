import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="nav-bar desktop">
        <h1 style={{ marginLeft: "5%" }}>GCMD</h1>
        <Navigation />
        <img
          className="logo"
          src="/search-icon.svg"
          alt="search"
          style={{ marginRight: "5%" }}
        />
      </div>

      <div className="nav-bar mobile">
        <h1 style={{ marginLeft: "5%" }}>GCMD</h1>
        <div style={{ display: "flex" }}>
          <img
            className="logo"
            src="/search-icon.svg"
            alt="search"
            style={{ marginRight: "5%" }}
          />
          <Navigation />
        </div>
      </div>
    </>
  );
}

function Navigation() {
  return (
    <>
      <div className="navigation desktop">
        <Button routeName="/">Home</Button>
        <Button routeName="/discover">Discover</Button>
        <Button routeName="/release">Movie Release</Button>
        <Button routeName="/test">Test</Button>
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
        <img className="logo" src="/menu.svg" alt="menu" />
      </button>
      {isDropdownVisible && (
        <div className="mobile-dropdown">
          <Button routeName="/">Home</Button>
          <Button routeName="/discover">Discover</Button>
          <Button routeName="/release">Movie Release</Button>
          <Button routeName="/test">Test</Button>
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
        navigate(routeName);
      }}
      className="nav-button"
    >
      {children}
    </button>
  );
}
