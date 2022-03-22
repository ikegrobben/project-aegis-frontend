import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Temp import for data
import items from "../../services/report.json";

function ReportItem() {
  const { id } = useParams();
  const fullReportItem = items.find((reportItem) => {
    return reportItem.id === id;
  });

  const navigate = useNavigate();

  return (
    <div>
      <h1>{fullReportItem.creator}</h1>
      <p>{fullReportItem.content}</p>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
}

export default ReportItem;
