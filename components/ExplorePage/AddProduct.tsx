import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCreateProduct } from '../../hooks/useProducts';

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
  });

  const queryClient = useQueryClient();
  const createProduct = useCreateProduct();

  const handleCreateProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const payload = {
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
    };
    
    createProduct.mutate(payload, {
      onSuccess: () => {
        Alert.alert('Başarılı', 'Ürün başarıyla eklendi');
        setNewProduct({
          title: '',
          description: '',
          price: '',
          brand: '',
          category: '',
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
      onError: () => {
        Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu');
      },
    });
  };

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Yeni Ürün Ekle
      </Text>
      
      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Ürün Adı *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder="Ürün adını girin"
            value={newProduct.title}
            onChangeText={(text) => setNewProduct({...newProduct, title: text})}
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Açıklama *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder="Ürün açıklamasını girin"
            value={newProduct.description}
            onChangeText={(text) => setNewProduct({...newProduct, description: text})}
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Fiyat *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder="0.00"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({...newProduct, price: text})}
            keyboardType="numeric"
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Marka</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder="Marka adını girin"
            value={newProduct.brand}
            onChangeText={(text) => setNewProduct({...newProduct, brand: text})}
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Kategori</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder="Kategori adını girin"
            value={newProduct.category}
            onChangeText={(text) => setNewProduct({...newProduct, category: text})}
          />
        </View>
        
        <TouchableOpacity
          className={`rounded-lg py-3 ${
            createProduct.isPending 
              ? 'bg-green-400 opacity-70' 
              : 'bg-green-600'
          }`}
          onPress={handleCreateProduct}
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="white" size="small" />
              <Text className="text-white text-center font-semibold ml-2">
                Ekleniyor...
              </Text>
            </View>
          ) : (
            <Text className="text-white text-center font-semibold">
              Ürün Ekle
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}