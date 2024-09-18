import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import fakeData from "../../fakeData/Data.json";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import cartAPI from "../../repositories/cartApi";
import AccountContext from "../../contexts/AccountContext";

const Cart = () => {
  const navigation = useNavigation();
  const { account, token } = useContext(AccountContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("Account details:", account); // Debug thông tin account
        if (account && account.id) {
          const response = await cartAPI.getAllCart(account);
          console.log("API response:", response); // Debug dữ liệu từ API
          if (response?.data?.data) {
            setCartItems(response.data.data);
          } else {
            setCartItems([]);
          }
        } else {
          console.log("No account id available");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [account]);
  

  const handlePaymentButton = () => {
    navigation.navigate("PaymentMethod");
  };

  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Cart ({cartItems.length} products)</Text>

      <ScrollView contentContainerStyle={styles.productList}>
  {cartItems.map((item) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.product.imageUrl }} style={styles.image} />
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityBadgeText}>{item.quantity}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.stockText}>Quantities {item.product.stockQuantity}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
          <Text style={styles.price}>{item.product.price} $</Text>
        </View>
      </View>
    </View>
  ))}
</ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total products: {getTotalPrice()} $</Text>
        <Text style={styles.summaryText}>Shipping fee: 10 $</Text>
        <Text style={styles.totalText}>
          Total: {(getTotalPrice() + 10).toFixed(2)} $
        </Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentButton}>
        <Text style={styles.paymentButtonText}>Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 25,
  },
  productList: {
    flexGrow: 1,
    paddingBottom: 20,
    width: "95%",
    alignSelf: "center",
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: "center",
  },
  imageContainer: {
    position: "relative",
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityBadge: {
    position: "absolute",
    top: -8,
    left: -8,
    backgroundColor: "#FF6347",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#FF6347",
    marginLeft: 70,
  },
  stockText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    color: "#000",
    paddingHorizontal: 15,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  summary: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "60%",
    alignSelf: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Cart;
