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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
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
    backgroundColor: '#362620',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
