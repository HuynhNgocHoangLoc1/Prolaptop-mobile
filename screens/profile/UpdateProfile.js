import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import userAPI from "../../repositories/userApi";
import useAuth from "../../hooks/userAuth";
import colors from "../../constants/colors";

const UpdateProfile = () => {
  const { account, setAccount } = useAuth();
  const [success, setSuccess] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(account.avatar);
  const [userName, setUserName] = useState(account.userName);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);
  const [address, setAddress] = useState(account.address);

  // Hàm xử lý cập nhật avatar
  const handleUpdateAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAvatar = result.assets[0].uri;
      setAvatar(selectedAvatar);
      setSuccess(false);
      setAvatarUpdated(false);
      setErrorMessage("");
    }
  };

  // Hàm xử lý lưu thông tin người dùng
  const handleSave = async () => {
    setSuccess(false);
    setAvatarUpdated(false);
    setErrorMessage("");
    const updateUserDto = {
      userName,
      email,
      phoneNumber: phone,
      address,
      gender: account.gender,
    };

    try {
      const avatarChanged = avatar !== account.avatar;
      const response = await userAPI.updateUser(
        account.id,
        updateUserDto,
        avatarChanged ? avatar : undefined,
      );
      const updatedAvatar = response.data.result.avatar;

      setAccount({
        ...account,
        address,
        email,
        phone,
        userName,
        avatar: updatedAvatar,
      });
      setAvatar(updatedAvatar);
      setAvatarUpdated(avatarChanged);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatarCircle,
              { borderWidth: 2, borderColor: "black" },
            ]}
          >
            <Image
              style={styles.avatar}
              source={{ uri: avatar }}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={handleUpdateAvatar}
          >
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={(value) => {
              setUserName(value);
              setSuccess(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setSuccess(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(value) => {
              setPhone(value);
              setSuccess(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(value) => {
              setAddress(value);
              setSuccess(false);
            }}
          />
        </View>
        {success && (
          <Text style={styles.successMessage} accessibilityLiveRegion="polite">
            {avatarUpdated
              ? "Profile and avatar updated successfully."
              : "Profile updated successfully."}
          </Text>
        )}
        {errorMessage !== "" && (
          <Text style={styles.errorMessage} accessibilityLiveRegion="polite">
            {errorMessage}
          </Text>
        )}
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
  successMessage: {
    width: "100%",
    color: colors.success,
    marginBottom: 16,
    textAlign: "center",
  },
  errorMessage: {
    width: "100%",
    color: colors.danger,
    marginBottom: 16,
    textAlign: "center",
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
    backgroundColor: colors.dark_blu,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
});
