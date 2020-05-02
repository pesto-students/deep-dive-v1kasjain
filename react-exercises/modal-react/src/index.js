import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./Component/DashBoard";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/dashboard" render={DashBoard} />
      <Route path="/" render={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
