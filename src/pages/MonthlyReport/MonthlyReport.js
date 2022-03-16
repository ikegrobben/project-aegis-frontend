import React from "react";

import "./MonthlyReport.scss";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import MonthlyOverviewCard from "../../components/MonthlyOverviewCard/MonthlyOverviewCard";

function MonthlyReport({ logOut }) {
  const monthDate = new Date();
  monthDate.setMonth(1 + 1);
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
          boxInfo="Pay ettentions to open items."
        />
        <Card
          boxSubject="Closed reports this month"
          boxAmountNumber="79"
          boxInfo="That are 13 more reports then last month!"
        />
      </div>
      <ContentSubHeader title="All open reports" hideBar="yes" />
      <div className="cards monthly-report__cards">
        <MonthlyOverviewCard filterBy={monthDate} />
      </div>
    </>
  );
}

export default MonthlyReport;
