// src/services/UserService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('🔍 UserService loaded with API_URL:', API_URL);

const API = axios.create({
  baseURL: `${API_URL}/api/users`,
});

console.log('📍 Full baseURL:', `${API_URL}/api/users`);

// Add request interceptor to log outgoing requests
API.interceptors.request.use(request => {
  console.log('🚀 Making request to:', request.baseURL + request.url);
  return request;
});

// Add response interceptor for better error logging
API.interceptors.response.use(
  response => {
    console.log('✅ Response from:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('❌ API Error Details:');
    console.error('  URL:', error.config?.url);
    console.error('  Method:', error.config?.method);
    console.error('  BaseURL:', error.config?.baseURL);
    console.error('  Status:', error.response?.status);
    console.error('  Data:', error.response?.data);
    console.error('  Message:', error.message);
    return Promise.reject(error);
  }
);

export const fetchUsers = () => API.get('/');
export const createUser = (user) => API.post('/', user);
export const updateUser = (id, user) => API.put(`/${id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);
export const loginUser = (credentials) => API.post('/login', credentials);