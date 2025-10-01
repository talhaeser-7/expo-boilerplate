import { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSearchProducts } from '../../hooks/useProducts';
import CustomText from '../ui/CustomText';

export default function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchProducts(searchQuery);
  const { t } = useLanguage();

  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <CustomText variant="title2" color="#1F2937" style={{ marginBottom: 16 }}>
        {t('explore.searchProducts')}
      </CustomText>
      
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder={t('explore.searchPlaceholder')}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {isLoading && <ActivityIndicator size="small" color="#3B82F6" />}
      
      {searchResults && searchResults.products.length > 0 && (
        <View className="space-y-2">
          {searchResults.products.map((product) => (
            <View key={product.id} className="border border-gray-200 rounded p-3">
              <CustomText variant="body2" color="#1F2937">
                {product.title}
              </CustomText>
              <CustomText variant="body3" color="#6B7280">
                {product.description}
              </CustomText>
              <CustomText variant="body2" color="#059669">
                ${product.price}
              </CustomText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}