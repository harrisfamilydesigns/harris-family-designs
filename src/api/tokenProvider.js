const getToken = () => {
  return localStorage.getItem('token');
}

const setToken = (token) => {
  localStorage.setItem('token', token);
}

const removeToken = () => {
  localStorage.removeItem('token');
}

export const tokenProvider = {
  getToken,
  setToken,
  removeToken,
};

export default tokenProvider;
