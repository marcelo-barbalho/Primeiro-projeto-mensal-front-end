import React, { useState } from "react";
import "./login.css";
import { Login } from "../../services/user";
import { clientHTTP } from "../../config/config";
import { Link } from "react-router-dom";
import { saveToken } from "../../config/auth";
import history from "../../config/history";

const LoginPage = (props) => {
  const [auth, setAuth] = useState({});

  const handleChange = (event) => {
    setAuth({
      ...auth,
      [event.target.name]: event.target.value,
    });
  };
  const validSubmit = () => auth.email && auth.password;

  const submit = async (event) => {
    try {
      event.preventDefault();
      console.log("teste");
      if (validSubmit()) {
        const {
          data: { token },
        } = await Login(auth);
        clientHTTP.defaults.headers["x-auth-token"] = token;
        saveToken(token);
        setAuth({});

        history.push("/");
      }
    } catch (error) {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={auth.email || ""}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={auth.password || ""}
        />
        <button disabled={!validSubmit()} id="submit" onClick={submit}>
          Login
        </button>
        <Link to="create" id="addUser">
          New here?
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
