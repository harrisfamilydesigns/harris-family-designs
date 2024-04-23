import { mutate } from "swr";
import { request } from "../request";

const index = async () => {
  return request.get('/thrifters');
}

const get = async (id) => {
  return request.get(`/thrifters/${id}`);
}

const update = async (id, data) => {
  const response = await request.patch(`/thrifters/${id}`, { thrifter: data });
  mutate(`/thrifters/${id}`);
  return response;
}

export const thrifters = {
  index,
  get,
  update,
};
