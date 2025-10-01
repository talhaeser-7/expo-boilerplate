import { IconSymbol } from '@/components/ui/icon-symbol';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Content() {
  return (
    <>
      {/* Settings Options */}
      <View className="bg-white rounded-lg shadow-sm mb-6">
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <IconSymbol size={24} name="person.circle" color="#3B82F6" />
          <Text className="text-gray-800 font-semibold ml-4 flex-1">Dil</Text>
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
    </>
  );
}