import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCreateProduct } from '../../hooks/useProducts';
import CustomText from '../ui/CustomText';

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
  });

  const queryClient = useQueryClient();
  const createProduct = useCreateProduct();
  const { t } = useLanguage();

  const handleCreateProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      Alert.alert(t('common.error'), t('explore.fillAllFields'));
      return;
    }

    const payload = {
      title: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
      category: newProduct.category,
      discountPercentage: 0,
      rating: 0,
      stock: 100,
      thumbnail: 'https://via.placeholder.com/150',
      images: ['https://via.placeholder.com/300'],
    };
    
    createProduct.mutate(payload, {
      onSuccess: () => {
        Alert.alert(t('common.success'), t('explore.addSuccess'));
        setNewProduct({
          title: '',
          description: '',
          price: '',
          brand: '',
          category: '',
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
      onError: () => {
        Alert.alert(t('common.error'), t('explore.addError'));
      },
    });
  };

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm">
      <CustomText variant="title2" color="#1F2937" style={{ marginBottom: 16 }}>
        {t('explore.addProduct')}
      </CustomText>
      
      <View className="space-y-4">
        <View>
          <CustomText variant="subtitle2" color="#374151" style={{ marginBottom: 8 }}>
            {t('explore.productName')} *
          </CustomText>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder={t('explore.productNamePlaceholder')}
            value={newProduct.title}
            onChangeText={(text) => setNewProduct({...newProduct, title: text})}
          />
        </View>
        
        <View>
          <CustomText variant="subtitle2" color="#374151" style={{ marginBottom: 8 }}>
            {t('explore.description')} *
          </CustomText>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder={t('explore.descriptionPlaceholder')}
            value={newProduct.description}
            onChangeText={(text) => setNewProduct({...newProduct, description: text})}
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View>
          <CustomText variant="subtitle2" color="#374151" style={{ marginBottom: 8 }}>
            {t('explore.price')} *
          </CustomText>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder={t('explore.pricePlaceholder')}
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({...newProduct, price: text})}
            keyboardType="numeric"
          />
        </View>
        
        <View>
          <CustomText variant="subtitle2" color="#374151" style={{ marginBottom: 8 }}>
            {t('explore.brand')}
          </CustomText>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder={t('explore.brandPlaceholder')}
            value={newProduct.brand}
            onChangeText={(text) => setNewProduct({...newProduct, brand: text})}
          />
        </View>
        
        <View className="mb-4">
          <CustomText variant="subtitle2" color="#374151" style={{ marginBottom: 8 }}>
            {t('explore.category')}
          </CustomText>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-blue-500"
            placeholder={t('explore.categoryPlaceholder')}
            value={newProduct.category}
            onChangeText={(text) => setNewProduct({...newProduct, category: text})}
          />
        </View>
        
        <TouchableOpacity
          className={`rounded-lg py-3 ${
            createProduct.isPending 
              ? 'bg-primary-secondary opacity-70' 
              : 'bg-primary-secondary'
          }`}
          onPress={handleCreateProduct}
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="white" size="small" />
              <CustomText variant="body2" color="white" style={{ marginLeft: 8 }}>
                {t('explore.adding')}
              </CustomText>
            </View>
          ) : (
            <CustomText variant="body2" color="white" align="center">
              {t('explore.addButton')}
            </CustomText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}