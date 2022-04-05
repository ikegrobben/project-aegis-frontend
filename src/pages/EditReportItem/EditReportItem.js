import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Import components
import Card from "../../components/Card/Card";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";

// import scss
import "./editreportitem.scss";

// Temp import for data
import items from "../../services/report.json";
import locations from "../../services/location.json";
import categories from "../../services/category.json";

// Import logic
import { getReportDate } from "../../logic/DateCheck";

function EditReportItem({ logOut }) {
  // * Opens an item based on ID
  const { id } = useParams();
  const navigate = useNavigate();
  const fullReportItem = items.find((reportItem) => {
    return reportItem.id === id;
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onBlur" });

  function sendData(data) {
    console.log(data.reportItem);
    navigate(-1);
  }

  return (
    <>
      <ContentHeader
        title={`Report Item - ${getReportDate(fullReportItem.date)}`}
        logOut={logOut}
      />
      <h2 className="sr-only">Statistics</h2>
      <form onSubmit={handleSubmit(sendData)}>
        <div className="cards report-item__cards">
          <Card
            boxSubject="Created by"
            boxAmountNumber={fullReportItem.creator}
          />
          <Card
            boxSubject="Location"
            boxAmountNumber={
              <DropDown
                dropDownId="chooseLocation"
                register={register}
                classNameLabel="dropdown"
                classNameDropDown="report-dropdown"
                options={locations}
                selected={fullReportItem.location}
              />
            }
          />
          <Card
            boxSubject="Category"
            boxAmountNumber={
              <DropDown
                dropDownId="chooseCategory"
                register={register}
                classNameLabel="dropdown"
                classNameDropDown="report-dropdown"
                options={categories}
                selected={fullReportItem.category}
              />
            }
          />
        </div>
        <p>
          status: <label htmlFor="status"></label>
          <select
            {...register("status")}
            defaultValue={fullReportItem.status}
            className="report-dropdown"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </p>

        <textarea
          {...register("reportItem")}
          id="report-text"
          name="report-text"
          defaultValue={fullReportItem.content}
          onChange={(e) => setValue("reportItem", e.target.value)}
        ></textarea>
        <label htmlFor="image-upload"></label>
        <input
          {...register("upload-image")}
          id="image-upload"
          type="file"
          accept="image/png, image/jpeg"
          multiple
        />

        <div className="buttons">
          <Button
            name="back"
            type="button"
            classNameButton="btn btn--light-blue"
            clickFunction={() => navigate(-1)}
          />
          <Button
            name="save changes"
            type="submit"
            classNameButton="btn btn--green"
          />
        </div>
      </form>
    </>
  );
}

export default EditReportItem;
