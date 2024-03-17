import { get, patch } from "../request";
import tokenProvider from "../tokenProvider";

const current = async () => {
  const token = tokenProvider.getToken();
  if (!token) {
    return { data: null, error: null };
  }
  return get('/users/current');
}

const confirmEmail = async (token) => {
  return get(`/users/confirmation?confirmation_token=${token}`, false);
}

// Requires currentPassword
const update = async (data) => {
  return await patch('/users', { user: data });
}

// Does not require currentPassword, but can't update email, or password
const updateCurrent = async (data) => {
  return await patch('/users/current', { user: data });
}

export const users = {
  current,
  confirmEmail,
  update,
  updateCurrent,
};
