import youtube from "../media/youtube.svg";
import instagram from "../media/instagram.svg";
import facebook from "../media/facebook.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div style={{ marginTop: "50px" }} className="footer-info">
        <h1>Trusted by millions. GCMD always there for you</h1>
        <p>
          Special thanks to{" "}
          <a href="https://www.themoviedb.org/" target="_blank">
            TMDB
          </a>{" "}
          for providing content
        </p>
        <p>
          <a href="https://www.instagram.com/she_tokhle/?hl=en" target="_blank">
            Instagram
          </a>{" "}
          /{" "}
          <a href="https://www.youtube.com/@moonlight_pictures" target="_blank">
            Youtube
          </a>{" "}
          /{" "}
          <a href="https://www.facebook.com/Tokhle.official" target="_blank">
            Facebook
          </a>
        </p>
      </div>
      <div style={{ marginTop: "50px" }}>
        <img
          className="footer-gif"
          src="https://media1.tenor.com/m/s-RtbJOcb7wAAAAC/butcher-billy.gif"
          alt="gif"
        />
      </div>
    </div>
  );
}
