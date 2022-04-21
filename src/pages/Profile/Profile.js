import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";

// import scss
import "./profile.scss";
import Button from "../../components/Button/Button";

// import temp db
import users from "../../services/employees.json";

function Profile({ logOut }) {
  const navigate = useNavigate();

  return (
    <>
      <ContentHeader title="Profile" logOut={logOut} />
      <h2 className="sr-only">Statistics</h2>
      <div className="profile-cards cards">
        <Card boxSubject="Name" boxAmountNumber="Ike Grobben" />
        <Card boxSubject="Job position" boxAmountNumber="Security Guard" />
        <Card boxSubject="At location" boxAmountNumber="Novi" />
      </div>
      {/* IF ADMIN */}
      <h3 className="h3-employees">Employees</h3>
      <div className="cards employees">
        {users.map((user) => {
          return (
            <Card
              uniqueKey={user.id}
              boxSubject={user.job}
              boxAmountNumber={user.name}
              boxInfo={
                <Link className="delete " to="/delete">
                  Delete
                </Link>
              }
            />
          );
        })}
      </div>
      <div className="buttons">
        <Button
          name="Change password"
          type="button"
          classNameButton="btn btn--light-blue"
          clickFunction={() => navigate("/profile/edit")}
        />
        {/* IF ADMIN */}
        <Button
          name="Add employee"
          type="button"
          classNameButton="btn btn--green"
          clickFunction={() => navigate("/add-employee")}
        />
      </div>
    </>
  );
}

export default Profile;
