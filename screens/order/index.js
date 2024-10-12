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
  { name: "success", icon: require("../../assets/icons/orderIcons/check.png") },
  { name: "success", icon: require("../../assets/icons/orderIcons/check.png") },
];

const Order = () => {
  const [activeSection, setActiveSection] = useState("all");
  const [orderItems, setOrderItems] = useState([]);
  const [filterOrderItems, setFilterOrderItems] = useState(orderItems);
  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getListOrderByUser();
      if (response.data.order) {
        // console.log(response.data.order.length);
        setOrderItems(response.data.order);
      } else {
        console.error(
          "API response does not contain 'orders' array"
        );
      }
    } catch (error) {
      console.error("Failed to fetch order items:", error);
    }
  };

  useEffect(()=>{
    setFilterOrderItems(orderItems)
  },[orderItems])

  useEffect(() => {
    fetchOrder();
  }, []);

  const renderOrder = (order) => {
    const orderDetail = order.orderDetail ? order.orderDetail : [];
    return (
      <View key={order.id}>
        {orderDetail.map((item) => renderProduct(item))}
      </View>
    );
  };

  const renderProduct = (item) => {
    console.log(item)
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
          <Text style={styles.productPrice}>Price: {item.price} $</Text>
        </View>
      </View>
    );
  };

  // const orderItems = fakeOrders[activeSection.toLowerCase()];

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
    justifyContent: "space-around",
    marginVertical: 10,
  },
  card: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  stageName: {
    fontSize: 16,
    fontWeight: "bold",
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
});

export default Order;
