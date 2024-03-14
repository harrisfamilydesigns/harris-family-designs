import tokenProvider from '../tokenProvider';
import { urlForPath } from './utils';

const request = async (path, method, body, requiresAuth = true) => {
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

  const data = await response.json();

  if (requiresAuth && response.status === 401) {
    tokenProvider.removeToken();
    window.location.reload();
  }

  if (response.status < 200 || response.status >= 300) {
    let message = response.statusText || 'An error occurred';
    if (data.error) {
      message = data.error;
    }
    if (data.errors) {
      message = Object.values(data.errors).join(', ');
    }
    throw new Error(message);
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
}

const get = (path, requiresAuth = true) => request(path, 'GET', null, requiresAuth);
const post = (path, body, requiresAuth = true) => request(path, 'POST', body, requiresAuth);
const patch = (path, body, requiresAuth = true) => request(path, 'PATCH', body, requiresAuth);
const destroy = (path, requiresAuth = true) => request(path, 'DELETE', null, requiresAuth);

export { get, post, patch, destroy };
