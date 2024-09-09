import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import productAPI from "../../repositories/productApi";

export default function BestSeller() {
  const [products, setProducts] = useState([]); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProduct(); 
        setProducts(response.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts(); // Gọi hàm fetchProducts khi component được render
  }, []);

  const renderItem = ({ item }) => {
    const handleClick = () => {
      navigation.navigate('ProductDetail', { productItem: item }) 
    }

    return (
      <TouchableOpacity style={styles.categoryItem} onPress={handleClick}>
        <Image source={{ uri: item.imageUrl }} style={styles.img} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Seller </Text>
      </View>
      <FlatList
        data={products} // Sử dụng dữ liệu từ state
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    padding: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
    color: colors.blue_text,
  },
  categoryItem: {
    marginTop: 10,
    width: 300,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 10,
    elevation: 5, // Android shadow
    shadowColor: "rgba(0, 0, 0, 0.1)", // iOS shadow color
    shadowOpacity: 0.5, // iOS shadow opacity
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: colors.dark_gray,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
