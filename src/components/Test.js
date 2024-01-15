export default function Test() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(watchlist);
  return (
    <div>
      <h1>test</h1>
      <button onClick={() => localStorage.clear()}></button>
    </div>
  );
}
