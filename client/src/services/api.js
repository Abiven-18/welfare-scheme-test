import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Schemes API
export const getSchemes = async (params) => {
  const response = await api.get('/schemes', { params });
  return response.data;
};

export const getSchemeById = async (id) => {
  const response = await api.get(`/schemes/${id}`);
  return response.data;
};

export const getFilterOptions = async () => {
  const response = await api.get('/schemes/filters');
  return response.data;
};

export const downloadSchemeDocument = async (id) => {
  const response = await api.get(`/schemes/${id}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

// Feedback API
export const submitFeedback = async (feedbackData) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export default api;
