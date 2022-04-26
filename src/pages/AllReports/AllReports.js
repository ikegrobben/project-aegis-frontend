import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";

// import scss
import "./allreports.scss";

// import temp db
import reports from "../../services/reportsdb.json";
import { countItems, countOccStatus, countStatus } from "../../logic/Count";
import { getToken } from "../../logic/JwtToken";

function AllReports({ logOut }) {
  const [reports, setReports] = useState(null);
  const [reportCount, setReportCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:8080/reports",
          getToken()
        );
        setReports(result.data);
        setReportCount(result.data.length);
        const items = countItems(result.data);
        const open = countStatus(result.data, "Open");
        setTotalOpen(open);
        setTotalItems(items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function calculateScore(a, b) {
    const total = a + b;
    const score = Math.round((b / total) * 100);
    if (score >= 0 && score <= 50) {
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
          boxAmountNumber={reportCount}
          boxInfo="And that within the first half of the year"
        />
        <Card
          boxSubject="Total items reported"
          boxAmountNumber={totalItems}
          boxInfo="thats alot of words"
        />
        <Card
          boxSubject="Total items open"
          boxAmountNumber={totalOpen}
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
        {reports &&
          reports.map((report) => {
            return (
              <Link
                to={`../report/${report.id}`}
                className="report-item__report--link-text"
                key={report.id}
              >
                <li className="row">
                  <div className="date">
                    <span className="blue">{report.reportDate}</span>
                  </div>
                  <div className="open-items">
                    {console.log(report.reportItems)}
                    {countOccStatus(report.reportItems, "Open")}
                  </div>
                  <div className="closed-items">
                    {console.log(report.reportItems)}
                    {countOccStatus(report.reportItems, "Closed")}
                  </div>
                  <div className="total-items">{report.reportItems.length}</div>
                  <div className="score">
                    {calculateScore(
                      countOccStatus(report.reportItems, "Open"),
                      countOccStatus(report.reportItems, "Closed")
                    )}
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </>
  );
}

export default AllReports;
