import axios, { AxiosError, type AxiosResponse } from 'axios';
import { buildMockUsers } from '@/services/mockUsers';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  config.headers.set('x-client', 'lendsqr-dashboard');
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message ?? error.message ?? 'Something went wrong';
    return Promise.reject(new ApiError(message, error.response?.status));
  },
);

apiClient.defaults.adapter = async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (config.url === '/users') {
    return {
      data: buildMockUsers(500),
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }

  return Promise.reject(new ApiError('Resource not found', 404));
};
