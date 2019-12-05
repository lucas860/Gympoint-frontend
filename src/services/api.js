import axios from 'axios';
import { getToken, isAuthenticated } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

if (isAuthenticated()) {
  api.interceptors.request.use(config => {
    const token = getToken().auth;

    const headers = { ...config.headers };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return { ...config, headers };
  });
}

export default api;
