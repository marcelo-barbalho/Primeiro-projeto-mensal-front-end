import React from "react";
import { isAuth } from "./config/auth";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./config/history";
import viewUser from "./views/user";
import viewLogin from "./views/login";
import UCreate from "./views/Create";

const CustomRoute = ({ ...rest }) => {
  if (!isAuth()) {
    return <Redirect to="login" />;
  }
  return <Route {...rest} />;
};

const Routers = () => (
  <Router history={history}>
    <Switch>
      <Route path={"/login"} component={viewLogin} />
      <Route path={"/create"} component={UCreate} />
      <CustomRoute path={"/"} component={viewUser} />
    </Switch>
  </Router>
);
export default Routers;
