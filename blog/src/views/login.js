import React from "react";
import LoginPage from "../components/login";
import { Route, Switch } from "react-router-dom";
import Layout from "../components/layout";

const Login = () => {
  return (
    <Layout>
      <Switch>
        <LoginPage />
      </Switch>
    </Layout>
  );
};
export default Login;
