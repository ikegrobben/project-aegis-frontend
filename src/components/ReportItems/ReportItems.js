import React from "react";

// Import css
import "./ReportItems.scss";

// Temp import for data
import items from "../../services/report.json";

function ReportItems() {
  // Creates new Array with reports with status open
  const reportItems = items.filter((item) => item.Status === "Open");

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
            <span className="report-item__location">{reportItem.location}</span>
            <span className="report-item__category">{reportItem.category}</span>
            <span className="report-item__images">{reportItem.images}</span>
            <span className="report-item__creator">{reportItem.creator}</span>
            {console.log(reportItem)}
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
