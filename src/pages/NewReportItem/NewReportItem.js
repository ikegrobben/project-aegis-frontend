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
      await axios.post("http://localhost:8080/report-item", form, getToken());
      navigate(-1);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  // Delete uploaded image and add base64 encoded image.
  const sendFormData = async (data) => {
    data.image = image;
    const jsonData = JSON.stringify(data);
    sendData(jsonData);
  };

  // Change image to base64
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
            topRow="Creating by"
            middleRow={`${context.user.firstname} ${context.user.lastname}`}
          />
          <Card
            topRow="Location"
            middleRow={
              locations && (
                <DropDown
                  name="location"
                  dropDownId="location.id"
                  register={register}
                  classNameLabel="dropdown"
                  classNameDropDown="report-dropdown"
                  options={locations}
                  dropdownText="Choose a location"
                  isRequired="true"
                  errormsg={
                    errors.location && (
                      <span className="error-msg small">
                        {" "}
                        Choose a location
                      </span>
                    )
                  }
                />
              )
            }
          />
          <Card
            topRow="Category"
            middleRow={
              categories && (
                <DropDown
                  name="category"
                  dropDownId="category.id"
                  register={register}
                  classNameLabel="dropdown"
                  classNameDropDown="report-dropdown"
                  options={categories}
                  dropdownText="Choose a category"
                  isRequired="true"
                  errormsg={
                    errors.category && (
                      <span className="error-msg small">Choose a category</span>
                    )
                  }
                />
              )
            }
          />
        </div>
        <p>
          status: <label htmlFor="status"></label>
          <select
            name="status"
            {...register("status", { required: true })}
            // defaultValue={}
            className="report-dropdown"
          >
            <option value="" hidden>
              Choose a status
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <span className="error-msg"> Choose a status</span>}
        </p>

        <textarea
          className="edit-report"
          {...register("content", { required: true })}
          id="report-text"
          name="report-text"
          placeholder="Type your report here"
          // defaultValue={}
          onChange={(e) => setValue("content", e.target.value)}
        ></textarea>
        {errors.content && (
          <span className="error-msg block">
            You need to input a report text
          </span>
        )}
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
            name="Post new report"
            type="submit"
            classNameButton="btn btn--green"
          />
        </div>
      </form>
    </>
  );
}

export default NewReportItem;
