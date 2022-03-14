import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute({ authenticated }) {
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
