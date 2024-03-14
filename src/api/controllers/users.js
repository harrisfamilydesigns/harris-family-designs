import { get } from "../request";

const current = async () => {
  return get('/users/current');
}

export const users = {
  current,
};
