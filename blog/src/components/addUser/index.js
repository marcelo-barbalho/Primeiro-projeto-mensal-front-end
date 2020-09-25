import React, { useState, useEffect } from "react";
import "./addUser.css";
import { Create, Edit, ShowUserId } from "../../services/user";
import { Redirect, useParams } from "react-router-dom";
// import { CustomInput, FormGroup } from "reactstrap";

const AddUser = (props) => {
  const [form, setForm] = useState({
    is_active: true,
    is_admin: false,
  });
  const [goLogin, setgoLogin] = useState(false);
  const [goList, setgoList] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const { id } = useParams();
  const method = isEdit ? Edit : Create;
  const change = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const showUser = async () => {
      const user = await ShowUserId(id);
      if (user.data.password) {
        delete user.data.password;
      }
      setForm(user.data);
    };
    if (id) {
      setisEdit(true);
      showUser();
    }
  }, [id]);

  const valid = () => {
    return form.name && form.email && form.password;
  };
  const submit = async (event) => {
    try {
      // event.preventDefault();
      await method(form);
      setForm({
        ...form,
        is_active: true,
        is_admin: false,
      });
      window.alert(isEdit ? "Update Complete" : "User created");
      isEdit ? setgoList(true) : setgoLogin(true);
    } catch (error) {
      alert("Erro no preenchimento");
      console.log(error, error.msg);
    }
  };
  return (
    <div className="addUser">
      <div className="formclass">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={change}
          value={form.name || ""}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={change}
          value={form.email || ""}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={change}
          value={form.password || ""}
        />

        <button disabled={!valid()} id="submit" onClick={submit}>
          {isEdit ? "Update" : "Submit"}
        </button>
      </div>
      {goLogin && <Redirect to="../login" />}
      {goList && <Redirect to="../list" />}
    </div>
  );
};
export default AddUser;
