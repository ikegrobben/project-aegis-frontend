import React from "react";

// Import css
import "./ReportItems.scss";

function ReportItems({ reportObject, filterType, filterBy }) {
  // Creates new Array with reports with status open

  const reportItems = filterReport(reportObject);

  function filterReport(filterArray) {
    const arrayFilter = filterArray.filter((item) => {
      // Variables for date checks
      const dateToday = new Date(filterBy);
      const dateItem = new Date(item.date);

      switch (filterType) {
        case "filterOnStatus":
          if (item.Status === filterBy) {
            return true;
          }
          break;
        case "filterOnDay":
          if (
            dateToday.getDate() === dateItem.getDate() &&
            dateToday.getMonth() === dateItem.getMonth() &&
            dateToday.getFullYear() === dateItem.getFullYear()
          ) {
            return true;
          }
          break;
        case "filterOnMonth":
          if (dateToday.getMonth() === dateItem.getMonth()) {
            return true;
          }
          break;

        default:
      }
      return false;
    });
    return arrayFilter;
  }

  // Sort items on date (Newest date first)
  reportItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  return reportItems.map((reportItem) => {
    // Check if date is today and assign a color class
    function isToday(dateParameter) {
      const today = new Date();
      if (
        dateParameter.getDate() === today.getDate() &&
        dateParameter.getMonth() === today.getMonth() &&
        dateParameter.getFullYear() === today.getFullYear()
      ) {
        return <span className="blue">{reportItem.date}</span>;
      }

      return <span className="grey">{reportItem.date}</span>;
    }

    return (
      <div key={reportItem.date}>
        <article className="report-item" key={reportItem.date}>
          <div className="report-item__date">
            {isToday(new Date(reportItem.date))}
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
            <span className="green">{reportItem.Status}</span>
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
