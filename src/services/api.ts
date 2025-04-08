import axios, { AxiosError } from 'axios';

export interface UserData {
  name: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  data?: { id: number; name: string };
  message?: string;
}

const API_URL = 'http://52.172.231.33:7005/alpha_user_website/collectData';

export const submitUserData = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(API_URL, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Error submitting user data:', error);

    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    } else {
      // General error handling
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      };
    }
  }
};
