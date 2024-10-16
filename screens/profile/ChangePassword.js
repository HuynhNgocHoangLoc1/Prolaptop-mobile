import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change password</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Current password" 
        secureTextEntry 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="New password" 
        secureTextEntry 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Confirm password" 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save change</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Background color similar to the one in the screenshot
    paddingHorizontal: 20,
    marginTop: 50,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.light_blu,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#E0E0E0', 
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.dark_blu,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    marginTop: 20, 
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
