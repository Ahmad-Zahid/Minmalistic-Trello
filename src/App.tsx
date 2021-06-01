// Packages
import { ReactElement } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Board from "./components/Board";
import Welcome from "./components/Welcome";

// Navigation
import { ProvideAuth } from "./navigation";
import { PrivateRoute } from "./navigation/PrivateRoute";
import { PublicRoute } from "./navigation/PublicRoute";

// Constants
import { routes } from "./constants/routes";

export default function App(): ReactElement {
  return (
    <ProvideAuth>
      <Router>
        <PublicRoute>
          <Route path={routes.welcome} exact component={Welcome} />
        </PublicRoute>
        <PrivateRoute>
          <Route path={routes.board} component={Board} />
        </PrivateRoute>
      </Router>
    </ProvideAuth>
  );
}
