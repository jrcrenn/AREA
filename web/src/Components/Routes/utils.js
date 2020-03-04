export const login = token => {
  localStorage.setItem("accessToken", token);
};

export const logout = token => {
  localStorage.removeItem(token);
};

export const isLogin = () => {
  if (localStorage.getItem("accessToken")) {
    return true;
  }
  return false;
};
