import React from "react";
import AddUser from "../components/addUser";
import { Switch } from "react-router-dom";
import Layout from "../components/layout";

const UCreate = () => {
  return (
    <Layout title={"Create User"}>
      <Switch>
        <AddUser />
      </Switch>
    </Layout>
  );
};
export default UCreate;
