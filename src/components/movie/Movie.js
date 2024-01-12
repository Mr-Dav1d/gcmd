import PopularBanner from "../home/PopularBanner.js";
import ContentList from "../home/ContentList.js";

export default function Movie() {
  return (
    <div>
      <PopularBanner />
      <ContentList contentType="movie" id="movie" />
    </div>
  );
}
