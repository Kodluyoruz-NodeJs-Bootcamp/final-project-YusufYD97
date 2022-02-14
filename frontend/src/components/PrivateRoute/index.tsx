import React from "react";
import { Route, Navigate } from "react-router-dom";

export interface IPrivateRoute {}

const PrivateRoute: React.FC<IPrivateRoute> = ({ ...props }) => {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
