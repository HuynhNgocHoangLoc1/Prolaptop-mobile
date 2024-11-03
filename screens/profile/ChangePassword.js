import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import mailApi from '../../repositories/mailApi'; 
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword({ route }) {
  const navigation = useNavigation();
  const { email } = route.params; 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await mailApi.resetPassword({ email, newPassword }); 
      console.log(response.data);

      Alert.alert("Success", "Password has been changed successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log(error);
      console.error('Error details:', error.response ? error.response.data : error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput 
        style={styles.input} 
        placeholder="New password" 
        secureTextEntry 
        value={newPassword}
        onChangeText={setNewPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm new password" 
        secureTextEntry 
        value={confirmPassword}
        onChangeText={setConfirmPassword} 
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Save Change</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#3498db',
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
    backgroundColor: '#2980b9',
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
