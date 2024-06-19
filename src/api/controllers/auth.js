import { mutate } from "swr";
import { request } from "../request";
import { tokenProvider } from "../tokenProvider";

const _clearCache = async () => {
  return mutate(/* match all keys */() => true, undefined, false)
}

// Also returns user data
const login = async (email, password) => {
  const path = '/d/sign_in';
  const response = await request.post(path, { user: { email, password } }, false);

  if (response.error) {
    return response;
  }

  if (response.data.token) {
    tokenProvider.setToken(response.data.token);
  }

  return response;
}

const logout = async () => {
  await request.destroy('/d/sign_out');
  tokenProvider.removeToken();
  await _clearCache();
  return { data: null, error: null };
}

const register = async (email, password, passwordConfirmation) => {
  const path = '/users';
  const response = await request.post(path, { user: { email, password, passwordConfirmation } }, false);

  if (response.error) {
    return response;
  }

  if (response.data.id) {
    return login(email, password);
  }
}

const sendEmailConfirmation = async (email) => {
  const path = '/d/confirmation';
  return request.post(path, { user: { email } }, false);
}

const sendForgotPasswordEmail = async (email) => {
  const path = '/d/password';
  return request.post(path, { user: { email } }, false);
}

const resetPassword = async (password, passwordConfirmation, token) => {
  const path = '/d/password';
  return request.patch(path, { user: { password, passwordConfirmation, token } }, false);
}

export const auth = {
  login,
  logout,
  register,
  sendEmailConfirmation,
  sendForgotPasswordEmail,
  resetPassword,
};
