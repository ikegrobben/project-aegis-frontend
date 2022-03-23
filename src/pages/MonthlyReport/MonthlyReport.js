import React, { useState } from "react";

// Import scss
import "./_monthlyreport.scss";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import MonthlyOverviewCard from "../../components/MonthlyOverviewCard/MonthlyOverviewCard";

// Temp import for data
import items from "../../services/report.json";

function MonthlyReport({ logOut }) {
  const monthDate = new Date();
  const initialDate = monthDate.getMonth();

  const [getMonth, setNewMonth] = useState(initialDate);

  monthDate.setMonth(getMonth);
  const selectedMonth = monthDate.toLocaleString("default", { month: "long" });
  const title = "Monthly report from " + selectedMonth;
  return (
    <>
      <ContentHeader title={title} logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          boxSubject="Security Score"
          boxAmountNumber="91%"
          boxInfo="What can we improve?"
        />
        <Card
          boxSubject="Open reports this month"
          boxAmountNumber="7"
          boxInfo="Pay attentions to open items."
        />
        <Card
          boxSubject="Closed reports this month"
          boxAmountNumber="79"
          boxInfo="That are 13 more reports then last month!"
        />
      </div>
      <ContentSubHeader
        title="All open reports"
        hideBar="yes"
        setNewMonth={setNewMonth}
      />
      <div className="cards monthly-report__cards">
        <MonthlyOverviewCard
          reportObject={items}
          filterType="filterOnMonth"
          filterBy={monthDate}
        />
      </div>
    </>
  );
}

export default MonthlyReport;
