import { clientHTTP } from "../config/config";

const Create = (data) => clientHTTP.post(`/user`, data);

const List = () => clientHTTP.get(`/user`);

const Login = (data) => clientHTTP.post(`/auth`, data);

// const Delete = (email) => clientHTTP.delete(`/user/${email}`);
const Delete = (userid) => clientHTTP.delete(`/user/${userid}`);

const Edit = (data) => clientHTTP.patch(`/user`, data);

const ShowUserId = (id) => clientHTTP.patch(`/user/${id}`);

export { Create, List, Login, Delete, Edit, ShowUserId };
