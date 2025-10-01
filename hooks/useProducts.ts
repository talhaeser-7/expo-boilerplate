import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  fetchProductDetail,
  fetchProducts,
  searchProducts,
  updateProduct
} from '../services/productService';
import { Product, ProductsResponse } from '../types/product';

export const useProducts = (limit: number) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', limit],
    queryFn: () => fetchProducts(limit),
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', query],
    queryFn: () => searchProducts(query),
    enabled: !!query && query.length > 2,
  });
};

export const useCreateProduct = () => {

  return useMutation({
    mutationFn: (product: Omit<Product, 'id'>) => 
      createProduct(product),
   
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) => 
      updateProduct(id, product),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id)
  });
};
