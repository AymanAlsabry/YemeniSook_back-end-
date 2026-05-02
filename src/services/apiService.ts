import axios from 'axios';

// Base URL for the local backend
// We'll use a constant so it's easy to change later for production
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // 1. Fetch data from root
  getHealth: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 2. Fetch all users
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 3. Fetch a single user by ID
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // 4. Test database connection
  testDbConnection: async () => {
    try {
      const response = await api.get('/test-db');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generic POST for future use (Registration, etc.)
  post: async (path: string, data: any) => {
    try {
      const response = await api.post(path, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generic PUT for updates
  put: async (path: string, data: any) => {
    try {
      const response = await api.put(path, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generic DELETE
  delete: async (path: string) => {
    try {
      const response = await api.delete(path);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Centralized error handling
function handleApiError(error: any) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'A problem occurred with the API request.');
  } else {
    console.error('Unexpected Error:', error);
    throw new Error('An unexpected error occurred.');
  }
}
