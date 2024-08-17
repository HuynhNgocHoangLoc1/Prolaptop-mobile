import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // dùng để lấy icon chỉnh sửa
import { useNavigation } from '@react-navigation/native';
const UpdateProfile = () => {
  const navigation = useNavigation();
  const handleBackProfile = () => {
    navigation.navigate("UITab");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackProfile}>
          <AntDesign name="arrowleft" size={24} color="black"  />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <AntDesign name="user" size={100} color="#2A2E43" />
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value="hoangloc1" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value="hoangloc@gmai.com" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PhoneNumber</Text>
          <TextInput style={styles.input} value="0378222111" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} value="178 Lê Lợi" />
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingVertical: 10,
    paddingHorizontal: 15,
    // zIndex: 1, // Đảm bảo header nằm trên các thành phần khác
    paddingTop: 50,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    // paddingTop: 120,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3DDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#E3DDF2',
  },
  saveButton: {
    width: '40%',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // width: '100%',
  },
});
