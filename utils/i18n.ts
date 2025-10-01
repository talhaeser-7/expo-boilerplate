import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

import en from '../locales/en.json';
import tr from '../locales/tr.json';

const i18n = new I18n({
  tr,
  en,
});

i18n.defaultLocale = 'tr';
i18n.locale = 'tr';

i18n.enableFallback = true;

export const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

export const saveLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem('language', language);
    i18n.locale = language;
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export const getCurrentLanguage = () => {
  return i18n.locale;
};

export const getAvailableLanguages = () => {
  return [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
  ];
};

export default i18n;
