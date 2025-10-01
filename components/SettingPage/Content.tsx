import { IconSymbol } from '@/components/ui/icon-symbol';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomText from '../ui/CustomText';

export default function Content() {
  const { t, currentLanguage, availableLanguages, changeLanguage } = useLanguage();

  const handleLanguageChange = () => {
    Alert.alert(
      t('settings.language'),
      'Dil seçin / Select Language',
      availableLanguages.map(lang => ({
        text: lang.name,
        onPress: () => changeLanguage(lang.code),
      }))
    );
  };

  return (
    <>
      {/* Settings Options */}
      <View className="bg-white rounded-lg shadow-sm mb-6">
        <TouchableOpacity 
          className="flex-row items-center p-4 border-b border-gray-200"
          onPress={handleLanguageChange}
        >
          <IconSymbol size={24} name="person.circle" color="#3B82F6" />
          <CustomText variant="body2" color="#1F2937" style={{ marginLeft: 16, flex: 1 }}>
            {t('settings.language')}
          </CustomText>
          <CustomText variant="body2" color="#6B7280" style={{ marginRight: 8 }}>
            {currentLanguage === 'tr' ? '🇹🇷' : '🇺🇸'}
          </CustomText>
          <IconSymbol size={20} name="chevron.right" color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <CustomText variant="title2" color="#1F2937" style={{ marginBottom: 16 }}>
          {t('settings.appInfo')}
        </CustomText>
        
        <View className="space-y-3">
          <View className="flex-row justify-between">
            <CustomText variant="body2" color="#6B7280">{t('settings.version')}</CustomText>
            <CustomText variant="body2" color="#1F2937">1.0.0</CustomText>
          </View>
          
          <View className="flex-row justify-between">
            <CustomText variant="body2" color="#6B7280">{t('settings.build')}</CustomText>
            <CustomText variant="body2" color="#1F2937">2024.01</CustomText>
          </View>
          
          <View className="flex-row justify-between">
            <CustomText variant="body2" color="#6B7280">{t('settings.platform')}</CustomText>
            <CustomText variant="body2" color="#1F2937">React Native</CustomText>
          </View>
        </View>
      </View>
    </>
  );
}