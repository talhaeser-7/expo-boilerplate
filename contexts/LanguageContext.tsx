import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n, { getAvailableLanguages, getCurrentLanguage, loadLanguage, saveLanguage } from '../utils/i18n';

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: Array<{ code: string; name: string }>;
  changeLanguage: (language: string) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [availableLanguages] = useState(getAvailableLanguages());

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    await loadLanguage();
    setCurrentLanguage(getCurrentLanguage());
  };

  const changeLanguage = async (language: string) => {
    await saveLanguage(language);
    setCurrentLanguage(language);
  };

  const t = (key: string) => {
    return i18n.t(key);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      changeLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
