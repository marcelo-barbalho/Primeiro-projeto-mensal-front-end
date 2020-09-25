const clientHTTP = require("../config/config");

const authentication = (data) => clientHTTP.post("/auth", data);

export { authentication };
