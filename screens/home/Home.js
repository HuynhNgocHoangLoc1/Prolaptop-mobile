import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Slide from "./Slider";
import Category from "./Category";
import BestSeller from "./BestSeller";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text>Hi, user 1</Text>
      </View>
      <View>
        <Slide style={styles.slider} />
      </View>
      <Category />
      <BestSeller />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
    backgroundColor: "red",
    display: "flex",
    transform: [{ scale: 1.0 }],
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    // Add your styles here
  },
  category: {
    fontWeight: "bold",
    fontSize: 28,
  }
});
