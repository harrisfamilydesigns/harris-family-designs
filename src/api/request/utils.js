import { HFD_API_URL } from '../config/constants';

const isPathUrl = path => path.startsWith('http');
const urlForPath = path => isPathUrl(path) ? path : `${HFD_API_URL}${path}`;

export {
  urlForPath
};
