
import { request } from "../request";
import { urlForPath } from "../request/utils";

const uploadPath = urlForPath('/uploads');

const upload = async (file) => {
  const response = await request.post(uploadPath, { upload: { file } });
  return response;
}

export const uploads = {
  upload,
  uploadPath,
};
