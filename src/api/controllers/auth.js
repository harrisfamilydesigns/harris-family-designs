import { BASE_URL } from "../config/constants";
import { post } from "../config/request";

// Also returns user data
const login = async (email, password) => {
  const url = `${BASE_URL}/users/sign_in`;
  const { data } = await post(url, { user: { email, password } }, false);

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

export default auth;

