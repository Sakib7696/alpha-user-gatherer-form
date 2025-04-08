
import axios from 'axios';

export interface UserData {
  name: string;
  email: string;
}

const API_URL = 'http://52.172.231.33:7005/alpha_user_website/collectData';

export const submitUserData = async (userData: UserData): Promise<any> => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error submitting user data:', error);
    // Modified to return a structured error response instead of throwing
    return {
      success: false,
      message: 'Network error or server unavailable. Please try again later.'
    };
  }
};
