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
import MonthlyReport from "./pages/MonthlyReport/MonthlyReport";
import AllReports from "./pages/AllReports/AllReports";
import ReportItem from "./pages/ReportItem/ReportItem";
import EditReportItem from "./pages/EditReportItem/EditReportItem";
import NewReportItem from "./pages/NewReportItem/NewReportItem";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import NewProfile from "./pages/NewProfile/NewProfile";

// Import scss files
import "./App.scss";

function App() {
  // TODO - Login functionality with backend
  // * - Login check because there is no backend yet.

  const [isAuthenticated, toggleIsAuthenticated] = useState(true);

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
                path="/report/:id"
                element={<ShiftReport logOut={logOut} />}
              />
              <Route
                path="/monthly-report"
                element={<MonthlyReport logOut={logOut} />}
              />
              <Route
                path="/all-reports"
                element={<AllReports logOut={logOut} />}
              />
              <Route
                path="/create-report-item"
                element={<NewReportItem logOut={logOut} />}
              />
              <Route
                path="/report-item/:id"
                element={<ReportItem logOut={logOut} />}
              />
              <Route
                path="/report-item/:id/edit"
                element={<EditReportItem logOut={logOut} />}
              />
              <Route path="/profile" element={<Profile logOut={logOut} />} />
              <Route
                path="/profile/edit"
                element={<ProfileEdit logOut={logOut} />}
              />
              <Route
                path="/add-employee"
                element={<NewProfile logOut={logOut} />}
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
