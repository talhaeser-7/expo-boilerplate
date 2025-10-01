import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText";

export default function Hero() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    
    const handleLogout = () => {
        logout();
        router.replace('/login');
      };
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <CustomText variant="title2" color="#1F2937" style={{ marginBottom: 8 }}>
            {t('home.welcome')}, {user?.firstName}!
          </CustomText>
          <CustomText variant="body2" color="#6B7280" style={{ marginBottom: 16 }}>
            {user?.email}
          </CustomText>
          <TouchableOpacity
            className="bg-primary-danger rounded-lg py-2 px-4"
            onPress={handleLogout}
          >
            <CustomText variant="body2" color="white" align="center">
              {t('auth.logout')}
            </CustomText>
          </TouchableOpacity>
        </View>
  );
}   