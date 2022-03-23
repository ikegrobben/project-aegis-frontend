import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import components
import Card from "../../components/Card/Card";
import ContentHeader from "../../components/ContentHeader/ContentHeader";

// import scss
import "./reportitem.scss";

// Temp import for data
import items from "../../services/report.json";

function ReportItem({ logOut }) {
  const { id } = useParams();
  const fullReportItem = items.find((reportItem) => {
    return reportItem.id === id;
  });

  const navigate = useNavigate();

  return (
    <div>
      <ContentHeader
        title={`Report Item - ${fullReportItem.date}<h2>${fullReportItem.status}</h2>`}
        logOut={logOut}
      />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards report-item__cards">
        <Card
          boxSubject="Created by"
          boxAmountNumber={fullReportItem.creator}
          boxInfo=""
        />
        <Card
          boxSubject="Location"
          boxAmountNumber={fullReportItem.location}
          boxInfo=""
        />
        <Card
          boxSubject="Category"
          boxAmountNumber={fullReportItem.category}
          boxInfo=""
        />
      </div>
      <h1>{fullReportItem.creator}</h1>
      <p>{fullReportItem.content}</p>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
}

export default ReportItem;
