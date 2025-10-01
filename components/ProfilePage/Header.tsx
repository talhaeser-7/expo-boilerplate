import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomText from '../ui/CustomText';

export default function Header() {
  const { t } = useLanguage();
  
  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <View className="flex-row justify-between items-center mb-6">
      <CustomText variant="title1" color="#1F2937">
        {t('profile.profile')}
      </CustomText>
      <TouchableOpacity
        className="bg-gray-200 rounded-full p-3"
        onPress={handleSettings}
      >
        <IconSymbol size={24} name="gearshape.fill" color="#374151" />
      </TouchableOpacity>
    </View>
  );
}