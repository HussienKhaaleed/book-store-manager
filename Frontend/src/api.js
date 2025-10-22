import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/users/me');

// Books
export const getBooks = (params) => api.get('/books', { params });
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Users (Admin)
export const getUsers = () => api.get('/users');
export const updateUserRole = (id, role) => api.patch(`/users/${id}/role`, { role });
export const deleteUser = (id) => api.delete(`/users/${id}`);
