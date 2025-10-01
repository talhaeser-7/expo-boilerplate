import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomText from '../ui/CustomText';

export default function LogoutBtn() {
  const { logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      t('auth.logout'),
      t('auth.logoutConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('auth.logout'),
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      className="bg-primary-danger rounded-lg py-4"
      onPress={handleLogout}
    >
      <View className="flex-row items-center justify-center">
        <IconSymbol size={24} name="arrow.right.square" color="white" />
        <CustomText variant="body2" color="white" style={{ marginLeft: 8 }}>
          {t('auth.logout')}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}