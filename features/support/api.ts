import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './constants';

/**
 * Get authorization headers if token is provided
 */
export const getAuthHeaders = (token?: string): Record<string, string> =>
  token ? { Authorization: `Bearer ${token}` } : {};

/**
 * Utility to send API requests with error handling
 */
export const sendRequest = async (
  method: 'GET' | 'POST',
  endpoint: string,
  data?: Record<string, any>,
  token?: string
): Promise<AxiosResponse | undefined> => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: getAuthHeaders(token),
      data,
    };
    return await axios(config);
  } catch (error: any) {
    // Capture the response even in case of an error
    return error.response;
  }
};
