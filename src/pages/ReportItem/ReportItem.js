import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

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
import { getImage } from "../../logic/base64";

function ReportItem({ logOut }) {
  // * Opens an item based on ID
  const [report, setReport] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:8080/report-item/${id}`
        );
        console.log(result.data);
        setReport(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    report && (
      <>
        <ContentHeader
          title={`Report Item - ${getReportDate(report.reportItemDateTime)}`}
          logOut={logOut}
        />
        <h2 className="sr-only">Statistics</h2>
        <div className="cards report-item__cards">
          <Card boxSubject="Created by" boxAmountNumber="Name" />
          <Card boxSubject="Location" boxAmountNumber={report.location.name} />
          <Card boxSubject="Category" boxAmountNumber={report.category.name} />
        </div>
        <p>status: {statusCheck(report.status)}</p>
        <article className="report-text">
          <p>{report.content}</p>
        </article>
        {/* Add map function for showing images */}
        <div className="images">
          <div className="report-image">
            <img src={getImage(report.image)}></img>
          </div>
        </div>
        <div className="buttons">
          <Button
            name="back"
            type="button"
            classNameButton="btn btn--light-blue"
            clickFunction={() => navigate(-1)}
          />
          <Link to={`/report-item/${report.id}/edit`}>
            <Button
              name="edit"
              type="button"
              classNameButton="btn btn--yellow"
            />
          </Link>
        </div>
      </>
    )
  );
}

export default ReportItem;
