import React from "react";
import moment from "moment";

// Import Logic
import { FilterItems, SortItems } from "../../Logic/FilterSortItems";
import { dateToday } from "../../Logic/DateCheck";
import { statusCheck } from "../../Logic/StatusCheck";
import { Link } from "react-router-dom";
import { getImage, getImageLength } from "../../Logic/base64";

// Import css
import "./ReportItems.scss";

// Import image
import userImg from "../../assets/images/user.svg";

function ReportItems({ reportObject, filterType, filterBy, sortType, sortBy }) {
  // * - Filter the Array of objects
  const reportItems = FilterItems(reportObject, filterType, filterBy);

  // * - Sort items
  SortItems(reportItems, sortType, sortBy);

  console.log(reportItems);

  return (
    reportItems &&
    reportItems.map((reportItem) => {
      const image = getImage(reportItem.image);
      console.log(image);
      console.log(reportItem.reportItemDateTime);
      return (
        <Link
          to={`/report-item/${reportItem.id}`}
          className="report-item__report--link-text"
          key={reportItem.reportItemDateTime}
        >
          <div key={reportItem.reportItemDateTime}>
            <article className="report-item">
              <div className="report-item__date">
                {/* check if date is today */}
                {dateToday(
                  moment(reportItem.reportItemDateTime).format(
                    "YYYY-MM-DD hh:mm"
                  )
                )}
              </div>
              <div className="report-item__report">
                <div className="report-item__paragraph">
                  {reportItem.content.length >= 250
                    ? reportItem.content.slice(0, 250) + " . . ."
                    : reportItem.content}
                </div>

                <ul>
                  <li className="report-item__location">
                    {reportItem.location.name}
                  </li>
                  <li className="report-item__category">
                    {reportItem.category.name}
                  </li>

                  <li className="report-item__creator">
                    <img src={userImg} alt="User" />
                    {`${reportItem.users.firstname} ${reportItem.users.lastname}`}
                  </li>
                </ul>
              </div>
              <div className="report-item__status">
                {statusCheck(reportItem.status)}
              </div>
              <div className="report-item__comments">
                <span>{getImageLength(reportItem.image)}</span>
              </div>
            </article>
            <div className="divider"></div>
          </div>
        </Link>
      );
    })
  );
}

export default ReportItems;
