import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../global.css';


const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {


  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false, gestureEnabled: true,
                fullScreenGestureEnabled: true }} />
            </Stack>
            <StatusBar style="auto" />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
