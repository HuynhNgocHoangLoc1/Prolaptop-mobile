import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import LaptopItem from "../../components/LaptopItem"; // Component để hiển thị sản phẩm
import productAPI from "../../repositories/productApi";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [originProducts, setOriginProducts] = useState([]); // Dữ liệu gốc sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu sau khi lọc
  const [isSortedAZ, setIsSortedAZ] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await productAPI.getAllProduct({ page: 1 });
          const data = response.data.data;
          setOriginProducts(data); // Cập nhật dữ liệu gốc
          setFilteredProducts(data); // Dữ liệu ban đầu cho bộ lọc
          setPage(1);
          setHasMore(data.length > 0); // Kiểm tra còn dữ liệu không
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [])
  );

  // Hàm load thêm dữ liệu
  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMore) return;
    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      const response = await productAPI.getAllProduct({ page: nextPage, limit: 10 }); // Gọi API
      const newProducts = response.data.data;
  
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // Sắp xếp sản phẩm theo tên hoặc tiêu chí khác
        const sortedProducts = [...originProducts, ...newProducts].sort((a, b) =>
          a.name.localeCompare(b.name) // Thay "name" bằng trường bạn muốn sắp xếp
        );
  
        setOriginProducts(sortedProducts); // Lưu dữ liệu gốc đã sắp xếp
        setFilteredProducts(sortedProducts); // Lưu dữ liệu hiển thị đã sắp xếp
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  
  // Lọc sản phẩm khi searchText thay đổi
  React.useEffect(() => {
    if (searchText === "") {
      setFilteredProducts(originProducts);
    } else {
      const filtered = originProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, originProducts]);

  // Hàm sắp xếp sản phẩm
  const sortProducts = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      isSortedAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredProducts(sortedProducts);
    setIsSortedAZ(!isSortedAZ);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.menu} onPress={sortProducts}>
          <AntDesign name="menu-fold" size={24} color="rgba(0, 0, 0, 0.1)" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="search product"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.search}>
          <AntDesign name="search1" size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <LaptopItem item={item} />}
          onEndReached={loadMoreProducts} // Gọi loadMoreProducts khi kéo đến cuối
          onEndReachedThreshold={0.5} // Kích hoạt ở 50% cuối danh sách
          ListFooterComponent={
            isLoadingMore && (
              <ActivityIndicator
                size="small"
                color="blue"
                style={{ marginVertical: 10 }}
              />
            )
          } // Loader khi đang tải thêm
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
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textDecorationLine: "underline",
    color: colors.light_blu
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
