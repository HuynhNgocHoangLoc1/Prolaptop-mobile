import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import images from "../../constants/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import authAPI from "../../repositories/authApi";
import useAuth from "../../hooks/userAuth";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAccount, setToken } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setUserName("");
      setPassword("");
      setError("");
    }, [])
  );

  const handleSignUp = async () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = async () => {
    navigation.navigate("ForgotPassword");
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
      // Gọi API đăng nhập và chờ phản hồi
      const response = await authAPI.login({
        userName: username,
        password: password,
      });
      // console.log("Login response:", response.data);

      if (response.data) {
        // console.log("Login successful:", response.data);

        if (response.data.isBlock) {
          setError("Tài khoản của bạn đã bị chặn.");
          return;
        }

        setToken(response.data.access_token);
        setAccount({
          id: response.data.id,
          userName: response.data.userName,
          address: response.data.address,
          email: response.data.email,
          gender: response.data.gender,
          phone: response.data.phone,
          role: response.data.role,
          avatar: response.data.avatar,
          isBlock: response.data.isBlock,
        });
        // console.log("isBlock:", response.data.isBlock);

        navigation.navigate("UITab");
      }
    } catch (e) {
      // Xử lý lỗi khi có vấn đề trong quá trình đăng nhập
      if (e.response && e.response.data.statusCode === 401) {
        setError("Sai tên đăng nhập hoặc mật khẩu."); // Thay đổi thông báo lỗi cho chính xác
      } else if (e.response && e.response.data.statusCode === 500) {
        setError("Server error occurred.");
        console.error(e);
      } else {
        console.error("Unknown error occurred: ", e);
      }
    }
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
          value={username}
          onChangeText={(value) => {
            setUserName(value);
          }}
        />
        <TextInput
          style={styles.inputUserName}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />

        {error != "" && <Text style={styles.errorLine}>{error}</Text>}

        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.loginTextButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom} onPress={handleSignUp}>
          <Text
          style ={styles.dontHave}>
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
    backgroundColor: "white",
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
    // marginBottom: 20,
  },
  inputUserName: {
    fontSize: 14,
    width: 294,
    height: 40,
    margin: 8,
    borderWidth: 0.3,
    color: "black",
    borderRadius: 15,
    backgroundColor: "#D9D9D9",
    paddingLeft: 20,
  },
  loginText: {
    fontSize: 60,
    fontWeight: "bold",
    color: colors.dark_blu,
  },
  buttonLogin: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.dark_blu,
    alignItems: "center",
  },
  loginTextButton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    
  },
  bottom: {
    bottom: 10,
    position: "absolute",
  },
  errorLine: {
    color: "red",
  },
  forgotPasswordText: {
    marginTop: 10, 
    color: colors.blue_background_profile,
    textDecorationLine: "underline",
    fontSize: 13,
  },
  dontHave: {
    fontSize: 13,
    marginBottom: 10,
  },
});
