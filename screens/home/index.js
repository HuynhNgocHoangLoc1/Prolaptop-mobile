import { ScrollView, StyleSheet, Text, View, StatusBar, Image } from "react-native";
import React, { useEffect, useContext } from "react";
import Slide from "./Slider";
import Category from "./Category";
import BestSeller from "./BestSeller";
// import UITab from "../../navigation/UITab";
import colors from "../../constants/colors";
import fakeData from "../../fakeData/Data.json";
import useAuth from "../../hooks/userAuth";
import AccountContext from "../../contexts/AccountContext";

export default function Home() {
  const {account, token} = useContext(AccountContext);

  const users = fakeData.user && fakeData.user.length > 0 ? fakeData.user : [0];
  return (
    <View style={styles.container}>
      {/* <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
      /> */}
      <View style={styles.header}>
        <Text style={styles.textname}>Hi, {account.userName}</Text>
        <Image source={{ uri: account.avatar }} style={styles.avatar} /> 
      </View>

      <ScrollView>
        <View>
          <Slide style={styles.slider} />
        </View>
        <View style={styles.line}>
          <Category />
          <BestSeller />
        </View>
      </ScrollView>
     
      {/* <UITab style={styles} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Center items vertically
    paddingHorizontal: 16, // Add some horizontal padding
    justifyContent: "space-between", // Space out the text and image
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
    marginTop: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make the image circular
    marginTop: 30,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.light_gray
  },
});
