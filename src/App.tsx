// Packages
import { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";


// Components
import Board from "./components/Board";
import Welcome from "./components/Welcome";

// Navigation
import { ProvideAuth } from "./routes";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

// Constants
import { routes } from "./constants/routes";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { config } from "./service/firebaseConfig";

export default function App(): ReactElement {
  return (
    <ProvideAuth>
      <FirebaseAuthProvider firebase={firebase} {...config}>
      <Router>
        <PublicRoute>
          <Route path={routes.welcome} exact component={Welcome} />
        </PublicRoute>
        <PrivateRoute>
          <Route path={routes.board} component={Board} />
        </PrivateRoute>
      </Router>
      </FirebaseAuthProvider>

    </ProvideAuth>
  );
}
