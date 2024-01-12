import PopularBanner from "./PopularBanner.js";
import NewMovieList from "./NewMovieList.js";
import PopularWeekList from "./PopularWeekList.js";
import ContentList from "./ContentList.js";

export default function Home() {
  return (
    <div>
      <PopularBanner />
      <NewMovieList id="newMovieList" />
      <PopularWeekList id="popularWeek" />
      <ContentList contentType="movie" id="movie" />
      <ContentList contentType="tv" id="series" />
    </div>
  );
}
