import { Tabs } from 'expo-router';
import React from 'react';

import AuthGuard from '../../components/AuthGuard';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {

  return (
    <AuthGuard>
      <Tabs
      
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Ana Sayfa',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Keşfet',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
