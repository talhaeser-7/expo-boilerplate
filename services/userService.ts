import apiService from './ApiService';
import { User } from './api';


export async function fetchUserProfile(): Promise<User> {
  try {
    const response = await apiService.get<User>({
      url: '/auth/me'
    });
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(userData: Partial<User>): Promise<User> {
  try {
    const response = await apiService.put<User>({
      url: '/auth/me',
      config: {
        body: JSON.stringify(userData)
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
