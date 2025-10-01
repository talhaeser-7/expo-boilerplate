import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function LogoutBtn() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
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
      className="bg-red-500 rounded-lg py-4"
      onPress={handleLogout}
    >
      <View className="flex-row items-center justify-center">
        <IconSymbol size={24} name="arrow.right.square" color="white" />
        <Text className="text-white font-bold text-lg ml-2">Çıkış Yap</Text>
      </View>
    </TouchableOpacity>
  );
}