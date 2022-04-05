import React from "react";
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

function Profile({ logOut }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
          classNameLabel="old-password"
          inputId="old-password"
          classNameInput="old-password__input"
          inputType="password"
          inputName="Old Password"
          register={register}
        />
        <InputField
          classNameLabel="new-password"
          inputId="new-password"
          classNameInput="new-password__input"
          inputType="password"
          inputName="New Password"
          register={register}
        />
        <InputField
          classNameLabel="repeat-password"
          inputId="repeat-password"
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
          clickFunction={() => navigate("/profile")}
        />
      </div>
    </>
  );
}

export default Profile;
