import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import fakeData from "../../fakeData/Data.json";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const ProductDetail = () => {
  const route = useRoute();
  const { productItem } = route.params;
  const navigation = useNavigation();
  const handleToCart = () => {
    navigation.navigate("Cart");
  }
  // Get a single product (e.g., the first product in the array)
  // const product = fakeData.product && fakeData.product.length > 0 ? fakeData.product[0] : null;

  // Check if product is available before rendering
  if (!productItem) {
    return (
      <View style={styles.container}>
        <Text>No Product Available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Image source={{ uri: productItem.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{productItem.name}</Text>
      <Text style={styles.price}>${productItem.price}</Text>
      
      <View style={styles.information}>
        <Text style={styles.label}>Ram: {productItem.ram}</Text>
        <Text style={styles.label}>CPU: {productItem.cpu}</Text>
        <Text style={styles.label}>Card: {productItem.card}</Text>
        <Text style={styles.label}>Chip: {productItem.chip}</Text>
        <Text style={styles.label}>Hard Drive: {productItem.hardDrive}</Text>
      </View>
      
      <Text style={styles.description}>Description: {productItem.description}</Text>
      
      <View style={styles.footer}>
        <Button style={styles.button} title="Add to Cart" onPress={handleToCart}  color="red"/>
        <Text style={styles.totalPrice}>$5000</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 10

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#FF6347',
    marginBottom: 20,
  },
  information: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF6347',
  },
});
