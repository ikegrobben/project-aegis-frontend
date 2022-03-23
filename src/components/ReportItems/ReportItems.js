import React, { useState } from "react";

// Import Logic
import { FilterItems, SortItems } from "../../logic/FilterSortItems";
import { dateToday } from "../../logic/DateCheck";
import { statusCheck } from "../../logic/StatusCheck";

// Import css
import "./reportitems.scss";

// Import img
import userImg from "../../assets/images/user.svg";
import { Link } from "react-router-dom";

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
            <Link
              to={`/report-item/${reportItem.id}`}
              className="report-item__report--link-text"
            >
              <div className="report-item__paragraph">
                {reportItem.content.length >= 250
                  ? reportItem.content.slice(0, 250) + " . . ."
                  : reportItem.content}
              </div>
            </Link>

            <ul>
              <li className="report-item__location">{reportItem.location}</li>
              <li className="report-item__category">{reportItem.category}</li>

              {reportItem.images > 0 && (
                <li className="report-item__images">{reportItem.images}</li>
              )}

              <li className="report-item__creator">
                <img src={userImg} alt="User" /> {reportItem.creator}
              </li>
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
