import axios from 'axios';

// Remove the /api from baseURL since your route already includes it
const API = axios.create({
  baseURL: 'http://localhost:8000/api/users',  // ✅ Correct (no double /api)
  // NOT: 'http://localhost:8000/api/api/users'
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