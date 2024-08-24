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
import images from "../../constants/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import authAPI from "../../repositories/authApi";

export default function Login() {

  const [username,setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  const handleSignUp = async() => {
    // console.log("sign up");
    navigation.navigate("SignUp")
  };
  const handleLogin = async () => {
    if (username === "") {
      setError("Username can't be blank");
      return;
    }
    if (password === "") {
      setError("Password can't be blank");
      return;
    }
    try {
      await authAPI.login({
        userName: username,
        password: password,
      });
      navigation.navigate("UITab")

      // Add navigation to UITab or other functionality after successful login
    } catch (e) {
      if (e.response.data.statusCode === 401) {
        setError("Wrong username or password");
      } else if (e.response.data.statusCode === 500) {
        setError("Server error occurred.");
        console.error(e);
      }
    }
  }
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
          value = {username}
          onChangeText = {(value) =>{
            setUserName(value)
          }}
        ></TextInput>
        <TextInput
          style={styles.inputUserName}
          placeholder="Password"
          secureTextEntry
          value ={password}
          onChangeText ={(value) => {
            setPassword(value)
          }}
        ></TextInput>

        {error != '' && <Text style={styles.errorLine}>{error}</Text>}

        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.loginTextButton}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom} onPress={handleSignUp}>
          <Text>
            Don't have an account?{" "}
            <Text
              style={{
                color: colors.blue_background_profile,
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
    borderRadius: 15,
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
  errorLine: {
    color: "red",                                                           
  }
});
