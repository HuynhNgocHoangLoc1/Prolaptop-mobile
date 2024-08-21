import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import colors from "../../constants/colors";
import fakeData from "../../fakeData/Data.json";
import { useNavigation } from "@react-navigation/native";

export default function BestSeller() {
  const navigation = useNavigation();

  
  const renderItem = ({ item }) => {
    const handleClick = () => {
      navigation.navigate('ProductDetail', { productItem: item })
    }
    // console.log(item.imageUrl);
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={handleClick}>
        <Image source={{uri : item.imageUrl}} style={styles.img} />
      </TouchableOpacity>
    );
  };

  const product = fakeData.product && fakeData.product.length > 0 ? fakeData.product : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Seller </Text>
      </View>
      <FlatList
        data={product}
        keyExtractor={(item, index) => index.toString()}
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
  categoryText: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 22,
  },
  shape: {
    width: 220,
    height: 200,
    backgroundColor: colors.blue_main,
    borderRadius: 100,
    position: "absolute",
    top: -50,
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
  text: {
    fontSize: 25,
    fontWeight: "500",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
    color: colors.blue_text,

  },
});
