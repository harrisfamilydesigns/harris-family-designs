import { mutate } from "swr";
import { get, patch } from "../request";

const current = async () => {
  return get('/users/current');
}

const confirmEmail = async (token) => {
  return get(`/users/confirmation?confirmation_token=${token}`, false);
}

const update = async (data) => {
  return await patch('/users', { user: data });
}

export const users = {
  current,
  confirmEmail,
  update,
};
