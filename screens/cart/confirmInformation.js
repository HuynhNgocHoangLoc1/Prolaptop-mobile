import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import fakeData from "../../fakeData/Data.json";
import Colors from "../../constants/colors";
import AccountContext from "../../contexts/AccountContext";
import colors from "../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import orderAPI from "../../repositories/orderApi";

export default function ConfirmInformation() {
  const users = fakeData.user && fakeData.user.length > 0 ? fakeData.user : [0];
  const { account, token } = useContext(AccountContext);

  const [inputAccount, setInputAccount] = useState(account.userName);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);
  const [address, setAddress] = useState(account.address);

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems , totalPrice, paymentMethod,productId } = route.params;
  // console.log(selectedItems, totalPrice, paymentMethod);
  const handleConfirm = () => {
    const createOrderApi = async () => {
    
     const res = await orderAPI
        .createOrderFromCart({
          carts: selectedItems,
          paymentMethod: paymentMethod,
          name: inputAccount,
          email: email,
          phoneNumber: phone,
          shippingAddress: address,
          totalPrice: totalPrice,
          productId: productId
        })
        .then((res) => {
          if (res) {
            if (paymentMethod === "Cash on Delivery") {
              navigation.navigate("Success", {
                selectedItems,
                totalPrice,
                paymentMethod,
                name: inputAccount,
                email,
                phoneNumber: phone,
                shippingAddress: address,
                productId,
              });
            } else if (paymentMethod === "ZALOPAY") {
              navigation.navigate("CheckStatusPayment", {
                selectedItems,
                totalPrice,
                paymentMethod,
                name: inputAccount,
                email,
                phoneNumber: phone,
                shippingAddress: address,
                productId,
              });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    createOrderApi();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm information</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={inputAccount} onChangeText ={(value) => setInputAccount(value)} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={(value) => setEmail(value)} />

      <Text style={styles.label}>PhoneNumber</Text>
      <TextInput style={styles.input} value={phone} onChangeText={(value)=> setPhone(value)} />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={(value)=> setAddress(value)} />

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.dark_blu,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
