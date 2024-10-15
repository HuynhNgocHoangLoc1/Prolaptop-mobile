import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import fakeData from "../../fakeData/Data.json";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/userAuth';
import cartAPI from '../../repositories/cartApi';

const ProductDetail = () => {
  const route = useRoute();
  const { productItem } = route.params;
  const { account } = useAuth();
  const navigation = useNavigation();

  const handleToCart = async () => {
    await cartAPI.addProductToCart({
      userId: account.id,
      productId: productItem.id,
      quantity: 1
    });
    navigation.navigate("Cart");
  };

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
        <TouchableOpacity style={styles.button} onPress={handleToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>${productItem.price}</Text>
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
    color: '#FF6347',
  },
  button: {
    backgroundColor: '#FF6347', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
