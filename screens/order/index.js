import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";

const fakeOrders = {
  product: [
    { id: 1, product: { name: "Macbook 2015", price: 2000, imageUrl: "https://via.placeholder.com/100" }, quantity: 2 },
    { id: 2, product: { name: "MSI", price: 2000, imageUrl: "https://via.placeholder.com/100" }, quantity: 2 },
  ],
  pending: [
    { id: 3, product: { name: "Product C", price: 40, imageUrl: "https://via.placeholder.com/100" }, quantity: 1 },
  ],
  delivering: [
    { id: 4, product: { name: "Product D", price: 70, imageUrl: "https://via.placeholder.com/100" }, quantity: 3 },
  ],
  success: [
    { id: 5, product: { name: "Product E", price: 90, imageUrl: "https://via.placeholder.com/100" }, quantity: 1 },
  ],
};

const stages = [
  { name: "Product", icon: require("../../assets/icons/orderIcons/box.png") },
  { name: "Pending", icon: require("../../assets/icons/orderIcons/pending.png") },
  { name: "Delivering", icon: require("../../assets/icons/orderIcons/transport.png") },
  { name: "Success", icon: require("../../assets/icons/orderIcons/check.png") },
];

const Order = () => {
  const [activeSection, setActiveSection] = useState("Product");

  const renderItem = ({ item }) => {
    return (
      <View style={styles.orderItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.product.imageUrl }} style={styles.productImage} />
          {item.quantity > 1 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.quantity}</Text>
            </View>
          )}
          <Text style={styles.productQuantity}>Quantities: {item.quantity}</Text>
        </View>
        <Text style={styles.productName}>{item.product.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>Price: {item.product.price} $</Text>
        </View>
      </View>
    );
  };

  const orderItems = fakeOrders[activeSection.toLowerCase()];

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
        {orderItems.length === 0 ? (
          <Text style={styles.emptyText}>No orders in this section</Text>
        ) : (
          <FlatList
            data={orderItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
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
