import React, { useState } from "react";
import "./header.scss";
import { removeToken, getToken } from "../../../config/auth";
import history from "../../../config/history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
// import { BiUser } from "react-icons/bi";

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
  const listBtn = () => {
    history.push("/list");
    setMenu(false);
  };

  return (
    <header className="Header">
      <Title className="Title"></Title>

      <button className="btnMenu" onClick={() => setMenu(!menu)}>
        <FontAwesomeIcon id="bars" icon={faBars} />
      </button>
      {menu && (
        <div className="menuBox">
          <button
            className="btnBox"
            onClick={() => console.log(props.info.user.name)}
          >
            Home
          </button>
          <button className="btnBox" onClick={() => listBtn()}>
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

const Title = styled.div`
  color: #45a29e;
  display: flex;
`;

export default Header;
