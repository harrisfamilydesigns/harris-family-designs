// TODO: if requiresAuth and auth fails, logout user

const request = async (url, method, body, requiresAuth = true) => {
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

const get = (url, requiresAuth = true) => request(url, 'GET', null, requiresAuth);
const post = (url, body, requiresAuth = true) => request(url, 'POST', body, requiresAuth);
const patch = (url, body, requiresAuth = true) => request(url, 'PATCH', body, requiresAuth);
const destroy = (url, requiresAuth = true) => request(url, 'DELETE', null, requiresAuth);

export { get, post, patch, destroy };
