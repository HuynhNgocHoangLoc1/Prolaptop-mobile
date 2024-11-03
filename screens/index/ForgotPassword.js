import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
    const navigation = useNavigation();
    const handleNext = () => {
        navigation.navigate('CheckToken');
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        {/* Back Icon here if needed */}
      </TouchableOpacity>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.label}>User name</Text>
      <TextInput style={styles.input} placeholder="Enter your username" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: colors.dark_blu,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '30%',
    alignSelf: "center",

  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
