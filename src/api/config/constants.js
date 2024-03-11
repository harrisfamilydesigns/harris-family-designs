const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.harrisfamilydesigns.com'
  : 'http://localhost:4444';

export { BASE_URL };
