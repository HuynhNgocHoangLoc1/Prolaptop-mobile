import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import fakeData from "../../fakeData/Data.json";
import LaptopItem from "../../components/LaptopItem";
export default function Search() {
  const [searchText, setSearchText] = useState("");

  const product =
    fakeData.product && fakeData.product.length > 0 ? fakeData.product : [];

  // console.log(product);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.menu}>
          <AntDesign name="menu-fold" size={24} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="search product"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.search}>
          <AntDesign name="search1" size={24} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
      </View>

      {/* Display the filtered products */}
      <FlatList
        data={product}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <LaptopItem item={item} />}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}

      />
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
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
