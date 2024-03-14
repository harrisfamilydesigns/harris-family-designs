const getToken = () => {
  return localStorage.getItem('token');
}

const setToken = (token) => {
  localStorage.setItem('token', token);
}

export const tokenProvider = {
  getToken,
  setToken,
};

export default tokenProvider;
