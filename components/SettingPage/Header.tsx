import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-row items-center mb-6">
      <TouchableOpacity
        className="bg-gray-200 rounded-full p-3 mr-4"
        onPress={handleBack}
      >
        <IconSymbol size={24} name="chevron.left" color="#374151" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-gray-800">Ayarlar</Text>
    </View>
  );
}