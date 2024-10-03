import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext } from "react";
import Slide from "./Slider";
import Category from "./Category";
import BestSeller from "./BestSeller";
// import UITab from "../../navigation/UITab";
import colors from "../../constants/colors";
import fakeData from "../../fakeData/Data.json";
import useAuth from "../../hooks/userAuth";
import AccountContext from "../../contexts/AccountContext";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { account, token } = useContext(AccountContext);
  const navigation = useNavigation();
  const onClickChat = () => {
    navigation.navigate("Chat");
  };

  // const users = fakeData.user && fakeData.user.length > 0 ? fakeData.user : [0];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textname}>Hi, {account.userName}</Text>
        <TouchableOpacity onPress={onClickChat}>
          <Image
            source={require("../../assets/icons/funtion/chat.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
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
    width: 30,
    height: 30,
    // borderRadius: 20,
    marginTop: 30,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.light_gray,
  },
});
