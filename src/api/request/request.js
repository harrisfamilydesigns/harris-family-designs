import { tokenProvider } from '../tokenProvider';
import { urlForPath } from './utils';

const _request = async (path, method, body, requiresAuth = true, providedToken = null) => {
  const url = urlForPath(path);
  const token = providedToken || tokenProvider.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(requiresAuth && { Authorization: `Bearer ${token}` }),
  };
  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (requiresAuth && response.status === 401 && !providedToken) {
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

const get = (path, requiresAuth = true, token = null) => _request(path, 'GET', null, requiresAuth, token);
const post = (path, body, requiresAuth = true, token = null) => _request(path, 'POST', body, requiresAuth, token);
const patch = (path, body, requiresAuth = true, token = null) => _request(path, 'PATCH', body, requiresAuth, token);
const destroy = (path, requiresAuth = true, token = null) => _request(path, 'DELETE', null, requiresAuth, token);

export const request = {
  get,
  post,
  patch,
  destroy,
};
