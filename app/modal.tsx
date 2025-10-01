import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple-50 p-5">
      <Text className="text-2xl font-bold text-purple-600 mb-4">
        Modal Sayfası
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-6">
        Bu basit bir modal sayfası örneğidir.
      </Text>
      <Link href="/" dismissTo>
        <Text className="text-blue-500 underline">
          Ana sayfaya dön
        </Text>
      </Link>
    </SafeAreaView>
  );
}
