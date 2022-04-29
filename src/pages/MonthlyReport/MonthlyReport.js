import React, { useEffect, useState } from "react";
import axios from "axios";

// Import scss
import "./monthlyreport.scss";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import MonthlyOverviewCard from "../../components/MonthlyOverviewCard/MonthlyOverviewCard";

// Import logic
import { countOccStatus } from "../../Logic/Count";
import { calculatePercentage } from "../../Logic/Calculate";
import { getToken } from "../../Logic/JwtToken";

function MonthlyReport({ logOut }) {
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
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
        setTotalOpen(countOccStatus(result.data, "Open"));
        setTotalClosed(countOccStatus(result.data, "Closed"));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [month]);

  const title = "Monthly report from " + month;

  return (
    <>
      <ContentHeader title={title} logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          topRow="Security Score"
          middleRow={calculatePercentage(totalOpen, totalClosed) + "%"}
          boxInfo="What can we improve?"
        />
        <Card
          topRow="Open reports this month"
          middleRow={totalOpen}
          boxInfo="Pay attentions to open items."
        />
        <Card
          topRow="Closed reports this month"
          middleRow={totalClosed}
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
