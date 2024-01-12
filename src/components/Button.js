export default function Button({
  children,
  color,
  borderColor,
  logo,
  classN,
  onClick,
}) {
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
      <img className="logo" src={`/${logo}.svg`} alt={logo} />
      {children}
    </button>
  );
}
