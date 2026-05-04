import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? (import.meta.env.VITE_API_URL.endsWith('/') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/`) : 'http://127.0.0.1:5000/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/' && 
          window.location.pathname !== '/student-login' && 
          window.location.pathname !== '/teacher-login') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

