import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre gereklidir');
      return;
    }

    const success = await login(username, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Hata', 'Giriş başarısız. Lütfen test kullanıcı bilgilerini kullanın.');
    }
  };


  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Giriş Yap
        </Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2">Kullanıcı Adı</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
              value={username}
              onChangeText={setUsername}
              placeholder="Kullanıcı adınızı girin"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
            />
          </View>
          
          <View>
            <Text className="text-gray-700 mb-2">Şifre</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
              value={password}
              onChangeText={setPassword}
              placeholder="Şifrenizi girin"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
            />
          </View>
          
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-3 mt-6"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Giriş Yap
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View className="mt-6 p-4 bg-yellow-100 rounded-lg">
          <Text className="text-yellow-800 text-sm text-center">
            Test için kullanın:{'\n'}
            Kullanıcı: emilys{'\n'}
            Şifre: emilyspass
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
