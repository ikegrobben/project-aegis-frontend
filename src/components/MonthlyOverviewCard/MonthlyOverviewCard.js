import React from "react";

import "./MonthlyOverviewCard.scss";

// Temp import for data
import items from "../../services/report.json";

function MonthlyOverviewCard({ boxSubject, boxAmountNumber, filterBy }) {
  const arrayFilter = items.filter((item) => {
    const dateToday = new Date(filterBy);
    const dateItem = new Date(item.date);

    if (dateToday.getMonth() === dateItem.getMonth()) {
      return true;
    }
  });

  const categoryArray = arrayFilter.map((c) => ({ category: c.category }));

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
