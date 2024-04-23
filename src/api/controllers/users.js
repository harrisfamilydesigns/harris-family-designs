import { mutate } from "swr";
import { request } from "../request";
import { tokenProvider } from "../tokenProvider";

const current = async () => {
  const token = tokenProvider.getToken();
  if (!token) {
    return { data: null, error: null };
  }
  return request.get('/users/current');
}

const confirmEmail = async (token) => {
  return request.get(`/users/confirmation?confirmation_token=${token}`, false);
}

// Requires currentPassword
const update = async (data) => {
  const response = await request.patch('/users', { user: data });
  mutate('/users/current');
  return response;
}

// Does not require currentPassword, but can't update email, or password
const updateCurrent = async (data) => {
  const response = await request.patch('/users/current', { user: data });
  mutate('/users/current');
  return response;
}

export const users = {
  current,
  confirmEmail,
  update,
  updateCurrent,
};
