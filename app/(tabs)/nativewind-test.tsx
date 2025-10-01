import { Text, View } from "react-native";

export default function NativewindTest() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500 mb-4">
        Nativewind Test
      </Text>
      <Text className="text-lg text-gray-600 text-center px-4 mb-6">
        Bu sayfa Nativewind kurulumunu test ediyor
      </Text>
      <View className="bg-blue-100 p-4 rounded-lg">
        <Text className="text-center text-blue-800">
          Mavi arka plan ve yuvarlatılmış köşeler
        </Text>
      </View>
    </View>
  );
}
