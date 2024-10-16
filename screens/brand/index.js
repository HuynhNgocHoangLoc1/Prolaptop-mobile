import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import productAPI from '../../repositories/productApi';

export default function Brand() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const handleClickCategories = (item) => {
    navigation.navigate('ProductDetail', { productItem: item });
  };

  useEffect(() => {
    if (route.params?.title) {
      navigation.setOptions({ title: route.params.title });
      const fetchProducts = async () => {
        try {
          const res = await productAPI.getProductByCategoryId(route.params?.categoryId);
          setProducts(res.data);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [route.params?.title]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleClickCategories(item)}
    >
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text
          style={[
            styles.stockBadge,
            {
              backgroundColor:
                item.stockQuantity === 0
                  ? colors.warning
                  : item.stockQuantity === 1
                  ? colors.success
                  : colors.green,
            },
          ]}
        >
          {item.stockQuantity === 0
            ? 'Sold out'
            : item.stockQuantity === 1
            ? 'On going'
            : 'In stock'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  grid: {
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productContainer: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  product: {
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    color: '#FF6347',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  stockBadge: {
    fontWeight: '700',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
