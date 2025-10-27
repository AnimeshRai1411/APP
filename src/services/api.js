import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  health: () => api.get('/auth/health'),
};

// Scan API
export const scanAPI = {
  performScan: (scanData) => api.post('/scan/perform', scanData),
  getScanResult: (scanId) => api.get(`/scan/${scanId}`),
  getScanHistory: () => api.get('/scan/history'),
};

// Analysis API
export const analysisAPI = {
  getRiskAnalysis: () => api.get('/analyze/risk-analysis'),
  getScoreSummary: () => api.get('/analyze/score-summary'),
};

// Report API
export const reportAPI = {
  getUserReports: (userId) => api.get(`/report/${userId}`),
  getMyReports: () => api.get('/report/my-reports'),
  getComprehensiveReport: () => api.get('/report/comprehensive'),
};

// Admin API
export const adminAPI = {
  getSystemStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  getUsersByRole: (role) => api.get(`/admin/users/role/${role}`),
  getSystemHealth: () => api.get('/admin/health'),
};

export default api;
