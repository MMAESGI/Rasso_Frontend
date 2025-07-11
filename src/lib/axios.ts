import axios from 'axios';
import { getToken, logout } from '@/controllers/Login';

const jwtAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

// Intercepteur : injecte automatiquement le token dans chaque requête (et vérifie l'expiration)
jwtAxios.interceptors.request.use(config => {
  const token = getToken(); // Utilise getToken qui vérifie automatiquement l'expiration
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur de réponse pour gérer les erreurs 401 (token expiré)
jwtAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token probablement expiré, nettoyer et déconnecter
      logout();
      // Rediriger vers la page de connexion si on n'y est pas déjà
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);
export default jwtAxios;
