import { router } from 'expo-router';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useDeleteProduct, useProducts } from '../../hooks/useProducts';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { data: productsData, isLoading } = useProducts(5);
  const deleteProduct = useDeleteProduct();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleDeleteProduct = (id: number) => {
    Alert.alert(
      'Ürünü Sil',
      'Bu ürünü silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteProduct.mutate(id, {
              onSuccess: () => {
                Alert.alert('Başarılı', 'Ürün başarıyla silindi!');
              },
              onError: (error) => {
                Alert.alert('Hata', `Ürün silinirken hata oluştu: ${error.message}`);
              }
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
      <View className="p-4">
        {/* User Info */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Hoş Geldin, {user?.firstName}!
          </Text>
          <Text className="text-gray-600 mb-4">
            {user?.email}
          </Text>
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-2 px-4"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold">
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>

        {/* Products Section */}
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
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
