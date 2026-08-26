import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for requests (e.g. adding auth token)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // MockAPI doesn't typically enforce standard Bearer tokens,
      // but it's good practice to set it if needed for real APIs.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here (e.g. 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      // window.location.href = '/login'; // Optional: Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
