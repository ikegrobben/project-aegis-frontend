import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function LoginPrivateRoute({ authenticated }) {
  return !authenticated ? <Outlet /> : <Navigate to="/" />;
}

export default LoginPrivateRoute;
