import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function Hero() {
  const { user } = useAuth();

  return (
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
  );
}