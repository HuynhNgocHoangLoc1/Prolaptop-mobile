import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";
import zaloPayAPI from "../../repositories/zaloPayApi";
import { Linking } from "react-native";

export default function CheckStatusPayment() {
  const { account, token } = useContext(AccountContext);
  const route = useRoute();
  const navigation = useNavigation();
  const {
    selectedItems,
    totalPrice,
    paymentMethod,
    name,
    email,
    phoneNumber,
    shippingAddress,
    productId,
  } = route.params;
  const [appTransId, setAppTransId] = useState(null);

  const callApi = async () => {
    try {
      const paymentData = {
        carts: selectedItems,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        shippingAddress: shippingAddress,
      };
      console.log("Payment Data:", paymentData);

      const paymentResponse = await zaloPayAPI.createZaloPayment(paymentData);
      console.log("Payment Response:", paymentResponse.data);

      const { order_url, error_code, message, app_trans_id } =
        paymentResponse.data;
      setAppTransId(app_trans_id);
      // console.log( app_trans_id);
      if (order_url) {
        Linking.openURL(order_url);
      } else {
        // Kiểm tra error_code và thông điệp từ phản hồi
        Alert.alert(
          "Error",
          error_code
            ? `Error: ${message}`
            : "Cannot create ZaloPay order. Please try again."
        );
      }
    } catch (error) {
      console.error("Detailed error:", error.response?.data || error.message);
      Alert.alert("Error", `Failed to create ZaloPay order: ${error.message}`);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  // Nhóm các sản phẩm giống nhau
  const groupedItems = selectedItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({ ...item, totalPrice: item.price * item.quantity });
    }
    return acc;
  }, []);

  const handleCheckStatus = async () => {
    try {
      const statusResponse = await zaloPayAPI.checkOrderStatus(appTransId);
      const { return_code } = statusResponse.data;
      console.log(return_code);

      if (return_code == "1") {
        navigation.navigate("Success");
      } else {
        Alert.alert("Error", "Failed to check order status.");
      }
    } catch (statusError) {
      console.error("Error checking order status:", statusError);
      Alert.alert(
        "Error",
        `Failed to check order status: ${statusError.message}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {groupedItems.map((item, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.productImage}
              />
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.totalPrice} $</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Payment code:</Text> {appTransId}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>User name:</Text> {name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Email:</Text> {email}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Phone number:</Text> {phoneNumber}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Address:</Text> {shippingAddress}
        </Text>
        <Text style={styles.totalPriceText}>
          <Text style={styles.boldText}>Total Price:</Text> {totalPrice} $
        </Text>
      </View>

      <TouchableOpacity style={styles.checkButton} onPress={handleCheckStatus}>
        <Text style={styles.checkButtonText}>Check status</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  infoSection: {
    marginBottom: 8,
  },
  separator: {
    height: 2,
    backgroundColor: "#d3d3d3",
    marginBottom: 8,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#d9534f",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#d9534f",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  totalPriceText: {
    fontSize: 16,
    color: "#d9534f",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  checkButton: {
    backgroundColor: "#2c2c2c",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 16,
  },
  checkButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
