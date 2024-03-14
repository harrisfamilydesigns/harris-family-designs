import { post } from "../request";
import tokenProvider from "../tokenProvider";

// Also returns user data
const login = async (email, password) => {
  const path = '/users/sign_in';
  const { data } = await post(path, { user: { email, password } }, false);

  const token = data.token;
  if (token) {
    tokenProvider.setToken(token);
  }
}

const logout = async () => {
  tokenProvider.removeToken();
}

const register = async (email, password, passwordConfirmation) => {
  const path = '/users';
  const { data } = await post(path, { user: { email, password, passwordConfirmation } }, false);

  if (data.id) {
    return login(email, password);
  }
}

export const auth = {
  login,
  logout,
  register,
};
