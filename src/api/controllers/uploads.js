
import { request } from "../request";

const uploadPath = '/uploads';

const upload = async (file) => {
  const response = await request.post(uploadPath, { upload: { file } });
  return response;
}

export const uploads = {
  upload,
  uploadPath,
};
