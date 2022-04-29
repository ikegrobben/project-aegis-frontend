import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

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
import { AuthContext } from "./Logic/context";

function App() {
  const { isAuth, logout } = useContext(AuthContext);
  // TODO - Login functionality with backend
  // * - Login check because there is no backend yet.

  return (
    <>
      <Navigation authenticated={isAuth} />
      <main className="main-content">
        <Routes>
          <Route element={<LoginPrivateRoute authenticated={isAuth} />}>
            <Route path="/login" element={<Login authenticated={isAuth} />} />
          </Route>
          <Route element={<PrivateRoute authenticated={isAuth} />}>
            <Route path="/" element={<Dashboard logOut={logout} />} />
            <Route
              path="/report/:id"
              element={<ShiftReport logOut={logout} />}
            />
            <Route
              path="/monthly-report"
              element={<MonthlyReport logOut={logout} />}
            />
            <Route
              path="/all-reports"
              element={<AllReports logOut={logout} />}
            />
            <Route
              path="/create-report-item"
              element={<NewReportItem logOut={logout} />}
            />
            <Route
              path="/report-item/:id"
              element={<ReportItem logOut={logout} />}
            />
            <Route
              path="/report-item/:id/edit"
              element={<EditReportItem logOut={logout} />}
            />
            <Route path="/profile" element={<Profile logOut={logout} />} />
            <Route
              path="/profile/edit"
              element={<ProfileEdit logOut={logout} />}
            />
            <Route
              path="/add-employee"
              element={<NewProfile logOut={logout} />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
