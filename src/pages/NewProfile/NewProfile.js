import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import DropDown from "../../components/DropDown/DropDown";

// import scss
import "./newprofile.scss";

// import Logic
import { getToken } from "../../Logic/JwtToken";

function Profile({ logOut }) {
  const [positions, setPositions] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(
          "http://localhost:8080/positions",
          getToken()
        );
        setPositions(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  async function sendData(form) {
    try {
      await axios.post("http://localhost:8080/create-user", form, getToken());
      navigate(-1);
    } catch (e) {
      if (e.response.status === 409) {
        console.log("Username alreade exists");
      }
      console.error(e);
    }
  }

  function addEmployee(data) {
    const jsonData = JSON.stringify(data);
    sendData(jsonData);
  }
  return (
    <>
      <ContentHeader title="Add employee" logOut={logOut} />
      <div className="form-container">
        <form className="employee-form">
          <div className="add-employee">
            <InputField
              classNameLabel="username"
              inputId="username"
              classNameInput="Username__input"
              inputType="text"
              inputName="Username"
              register={register}
              requiredInput={true}
              errormsg={
                errors.username && (
                  <span className="error-msg">Username is required</span>
                )
              }
            />
            <InputField
              classNameLabel="password"
              inputId="password"
              classNameInput="password__input"
              inputType="password"
              inputName="Create Password"
              register={register}
              requiredInput={true}
              errormsg={
                errors.password && (
                  <span className="error-msg">Password is required</span>
                )
              }
            />
            <InputField
              classNameLabel="firstname"
              inputId="firstname"
              classNameInput="firstname__input"
              inputType="firstname"
              inputName="Firstname"
              register={register}
              requiredInput={true}
              errormsg={
                errors.firstname && (
                  <span className="error-msg">Firstname is required</span>
                )
              }
            />
            <InputField
              classNameLabel="lastname"
              inputId="lastname"
              classNameInput="lastname__input"
              inputType="lastname"
              inputName="Lastname"
              register={register}
              requiredInput={true}
              errormsg={
                errors.lastname && (
                  <span className="error-msg">Lastname is required</span>
                )
              }
            />
            {positions && (
              <DropDown
                name="job"
                dropDownId="job.id"
                register={register}
                classNameLabel="dropdown"
                classNameDropDown="report-dropdown"
                options={positions}
                dropdownText="Choose a position"
                isRequired="true"
                errormsg={
                  errors.job && (
                    <span className="error-msg">Choose a Position</span>
                  )
                }
              />
            )}
            <label id="userlevel" htmlFor="role.id"></label>
            <select
              name="role"
              className="report-dropdown"
              {...register("role", { required: true })}
            >
              <option value="" hidden>
                Choose a user level
              </option>
              <option value="USER">User</option>
              <option value="ADMIN">admin</option>
            </select>
            {errors.role && (
              <span className="error-msg">Choose a user level</span>
            )}
          </div>
          <div className="buttons">
            <Button
              name="Add employee"
              type="button"
              classNameButton="btn btn--green"
              clickFunction={handleSubmit(addEmployee)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
