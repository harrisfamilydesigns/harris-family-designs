import { mutate } from "swr";
import { post, patch } from "../request";
import tokenProvider from "../tokenProvider";

// Also returns user data
const login = async (email, password) => {
  const path = '/users/sign_in';
  const response = await post(path, { user: { email, password } }, false);

  if (response.error) {
    return response;
  }

  if (response.data.token) {
    tokenProvider.setToken(response.data.token);
  }

  return response;
}

const clearCache = async () => {
  return mutate(/* match all keys */() => true, undefined, false)
}

const logout = async () => {
  tokenProvider.removeToken();
  await clearCache();
  return { data: null, error: null };
}

const register = async (email, password, passwordConfirmation) => {
  const path = '/users';
  const response = await post(path, { user: { email, password, passwordConfirmation } }, false);

  if (response.error) {
    return response;
  }

  if (response.data.id) {
    return login(email, password);
  }
}

const sendEmailConfirmation = async (email) => {
  const path = '/users/confirmation';
  return post(path, { user: { email } }, false);
}

const sendForgotPasswordEmail = async (email) => {
  const path = '/users/password';
  return post(path, { user: { email } }, false);
}

const resetPassword = async (password, passwordConfirmation, token) => {
  const path = '/users/password';
  return patch(path, { user: { password, passwordConfirmation, token } }, false);
}

export const auth = {
  login,
  logout,
  register,
  sendEmailConfirmation,
  sendForgotPasswordEmail,
  resetPassword,
};
