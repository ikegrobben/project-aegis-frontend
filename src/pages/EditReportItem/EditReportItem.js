import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { uploadImage } from "../../logic/base64";
import { getToken } from "../../logic/JwtToken";

function EditReportItem({ logOut }) {
  // * Opens an item based on ID

  const [report, setReport] = useState(null);
  const [image, setImage] = useState(null);
  const [locations, setLocations] = useState(null);
  const [categories, setCategories] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onBlur" });

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

  useEffect(() => {
    async function getData() {
      try {
        const requestOne = axios.get(
          "http://localhost:8080/locations",
          getToken()
        );
        const requestTwo = axios.get(
          "http://localhost:8080/categories",
          getToken()
        );

        axios.all([requestOne, requestTwo]).then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            setLocations(responseOne.data);
            setCategories(responseTwo.data);
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  async function updateData(form) {
    try {
      const res = await axios.put(
        `http://localhost:8080/report-item/${id}`,
        form,
        getToken()
      );
      console.log(res);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  }

  const updateReport = async (data) => {
    delete data["upload-image"];
    data.image = image;
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    updateData(jsonData);
  };

  async function imageEncode(data) {
    const imageFile = await uploadImage(data);
    setImage(imageFile);
  }

  return (
    report && (
      <>
        <ContentHeader
          title={`Report Item - ${getReportDate(report.reportItemDateTime)}`}
          logOut={logOut}
        />
        <h2 className="sr-only">Statistics</h2>
        <form onSubmit={handleSubmit(updateReport)}>
          <div className="cards report-item__cards">
            <Card
              boxSubject="Created by"
              boxAmountNumber={`${report.user.firstname} ${report.user.lastname}`}
            />
            <Card
              boxSubject="Location"
              boxAmountNumber={
                locations && (
                  <DropDown
                    dropDownId="location.id"
                    register={register}
                    classNameLabel="dropdown"
                    classNameDropDown="report-dropdown"
                    options={locations}
                    // selected={report.location.location}
                  />
                )
              }
            />
            <Card
              boxSubject="Category"
              boxAmountNumber={
                categories && (
                  <DropDown
                    dropDownId="category.id"
                    register={register}
                    classNameLabel="dropdown"
                    classNameDropDown="report-dropdown"
                    options={categories}
                    // selected={report.category.category}
                  />
                )
              }
            />
          </div>
          <p>
            status: <label htmlFor="status"></label>
            <select
              {...register("status")}
              defaultValue={report.status}
              className="report-dropdown"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </p>

          <textarea
            className="edit-report"
            {...register("content")}
            id="report-text"
            name="report-text"
            defaultValue={report.content}
            onChange={(e) => setValue("content", e.target.value)}
          ></textarea>
          <label htmlFor="image-upload"></label>
          <input
            {...register("upload-image")}
            id="image-upload"
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => imageEncode(e)}
          />

          <div className="buttons">
            <Button
              name="back"
              type="button"
              classNameButton="btn btn--light-blue"
            />
            <Button
              name="save changes"
              type="submit"
              classNameButton="btn btn--green"
            />
          </div>
        </form>
      </>
    )
  );
}

export default EditReportItem;
