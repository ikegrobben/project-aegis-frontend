import React from "react";
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

function Profile({ logOut }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  function addEmployee() {
    navigate(-1);
  }
  return (
    <>
      <ContentHeader title="Add employee" logOut={logOut} />
      <div className="form-container">
        <form className="employee-form">
          <div className="add-employee">
            <InputField
              classNameLabel="fullname"
              inputId="fullname"
              classNameInput="fullname__input"
              inputType="text"
              inputName="Fullname"
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
            <label id="job"></label>
            <select>
              <option value="" disabled selected hidden>
                Choose a job
              </option>
              <option value="teamLeader">Team leader</option>
              <option value="securityGuard">Security Guard</option>
            </select>
            <label id="userlevel"></label>
            <select>
              <option value="" disabled selected hidden>
                Choose a user level
              </option>
              <option value="user">User</option>
              <option value="Admin">admin</option>
            </select>
            <label id="location"></label>
            <select>
              <option value="" disabled selected hidden>
                Choose a location
              </option>
              <option value="novi">Novi</option>
              <option value="krasnapolsky">Krasnapolsky</option>
              <option value="nhDoelen">NH Doelen</option>
            </select>
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
