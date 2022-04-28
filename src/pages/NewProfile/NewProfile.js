import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

// import scss
import "./newprofile.scss";

// import temp db
import users from "../../services/employees.json";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import { getToken } from "../../Logic/JwtToken";
import DropDown from "../../components/DropDown/DropDown";

function Profile({ logOut }) {
  const [positions, setPositions] = useState();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(
          "http://localhost:8080/positions",
          getToken()
        );
        console.log(result);
        setPositions(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  async function sendData(form) {
    try {
      const response = await axios.post(
        "http://localhost:8080/create-user",
        form,
        getToken()
      );
      console.log(response);
      navigate(-1);
    } catch (e) {
      if (e.response.status === 409) {
        console.log("Username alreade exists");
      }
      console.error(e);
    }
  }

  function addEmployee(data) {
    console.log(data);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
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
            />
            <InputField
              classNameLabel="password"
              inputId="password"
              classNameInput="password__input"
              inputType="password"
              inputName="Create Password"
              register={register}
            />
            <InputField
              classNameLabel="firstname"
              inputId="firstname"
              classNameInput="firstname__input"
              inputType="firstname"
              inputName="Firstname"
              register={register}
            />
            <InputField
              classNameLabel="lastname"
              inputId="lastname"
              classNameInput="lastname__input"
              inputType="lastname"
              inputName="Lastname"
              register={register}
            />
            {positions && (
              <DropDown
                dropDownId="job.id"
                register={register}
                classNameLabel="dropdown"
                classNameDropDown="report-dropdown"
                options={positions}
                // selected={}
              />
            )}
            <label id="userlevel" htmlFor="role.id"></label>
            <select className="report-dropdown" {...register("role")}>
              <option defaultValue="Choose a user level" hidden>
                Choose a user level
              </option>
              <option value="USER">User</option>
              <option value="ADMIN">admin</option>
            </select>
            <label id="location"></label>
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
