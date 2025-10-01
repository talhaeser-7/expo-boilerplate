import { useLanguage } from "@/contexts/LanguageContext";
import { useDeleteProduct } from "@/hooks/useProducts";
import { ProductsResponse } from "@/types/product";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText";

export default function Products( {isLoading, productsData}: {isLoading: boolean, productsData: ProductsResponse} ) {
  const deleteProduct = useDeleteProduct();
  const { t } = useLanguage();

  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        Alert.alert(t('common.success'), t('home.deleteSuccess'));
      },
    });
  };
  return (
    <View className="bg-white rounded-lg p-4 shadow-sm">
    <CustomText variant="title2" color="#1F2937" style={{ marginBottom: 16 }}>
      {t('home.products')}
    </CustomText>
    
    {isLoading ? (
      <ActivityIndicator size="large" color="#3B82F6" />
    ) : (
      <View className="space-y-3">
        {productsData?.products.map((product) => (
          <View key={product.id} className="border border-gray-200 rounded-lg p-3">
            <CustomText variant="body2" color="#1F2937">
              {product.title}
            </CustomText>
            <CustomText variant="body3" color="#6B7280" style={{ marginBottom: 8 }}>
              {product.description}
            </CustomText>
            <View className="flex-row justify-between items-center">
              <CustomText variant="body2" color="#059669">
                ${product.price}
              </CustomText>
              <TouchableOpacity
                className={`rounded px-3 py-1 ${deleteProduct.isPending ? 'bg-gray-400' : 'bg-primary-danger'}`}
                onPress={() => handleDeleteProduct(product.id)}
                disabled={deleteProduct.isPending}
              >
                <CustomText variant="caption" color="white">
                  {deleteProduct.isPending ? t('common.loading') : t('common.delete')}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )}
  </View>
  );
}