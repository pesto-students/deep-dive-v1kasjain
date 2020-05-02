import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./DashBoard";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/landing" render={App} />
      <Route path="/home" render={DashBoard} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
