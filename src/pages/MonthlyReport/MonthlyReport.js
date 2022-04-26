import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Import scss
import "./monthlyreport.scss";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import MonthlyOverviewCard from "../../components/MonthlyOverviewCard/MonthlyOverviewCard";

// Temp import for data
import items from "../../services/report.json";
import {
  countCategories,
  countOcc,
  countOccCategories,
  countOccStatus,
} from "../../logic/Count";
import { getMonth } from "../../logic/DateCheck";
import { calculatePercentage } from "../../logic/Calculate";
import { getToken } from "../../logic/JwtToken";

function MonthlyReport({ logOut }) {
  const [month, setMonth] = useState("april");
  const [data, setData] = useState(null);
  const [totalOpen, setTotalOpen] = useState(null);
  const [totalClosed, setTotalClosed] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:8080/report-items/${month}`,
          getToken()
        );
        setData(result.data);
        console.log(result.data);
        setTotalOpen(countOccStatus(result.data, "Open"));
        setTotalClosed(countOccStatus(result.data, "Closed"));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [month]);

  // ? - Can we shorten this method
  const monthDate = new Date();
  const initialDate = monthDate.getMonth();
  console.log(initialDate);

  getMonth(month);

  const title = "Monthly report from " + month;

  return (
    <>
      <ContentHeader title={title} logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          boxSubject="Security Score"
          boxAmountNumber={calculatePercentage(totalOpen, totalClosed) + "%"}
          boxInfo="What can we improve?"
        />
        <Card
          boxSubject="Open reports this month"
          boxAmountNumber={totalOpen}
          boxInfo="Pay attentions to open items."
        />
        <Card
          boxSubject="Closed reports this month"
          boxAmountNumber={totalClosed}
          boxInfo="That are 13 more reports then last month!"
        />
      </div>
      <ContentSubHeader
        title="Security Items"
        hideBar="yes"
        setNewMonth={setMonth}
      />
      <div className="cards monthly-report__cards">
        {data && <MonthlyOverviewCard reportObject={data} />}
      </div>
    </>
  );
}

export default MonthlyReport;
