import { useDeleteProduct } from "@/hooks/useProducts";
import { ProductsResponse } from "@/types/product";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

export default function Products( {isLoading, productsData}: {isLoading: boolean, productsData: ProductsResponse} ) {
  const deleteProduct = useDeleteProduct();

  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        Alert.alert('Başarılı', 'Ürün başarıyla silindi!');
      },
    });
  };
  return (
    <View className="bg-white rounded-lg p-4 shadow-sm">
    <Text className="text-xl font-bold text-gray-800 mb-4">
      Ürünler
    </Text>
    
    {isLoading ? (
      <ActivityIndicator size="large" color="#3B82F6" />
    ) : (
      <View className="space-y-3">
        {productsData?.products.map((product) => (
          <View key={product.id} className="border border-gray-200 rounded-lg p-3">
            <Text className="font-semibold text-gray-800">{product.title}</Text>
            <Text className="text-gray-600 text-sm mb-2">{product.description}</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-green-600 font-bold">${product.price}</Text>
              <TouchableOpacity
                className={`rounded px-3 py-1 ${deleteProduct.isPending ? 'bg-gray-400' : 'bg-red-500'}`}
                onPress={() => handleDeleteProduct(product.id)}
                disabled={deleteProduct.isPending}
              >
                <Text className="text-white text-xs">
                  {deleteProduct.isPending ? 'Siliniyor...' : 'Sil'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )}
  </View>
  );
}