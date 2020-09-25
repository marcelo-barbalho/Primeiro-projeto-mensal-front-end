const TKEY = "Magic";

const getToken = () => localStorage.getItem(TKEY);

const saveToken = (token) => localStorage.setItem(TKEY, token);

const removeToken = () => localStorage.removeItem(TKEY);

const isAuth = () => {
  return getToken() !== null;
};

export { isAuth, getToken, saveToken, removeToken };
