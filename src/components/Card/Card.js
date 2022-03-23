import React from "react";

// Import scss
import "./_card.scss";

function Card({ boxSubject, boxAmountNumber, boxInfo }) {
  return (
    <div className="card">
      <h3>{boxSubject}</h3>
      <p className="card__paragraph--big">{boxAmountNumber}</p>
      <p className="card__paragraph--small">{boxInfo}</p>
    </div>
  );
}

export default Card;
