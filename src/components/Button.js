import play from "../media/play.svg";
import watchlist from "../media/watchlist.svg";

const getLogoSource = (logo) => {
  const logoMapping = {
    play,
    watchlist,
  };

  return logoMapping[logo];
};

export default function Button({
  children,
  color,
  borderColor,
  logo,
  classN,
  onClick,
}) {
  const logoSource = getLogoSource(logo);

  return (
    <button
      className={classN}
      style={{
        backgroundColor: color,
        color: "white",
        border: "2px solid " + borderColor,
      }}
      onClick={onClick}
    >
      <img className="logo" src={logoSource} alt={logo} />
      {children}
    </button>
  );
}
