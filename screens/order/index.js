import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import orderAPI from "../../repositories/orderApi";
import { useNavigation } from "@react-navigation/native";

const stages = [
  { name: "all", icon: require("../../assets/icons/orderIcons/box.png") },
  {
    name: "pending",
    icon: require("../../assets/icons/orderIcons/pending.png"),
  },
  {
    name: "delivering",
    icon: require("../../assets/icons/orderIcons/transport.png"),
  },
  {
    name: "success",
    icon: require("../../assets/icons/orderIcons/check.png"),
  },
  {
    name: "cancelled",
    icon: require("../../assets/icons/orderIcons/multiply.png"),
  },
];

const Order = () => {
  const navigation = useNavigation();
  const handleReviewButton = (productId, id) => {
    navigation.navigate("Review", { productId, id });
  };
  const handleBack = () => {
    navigation.navigate("Home");
  };

  const [activeSection, setActiveSection] = useState("all");
  const [orderItems, setOrderItems] = useState([]);
  const [filterOrderItems, setFilterOrderItems] = useState(orderItems);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getListOrderByUser();
      // console.log(response.data);
      if (response.data.order) {
        setOrderItems(response.data.order);
      } else {
        console.error("API response does not contain 'orders' array");
      }
    } catch (error) {
      console.error("Failed to fetch order items:", error);
    }
  };

  useEffect(() => {
    setFilterOrderItems(orderItems);
  }, [orderItems]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const renderOrder = (order) => {
    const orderDetail = order.orderDetail ? order.orderDetail : [];
    return (
      <View key={order.id}>
        {orderDetail.map((item) => renderProduct(item, order))}
      </View>
    );
  };
  

  const renderProduct = (item, order) => {
    return (
      <View style={styles.orderItem} key={item.id}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.product.imageUrl }}
            style={styles.productImage}
          />
          {item.quantity > 1 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.quantity}</Text>
            </View>
          )}
          <Text style={styles.productQuantity}>
            Quantities: {item.quantity}
          </Text>
        </View>
        <Text style={styles.productName}>{item.product.name}</Text>
        <View style={styles.productDetails}>
          {activeSection === "success" && !item.review && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => handleReviewButton(item.productId, item.id)} 
            >
              <Text style={styles.reviewButtonText}>Review product</Text>
            </TouchableOpacity>
          )}
          {/* Thay item.price bằng order.price */}
          <Text style={styles.productPrice}>Total price: {order.price} $</Text>
        </View>
      </View>
    );
  };
  

  useEffect(() => {
    if (activeSection === "all") {
      setFilterOrderItems(orderItems);
    } else {
      setFilterOrderItems(
        orderItems.filter((order) => order.statusDelivery === activeSection)
      );
    }
  }, [activeSection]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stages.map((stage) => (
          <TouchableOpacity
            key={stage.name}
            style={styles.card}
            onPress={() => setActiveSection(stage.name)}
          >
            <View style={styles.iconContainer}>
              <Image source={stage.icon} style={styles.icon} />
            </View>
            <Text style={styles.stageName}>{stage.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scrollView}>
        {filterOrderItems && filterOrderItems.length === 0 ? (
          <Text style={styles.emptyText}>No orders in this section</Text>
        ) : (
          filterOrderItems.map((order) => renderOrder(order))
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    elevation: 3,
    maxWidth: 80,
  },
  iconContainer: {
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  stageName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  productDetails: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347",
    marginTop: 80,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
  },
  reviewButton: {
    backgroundColor:colors.dark_blu,
    borderRadius: 10,
    padding: 10,
  },
  reviewButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: colors.dark_blu,
    padding: 9,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    width: "80%",
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Order;
