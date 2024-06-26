import { request } from "../request";

const create = async (body) => {
  return request.post('/fine_print/summaries', { summary: body });
}

export const summaries = {
  create,
};
