import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Touchable,
} from "react-native";
import React from "react";
import images from "../../constants/images";
import UITab from "../../navigation/UITab";
import colors from "../../constants/colors";

export default function Profile() {
    // const onLogout = () =>{

    // }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.blue_background_profile}
        barStyle="white"
      />
      <ImageBackground
        style={styles.background}
        source={images.profileBackground}
      />
      {/* <Touchable
        onPress={onLogout}
      >
        <Text>Logout</Text>
      </Touchable> */}
      {/* <UITab/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: "100%",
    flex: 2.6,
    height: 400,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: 400,
  },
});
