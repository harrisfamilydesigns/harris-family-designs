import { urlForPath } from './utils';

const request = async (path, method, body, requiresAuth = true) => {
  const url = urlForPath(path);
  const token = localStorage.getItem('token');
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
    localStorage.removeItem('token');
    window.location.reload();
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${response.statusText}: ${data.error}`);
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
