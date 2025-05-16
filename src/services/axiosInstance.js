// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9090/api/micromart', // adjust at deployment use as .env
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Handling 403 (incorrect credentials or other access issues)
      const errorMessage = error.response?.data?.message || 'Incorrect credentials. Please try again.';
      return Promise.reject(new Error(errorMessage)); // pass a readable error message to the frontend
    }

    return Promise.reject(error);
  }
);

export default instance;
