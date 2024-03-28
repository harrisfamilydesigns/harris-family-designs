import { HFD_API_URL } from '../config/constants';

const _isPathUrl = path => path.startsWith('http');

export const urlForPath = path => _isPathUrl(path) ? path : `${HFD_API_URL}${path}`;
