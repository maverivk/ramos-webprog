// src/services/UserService.js
import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with dynamic baseURL
const API = axios.create({
  baseURL: `${API_URL}/api/users`,  // ✅ Now works for both local and production
});

// Add token to requests if user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchUsers = () => API.get('/');
export const createUser = (user) => API.post('/', user);
export const updateUser = (id, user) => API.put(`/${id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);
export const loginUser = (credentials) => API.post('/login', credentials);