const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.harrisfamilydesigns.com'
  : 'http://api.hfd.localhost:4444';

export { BASE_URL };
