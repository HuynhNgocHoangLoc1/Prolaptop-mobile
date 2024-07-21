import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import images from "../constants/images";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  
  export default function Login() {
    const handleSignUp = () => {
      console.log("sign up");
    };
    const handleLogin = () => {
      console.log("login");
    };
    return (
      <KeyboardAwareScrollView 
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        // extraScrollHeight={Platform.OS === 'ios' ? 120 : 100} // Điều chỉnh độ cao thêm khi bàn phím xuất hiện
        // enableOnAndroid={true} // Để hỗ trợ Android
      >
        <View style={styles.container}>
          <Image
            style={styles.backgroundLogin}
            source={images.backgroundWelcome}
          />
          <Text style={styles.loginText}>Login</Text>
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
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
    },
    backgroundLogin: {
      width: 252,
      height: 177,
      paddingHorizontal: 180,
      paddingVertical: 100,
    },
    inputUserName: {
      fontSize: 15,
      width: 294,
      height: "auto",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: "black",
      borderRadius: 30,
      backgroundColor: "#D9D9D9",
      paddingLeft: 20,
      paddingVertical: 10,
    },
    loginText: {
      fontSize: 45,
      fontWeight: "bold",
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    buttonLogin: {
      width: "auto",
      height: "auto",
      backgroundColor: "#D9D9D9",
      borderRadius: 30,
      elevation: 10,
      marginTop: 10,
    },
    loginTextButton: {
      fontSize: 20,
      fontWeight: "600",
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    bottom: {
      position: "absolute",
      bottom: 20,
    },
  });
  