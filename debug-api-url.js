// Debug script to check API URL configuration
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_API_URL:', process.env.VITE_API_URL);

// Simulate the frontend API configuration
const API_BASE_URL = process.env.VITE_API_URL || 'https://mini-ecommerce-backend-ppue.onrender.com';
console.log('Final API_BASE_URL:', API_BASE_URL);

const categoriesEndpoint = `${API_BASE_URL}/api/products/categories`;
console.log('Categories endpoint:', categoriesEndpoint);
