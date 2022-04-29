import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// Import components
import Card from "../../components/Card/Card";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Button from "../../components/Button/Button";

// import scss
import "./ReportItem.scss";

// Import logic
import { getReportDate } from "../../Logic/DateCheck";
import { statusCheck } from "../../Logic/StatusCheck";
import { getImage } from "../../Logic/base64";
import { getToken } from "../../Logic/JwtToken";
import { AuthContext } from "../../Logic/context";

function ReportItem({ logOut }) {
  // * Opens an item based on ID
  const [report, setReport] = useState(null);
  const { id } = useParams();
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:8080/report-item/${id}`,
          getToken()
        );
        setReport(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  async function deleteItem() {
    try {
      await axios.delete(
        `http://localhost:8080/report-item/${id}/delete`,
        getToken()
      );
    } catch (error) {
      console.error(error);
    }
    navigate(-1);
  }

  return (
    report && (
      <>
        <ContentHeader
          title={`Report Item - ${getReportDate(report.reportItemDateTime)}`}
          logOut={logOut}
        />
        <h2 className="sr-only">Statistics</h2>
        <div className="cards report-item__cards">
          <Card
            topRow="Created by"
            middleRow={`${report.users.firstname} ${report.users.lastname}`}
          />
          <Card topRow="Location" middleRow={report.location.name} />
          <Card topRow="Category" middleRow={report.category.name} />
        </div>
        {/* Only users that made the report item or Admins can delete the report item */}
        {context.user.username === report.users.username ||
        context.user.role === "Admin" ||
        moment(report.reportItemDateTime).format("YYYY-MM-DD") ===
          moment(new Date()).format("YYYY-MM-DD") ? (
          <div className="stat-del">
            <p>status: {statusCheck(report.status)}</p>
            <button className="delete" onClick={() => deleteItem()}>
              Delete item
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <article className="report-text">
          <p>{report.content}</p>
        </article>
        {/* Add map function for showing images */}
        <div className="images">
          <div className="report-image">
            {report.image !== null ? (
              <img
                src={getImage(report.image)}
                alt={report.reportItemDateTime}
              ></img>
            ) : null}
          </div>
        </div>
        <div className="buttons">
          <Button
            name="back"
            type="button"
            classNameButton="btn btn--light-blue"
            clickFunction={() => navigate(-1)}
          />
          {moment(report.reportItemDateTime).format("YYYY-MM-DD") ===
          moment(new Date()).format("YYYY-MM-DD") ? (
            <Link to={`/report-item/${report.id}/edit`}>
              <Button
                name="edit"
                type="button"
                classNameButton="btn btn--yellow"
              />
            </Link>
          ) : null}
        </div>
      </>
    )
  );
}

export default ReportItem;
