import React, { useState } from "react";
import "./header.scss";
import { removeToken, getToken } from "../../../config/auth";
import history from "../../../config/history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faBars } from "@fortawesome/free-solid-svg-icons";
import User from "../../../views/user";

function Header(props) {
  const [menu, setMenu] = useState(false);

  const logout = () => {
    let testToken = getToken();
    if (testToken) {
      removeToken();
    }
    history.push("/login");
    setMenu(false);
  };

  return (
    <header className="Header">
      <h1 className="Title">{props.user.name}</h1>
      <button className="btnMenu" onClick={() => setMenu(!menu)}>
        <FontAwesomeIcon id="bars" icon={faBars} />
      </button>
      {menu && (
        <div className="menuBox">
          <button className="btnBox">Home</button>
          <button
            className="btnBox"
            onClick={() => (history.push("/list"), setMenu(false))}
          >
            User List
          </button>
          <button className="btnBox" onClick={() => logout()}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
