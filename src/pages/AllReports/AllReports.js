import React from "react";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";

// import scss
import "./allreports.scss";

// import temp db
import reports from "../../services/reportsdb.json";

function AllReports({ logOut }) {
  function calculateScore(a, b) {
    const total = a + b;
    const score = Math.round((b / total) * 100);
    if (score > 0 && score <= 50) {
      return <span className="red-span">{score}%</span>;
    } else if (score > 50 && score <= 75) {
      return <span className="yellow-span">{score}%</span>;
    } else {
      return <span className="green-span">{score}%</span>;
    }
  }
  return (
    <>
      <ContentHeader title="All reports" logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          boxSubject="Total daily reports"
          boxAmountNumber="22"
          boxInfo="And that within the first half of the year"
        />
        <Card
          boxSubject="Total items reported"
          boxAmountNumber="145"
          boxInfo="thats alot of words"
        />
        <Card
          boxSubject="Total items open"
          boxAmountNumber="19"
          boxInfo="pay attention to open items"
        />
      </div>
      <h2 className="all-reports__title">All reports</h2>
      <div className="top-bar">
        <div className="top-bar__date">
          <span>Date</span>
        </div>
        <div className="top-bar__open">
          <span>Items open</span>
        </div>
        <div className="top-bar__closed">
          <span>Items Closed</span>
        </div>
        <div className="top-bar__total">
          <span>Total Items reported</span>
        </div>
        <div className="top-bar__score">
          <span>Security score</span>
        </div>
      </div>
      <ul className="all-reports">
        {reports.map((report) => {
          return (
            <li className="row" key={report.id}>
              <div className="date">
                <span className="blue">{report.reportdate}</span>
              </div>
              <div className="open-items">{report.open}</div>
              <div className="closed-items">{report.closed}</div>
              <div className="total-items">{report.open + report.closed}</div>
              <div className="score">
                {calculateScore(report.open, report.closed)}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AllReports;
