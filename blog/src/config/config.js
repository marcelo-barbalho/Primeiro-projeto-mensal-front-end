import axios from "axios";
import { getToken } from "./auth";

const clientHTTP = axios.create({
  baseURL: "https://magic-bootproject.herokuapp.com",
});

clientHTTP.defaults.headers["Content-Type"] = "application/json";

if (getToken()) {
  clientHTTP.defaults.headers["x-auth-token"] = getToken();
}

export { clientHTTP };
