import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import ContentSubHeader from "../../components/ContentSubHeader/ContentSubHeader";
import ReportItems from "../../components/ReportItems/ReportItems";

// Temp import for data
import { getReportDate } from "../../Logic/DateCheck";
import { countStatus } from "../../Logic/Count";
import { getToken } from "../../Logic/JwtToken";

function ShiftReport({ logOut }) {
  const [report, setReport] = useState(null);
  const [totalClosed, setTotalClosed] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:8080/report/${id}`,
          getToken()
        );
        setTotalOpen(countStatus(result.data, "Open"));
        setTotalClosed(countStatus(result.data, "Closed"));
        setTotalItems(result.data[0].reportItems.length);
        setReport(result.data[0].reportItems);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  function reportTitleDate(reportDate) {
    const date = getReportDate(new Date(reportDate));
    return "Report " + date;
  }
  return (
    report && (
      <>
        <ContentHeader
          title={reportTitleDate(report[0].reportItemDateTime)}
          logOut={logOut}
        />
        <h2 className="sr-only">Statistics</h2>
        <div className="cards">
          <Card
            topRow="Open reports today"
            middleRow={totalOpen}
            boxInfo="Pay attention to open items"
          />
          <Card
            topRow="Closed reports today"
            middleRow={totalClosed}
            boxInfo="and succesfully handled!"
          />
          <Card
            topRow="Total items reported today"
            middleRow={totalItems}
            boxInfo="That are 11 less reports then last month!"
          />
        </div>
        <ContentSubHeader title="Reports 00:00 - 23:59" display="hide" />

        <ReportItems
          reportObject={report}
          filterType="filterOnDay"
          filterBy={new Date(report[0].reportItemDateTime)}
          sortType="date"
          sortBy="latest first"
        />
      </>
    )
  );
}

export default ShiftReport;
