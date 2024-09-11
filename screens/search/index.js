import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import LaptopItem from "../../components/LaptopItem"; // Component để hiển thị sản phẩm
import productAPI from "../../repositories/productApi";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [originProducts, setOriginProducts] = useState([]); // Dữ liệu gốc sản phẩm
  const [products, setProducts] = useState([]); // Dữ liệu hiển thị sau khi lọc
  const [isSortedAZ, setIsSortedAZ] = useState(true); // Trạng thái sắp xếp A-Z ban đầu
  const [loading, setLoading] = useState(true); // Thêm state loading

  // Gọi API lấy danh sách sản phẩm khi component được render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProduct(); // Gọi API lấy dữ liệu sản phẩm
        setOriginProducts(response.data.data); // Lưu dữ liệu gốc vào state
        setProducts(response.data.data); // Cập nhật products với dữ liệu từ API
        setLoading(false); // Tắt loading khi dữ liệu đã tải xong
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false); // Tắt loading khi có lỗi
      }
    };

    fetchProducts(); // Gọi hàm fetchProducts khi component mount
  }, []); // Chạy một lần khi component render lần đầu

  // Lọc sản phẩm dựa trên searchText
  useEffect(() => {
    if (searchText === "") {
      setProducts(originProducts);
    } else {
      const filteredProducts = originProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchText, originProducts]); // Chạy lại khi searchText hoặc originProducts thay đổi

  // Hàm sắp xếp sản phẩm
  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) =>
      isSortedAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setProducts(sortedProducts); // Cập nhật danh sách đã sắp xếp
    setIsSortedAZ(!isSortedAZ); // Thay đổi trạng thái sắp xếp
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.menu} onPress={sortProducts}>
          <AntDesign name="menu-fold" size={24} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="search product"
          value={searchText}
          onChangeText={(text) => setSearchText(text)} // Cập nhật searchText khi thay đổi
        />
        <TouchableOpacity style={styles.search}>
          <AntDesign name="search1" size={24} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
      </View>

      
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <LaptopItem item={item} />} // Sử dụng LaptopItem để hiển thị sản phẩm
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 5,
    backgroundColor: "#f5f5f5",
  },
  menu: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  search: {
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
