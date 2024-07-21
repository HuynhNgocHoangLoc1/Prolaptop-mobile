import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import images from "../constants/images";

export default function Welcome() {
  const handleStart = () => {
    alert("Start");
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
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    height: 200,
    width: 300,
  },
  buttonStart: {
    width: 100,
    height: 50,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 10,
    marginTop: 300,
    marginBottom: -200,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  startText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
