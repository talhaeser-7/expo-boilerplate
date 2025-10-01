import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomText from '../ui/CustomText';

export default function Header() {
  const { t } = useLanguage();
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-row items-center mb-6">
      <TouchableOpacity
        className="bg-gray-200 rounded-full p-3 mr-4"
        onPress={handleBack}
      >
        <IconSymbol size={24} name="chevron.left" color="#374151" />
      </TouchableOpacity>
      <CustomText variant="title1" color="#1F2937">
        {t('settings.settings')}
      </CustomText>
    </View>
  );
}