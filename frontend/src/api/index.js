import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const auth = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  refresh: () => apiClient.post('/auth/refresh'),
};

export const posts = {
  getPosts: (params) => apiClient.get('/posts', { params }),
  createPost: (postData) => apiClient.post('/posts', postData),
};

export const sources = {
  getSources: () => apiClient.get('/sources'),
  registerSource: (sourceData) => apiClient.post('/sources', sourceData),
};

export const alerts = {
  getAlerts: (params) => apiClient.get('/alerts', { params }),
  resolveAlert: (id, resolvedStatus) => apiClient.post(`/alerts/${id}/resolve`, { resolved: resolvedStatus }),
};

export const playbooks = {
  getPlaybooks: () => apiClient.get('/playbooks'),
  createPlaybook: (playbookData) => apiClient.post('/playbooks', playbookData),
  applyPlaybook: (id) => apiClient.post(`/playbooks/${id}/apply`),
};

export const users = {
  getUsers: () => apiClient.get('/users'),
  createUser: (userData) => apiClient.post('/users', userData),
};

export default apiClient;