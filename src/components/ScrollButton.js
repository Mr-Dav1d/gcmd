import { useState, useEffect } from "react";

export default function ScrollButton({ Bdirection, listId }) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = (direction) => {
    const container = document.getElementById(listId);
    const scrollAmount = 500;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const container = document.getElementById(listId);
    const handleScroll = () => {
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(
        container.scrollLeft >= container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll desktop ${Bdirection} ${
        isAtStart && Bdirection === "left" ? "hidden" : ""
      } ${isAtEnd && Bdirection === "right" ? "hidden" : ""} `}
      onClick={() => handleScroll(Bdirection)}
    >
      {Bdirection === "left" ? "<" : ">"}
    </button>
  );
}
