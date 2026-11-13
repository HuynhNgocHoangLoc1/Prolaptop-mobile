import images from "../../constants/images";
import colors from "../../constants/colors";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import authAPI from "../../repositories/authApi";

export default function SignUp() {

  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  const handleRegister = async () => {
    // Reset previous error before validation
    setError("");

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
      setError("Confirm password is different from password");
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

    // Initialize FormData inside the function to ensure it has the latest state values
    const formData = new FormData();
    formData.append('userName', username);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);

    try {
      const response = await authAPI.register(formData);
      console.log("Register success:", response);
      Keyboard.dismiss();
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigation.replace("Login"), 1500);
    } catch (e) {
      console.error("Register error:", e.response ? e.response.data : e.message);
      if (e.response && e.response.data && e.response.data.message) {
          setError(e.response.data.message);
      } else {
          setError("An unknown error occurred.");
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
          style={styles.backgroundSignUp}
          source={images.backgroundWelcome}
        />
        <Text style={styles.textRegister}>Register</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="User name"
          value={username}
          onChangeText={setUserName}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        {error !== '' && <Text style={styles.errorLine}>{error}</Text>}
        {success !== '' && (
          <View style={styles.successNotice}>
            <Text style={styles.successLine}>{success}</Text>
          </View>
        )}

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
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
  },
  backgroundSignUp: {
    width: 252,
    height: 177,
    marginBottom: 20,
  },
  textRegister: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.dark_blu,
  },
  input: {
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
  buttonRegis: {
    width: 111,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.dark_blu,
    alignItems: "center",
  },
  regisTextButton: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  errorLine: {
    color: "red",
    marginVertical: 5,
  },
  successLine: {
    color: "#2e7d32",
    fontWeight: "600",
    textAlign: "center",
  },
  successNotice: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4caf50",
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
    padding: 10,
  },
});