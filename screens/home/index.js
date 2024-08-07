import { ScrollView, StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import Slide from "./Slider";
import Category from "./Category";
import BestSeller from "./BestSeller";
// import UITab from "../../navigation/UITab";
import colors from "../../constants/colors";


export default function Home() {
  return (
    
    <ScrollView style={styles.container}>
       {/* <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      /> */}
      <View style={styles.header}>
        <Text style={styles.textname}>Hi, user 1</Text>
      </View>
      <View>
        <Slide style={styles.slider} />
      </View>
      <Category />
      <BestSeller />
      {/* <UITab style={styles} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
    backgroundColor: "#fff",
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
  },

  textname: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    paddingRight: 290,
    paddingTop: 0,
    marginTop: 20,
  },
});
