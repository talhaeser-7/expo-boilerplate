import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateProduct, useSearchProducts } from '../../hooks/useProducts';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
  });

  const { data: searchResults, isLoading: isSearching } = useSearchProducts(searchQuery);
  const createProduct = useCreateProduct();

  const handleCreateProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    createProduct.mutate({
      title: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
      category: newProduct.category,
      discountPercentage: 0,
      rating: 0,
      stock: 100,
      thumbnail: 'https://via.placeholder.com/150',
      images: ['https://via.placeholder.com/300'],
    }, {
      onSuccess: () => {
        Alert.alert('Başarılı', 'Ürün başarıyla eklendi');
        setNewProduct({
          title: '',
          description: '',
          price: '',
          brand: '',
          category: '',
        });
      },
      onError: () => {
        Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu');
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
      <View className="p-4">
        {/* Search Section */}
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
          
          {isSearching && <ActivityIndicator size="small" color="#3B82F6" />}
          
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

        {/* Add Product Section */}
        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Yeni Ürün Ekle
          </Text>
          
          <View className="space-y-3">
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Ürün Adı"
              value={newProduct.title}
              onChangeText={(text) => setNewProduct({...newProduct, title: text})}
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Açıklama"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct({...newProduct, description: text})}
              multiline
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Fiyat"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({...newProduct, price: text})}
              keyboardType="numeric"
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Marka"
              value={newProduct.brand}
              onChangeText={(text) => setNewProduct({...newProduct, brand: text})}
            />
            
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Kategori"
              value={newProduct.category}
              onChangeText={(text) => setNewProduct({...newProduct, category: text})}
            />
            
            <TouchableOpacity
              className="bg-green-600 rounded-lg py-3"
              onPress={handleCreateProduct}
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold">
                  Ürün Ekle
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
