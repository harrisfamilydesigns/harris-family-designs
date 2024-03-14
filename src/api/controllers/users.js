import { BASE_URL } from "../config/constants";
import { get } from "../config/request";

const current = async () => {
  return get(`${BASE_URL}/users/current`);
}

export default {
  current,
};
