import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';


export default function SignUp() {

  const navigation = useNavigation();
  const handleRegister =() =>{
    navigation.navigate("Login")
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
      <TextInput style={styles.input } placeholder="user name"></TextInput>
      <TextInput style={styles.input} placeholder="password"></TextInput>
      <TextInput style={styles.input} placeholder="confirm password"></TextInput>
      <TextInput style={styles.input} placeholder="phone number"></TextInput>
      <TextInput style={styles.input} placeholder="gender"></TextInput>
      <TextInput style={styles.input} placeholder="address"></TextInput>
      <TextInput style={styles.input} placeholder="role"></TextInput>
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
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
   },
   input:{
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
   buttonRegis:{
    width:100,
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    elevation: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
   },
   regisTextButton:{
    fontSize: 20,
    fontWeight: "600",
   },
})