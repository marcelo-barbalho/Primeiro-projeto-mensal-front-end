import { clientHTTP } from "../config/config";

const Create = (data) => clientHTTP.post(`/user`, data);

const List = () => clientHTTP.get(`/user`);

const Login = (data) => clientHTTP.post(`/auth`, data);

// const Delete = (email) => clientHTTP.delete(`/user/${email}`);
const Delete = (userid) => clientHTTP.delete(`/user/${userid}`);

const Edit = (data) => clientHTTP.patch(`/user/${data._id}`, data);

const ShowUserId = (id) => clientHTTP.get(`/user/${id}`);

const CreateProfile = (data) => clientHTTP.post(`/profile`, data);
const EditProfile = (data) => clientHTTP.patch(`/profile/${data._id}`, data);

export {
  Create,
  EditProfile,
  List,
  Login,
  Delete,
  Edit,
  ShowUserId,
  CreateProfile,
};
