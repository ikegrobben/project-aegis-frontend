import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Routes
import PrivateRoute from "./routes/PrivateRoutes/PrivateRoutes";
import LoginPrivateRoute from "./routes/PrivateRoutes/LoginPrivateRouters";

// Import layouts
import Navigation from "./layouts/Navigation/Navigation";
import Footer from "./layouts/Footer/Footer";

// Import pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ShiftReport from "./pages/ShiftReport/ShiftReport";

// Import scss files
import "./assets/css/App.scss";

function App() {
  // Login check because there is no backend yet.
  const [isAuthenticated, toggleIsAuthenticated] = useState(false);

  function logOut() {
    console.log("logout");
    toggleIsAuthenticated(!isAuthenticated);
  }

  return (
    <>
      <BrowserRouter>
        <Navigation authenticated={isAuthenticated} />
        <main className="main-content">
          <Routes>
            <Route
              element={<LoginPrivateRoute authenticated={isAuthenticated} />}
            >
              <Route
                path="/login"
                element={
                  <Login
                    authenticated={isAuthenticated}
                    toggleAuthenticated={toggleIsAuthenticated}
                  />
                }
              />
            </Route>
            <Route element={<PrivateRoute authenticated={isAuthenticated} />}>
              <Route path="/" element={<Dashboard logOut={logOut} />} />
              <Route
                path="/shift-report"
                element={<ShiftReport logOut={logOut} />}
              />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
