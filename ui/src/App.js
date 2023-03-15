import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CircleSpinner from "./components/CircleSpinner/CircleSpinner";
import ProtectedRoute from "./auth/protected-route";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <CircleSpinner loading={isLoading} />;
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <h1 style={{ padding: "20px" }}>
            {isAuthenticated
              ? "You are authenticated."
              : "You are not authenticated."}
          </h1>
        }
      />
      <Route
        path="/callback"
        element={
          <ProtectedRoute component={<h1>This is your callback page</h1>} />
        }
      />
    </Routes>
  );
};

export default App;
