import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import ReportItems from "../../components/ReportItems/ReportItems";
import Button from "../../components/Button/Button";

// Import scss
import "./dashboard.scss";

// Temp import for data
import items from "../../services/report.json";
import { countStatus } from "../../logic/Count";
import { calculatePercentage } from "../../logic/Calculate";
import { getToken } from "../../logic/JwtToken";

function Dashboard({ logOut }) {
  const [reportsOpen, setReportsOpen] = useState(null);
  const [reportsClosed, setReportsClosed] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {
      try {
        console.log(token);
        const requestOne = axios.get(
          "http://localhost:8080/report-items/open",
          getToken()
        );
        const requestTwo = axios.get(
          "http://localhost:8080/report-items/closed",
          getToken()
        );

        axios.all([requestOne, requestTwo]).then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            setReportsOpen(responseOne.data);
            setReportsClosed(responseTwo.data);
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    reportsClosed &&
    reportsOpen && (
      <>
        <ContentHeader title="Dashboard" logOut={logOut} />
        <h2 className="sr-only">Statistics</h2>
        <div className="cards">
          <Card
            boxSubject="Total open reports"
            boxAmountNumber={reportsOpen.length}
            boxInfo="Pay attention to open items"
          />
          <Card
            boxSubject="Total closed reports"
            boxAmountNumber={reportsClosed.length}
            boxInfo="and succesfully handled!"
          />
          <Card
            boxSubject="Total reports count"
            boxAmountNumber={reportsOpen.length + reportsClosed.length}
            boxInfo={`${calculatePercentage(
              reportsOpen.length,
              reportsClosed.length
            )}% has been succesfully closed`}
          />
        </div>
        <ContentSubHeader title="All open reports" display="hide" />
        <ReportItems
          reportObject={reportsOpen}
          filterType="filterOnStatus"
          filterBy="open"
          sortType="date"
          sortBy="latest first"
        />
        )
        <div className="dashboard__buttons">
          <Link to="/monthly-report">
            <Button
              name="See Monthly report"
              type="button"
              classNameButton="btn btn--light-blue"
            />
          </Link>
          <Link to="/report/last-report">
            <Button
              name="See todays report"
              type="button"
              classNameButton="btn btn--light-blue"
            />
          </Link>
        </div>
      </>
    )
  );
}

export default Dashboard;
