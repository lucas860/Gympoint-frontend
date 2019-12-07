import axios from 'axios';
import { getToken, isAuthenticated } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token.auth}`;
  }

  return config;
});

export default api;
