import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <View className="flex-row justify-between items-center mb-6">
      <Text className="text-2xl font-bold text-gray-800">Profil</Text>
      <TouchableOpacity
        className="bg-gray-200 rounded-full p-3"
        onPress={handleSettings}
      >
        <IconSymbol size={24} name="gearshape.fill" color="#374151" />
      </TouchableOpacity>
    </View>
  );
}