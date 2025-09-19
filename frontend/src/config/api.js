// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mini-ecommerce-backend-ppue.onrender.com';

// Force the correct backend URL in production
const getApiBaseUrl = () => {
  // In production, always use the backend URL
  if (import.meta.env.PROD) {
    return 'https://mini-ecommerce-backend-ppue.onrender.com';
  }
  // In development, use environment variable or fallback
  return import.meta.env.VITE_API_URL || 'https://mini-ecommerce-backend-ppue.onrender.com';
};

const FINAL_API_BASE_URL = getApiBaseUrl();

// Debug logging
console.log('🔧 API Configuration:');
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Final API_BASE_URL:', FINAL_API_BASE_URL);

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${FINAL_API_BASE_URL}/api/auth/login`,
    REGISTER: `${FINAL_API_BASE_URL}/api/auth/register`,
    ME: `${FINAL_API_BASE_URL}/api/auth/me`,
  },
  
  // Products
  PRODUCTS: {
    BASE: `${FINAL_API_BASE_URL}/api/products`,
    CATEGORIES: `${FINAL_API_BASE_URL}/api/products/categories`,
    FEATURED: `${FINAL_API_BASE_URL}/api/products/featured`,
    BY_ID: (id) => `${FINAL_API_BASE_URL}/api/products/${id}`,
  },
  
  // Cart
  CART: {
    BASE: `${FINAL_API_BASE_URL}/api/cart`,
    ADD: `${FINAL_API_BASE_URL}/api/cart`,
    REMOVE: (productId) => `${FINAL_API_BASE_URL}/api/cart/${productId}`,
    UPDATE: (productId) => `${FINAL_API_BASE_URL}/api/cart/${productId}`,
  },
  
  // Comments
  COMMENTS: {
    BASE: `${FINAL_API_BASE_URL}/api/comments`,
    BY_PRODUCT: (productId) => `${FINAL_API_BASE_URL}/api/comments/product/${productId}`,
  },
};

export default FINAL_API_BASE_URL;
