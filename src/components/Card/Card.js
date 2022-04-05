import React from "react";

// Import scss
import "./card.scss";

function Card({ boxSubject, boxAmountNumber, boxInfo, uniqueKey }) {
  // TODO - Change boxAmountNumber -> ...
  return (
    <div className="card" key={uniqueKey}>
      <h3>{boxSubject}</h3>
      <p className="card__paragraph--big">{boxAmountNumber}</p>
      <p className="card__paragraph--small">{boxInfo}</p>
    </div>
  );
}

export default Card;
