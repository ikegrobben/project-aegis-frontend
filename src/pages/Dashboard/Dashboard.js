import React from "react";
import { Link } from "react-router-dom";

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
      <ReportItems
        reportObject={items}
        filterType="filterOnStatus"
        filterBy="open"
        sortType="date"
        sortBy="latest first"
      />
      <div className="dashboard__buttons">
        <Link to="/monthly-report">
          <Button
            name="See Monthly report"
            type="button"
            classNameButton="btn btn--light-blue"
          />
        </Link>
        <Link to="/shift-report">
          <Button
            name="See todays report"
            type="button"
            classNameButton="btn btn--light-blue"
          />
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
