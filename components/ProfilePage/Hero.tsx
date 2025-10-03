import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors } from '../../utils/color';
import CustomText from '../ui/CustomText';

export default function Hero() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <View 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: colors.mainColor,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 12,
        borderWidth: 1,
        borderColor: `${colors.mainColor}10`,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View 
          style={{
            width: 100,
            height: 100,
            backgroundColor: `${colors.mainColor}15`,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            shadowColor: colors.mainColor,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 8,
            borderWidth: 3,
            borderColor: `${colors.mainColor}20`,
          }}
        >
          {user?.image ? (
            <Image 
              source={{ uri: user.image }} 
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <IconSymbol size={48} name="person.fill" color={colors.mainColor} />
          )}
        </View>
        <CustomText 
          variant="title1" 
          color="#1F2937"
          style={{
            fontWeight: '700',
            fontSize: 24,
            marginBottom: 4,
          }}
        >
          {user?.firstName} {user?.lastName}
        </CustomText>
        <CustomText 
          variant="body2" 
          color={colors.mainColor}
          style={{
            fontWeight: '500',
            fontSize: 16,
          }}
        >
          @{user?.username}
        </CustomText>
      </View>

      {/* User Info */}
      <View style={{ gap: 20 }}>
        <View 
          style={{
            borderBottomWidth: 1,
            borderBottomColor: `${colors.mainColor}15`,
            paddingBottom: 16,
          }}
        >
          <CustomText 
            variant="subtitle1" 
            color="#6B7280" 
            style={{ 
              marginBottom: 8,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {t('profile.email')}
          </CustomText>
          <CustomText 
            variant="body2" 
            color="#1F2937"
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            {user?.email}
          </CustomText>
        </View>
        
        <View 
          style={{
            borderBottomWidth: 1,
            borderBottomColor: `${colors.mainColor}15`,
            paddingBottom: 16,
          }}
        >
          <CustomText 
            variant="subtitle1" 
            color="#6B7280" 
            style={{ 
              marginBottom: 8,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {t('profile.username')}
          </CustomText>
          <CustomText 
            variant="body2" 
            color={colors.mainColor}
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            @{user?.username}
          </CustomText>
        </View>
        
        <View 
          style={{
            borderBottomWidth: 1,
            borderBottomColor: `${colors.mainColor}15`,
            paddingBottom: 16,
          }}
        >
          <CustomText 
            variant="subtitle1" 
            color="#6B7280" 
            style={{ 
              marginBottom: 8,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {t('profile.fullName')}
          </CustomText>
          <CustomText 
            variant="body2" 
            color="#1F2937"
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            {user?.firstName} {user?.lastName}
          </CustomText>
        </View>
        
        <View style={{ paddingBottom: 8 }}>
          <CustomText 
            variant="subtitle1" 
            color="#6B7280" 
            style={{ 
              marginBottom: 8,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {t('profile.userId')}
          </CustomText>
          <CustomText 
            variant="body2" 
            color={colors.secondaryColor}
            style={{
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            #{user?.id}
          </CustomText>
        </View>
      </View>
    </View>
  );
}