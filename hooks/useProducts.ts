import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product, productsApi, ProductsResponse } from '../services/api';

export const useProducts = (limit = 10, skip = 0) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', limit, skip],
    queryFn: () => productsApi.getAll(limit, skip),
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', query],
    queryFn: () => productsApi.search(query),
    enabled: !!query && query.length > 2,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, 'id'>) => 
      productsApi.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) => 
      productsApi.update(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
