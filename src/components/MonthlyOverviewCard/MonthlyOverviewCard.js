import React from "react";

// Import scss
import "./MonthlyOverviewCard.scss";

function MonthlyOverviewCard({ reportObject }) {
  // Create a object with only categories.
  const categoryArray = reportObject.map((c) => ({
    category: c.category.name,
  }));

  // Reduce array and count how many times a category has been used.
  const result = [
    ...categoryArray
      .reduce((mp, o) => {
        if (!mp.has(o.category)) mp.set(o.category, { ...o, count: 0 });
        mp.get(o.category).count++;
        return mp;
      }, new Map())
      .values(),
  ];

  return result.map((category) => {
    return (
      <div className="overview-card" key={category.category}>
        <h3>{category.category}</h3>
        <p className="overview-card__paragraph--big">{category.count}</p>
      </div>
    );
  });
}

export default MonthlyOverviewCard;
