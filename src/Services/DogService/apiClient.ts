import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const DOG_API_URL = import.meta.env.VITE_DOG_API_URL;
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY;

const apiClient: AxiosInstance = axios.create({
  baseURL: DOG_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': DOG_API_KEY,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, statusText } = error.response;

      if (status >= 400 && status < 500) {
        console.error(`Client error: ${status} - ${statusText}`);
      } else if (status >= 500) {
        console.error(`Server error: ${status} - ${statusText}`);
      }

      return Promise.reject(new Error(`API Error: ${status} ${statusText}`));
    }

    if (error.request) {
      console.error('No response received from server.');
      return Promise.reject(new Error('No response from server.'));
    }

    console.error('Unexpected error:', error.message);
    return Promise.reject(new Error('Unexpected error occurred.'));
  }
);

export default apiClient;
