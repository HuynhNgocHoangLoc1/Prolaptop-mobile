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
      <View style={styles.welcome}>
        <Text style={styles.textname}>Hello, {account.userName}</Text>
        <Text style={styles.slogan}>Welcome to Prolaptop, your best choice for laptop</Text>
        </View>
        <TouchableOpacity onPress={onClickChat}>
          <Image
            source={require("../../assets/icons/funtion/comments.png")}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingBottom: 20,
    paddingTop: 20,
  },
  category: {
    fontWeight: "bold",
    fontSize: 28,
  },
  textname: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.dark_blu,
    marginTop: 30,
  },
  avatar: {
    width: 30,
    height: 30,
    marginTop: 30,
  },
  line: {
    paddingTop: 10,
    backgroundColor: colors.light_gray,
  },
  slogan: {
    color: colors.light_blu,
    marginTop: 2
},
  welcome: {
    marginEnd: 20,
  },
  slider: {
    width: '100%',
    height: 160,
}

});
