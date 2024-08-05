import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlightComponent,
} from "react-native";
import React from "react";
import images from "../constants/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

  const navigation = useNavigation();
  const handleSignUp = () => {
    console.log("sign up");
    navigation.navigate("SignUp")
  };
  const handleLogin = () => {
    navigation.navigate("UITab")
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          style={styles.backgroundLogin}
          source={images.backgroundWelcome}
        />
        <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputUserName}
          placeholder="Username"
        ></TextInput>
        <TextInput
          style={styles.inputUserName}
          placeholder="Password"
          secureTextEntry
        ></TextInput>
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.loginTextButton}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom} onPress={handleSignUp}>
          <Text>
            Don't have an account?{" "}
            <Text
              style={{
                color: colors.secondary,
                textDecorationLine: "underline",
              }}
            >
              Sign up?
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
  },
  backgroundLogin: {
    width: 252,
    height: 177,
    marginBottom: 20, // Cách ly hình ảnh khỏi các phần tử khác
  },
  inputUserName: {
    fontSize: 15,
    width: 294,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 30,
    backgroundColor: "#D9D9D9",
    paddingLeft: 20,
  },
  loginText: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20, // Cách ly văn bản khỏi các phần tử khác
  },
  buttonLogin: {
    width:100,
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    elevation: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    },
  loginTextButton: {
    fontSize: 20,
    fontWeight: "600",
  },
  bottom: {
    bottom: 10,
    position: "absolute", 
  },
});
