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
import { useState } from "react";
import authAPI from "../../repositories/authApi";
import useAuth from "../../hooks/userAuth";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAccount, setToken } = useAuth();

  const navigation = useNavigation();
  const handleSignUp = async () => {
    // console.log("sign up");
    navigation.navigate("SignUp");
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
    
      // Sau khi nhận phản hồi từ API, tiếp tục xử lý
      if (response.data && response.data.access_token) {
        // Đặt token
        setToken(response.data.access_token);
        
        // Đặt thông tin tài khoản
        setAccount({
          userName: response.data.userName,
          address: response.data.address,
          email: response.data.email,
          gender: response.data.gender,
          phone: response.data.phone,
          role: response.data.role,
          avatar: response.data.avatar,
        });
    
        // Điều hướng đến UITab sau khi đăng nhập thành công
        navigation.navigate("UITab");
      }
    
    } catch (e) {
      // Xử lý lỗi khi có vấn đề trong quá trình đăng nhập
      if (e.response && e.response.data.statusCode === 401) {
        setError("Wrong username or password");
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
        ></TextInput>
        <TextInput
          style={styles.inputUserName}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
        ></TextInput>

        {error != "" && <Text style={styles.errorLine}>{error}</Text>}

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
    width: 100,
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
  },
});
