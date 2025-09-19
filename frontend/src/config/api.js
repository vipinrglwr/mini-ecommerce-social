// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mini-ecommerce-backend-ppue.onrender.com';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  
  // Products
  PRODUCTS: {
    BASE: `${API_BASE_URL}/api/products`,
    CATEGORIES: `${API_BASE_URL}/api/products/categories`,
    FEATURED: `${API_BASE_URL}/api/products/featured`,
    BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  },
  
  // Cart
  CART: {
    BASE: `${API_BASE_URL}/api/cart`,
    ADD: `${API_BASE_URL}/api/cart/add`,
    REMOVE: `${API_BASE_URL}/api/cart/remove`,
    UPDATE: `${API_BASE_URL}/api/cart/update`,
  },
  
  // Comments
  COMMENTS: {
    BASE: `${API_BASE_URL}/api/comments`,
    BY_PRODUCT: (productId) => `${API_BASE_URL}/api/comments/product/${productId}`,
  },
};

export default API_BASE_URL;
