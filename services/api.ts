const BASE_URL = 'https://dummyjson.com';

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
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.json();
  },

  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
  },

  search: async (query: string): Promise<ProductsResponse> => {
    const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },

  create: async (product: Omit<Product, 'id'>, token: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  update: async (id: number, product: Partial<Product>, token: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  delete: async (id: number, token: string): Promise<{ id: number; isDeleted: boolean }> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// User API
export const userApi = {
  getMe: async (token: string): Promise<User> => {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
