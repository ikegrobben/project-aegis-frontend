import React from "react";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import ReportItems from "../../components/ReportItems/ReportItems";

// Temp import for data
import items from "../../services/report.json";

function ShiftReport({ logOut }) {
  return (
    <>
      <ContentHeader title="Report March 15 2022" logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards">
        <Card
          boxSubject="Open reports today"
          boxAmountNumber="3"
          boxInfo="Pay attention to open items"
        />
        <Card
          boxSubject="Closed reports today"
          boxAmountNumber="6"
          boxInfo="and succesfully handled!"
        />
        <Card
          boxSubject="Total reports today"
          boxAmountNumber="9"
          boxInfo="That are 11 less reports then last month!"
        />
      </div>
      <ContentSubHeader title="Reports 00:00 - 23:59" />
      <ReportItems
        reportObject={items}
        filterType="filterOnDay"
        filterBy={new Date()}
      />
    </>
  );
}

export default ShiftReport;