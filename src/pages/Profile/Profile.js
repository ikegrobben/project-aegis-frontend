import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import Card from "../../components/Card/Card";

// import scss
import "./profile.scss";
import Button from "../../components/Button/Button";

// import temp db
import { AuthContext } from "../../Logic/context";
import { getToken } from "../../Logic/JwtToken";
import { SortItems } from "../../Logic/FilterSortItems";

function Profile({ logOut }) {
  const [allUsers, setAllUsers] = useState(null);
  const [userId, setUserId] = useState();
  const { logout } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const didMount = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:8080/users",
          getToken()
        );
        const users = result.data;
        SortItems(users, "enabled", "enabled first");
        setAllUsers(users);
      } catch (e) {
        if (e.response.status === 403) {
          console.log("You are not allowed to see all users");
        } else {
          console.log("Uhoh something went wrong");
        }
      }
    }
    fetchData();
  }, []);

  // Useeffect with a build in mount reject. so on initial load nothing happens
  useEffect(() => {
    if (didMount.current) {
      async function deleteUser() {
        try {
          await axios.put(
            `http://localhost:8080/user/${userId}/active-state-change`,
            null,
            getToken()
          );
          navigate(0);
        } catch (e) {
          console.error(e);
        }
      }
      deleteUser();
    } else {
      didMount.current = true;
    }
  }, [userId, navigate]);

  if (context.user.enabled === false) {
    logout();
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
      {/* if Admin you can see the cards below else return nothing.*/}
      {context.user.role === "Admin" ? (
        <>
          <h3 className="h3-employees">Employees</h3>
          <div className="cards employees">
            {allUsers &&
              allUsers.map((user) => {
                if (user.enabled === false) {
                  return (
                    <Card
                      key={user.id}
                      topRow={user.job.name}
                      middleRow={`${user.firstname} ${user.lastname}`}
                      boxInfo={
                        // Only allow this button if your not the user. Else give null because if your acc is deactivated you can't login.
                        user.id !== context.user.id ? (
                          <button
                            className="reactivate"
                            onClick={() => setUserId(user.id)}
                          >
                            Reactivate user
                          </button>
                        ) : null
                      }
                    />
                  );
                } else {
                  return (
                    <Card
                      key={user.id}
                      topRow={user.job.name}
                      middleRow={`${user.firstname} ${user.lastname}`}
                      boxInfo={
                        // Only allow this button if its not the logged in user, else return a disabled button.
                        user.id !== context.user.id ? (
                          <button
                            className="delete "
                            onClick={() => setUserId(user.id)}
                          >
                            Deactivate user
                          </button>
                        ) : (
                          <button disabled className="greyed">
                            Deactivate user
                          </button>
                        )
                      }
                    />
                  );
                }
              })}
          </div>
        </>
      ) : null}
      <div className="buttons">
        <Button
          name="Change password"
          type="button"
          classNameButton="btn btn--light-blue"
          clickFunction={() => navigate("/profile/edit")}
        />
        {/* Only Admins can add employees */}
        {context.user.role === "Admin" ? (
          <Button
            name="Add employee"
            type="button"
            classNameButton="btn btn--green"
            clickFunction={() => navigate("/add-employee")}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Profile;
