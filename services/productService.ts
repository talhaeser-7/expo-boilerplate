import { Product, ProductsResponse } from '../types/product';
import apiService from './ApiService';


export async function fetchProducts(limit = 10, skip = 0): Promise<ProductsResponse> {
  try {
    const response = await apiService.get<ProductsResponse>({
      url: `/products?limit=${limit}&skip=${skip}`,
      withToken: false
    });
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductDetail(productId: number): Promise<Product> {
  try {
    const response = await apiService.get<Product>({
      url: `/products/${productId}`,
      withToken: false
    });
    return response;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  try {
    const response = await apiService.get<ProductsResponse>({
      url: `/products/search?q=${encodeURIComponent(query)}`,
      withToken: false
    });
    return response;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await apiService.post<Product>({
      url: '/products/add',
      config: {
        body: JSON.stringify(product)
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  try {
    const response = await apiService.put<Product>({
      url: `/products/${id}`,
      config: {
        body: JSON.stringify(product)
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: number): Promise<{ id: number; isDeleted: boolean }> {
  try {
    const response = await apiService.delete<{ id: number; isDeleted: boolean }>({
      url: `/products/${id}`
    });
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
