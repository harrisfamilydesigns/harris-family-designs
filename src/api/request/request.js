import { tokenProvider } from '../tokenProvider';
import { urlForPath } from './utils';

const _request = async (path, method, body, requiresAuth = true) => {
  const url = urlForPath(path);
  const token = tokenProvider.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(requiresAuth && { Authorization: `Bearer ${token}` }),
  };
  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (requiresAuth && response.status === 401) {
    tokenProvider.removeToken();
    window.location.reload();

    return;
  }

  let data = await response.json();
  let errorMessage = null;

  if (response.status < 200 || response.status >= 300) {
    if (data.error) {
      errorMessage = data.error;
    }
    if (data.errors) {
      errorMessage = Object.values(data.errors).join(', ');
    }
    data = null;
  }

  return {
    data,
    error: errorMessage ? { message: errorMessage } : null,
    status: response.status,
    headers: response.headers,
  };
}

const get = (path, requiresAuth = true) => _request(path, 'GET', null, requiresAuth);
const post = (path, body, requiresAuth = true) => _request(path, 'POST', body, requiresAuth);
const patch = (path, body, requiresAuth = true) => _request(path, 'PATCH', body, requiresAuth);
const destroy = (path, requiresAuth = true) => _request(path, 'DELETE', null, requiresAuth);

export const request = {
  get,
  post,
  patch,
  destroy,
};
