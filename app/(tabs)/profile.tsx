import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
      <View className="p-4">
        {/* Header with Settings Icon */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800">Profil</Text>
          <TouchableOpacity
            className="bg-gray-200 rounded-full p-3"
            onPress={handleSettings}
          >
            <IconSymbol size={24} name="gearshape.fill" color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
              {user?.image ? (
                <Image 
                  source={{ uri: user.image }} 
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <IconSymbol size={40} name="person.fill" color="#3B82F6" />
              )}
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-gray-600 text-lg">@{user?.username}</Text>
          </View>

          {/* User Info */}
          <View className="space-y-4">
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-500 text-sm mb-1">E-posta</Text>
              <Text className="text-gray-800 text-lg">{user?.email}</Text>
            </View>
            
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-500 text-sm mb-1">Kullanıcı Adı</Text>
              <Text className="text-gray-800 text-lg">{user?.username}</Text>
            </View>
            
            <View className="border-b border-gray-200 pb-4">
              <Text className="text-gray-500 text-sm mb-1">Ad Soyad</Text>
              <Text className="text-gray-800 text-lg">{user?.firstName} {user?.lastName}</Text>
            </View>
            
            <View className="pb-4">
              <Text className="text-gray-500 text-sm mb-1">Kullanıcı ID</Text>
              <Text className="text-gray-800 text-lg">#{user?.id}</Text>
            </View>
          </View>
        </View>

        {/* Stats Card */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">İstatistikler</Text>
          
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">0</Text>
              <Text className="text-gray-600 text-sm">Ürün Eklendi</Text>
            </View>
            
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">0</Text>
              <Text className="text-gray-600 text-sm">Ürün Silindi</Text>
            </View>
            
            <View className="items-center">
              <Text className="text-2xl font-bold text-purple-600">0</Text>
              <Text className="text-gray-600 text-sm">Arama Yapıldı</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-lg p-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">Hızlı İşlemler</Text>
          
          <View className="space-y-3">
            <TouchableOpacity 
              className="bg-blue-50 rounded-lg p-4 flex-row items-center"
              onPress={() => router.push('/(tabs)/explore')}
            >
              <IconSymbol size={24} name="plus.circle.fill" color="#3B82F6" />
              <Text className="text-blue-600 font-semibold ml-3">Yeni Ürün Ekle</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-green-50 rounded-lg p-4 flex-row items-center"
              onPress={() => router.push('/(tabs)/explore')}
            >
              <IconSymbol size={24} name="magnifyingglass" color="#10B981" />
              <Text className="text-green-600 font-semibold ml-3">Ürün Ara</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-purple-50 rounded-lg p-4 flex-row items-center"
              onPress={() => router.push('/(tabs)')}
            >
              <IconSymbol size={24} name="house.fill" color="#8B5CF6" />
              <Text className="text-purple-600 font-semibold ml-3">Ana Sayfaya Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
