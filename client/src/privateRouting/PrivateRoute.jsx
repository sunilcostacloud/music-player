import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
