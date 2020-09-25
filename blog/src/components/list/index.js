import React, { useEffect, useState } from "react";
import "./list.scss";
import { List, Delete, Edit } from "../../services/user";
import history from "../../config/history";
import { isAuth, getToken } from "../../config/auth";
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

  const mountUsers = () =>
    users.map((user, index) => (
      <tr key={index}>
        <td className="slot1">{user.is_active ? "sim" : "não"}</td>
        <td className="slot2">{user.is_admin ? "sim" : "não"}</td>
        <td className="slot3">{user.name} </td>
        <td className="slot4">{user.email} </td>
        <td className="slot5">
          <span className="edit">Edit</span> /
          <span className="delete" onClick={() => setAlert(user)}>
            Delete
          </span>
        </td>
      </tr>
    ));

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

  // const editUser = async () => {

  // };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list">
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
