import { post } from "../request";

// Also returns user data
const login = async (email, password) => {
  const path = '/users/sign_in';
  const { data } = await post(path, { user: { email, password } }, false);

  const token = data.token;
  if (token) {
    localStorage.setItem('token', data.token);
    return data;
  }
}

const logout = async () => {
  localStorage.removeItem('token');
}

export const auth = {
  login,
  logout,
};
