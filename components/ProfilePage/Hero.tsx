import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomText from '../ui/CustomText';

export default function Hero() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <View className="items-center mb-6">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
          {user?.image ? (
            <Image 
              source={{ uri: user.image }} 
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <IconSymbol size={40} name="person.fill" color="#3B82F6" />
          )}
        </View>
        <CustomText variant="title1" color="#1F2937">
          {user?.firstName} {user?.lastName}
        </CustomText>
        <CustomText variant="body2" color="#6B7280">@{user?.username}</CustomText>
      </View>

      {/* User Info */}
      <View className="space-y-4">
        <View className="border-b border-gray-200 pb-4">
          <CustomText variant="subtitle1" color="#6B7280" style={{ marginBottom: 4 }}>
            {t('profile.email')}
          </CustomText>
          <CustomText variant="body2" color="#1F2937">{user?.email}</CustomText>
        </View>
        
        <View className="border-b border-gray-200 pb-4">
          <CustomText variant="subtitle1" color="#6B7280" style={{ marginBottom: 4 }}>
            {t('profile.username')}
          </CustomText>
          <CustomText variant="body2" color="#1F2937">{user?.username}</CustomText>
        </View>
        
        <View className="border-b border-gray-200 pb-4">
          <CustomText variant="subtitle1" color="#6B7280" style={{ marginBottom: 4 }}>
            {t('profile.fullName')}
          </CustomText>
          <CustomText variant="body2" color="#1F2937">{user?.firstName} {user?.lastName}</CustomText>
        </View>
        
        <View className="pb-4">
          <CustomText variant="subtitle1" color="#6B7280" style={{ marginBottom: 4 }}>
            {t('profile.userId')}
          </CustomText>
          <CustomText variant="body2" color="#1F2937">#{user?.id}</CustomText>
        </View>
      </View>
    </View>
  );
}