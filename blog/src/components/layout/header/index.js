import React, { useState } from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faBars } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const [menu, setMenu] = useState(false);
  return (
    <header className="Header">
      <h1 className="Title">{props.title}</h1>
      {props.showMenu && (
        <button className="btnMenu" onClick={() => setMenu(!menu)}>
          <FontAwesomeIcon id="bars" icon={faBars} />
        </button>
      )}
      {menu && (
        <div className="menuBox">
          <button className="btnBox">Home</button>
          <button
            className="btnBox"
            onClick={() => {
              props.setPage("list");
              setMenu(false);
            }}
          >
            User List
          </button>
          <button
            className="btnBox"
            onClick={() => {
              props.setPage("login");
              setMenu(false);
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
