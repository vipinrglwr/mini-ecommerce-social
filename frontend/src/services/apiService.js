import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service functions
export const apiService = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
    getCurrentUser: () => apiClient.get(API_ENDPOINTS.AUTH.ME),
  },

  // Products
  products: {
    getAll: (params = {}) => apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, { params }),
    getById: (id) => apiClient.get(API_ENDPOINTS.PRODUCTS.BY_ID(id)),
    getCategories: () => apiClient.get(API_ENDPOINTS.PRODUCTS.CATEGORIES),
    getFeatured: () => apiClient.get(API_ENDPOINTS.PRODUCTS.FEATURED),
  },

  // Cart
  cart: {
    get: () => apiClient.get(API_ENDPOINTS.CART.BASE),
    add: (productId, quantity = 1) => 
      apiClient.post(API_ENDPOINTS.CART.ADD, { productId, quantity }),
    remove: (productId) => 
      apiClient.delete(`${API_ENDPOINTS.CART.BASE}/${productId}`),
    update: (productId, quantity) => 
      apiClient.put(`${API_ENDPOINTS.CART.BASE}/${productId}`, { quantity }),
    clear: () => apiClient.delete(API_ENDPOINTS.CART.BASE),
  },

  // Comments
  comments: {
    getByProduct: (productId) => 
      apiClient.get(API_ENDPOINTS.COMMENTS.BY_PRODUCT(productId)),
    create: (commentData) => apiClient.post(API_ENDPOINTS.COMMENTS.BASE, commentData),
    update: (commentId, commentData) => 
      apiClient.put(`${API_ENDPOINTS.COMMENTS.BASE}/${commentId}`, commentData),
    delete: (commentId) => 
      apiClient.delete(`${API_ENDPOINTS.COMMENTS.BASE}/${commentId}`),
  },
};

export default apiClient;
