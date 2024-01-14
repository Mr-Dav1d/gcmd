import React from "react";
import ScrollButton from "../ScrollButton.js";

export default function ActorList({ actors }) {
  return (
    <div className="list" style={{ marginTop: "60px" }}>
      <h1>Top Cast</h1>
      <ScrollButton Bdirection="left" listId={"id"} />
      <div className="actor-container" id={"id"}>
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
      <ScrollButton Bdirection="right" listId={"id"} />
    </div>
  );
}

function ActorCard({ actor }) {
  if (!actor.profile_path) {
    return null;
  }

  return (
    <div className="Actor-card">
      <div className="poster-square">
        <img
          className="actor-img"
          src={`https://image.tmdb.org/t/p/w92/${actor.profile_path}`}
          alt={`${actor.name}-img`}
        />
        <div className="actor-info">
          <h3>{actor.name}</h3>
          <p style={{ color: "rgba(255, 255, 255, 0.66)" }}>
            {actor.character}
          </p>
        </div>
      </div>
    </div>
  );
}
