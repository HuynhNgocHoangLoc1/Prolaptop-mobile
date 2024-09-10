import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // dùng để lấy icon chỉnh sửa
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
const UpdateProfile = () => {
  const navigation = useNavigation();
  const { account, token } = useContext(AccountContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Image style={styles.avatar} source={{uri: account.avatar}}/>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={account.userName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={account.email} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PhoneNumber</Text>
          <TextInput style={styles.input} value={account.phone} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} value={account.address} />
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
    backgroundColor: "#fff",
    // justifyContent: 'center',
    // alignItems: 'center',
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
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    // width: '100%',
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  }
});
