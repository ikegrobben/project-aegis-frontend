import React from "react";
import { useParams } from "react-router-dom";

// Temp import for data
import items from "../../services/report.json";

function ReportItem() {
  const { id } = useParams();
  const fullReportItem = items.find((reportItem) => {
    return reportItem.id === id;
  });

  return (
    <div>
      <h1>{fullReportItem.creator}</h1>
      <p>{fullReportItem.content}</p>
    </div>
  );
}

export default ReportItem;
