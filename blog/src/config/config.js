import axios from "axios";
import { getToken } from "./auth";

const clientHTTP = axios.create({
  baseURL: process.env.REACT_APP_HEROKU || `http://localhost:3001`,
});

clientHTTP.defaults.headers["Content-Type"] = "application/json";

if (getToken()) {
  clientHTTP.defaults.headers["x.auth.token"] = getToken();
}

export { clientHTTP };
