export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.clear();
};