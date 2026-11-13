import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/userAuth';
import userAPI from '../../repositories/userApi';
import colors from '../../constants/colors';

export default function UpdatePassword() {
  const { account } = useAuth();
  // console.log("Account information after login:", account);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleSaveChange = async () => {
    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      await userAPI.updatePassword(account.id, { currentPassword, newPassword });
      setError('');
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change password</Text>

      {success ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Password updated successfully</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Current password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={(value) => {
              setCurrentPassword(value);
              setError('');
            }}
          />

          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(value) => {
              setNewPassword(value);
              setError('');
            }}
          />

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setError('');
            }}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSaveChange}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    color: colors.success,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
