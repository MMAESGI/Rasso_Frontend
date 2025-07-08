import axios from 'axios';

const jwtAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

// Intercepteur : injecte automatiquement le token dans chaque requête
jwtAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default jwtAxios;
