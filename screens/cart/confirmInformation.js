import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import fakeData from '../../fakeData/Data.json';
import Colors from '../../constants/colors';
export default function ConfirmInformation() {
  const users = fakeData.user && fakeData.user.length > 0 ? fakeData.user : [0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm information</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={users[0].userName}  />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={users[0].email} />

      <Text style={styles.label}>PhoneNumber</Text>
      <TextInput style={styles.input} value={users[0].phone} />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={users[0].address} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1c0a07',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

