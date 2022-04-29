import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";

// import scss
import "./profileedit.scss";
import Button from "../../components/Button/Button";

// Import logics
import { getToken } from "../../Logic/JwtToken";
import { AuthContext } from "../../Logic/context";

function Profile({ logOut }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function sendData(form) {
    try {
      await axios.put(
        `http://localhost:8080/user/${context.user.id}/password`,
        form,
        getToken()
      );
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
  }

  // Check if new password and repeated new password match.
  function changePassword(data) {
    if (data.newPassword === data.repeatPassword) {
      delete data["repeatPassword"];
      const jsonData = JSON.stringify(data);
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
        <Card
          topRow="Name"
          middleRow={context.user.firstname + " " + context.user.lastname}
        />
        <Card topRow="Job position" middleRow={context.user.position} />
        <Card topRow="Aegis role" middleRow={context.user.role} />
      </div>
      <div className="password-change">
        <InputField
          classNameLabel="oldPassword"
          inputId="oldPassword"
          classNameInput="old-password__input"
          inputType="password"
          inputName="Old Password"
          requiredInput={true}
          register={register}
          errormsg={
            errors.oldPassword && (
              <span className="error-msg">Old password is required</span>
            )
          }
        />
        <InputField
          classNameLabel="newPassword"
          inputId="newPassword"
          classNameInput="new-password__input"
          inputType="password"
          inputName="New Password"
          requiredInput={true}
          register={register}
          errormsg={
            errors.newPassword && (
              <span className="error-msg">New password is required</span>
            )
          }
        />
        <InputField
          classNameLabel="repeatPassword"
          inputId="repeatPassword"
          classNameInput="repeat-password__input"
          inputType="password"
          inputName="Repeat New Password"
          requiredInput={true}
          register={register}
          errormsg={
            errors.repeatPassword && (
              <span className="error-msg">Repeat password is required</span>
            )
          }
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
