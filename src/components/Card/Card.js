import React from "react";

// Import scss
import "./card.scss";

function Card({ topRow, middleRow, boxInfo, uniqueKey }) {
  return (
    <div className="card" key={uniqueKey}>
      <h3>{topRow}</h3>
      <p className="card__paragraph--big">{middleRow}</p>
      <p className="card__paragraph--small">{boxInfo}</p>
    </div>
  );
}

export default Card;
