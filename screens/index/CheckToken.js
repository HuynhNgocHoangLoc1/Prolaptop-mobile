import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CheckToken() {
    const navigation = useNavigation();
    const handleConfirm = () => {
        navigation.navigate('ChangePassword');
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        {/* Back Icon here if needed */}
      </TouchableOpacity>
      <Text style={styles.title}>Confirm OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput style={styles.otpInput} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.otpInput} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.otpInput} maxLength={1} keyboardType="numeric" />
        <TextInput style={styles.otpInput} maxLength={1} keyboardType="numeric" />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    // Style your back button here
    position: 'absolute',
    left: 20,
    top: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: colors.light_blu,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: colors.dark_blu,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
