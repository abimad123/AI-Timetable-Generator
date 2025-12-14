import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { 'auth-token': token } };
};

export const api = {
  register: (data) => axios.post(`${API_URL}/user/register`, data),
  login: (data) => axios.post(`${API_URL}/user/login`, data),

  getTeachers: () => axios.get(`${API_URL}/teachers`, getAuthHeaders()).then(res => res.data),
  getRooms: () => axios.get(`${API_URL}/rooms`, getAuthHeaders()).then(res => res.data),
  getSubjects: () => axios.get(`${API_URL}/subjects`, getAuthHeaders()).then(res => res.data),

  addTeacher: (data) => axios.post(`${API_URL}/teachers`, data, getAuthHeaders()),
  addRoom: (data) => axios.post(`${API_URL}/rooms`, data, getAuthHeaders()),
  addSubject: (data) => axios.post(`${API_URL}/subjects`, data, getAuthHeaders()),

  deleteTeacher: (id) => axios.delete(`${API_URL}/teachers/${id}`, getAuthHeaders()),
  deleteRoom: (id) => axios.delete(`${API_URL}/rooms/${id}`, getAuthHeaders()),
  deleteSubject: (id) => axios.delete(`${API_URL}/subjects/${id}`, getAuthHeaders()),
};