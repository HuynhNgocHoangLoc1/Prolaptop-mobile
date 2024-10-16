import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import authAPI from "../../repositories/authApi";

export default function SignUp() {

  const navigation = useNavigation();
  const [error, setError] = useState('');


  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  

  // Đảm bảo FormData được truyền vào authAPI.register
const handleRegister = async () => {
  if (username === "") {
    setError("Username can't be blank");
    return;
  }
  if (password === "") {
    setError("Password can't be blank");
    return;
  }
  if (confirmPassword === "") {
    setError("Confirm password can't be blank");
    return;
  }
  if (email === "") {
    setError("Email can't be blank");
    return;
  }
  if (gender === "") {
    setError("Gender can't be blank");
    return;
  }
  if (phoneNumber === "") {
    setError("PhoneNumber can't be blank");
    return;
  }
  if (address === "") {
    setError("Address can't be blank");
    return;
  }
  if (password !== confirmPassword) {
    setError("Confirm password is different from password ");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Invalid email format");
    return;
  }

  const phoneRegex = /^\d{9,11}$/;
  if (!phoneRegex.test(phoneNumber)) {
    setError("Invalid phone number format. It should contain 9 to 11 digits.");
    return;
  }

  // const formData = new FormData();
  // formData.append('userName', username);
  // formData.append('password', password);
  // formData.append('confirmPassword', confirmPassword);
  // formData.append('email', email);
  // formData.append('gender', gender);
  // formData.append('phoneNumber', phoneNumber);
  // formData.append('address', address);

  try {
    await authAPI.register(formData);
    console.log("register success");
    navigation.navigate("Login"); // Chuyển hướng sau khi đăng ký thành công
} catch (e) {
    console.error(e.response ? e.response.data : e.message); // In ra chi tiết lỗi
    if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message); // Sử dụng thông báo lỗi từ API nếu có
    } else {
        setError("An unknown error occurred.");
    }
}
}


  const formData = new FormData();
  formData.append('userName', username);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
  formData.append('email', email);
  formData.append('gender', gender);
  formData.append('phoneNumber', phoneNumber);
  formData.append('address', address);
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
    <View style={styles.container}>
      <Image
      style={styles.backgroundSignUp}
      source={images.backgroundWelcome}
      />
      <Text style={styles.textRegister}>Register</Text>
      <TextInput style={styles.input } placeholder="user name"
       value = {username}
       onChangeText = {(value) =>{
         setUserName(value)
       }}
       ></TextInput>
      <TextInput style={styles.input} placeholder="password"
        value = {password}
        secureTextEntry
        onChangeText = {(value) =>{
          setPassword(value)
        }}
        ></TextInput>
      <TextInput style={styles.input} placeholder="confirm password"
        value = {confirmPassword}
        secureTextEntry
        onChangeText = {(value) =>{
          setConfirmPassword(value)
        }}
      ></TextInput>
      <TextInput style={styles.input} placeholder="email"
        value = {email}
        onChangeText = {(value) =>{
          setEmail(value)
        }}
      ></TextInput>
      <TextInput style={styles.input} placeholder="gender"
        value = {gender}
        onChangeText = {(value) =>{
          setGender(value)
        }}
      ></TextInput>
      <TextInput style={styles.input} placeholder="phone number"
        value = {phoneNumber}
        onChangeText = {(value) =>{
          setPhoneNumber(value)
        }}
      ></TextInput>
      <TextInput style={styles.input} placeholder="address"
        value = {address}
        onChangeText = {(value) =>{
          setAddress(value)
        }}
      ></TextInput>
        {error != '' && <Text style={styles.errorLine}>{error}</Text>}

      <TouchableOpacity style={styles.buttonRegis} onPress={handleRegister}>
      <Text style={styles.regisTextButton}>Register</Text>
      </TouchableOpacity>

    </View>
    </KeyboardAwareScrollView>

  )
}

const styles = StyleSheet.create({
   scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
  },
  backgroundSignUp:{
    width: 252,
    height: 177,
    marginBottom: 20,
     },
   textRegister:{
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.dark_blu,
   },
   input:{
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
   buttonRegis:{
    width: 111,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.dark_blu,
    alignItems: "center",
   },
   regisTextButton:{
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
   },
   errorLine: {
    color: "red",                                                           
  }
})