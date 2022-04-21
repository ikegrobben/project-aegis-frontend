import React from "react";

// Import scss
import "./monthlyoverviewcard.scss";

// Import Logic
import { FilterItems } from "../../logic/FilterSortItems";
import { countCategories, countOccCategories } from "../../logic/Count";

function MonthlyOverviewCard({ reportObject, filterType, filterBy }) {
  const categoryArray = reportObject.map((c) => ({
    category: c.category.name,
  }));
  console.log(categoryArray);

  const result = [
    ...categoryArray
      .reduce((mp, o) => {
        if (!mp.has(o.category)) mp.set(o.category, { ...o, count: 0 });
        mp.get(o.category).count++;
        console.log(mp);
        return mp;
      }, new Map())
      .values(),
  ];
  console.log(result);

  return result.map((category) => {
    console.log(category);
    return (
      <div className="overview-card" key={category.category}>
        <h3>{category.category}</h3>
        <p className="overview-card__paragraph--big">{category.count}</p>
      </div>
    );
  });
}

export default MonthlyOverviewCard;
