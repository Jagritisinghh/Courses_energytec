import axios from 'axios';
const API_BASE_URL = 'https://courses-energytec-4.onrender.com/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const api = {
  login: (credentials) => apiClient.post('/users/login', credentials),
  register: (userData) => apiClient.post('/users/register', userData),

  getCourses: () => apiClient.get('/courses'),
  
  createCourse: (data) => 
    apiClient.post('/courses/create', data, getAuthHeaders()),
    
  updateCourse: (id, data) => 
    apiClient.put(`/courses/update/${id}`, data, getAuthHeaders()),
    
  deleteCourse: (id) => 
    apiClient.delete(`/courses/delete/${id}`, getAuthHeaders()),
};