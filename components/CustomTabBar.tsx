import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const tabs: TabItem[] = [
  {
    name: 'index',
    title: 'Ana Sayfa',
    icon: 'house.fill',
    route: '/(tabs)/',
  },
  {
    name: 'explore',
    title: 'Keşfet',
    icon: 'paperplane.fill',
    route: '/(tabs)/explore',
  },
  {
    name: 'profile',
    title: 'Profil',
    icon: 'person.fill',
    route: '/(tabs)/profile',
  },
];

export default function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  
  // Animasyon değerleri
  const scaleAnimations = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    // Aktif tab için sade animasyon
    state.routes.forEach((_: any, index: number) => {
      const isFocused = state.index === index;
      Animated.timing(scaleAnimations[index], {
        toValue: isFocused ? 1.05 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index, scaleAnimations, state.routes]);

  return (
    <View 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
        paddingTop: 8,
      }}
    >
      <View 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          flexDirection: 'row',
          height: 60,
          paddingHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 0.5,
          borderColor: '#E5E5E5',
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
                  paddingVertical: 6,
                  paddingHorizontal: 8,
                  borderRadius: 12,
                  backgroundColor: isFocused ? '#007AFF20' : 'transparent',
                  minWidth: 60,
                  marginHorizontal: 2,
                }}
                activeOpacity={0.7}
              >
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: isFocused ? '#007AFF' : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <IconSymbol
                      size={18}
                      name={tab?.icon as any || 'circle'}
                      color={isFocused ? '#FFFFFF' : '#8E8E93'}
                    />
                  </View>
                  <Text
                    style={{
                      color: isFocused ? '#007AFF' : '#8E8E93',
                      fontSize: 10,
                      fontWeight: isFocused ? '600' : '400',
                      textAlign: 'center',
                      opacity: isFocused ? 1 : 0.5,
                    }}
                  >
                    {tab?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
