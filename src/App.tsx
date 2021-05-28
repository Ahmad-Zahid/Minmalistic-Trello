import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Board from './components/Board'
import Main from './components/Main'
export default function App(): React.ReactElement {
  return (
    <Router>
        <Route path="/" exact component={Main} />
        <Route path="/board" component={Board} />
    </Router>
  );
}
