import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { getToken } from "./JwtToken";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      async function fetchUserData() {
        try {
          const response = await axios.get(
            `http://localhost:8080/user/${decodedToken.sub}`,
            getToken()
          );

          setAuth({
            ...auth,
            isAuth: true,
            user: {
              id: response.data.id,
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              username: response.data.username,
              role: capitalizeFirstLetter(response.data.role),
              position: response.data.job.name,
              enabled: response.data.enabled,
            },
            status: "done",
          });
        } catch (e) {
          console.error(e);
          console.log(e);

          if (e.response.status === 500) {
            console.log("A problem in the backend");
          } else if (e.response.status === 404) {
            console.log("404 not found");
          } else {
            console.log("Something went wrong");
          }

          setAuth({
            ...auth,
            status: "done",
          });
        }
      }

      fetchUserData();
    } else {
      setAuth({
        ...auth,
        status: "done",
      });
    }
  }, []);

  const navigate = useNavigate();

  // changes a string to first letter uppercase and other chars
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function login(jwtToken) {
    localStorage.setItem("token", jwtToken);

    const decodedToken = jwt_decode(jwtToken);

    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${decodedToken.sub}`,
          getToken()
        );

        setAuth({
          ...auth,
          isAuth: true,
          user: {
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            username: response.data.username,
            role: capitalizeFirstLetter(response.data.role),
            position: response.data.job.name,
            enabled: response.data.enabled,
          },
          status: "done",
        });
      } catch (e) {
        console.error(e);

        if (e.response.status === 500) {
          console.log("A problem in the backend");
        } else if (e.response.status === 404) {
          console.log("404 not found");
        } else {
          console.log("Something went wrong");
        }

        setAuth({
          ...auth,
          status: "done",
        });
      }
    }

    fetchUserData();

    navigate("/");
  }

  function logout() {
    setAuth({
      ...auth,
      isAuth: false,
    });
    localStorage.clear();
    navigate("/");
  }
  function autoLogout() {
    if (auth.user.enabled === false) {
      logout();
    }
  }

  const contextData = {
    isAuth: auth.isAuth,
    login: login,
    logout: logout,
    autoLogout: autoLogout,
    user: auth.user,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
