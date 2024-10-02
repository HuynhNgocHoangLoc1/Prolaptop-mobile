import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
const stages = [
  { name: "Product", icon: require("../../assets/icons/orderIcons/box.png") },
  { name: "Pending", icon: require("../../assets/icons/orderIcons/pending.png") },
  { name: "Delivering", icon: require("../../assets/icons/orderIcons/transport.png") },
  { name: "Success", icon: require("../../assets/icons/orderIcons/check.png") },
];

const products = [
  { id: 1, name: "Wireless Earbuds", description: "High-quality sound with noise cancellation." },
  { id: 2, name: "Smart Watch", description: "Track your fitness and stay connected." },
  { id: 3, name: "Portable Charger", description: "10000mAh capacity for multiple device charges." }
];

const Order = () => {
  const [activeSection, setActiveSection] = useState("Product");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    setExpandedProduct(null);
  };

  const handleProductClick = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const handleError = (message) => {
    setError(message);
    Alert.alert("Error", message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stages.map((stage) => (
          <TouchableOpacity
            key={stage.name}
            style={styles.card}
            onPress={() => handleSectionClick(stage.name)}
          >
            <View style={styles.iconContainer}>
              <Image source={stage.icon} style={styles.icon} />
            </View>
            <Text style={styles.cardTitle}>{stage.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeSection === "Product" && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => handleProductClick(item.id)}
            >
              <Text style={styles.productTitle}>{item.name}</Text>
              {expandedProduct === item.id && (
                <Text style={styles.productDescription}>{item.description}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {activeSection !== "Product" && (
        <Text style={styles.sectionText}>
          {activeSection} items will be displayed here.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 4, 
    padding: 10, 
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 4, 
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 14, 
    fontWeight: "bold",
  },
  productCard: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  sectionText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Order;
