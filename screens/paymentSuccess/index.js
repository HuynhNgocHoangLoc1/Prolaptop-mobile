import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Success() {
  return (
    <View style={styles.container}>
      {/* Hình ảnh giỏ hàng */}
      {/* <Image
        source={require('../../assets/images/backgroundWelcome.png')} // Thay thế bằng đường dẫn hình ảnh của bạn
        style={styles.cartImage}
      /> */}
      
      {/* Dấu tích xanh */}
      <Image
        source={require('../../assets/icons/orderIcons/check.png')} // Thay thế bằng đường dẫn hình ảnh dấu tích của bạn
        style={styles.checkMark}
      />

      {/* Text "Thank you for buying" */}
      <Text style={styles.thankYouText}>Thank you for buying</Text>

      {/* Nút "Continue shopping" */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cartImage: {
    width: 250, 
    height: 150, 
    marginBottom: 20,
  },
  checkMark: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 18,
    color: '#5a55f5',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1a1919',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
