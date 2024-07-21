import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import images from "../constants/images";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {

    const navigation = useNavigation();
  const handleStart = () => {
    navigation.navigate("Login");
  };
  
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={images.backgroundWelcome} />
        <Text style ={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity style={styles.buttonStart} onPress={handleStart}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: 252,
    height: 177,
    justAlign: "center",
    resizeMode: "cover",
    transform: [{ scale: 1.0 }],

  },
  buttonStart: {
    width: "auto",
    height: "auto",
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 10,
    position: "absolute",
    bottom: 50,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "900",
  },
  startText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
});
