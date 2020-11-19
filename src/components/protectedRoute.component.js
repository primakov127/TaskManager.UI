import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthService from "../services/auth.service";

export default function ProtectedRoute({
  component: Component,
  allowed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes(allowed)) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
