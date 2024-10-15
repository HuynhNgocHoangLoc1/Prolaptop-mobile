import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
import * as ImagePicker from 'expo-image-picker';
import userAPI from "../../repositories/userApi";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const { account, setAccount } = useContext(AccountContext);
  const [avatar, setAvatar] = useState(account.avatar);
  const [userName, setUserName] = useState(account.userName);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);
  const [address, setAddress] = useState(account.address);

  // Hàm xử lý cập nhật avatar
  const handleUpdateAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAvatar = result.assets[0].uri;
      setAvatar(selectedAvatar);
      try {
        const response = await userAPI.updateAvatar(selectedAvatar, account.id);
        if (response.data) {
          setAvatar(response.data.avatar); 
          setAccount({ ...account, avatar: response.data.avatar }); 
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  // Hàm xử lý lưu thông tin người dùng
  const handleSave = async () => {
    const updateUserDto = {
      userName,
      email,
      phoneNumber: phone,
      address,
    };

    try {
      // Update user profile
      const response = await userAPI.updateUser(account.id, updateUserDto);
      
      // Check if the avatar was changed
      if (avatar !== account.avatar) {
        const avatarResponse = await userAPI.updateAvatar(avatar, account.id);
        if (avatarResponse.data) {
          // Update avatar in context and local state if the avatar was updated successfully
          setAccount({ ...account, avatar: avatarResponse.data.avatar });
        }
      }

      // Update context with new user details
      setAccount({ ...account, userName, email, phoneNumber: phone, address });
      
      alert("Update successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Image style={styles.avatar} source={{ uri: avatar }} resizeMode="cover"/>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={handleUpdateAvatar}> 
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E3DDF2",
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#E3DDF2",
  },
  saveButton: {
    width: "40%",
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#362620',
    alignItems: "center",
  },
  saveButtonText: {
     color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  }
});
