import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import categoryAPI from "../../repositories/categoryApi";
export default function Category() {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCategories = async () => {
      await categoryAPI
        .getAllCategory()
        .then((res) => {
          setCategory(res.data.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    };
    fetchCategories();
  }, []);

 

  const renderItem = ({ item }) => {
    const handleClick = () => {
      navigation.navigate("Brand", { title: item.name, categoryId: item.id });
    };
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={handleClick}>
        <View style={styles.shape} />
        <Image source={{ uri: item.iconUrl }} style={styles.img} />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories </Text>
      </View>
      {loading ? ( // Hiển thị loading khi dữ liệu chưa có
        <View style={[styles.loader, styles.horizontal]}>
        </View>
      ) : (
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
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
    marginBottom: 15,
    marginTop: 5,
  },
  header: {
    padding: 10,
    paddingBottom: 0,
  },
  categoryItem: {
    marginTop: 10,
    width: 130,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 4,
    borderRadius: 10,
    elevation: 5, // Android shadow
    overflow: "hidden",
    borderWidth: 0, // Tăng độ dày của viền
    borderColor: "black", // Đặt màu viền là đen
  },
  img: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 18,
    marginTop: 16,
    color: colors.light_blu,
    fontWeight: '600',
  },
  shape: {
    width: 150,
    height: 150,
    backgroundColor: colors.blue_main,
    borderRadius: 100,
    position: "absolute",
    top: -50,
  },
  title: {
    color: colors.dark_blu,
    fontWeight: '700',
    fontSize: 22
  },
});
