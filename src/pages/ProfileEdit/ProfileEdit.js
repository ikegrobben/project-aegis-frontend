import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";

// import scss
import "./profileedit.scss";
import Button from "../../components/Button/Button";

// import temp db
import users from "../../services/employees.json";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import { getToken } from "../../logic/JwtToken";
import { AuthContext } from "../../logic/context";

function Profile({ logOut }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function sendData(form) {
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${context.user.id}/password`,
        form,
        getToken()
      );
      console.log(response);
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
  }

  function changePassword(data) {
    if (data.newPassword === data.repeatPassword) {
      delete data["repeatPassword"];
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
      sendData(jsonData);
    } else {
      console.log("Password doesn't match");
    }
  }
  return (
    <>
      <ContentHeader title="Profile" logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="profile-cards cards">
        <Card boxSubject="Name" boxAmountNumber="Ike Grobben" />
        <Card boxSubject="Job position" boxAmountNumber="Security Guard" />
        <Card boxSubject="At location" boxAmountNumber="Novi" />
      </div>
      <div className="password-change">
        <InputField
          classNameLabel="oldPassword"
          inputId="oldPassword"
          classNameInput="old-password__input"
          inputType="password"
          inputName="Old Password"
          register={register}
        />
        <InputField
          classNameLabel="newPassword"
          inputId="newPassword"
          classNameInput="new-password__input"
          inputType="password"
          inputName="New Password"
          register={register}
        />
        <InputField
          classNameLabel="repeatPassword"
          inputId="repeatPassword"
          classNameInput="repeat-password__input"
          inputType="password"
          inputName="Repeat New Password"
          register={register}
        />
      </div>
      <div className="buttons">
        <Button
          name="Save"
          type="button"
          classNameButton="btn btn--green"
          clickFunction={handleSubmit(changePassword)}
        />
      </div>
    </>
  );
}

export default Profile;
