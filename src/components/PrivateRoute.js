import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../App";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return loggedInUser.name ? (
    children
  ) : (
    <Navigate to="/account" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
