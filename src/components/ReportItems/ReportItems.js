import React from "react";

// Import Logic
import { FilterItems, SortItems } from "../../Logic/FilterSortItems";
import { dateToday } from "../../Logic/DateCheck";
import { statusCheck } from "../../Logic/StatusCheck";

// Import css
import "./ReportItems.scss";

function ReportItems({ reportObject, filterType, filterBy, sortType, sortBy }) {
  // Filter the Array of objects
  const reportItems = FilterItems(reportObject, filterType, filterBy);

  // Sort items
  SortItems(reportItems, sortType, sortBy);

  return reportItems.map((reportItem) => {
    return (
      <div key={reportItem.date}>
        <article className="report-item" key={reportItem.date}>
          <div className="report-item__date">
            {/* check if date is today */}
            {dateToday(reportItem.date)}
          </div>
          <div className="report-item__report">
            <p className="report-item__paragraph">{reportItem.content}</p>
            <ul>
              <li className="report-item__location">{reportItem.location}</li>
              <li className="report-item__category">{reportItem.category}</li>
              <li className="report-item__images">{reportItem.images}</li>
              <li className="report-item__creator">{reportItem.creator}</li>
            </ul>
          </div>
          <div className="report-item__status">
            {statusCheck(reportItem.status)}
          </div>
          <div className="report-item__comments">
            <span>{reportItem.Comments}</span>
          </div>
        </article>
        <div className="divider"></div>
      </div>
    );
  });
}

export default ReportItems;
