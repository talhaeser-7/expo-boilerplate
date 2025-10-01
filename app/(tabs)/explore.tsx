import { AddProduct, SearchProduct } from '@/components/ExplorePage';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          <SearchProduct />
          <AddProduct />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
