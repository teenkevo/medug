import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircleSpinner from "../components/CircleSpinner/CircleSpinner";

const ProtectedRoute = ({ component }) =>
  withAuthenticationRequired(component, {
    onRedirecting: () => <CircleSpinner />,
  });

export default ProtectedRoute;
