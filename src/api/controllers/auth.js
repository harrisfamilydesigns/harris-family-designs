import { BASE_URL } from "../config/constants";
import { post } from "../config/request";

// Also returns user data
const login = async (email, password) => {
  const url = `${BASE_URL}/users/sign_in`;
  try {
    const data = post(url, { user: { email, password } }, false);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw new Error('Error logging in:', error);
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

