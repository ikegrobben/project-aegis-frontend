import React from "react";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import ReportItems from "../../components/ReportItems/ReportItems";

function Dashboard({ logOut }) {
  return (
    <>
      <ContentHeader title="Dashboard" logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          boxSubject="Open reports this month"
          boxAmountNumber="7"
          boxInfo="Pay attention to open items"
        />
        <Card
          boxSubject="Closed reports this month"
          boxAmountNumber="72"
          boxInfo="and succesfully handled!"
        />
        <Card
          boxSubject="Total reports this month"
          boxAmountNumber="79"
          boxInfo="That are 13 more reports then last month!"
        />
      </div>
      <ContentSubHeader title="All open reports" />
      <ReportItems />
    </>
  );
}

export default Dashboard;
