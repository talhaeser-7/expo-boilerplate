import { Hero, Products } from '@/components/HomePage';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../../hooks/useProducts';

export default function HomeScreen() {
  const { data: productsData, isLoading } = useProducts(2);
  return (
    <SafeAreaView className="flex-1 bg-primary-background">
      <ScrollView className="flex-1 p-4">
        <Hero />
        <Products isLoading={isLoading} productsData={productsData! } />       
      </ScrollView>
    </SafeAreaView>
  );
}
