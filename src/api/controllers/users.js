import { mutate } from "swr";
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
  await patch('/users', { user: data });
  return mutate('/users/current');
}

// Does not require currentPassword, but can't update email, or password
const updateCurrent = async (data) => {
  await patch('/users/current', { user: data });
  return mutate('/users/current');
}

export const users = {
  current,
  confirmEmail,
  update,
  updateCurrent,
};
