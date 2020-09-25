import React, { useEffect, useState } from "react";
import "./list.scss";
import { List, Delete } from "../../services/user";
import history from "../../config/history";
import { isAuth } from "../../config/auth";
import { MdLocationSearching } from "react-icons/md";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
// import { Table } from "reactstrap";

export const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const getList = async () => {
    try {
      const users = await List();
      setUsers(users.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    isAuth();
    if (!isAuth) {
      history.push("/login");
    }
  });

  const alert = (user) => {
    const { name, _id } = user;
    return (
      <div id="alertBox">
        <span>Do you want to delete {name}?</span>

        <button
          className="alert"
          onClick={() => {
            deleteUser(_id);
            setAlert(false);
          }}
        >
          Yes
        </button>
        <button className="alert" onClick={() => setAlert(false)}>
          No
        </button>
      </div>
    );
  };
  // const setIcon = (user) => {
  //   if (user.is_admin == true) {
  //     <AiFillCheckSquare />;
  //   } else {
  //     <AiTwotoneCheckSquare />;
  //   }
  // };

  const mountUsers = () =>
    users.map((user, index) => (
      <tr key={index}>
        <td className="slot1">
          {user.is_active ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        </td>
        <td className="slot2">
          {user.is_admin ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        </td>
        <td className="slot3">{user.name} </td>
        <td className="slot4">{user.email} </td>
        <td className="slot5">
          <span className="delete" onClick={() => editUser(user)}>
            <AiOutlineEdit />
          </span>{" "}
          /
          <span className="delete" onClick={() => setAlert(user)}>
            <AiOutlineDelete />
          </span>
        </td>
      </tr>
    ));
  // RiCheckboxBlankLine, RiCheckboxLine;
  const srcTable = () => {
    var input, filter, td, a, i, txtValue;
    input = document.getElementById("src");
    filter = input.value.toUpperCase();
    td = document.querySelectorAll("td.slot3");
    for (i = 0; i < td.length; i++) {
      a = td[i];
      txtValue = a.textContent || a.innerText;
      console.log(txtValue, filter);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        td[i].parentNode.style.display = "";
      } else {
        td[i].parentNode.style.display = "none";
      }
    }
  };

  const deleteUser = async (_id) => {
    try {
      await Delete(_id);
      window.alert("User deleted");
      getList();
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = (user) => props.history.push(`/edit/${user._id}`);

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list">
      <MdLocationSearching />
      <input
        type="text"
        id="src"
        onKeyUp={srcTable}
        placeholder="Search for names.."
      ></input>
      {showAlert && alert(showAlert)}
      <table>
        <thead>
          <tr>
            <th className="slot1">Active</th>
            <th className="slot2">Admin</th>
            <th className="slot3">Name</th>
            <th className="slot4">E-mail</th>
            <th className="slot5">Actions</th>
          </tr>
        </thead>
        <tbody>{mountUsers()}</tbody>
      </table>
      <button className="listNew" onClick={() => history.push("/create")}>
        New User
      </button>
    </div>
  );
};
export default UserList;
