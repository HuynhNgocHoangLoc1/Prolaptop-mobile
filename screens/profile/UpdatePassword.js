import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/userAuth';
import userAPI from '../../repositories/userApi';

export default function UpdatePassword() {
  const { account } = useAuth();
  // console.log("Account information after login:", account);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSaveChange = async () => {
    // Kiểm tra mật khẩu hiện tại có trùng với mật khẩu của account không
    // if (currentPassword !== account.password) {
    //   Alert.alert('Error', 'Current password is incorrect');
    //   return;
    // }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      await userAPI.updatePassword(account.id, { password: newPassword });
      Alert.alert('Success', 'Password updated successfully');
      navigation.goBack(); // Quay lại màn hình trước đó sau khi lưu thành công
    } catch (error) {
      Alert.alert('Error', 'Failed to update password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change password</Text>

      <Text style={styles.label}>Current password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>New password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveChange}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.dark_blu,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: colors.dark_blu,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
