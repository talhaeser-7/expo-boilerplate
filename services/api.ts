import apiService from './ApiService';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

// Products API
export const productsApi = {
  getAll: async (limit = 10, skip = 0): Promise<ProductsResponse> => {
    return apiService.get<ProductsResponse>({
      url: `/products?limit=${limit}&skip=${skip}`,
      withToken: false
    });
  },

  getById: async (id: number): Promise<Product> => {
    return apiService.get<Product>({
      url: `/products/${id}`,
      withToken: false
    });
  },

  search: async (query: string): Promise<ProductsResponse> => {
    return apiService.get<ProductsResponse>({
      url: `/products/search?q=${encodeURIComponent(query)}`,
      withToken: false
    });
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return apiService.post<Product>({
      url: '/products/add',
      config: {
        body: JSON.stringify(product)
      }
    });
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    return apiService.put<Product>({
      url: `/products/${id}`,
      config: {
        body: JSON.stringify(product)
      }
    });
  },

  delete: async (id: number): Promise<{ id: number; isDeleted: boolean }> => {
    return apiService.delete<{ id: number; isDeleted: boolean }>({
      url: `/products/${id}`
    });
  },
};

// User API
export const userApi = {
  getMe: async (): Promise<User> => {
    return apiService.get<User>({
      url: '/auth/me'
    });
  },
};
