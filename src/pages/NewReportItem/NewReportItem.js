import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Logic/context";

// Import components
import Card from "../../components/Card/Card";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";

// import scss
import "./newreportitem.scss";

// Temp import for data

// Import logic
import { currentDate } from "../../Logic/DateCheck";

import { uploadImage } from "../../Logic/base64";
import { getToken } from "../../Logic/JwtToken";

function NewReportItem({ logOut }) {
  const [image, setImage] = useState(null);
  const [locations, setLocations] = useState(null);
  const [categories, setCategories] = useState(null);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    async function getData() {
      try {
        const requestOne = await axios.get(
          "http://localhost:8080/locations",
          getToken()
        );
        const requestTwo = await axios.get(
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

  async function sendData(form) {
    try {
      const response = await axios.post(
        "http://localhost:8080/report-item",
        form,
        getToken()
      );
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  const sendFormData = async (data) => {
    delete data["upload-image"];
    data.image = image;
    console.log(data);
    console.log(image);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    sendData(jsonData);
  };

  async function imageEncode(data) {
    const imageFile = await uploadImage(data);
    setImage(imageFile);
  }

  return (
    <>
      <ContentHeader title={`Report Item ${currentDate()}`} logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <form onSubmit={handleSubmit(sendFormData)}>
        <div className="cards report-item__cards">
          <Card
            boxSubject="Creating by"
            boxAmountNumber={`${context.user.firstname} ${context.user.lastname}`}
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
                  // selected={}
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
                  // selected={}
                />
              )
            }
          />
        </div>
        <p>
          status: <label htmlFor="status"></label>
          <select
            {...register("status")}
            // defaultValue={}
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
          // defaultValue={}
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
        <input
          {...register("users.id")}
          type="hidden"
          value={context.user.id}
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

export default NewReportItem;
