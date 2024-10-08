import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import images from "../../constants/images";
import colors from "../../constants/colors";
import fakeData from "../../fakeData/Data.json";
import { useEffect, useState, useContext } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";

export default function Profile() {

  const {account, token} = useContext(AccountContext);


  const navigation = useNavigation();

  const handleLogout = () => {
    // console.log("success");
    navigation.navigate("Login")
  }
  

  const handleToUpdateProfile = () => {
    navigation.navigate("UpdateProfile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  }
  const [items, setItem] = useState([
    {
      name: "Update profile",
      icon: <FontAwesome name="user-circle" size={24} color="black" />,
      onPress:  handleToUpdateProfile,
    },
    {
      name: "Change password",
      icon: <MaterialIcons name="lock" size={24} color="black" />,
      onPress: handleChangePassword,
    },
    {
      name: "List of orders",
      icon: <AntDesign name="hearto" size={24} color="black" />,
    },
    {
      name: "Logout",
      icon: <MaterialIcons name="logout" size={24} color="black" />,
      onPress: handleLogout,
    },
  ]);

  // Lấy thông tin user đầu tiên trong danh sách
  const user =
    fakeData.user && fakeData.user.length > 0 ? fakeData.user[0] : null;

  // Kiểm tra nếu user tồn tại
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User data is not available</Text>
      </View>
    );
  }

  // Kiểm tra URL hình ảnh
  const avatarUrl = account.avatar;
  if (!avatarUrl) {
    return (
      <View style={styles.container}>
        <Text>No avatar URL found</Text>
      </View>
    );
  }

  //console.log("User Avatar URL:", avatarUrl); // Debugging

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={item.onPress}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.text}>{item.name}</Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
       
      <ImageBackground
        style={styles.background}
        source={images.profileBackground}
      >
        <View style={styles.header}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{account.userName}</Text>
            <Text style={styles.email}>{account.email}</Text>
          </View>
        </View>
      </ImageBackground>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    // flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    margin: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 18,
    justifyContent: 'center',
    // textAlign: 'center',
  },

  list: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.light_gray,
  },
  iconContainer: {
    width: 30,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
