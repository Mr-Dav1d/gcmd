import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home.js";
import NavBar from "./components/NavBar.js";
import Movie from "./components/movie/Movie.js";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/gcmd" element={<Home />} />
        <Route path="/gcmd/:type/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}
