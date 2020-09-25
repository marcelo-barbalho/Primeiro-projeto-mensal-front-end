import React, { useState } from "react";
import "./App.css";
import Header from "./components/header";
import LoginPage from "./components/login/login";
import AddUser from "./components/addUser";
import UserList from "./components/list";

function App() {
  const [page, setPage] = useState("login");
  return (
    <div className="App">
      <Header
        showMenu={page !== "login" && page !== "addUser"}
        setPage={setPage}
      />
      {page === "login" && <LoginPage setPage={setPage} />}
      {page === "addUser" && <AddUser setPage={setPage} />}
      {page === "list" && <UserList setPage={setPage} />}
      <footer />
    </div>
  );
}

export default App;
