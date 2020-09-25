import React, { useEffect, useState } from "react";
import Layout from "../components/layout/";
import UserList from "../components/list";
import jwt from "jsonwebtoken";
import { Route, Switch, Redirect } from "react-router-dom";
import { getToken } from "../config/auth";

const User = () => {
  const [useInfo, setuseInfo] = useState({});
  useEffect(() => {
    (async () => {
      const user = await jwt.decode(getToken());
      setuseInfo(user);
    })();
    return () => {};
  }, []);

  return (
    <Layout>
      <Switch>
        <Route exact match path="/list" component={UserList} />
      </Switch>
    </Layout>
  );
};
export default User;
