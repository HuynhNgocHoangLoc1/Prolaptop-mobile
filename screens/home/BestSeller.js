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
  export default function BestSeller() {
    const [categories, setCategory] = useState([
      {
        name: "Asus",
        icon: require("../../assets/icons/category/asus.png"),
      },
      
      { name: "Hp", icon: require("../../assets/icons/category/hp.png") },
  
      {
        name: "Msi",
        icon: require("../../assets/icons/category/msi.png"),
      },
      {
          name: "Apple",
          icon: require("../../assets/icons/category/apple.png"),
        },
    ]);
  
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.shape} />
          <Image source={item.icon} style={styles.img} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Best Seller </Text>
        </View>
        <FlatList
          data={categories}
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
      width: 150,
      height: 150,
      backgroundColor: colors.dark_gray,
      borderRadius: 100,
      position: "absolute",
      top: -50,
    },
    categoryItem: {
      marginTop: 10,
      width: 130,
      height: 160,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
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
      width: 60,
      height: 60,
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
    },
  });
  