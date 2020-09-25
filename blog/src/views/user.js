import React, { useEffect, useState } from "react";
import Layout from "../components/layout/";
import UserList from "../components/list";
import AddUser from "../components/addUser";
import jwt from "jsonwebtoken";
import { Route, Switch } from "react-router-dom";
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
    <Layout info={useInfo}>
      <Switch>
        <Route exact match path="/list" component={UserList} />
        <Route exact match path="/edit/:id" component={AddUser} />
      </Switch>
    </Layout>
  );
};
export default User;
