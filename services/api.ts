import apiService from './ApiService';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}


// User API
export const userApi = {
  getMe: async (): Promise<User> => {
    return apiService.get<User>({
      url: '/auth/me'
    });
  },
};
