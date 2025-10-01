import { Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-2xl font-bold text-green-600 mb-4">
        Explore Sayfası
      </Text>
      <Text className="text-lg text-gray-600 text-center px-4">
        Bu basit bir explore sayfası örneğidir.
      </Text>
    </View>
  );
}
