import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Import components
import Card from "../../components/Card/Card";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Button from "../../components/Button/Button";

// import scss
import "./reportitem.scss";

// Temp import for data
import items from "../../services/report.json";

// Import logic
import { getReportDate } from "../../logic/DateCheck";
import { statusCheck } from "../../logic/StatusCheck";

function ReportItem({ logOut }) {
  // * Opens an item based on ID
  const { id } = useParams();
  const navigate = useNavigate();
  const fullReportItem = items.find((reportItem) => {
    return reportItem.id === id;
  });

  return (
    <>
      <ContentHeader
        title={`Report Item - ${getReportDate(fullReportItem.date)}`}
        logOut={logOut}
      />
      <h2 className="sr-only">Statistics</h2>
      <div className="cards report-item__cards">
        <Card
          boxSubject="Created by"
          boxAmountNumber={fullReportItem.creator}
        />
        <Card boxSubject="Location" boxAmountNumber={fullReportItem.location} />
        <Card boxSubject="Category" boxAmountNumber={fullReportItem.category} />
      </div>
      <p>status: {statusCheck(fullReportItem.status)}</p>
      <article className="report-text">
        <p>{fullReportItem.content}</p>
      </article>
      {/* Add map function for showing images */}
      <div className="images">
        <div className="report-image">Placeholder 1</div>
        <div className="report-image">Placeholder 1</div>
      </div>
      <div className="buttons">
        <Button
          name="back"
          type="button"
          classNameButton="btn btn--light-blue"
          clickFunction={() => navigate(-1)}
        />
        <Link to={`/report-item/${fullReportItem.id}/edit`}>
          <Button name="edit" type="button" classNameButton="btn btn--yellow" />
        </Link>
      </div>
    </>
  );
}

export default ReportItem;
