// Packages
import { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";

// Constants
import { routes } from "../constants/routes";

export function PrivateRoute({
    children,
    ...rest
  }: {
    children: any;
  }): ReactElement {
    return (
      <Route
        {...rest}
        render={() =>
          localStorage.getItem("user") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: routes.welcome,
              }}
            />
          )
        }
      />
    );
  }
  
  