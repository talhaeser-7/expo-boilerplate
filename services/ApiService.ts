import AsyncStorage from '@react-native-async-storage/async-storage';

interface IRequestOptions {
  url: string;
  config?: RequestInit;
  withToken?: boolean;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Token will be loaded when first request is made
  }

  /**
   * Loads token from AsyncStorage
   */
  private async loadToken(): Promise<void> {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.token = user.token;
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  /**
   * Updates the token
   */
  public setToken(token: string | null): void {
    this.token = token;
  }

  /**
   * Clears the token
   */
  public clearToken(): void {
    this.token = null;
  }

  /**
   * Reloads the token
   */
  public async refreshToken(): Promise<void> {
    await this.loadToken();
  }

  /**
   * Sends HTTP request
   */
  private async request(
    url: string, 
    config: RequestInit = {}, 
    withToken: boolean = true
  ): Promise<Response> {
    // Load token if needed
    if (withToken && !this.token) {
      await this.loadToken();
    }

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...config.headers,
    });

    // Add Authorization header if token exists
    if (withToken && this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    const response = await fetch(fullUrl, {
      ...config,
      headers,
    });

    // Clear token on 401 Unauthorized
    if (response.status === 401) {
      this.clearToken();
      await AsyncStorage.removeItem('user');
      throw new Error('Unauthorized - Token expired or invalid');
    }

    // Detailed error message for other error cases
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    return response;
  }

  /**
   * Sends GET request
   */
  public async get<T>({ url, config, withToken = true }: IRequestOptions): Promise<T> {
    const response = await this.request(url, { ...config, method: 'GET' }, withToken);
    return response.json();
  }

  /**
   * Sends POST request
   */
  public async post<T>({ url, config, withToken = true }: IRequestOptions): Promise<T> {
    const response = await this.request(url, { ...config, method: 'POST' }, withToken);
    return response.json();
  }

  /**
   * Sends PUT request
   */
  public async put<T>({ url, config, withToken = true }: IRequestOptions): Promise<T> {
    const response = await this.request(url, { ...config, method: 'PUT' }, withToken);
    return response.json();
  }

  /**
   * Sends PATCH request
   */
  public async patch<T>({ url, config, withToken = true }: IRequestOptions): Promise<T> {
    const response = await this.request(url, { ...config, method: 'PATCH' }, withToken);
    return response.json();
  }

  /**
   * Sends DELETE request
   */
  public async delete<T>({ url, config, withToken = true }: IRequestOptions): Promise<T> {
    const response = await this.request(url, { ...config, method: 'DELETE' }, withToken);
    return response.json();
  }
}

// Create ApiService instance
const apiService = new ApiService('https://dummyjson.com');

export default apiService;
