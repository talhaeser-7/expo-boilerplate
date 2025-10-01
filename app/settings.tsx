import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="bg-gray-200 rounded-full p-3 mr-4"
            onPress={handleBack}
          >
            <IconSymbol size={24} name="chevron.left" color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">Ayarlar</Text>
        </View>

        {/* User Info Card */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
              <IconSymbol size={32} name="person.fill" color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-gray-600">@{user?.username}</Text>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="bg-white rounded-lg shadow-sm mb-6">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
            <IconSymbol size={24} name="person.circle" color="#3B82F6" />
            <Text className="text-gray-800 font-semibold ml-4 flex-1">Profil Bilgileri</Text>
            <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
            <IconSymbol size={24} name="bell" color="#3B82F6" />
            <Text className="text-gray-800 font-semibold ml-4 flex-1">Bildirimler</Text>
            <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
            <IconSymbol size={24} name="lock" color="#3B82F6" />
            <Text className="text-gray-800 font-semibold ml-4 flex-1">Güvenlik</Text>
            <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
            <IconSymbol size={24} name="moon" color="#3B82F6" />
            <Text className="text-gray-800 font-semibold ml-4 flex-1">Tema</Text>
            <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4">
            <IconSymbol size={24} name="questionmark.circle" color="#3B82F6" />
            <Text className="text-gray-800 font-semibold ml-4 flex-1">Yardım</Text>
            <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Uygulama Bilgileri</Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Versiyon</Text>
              <Text className="text-gray-800 font-semibold">1.0.0</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Build</Text>
              <Text className="text-gray-800 font-semibold">2024.01</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Platform</Text>
              <Text className="text-gray-800 font-semibold">React Native</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-500 rounded-lg py-4"
          onPress={handleLogout}
        >
          <View className="flex-row items-center justify-center">
            <IconSymbol size={24} name="arrow.right.square" color="white" />
            <Text className="text-white font-bold text-lg ml-2">Çıkış Yap</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
