import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { useSearchProducts } from '../../hooks/useProducts';

export default function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchProducts(searchQuery);

  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Ürün Ara
      </Text>
      
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Ürün adı yazın..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {isLoading && <ActivityIndicator size="small" color="#3B82F6" />}
      
      {searchResults && searchResults.products.length > 0 && (
        <View className="space-y-2">
          {searchResults.products.map((product) => (
            <View key={product.id} className="border border-gray-200 rounded p-3">
              <Text className="font-semibold text-gray-800">{product.title}</Text>
              <Text className="text-gray-600 text-sm">{product.description}</Text>
              <Text className="text-green-600 font-bold">${product.price}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}