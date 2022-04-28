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
    // We zijn opnieuw opgestart
    // Hebben we een token in de local storage staan? En is deze nog geldig?
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);

      // Is de token nog geldig? Decodeer de token en check de exp key en vergelijk dit met new Date();
      // dan halen we data op
      async function fetchUserData() {
        try {
          const response = await axios.get(
            `http://localhost:8080/user/${decodedToken.sub}`,
            getToken()
          );

          console.log(response.data);

          // zet de gegevens van de gebruiker in de state!
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
            console.log("De server deed het niet");
          } else if (e.response.status === 404) {
            console.log("De developer heeft iets doms gedaan in het request");
          } else {
            console.log("Het ging mis. Geen idee wat.");
          }

          // ging het ophalen mis? Dan behouden we de initiele state, maar zetten de status op 'done'
          setAuth({
            ...auth,
            status: "done",
          });
        }
      }

      fetchUserData();
    } else {
      // Geen token? We behouden de initiele state, maar zetten de status op 'done'
      setAuth({
        ...auth,
        status: "done",
      });
    }
  }, []);

  const navigate = useNavigate();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function login(jwtToken) {
    // 1. We ontvangen de token. Zet de token in de localStorage:
    localStorage.setItem("token", jwtToken);

    // 2. We willen weten wat er allemaal te vinden is in deze token, dus we decoden hem:
    const decodedToken = jwt_decode(jwtToken);
    console.log(decodedToken);

    // TODO -------------------------------
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${decodedToken.sub}`,
          getToken()
        );

        console.log(response.data);

        // zet de gegevens van de gebruiker in de state!
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
          console.log("De server deed het niet");
        } else if (e.response.status === 404) {
          console.log("De developer heeft iets doms gedaan in het request");
        } else {
          console.log("Het ging mis. Geen idee wat.");
        }

        // ging het ophalen mis? Dan behouden we de initiele state, maar zetten de status op 'done'
        setAuth({
          ...auth,
          status: "done",
        });
      }
    }

    fetchUserData();
    // TODO -------------------------------

    // 3. Zet de user-info die je hebt opgehaald in de context-state:
    console.log("Gebruiker is ingelogd!");

    navigate("/");
  }

  function logout() {
    console.log("Gebruiker is uitgelogd!");
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
