import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import productAPI from "../../repositories/productApi";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProduct();
        setProducts(response.data.data);
        setLoading(false); // Tắt loading sau khi dữ liệu được tải
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false); // Tắt loading khi có lỗi
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    const handleClick = () => {
      navigation.navigate('ProductDetail', { productItem: item });
    };

    return (
      <TouchableOpacity style={styles.categoryItem} onPress={handleClick}>
        <Image source={{ uri: item.imageUrl }} style={styles.img} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Seller</Text>
      </View>

      {loading ? ( // Hiển thị loading khi dữ liệu chưa có
        <View style={[styles.loader, styles.horizontal]}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
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
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: colors.dark_gray,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
