import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-2xl font-bold !text-blue-600 mb-4">
        Ana Sayfa
      </Text>
      <Text className="text-lg text-gray-600 text-center px-4">
        Bu basit bir ana sayfa örneğidir.
      </Text>
    </View>
  );
}
