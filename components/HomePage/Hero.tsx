import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Hero() {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        router.replace('/login');
      };
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Hoş Geldin, {user?.firstName}!
          </Text>
          <Text className="text-gray-600 mb-4">
            {user?.email}
          </Text>
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-2 px-4"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold">
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
  );
}   