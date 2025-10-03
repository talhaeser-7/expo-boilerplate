import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../utils/color';
import CustomText from './ui/CustomText';
import { IconSymbol } from './ui/icon-symbol';

interface TabItem {
  name: string;
  title: string;
  icon: string;
  route: string;
}

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const getTabs = (t: (key: string) => string): TabItem[] => [
  {
    name: 'index',
    title: t('navigation.home'),
    icon: 'house.fill',
    route: '/(tabs)/',
  },
  {
    name: 'explore',
    title: t('navigation.explore'),
    icon: 'paperplane.fill',
    route: '/(tabs)/explore',
  },
  {
    name: 'profile',
    title: t('navigation.profile'),
    icon: 'person.fill',
    route: '/(tabs)/profile',
  },
];

export default function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const tabs = getTabs(t);
  
  const scaleAnimations = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;
  
  const opacityAnimations = useRef(
    state.routes.map(() => new Animated.Value(0.6))
  ).current;

  useEffect(() => {
    state.routes.forEach((_: any, index: number) => {
      const isFocused = state.index === index;
      
      Animated.parallel([
        Animated.spring(scaleAnimations[index], {
          toValue: isFocused ? 1.1 : 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimations[index], {
          toValue: isFocused ? 1 : 0.6,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    });
  }, [state.index, scaleAnimations, opacityAnimations, state.routes]);

  return (
    <View 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom,
        paddingHorizontal: 20,
        paddingTop: 12,
      }}
    >
      <View 
        style={{
          backgroundColor: colors.primaryBackground,
          borderRadius: 28,
          flexDirection: 'row',
          height: 70,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-around',
          shadowColor: colors.mainColor,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 12,
          borderWidth: 1,
          borderColor: `${colors.mainColor}20`,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tab = tabs.find(t => t.name === route.name);

          const onPress = () => {
            if (!isFocused) {
              const routePath = tab?.route || `/(tabs)/${route.name}`;
              router.push(routePath as any);
            }
          };

          const onLongPress = () => {
            // Long press functionality can be added here if needed
          };

          return (
            <Animated.View
              key={route.key}
              style={{
                transform: [{ scale: scaleAnimations[index] }],
                opacity: opacityAnimations[index],
              }}
            >
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  backgroundColor: isFocused ? `${colors.mainColor}15` : 'transparent',
                  minWidth: 70,
                  marginHorizontal: 4,
                }}
                activeOpacity={0.8}
              >
                <View style={{ alignItems: 'center' }}>
                  <Animated.View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: isFocused ? colors.mainColor : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 4,
                      shadowColor: isFocused ? colors.mainColor : 'transparent',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: isFocused ? 6 : 0,
                    }}
                  >
                    <IconSymbol
                      size={20}
                      name={tab?.icon as any || 'circle'}
                      color={isFocused ? '#FFFFFF' : colors.mainColor}
                    />
                  </Animated.View>
                  <CustomText 
                    variant="caption" 
                    color={isFocused ? colors.mainColor : '#6B7280'}
                    style={{
                      fontWeight: isFocused ? '600' : '400',
                      fontSize: 11,
                    }}
                  >
                    {tab?.title}
                  </CustomText>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
