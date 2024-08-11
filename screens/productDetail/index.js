import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import fakeData from "../../fakeData/Data.json";

const ProductDetail = () => {
  // Get a single product (e.g., the first product in the array)
  const product = fakeData.product && fakeData.product.length > 0 ? fakeData.product[0] : null;

  // Check if product is available before rendering
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No Product Available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title1}>Product detail</Text>

      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      
      <View style={styles.information}>
        <Text style={styles.label}>Ram: {product.ram}</Text>
        <Text style={styles.label}>CPU: {product.cpu}</Text>
        <Text style={styles.label}>Card: {product.card}</Text>
        <Text style={styles.label}>Chip: {product.chip}</Text>
        <Text style={styles.label}>Hard Drive: {product.hardDrive}</Text>
      </View>
      
      <Text style={styles.description}>Description: {product.description}</Text>
      
      <View style={styles.footer}>
        <Button title="Add to Cart" onPress={() => {}} color="#FF6347" />
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
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
