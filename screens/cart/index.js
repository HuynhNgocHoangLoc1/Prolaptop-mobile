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
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import cartAPI from "../../repositories/cartApi";
import AccountContext from "../../contexts/AccountContext";
import useAuth from "../../hooks/userAuth";
import colors from "../../constants/colors";
import icons from "../../constants/icons";

const Cart = () => {
  const navigation = useNavigation();
  const { account } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items when providerValue changes
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // console.log(account)
        if (account.id) {
          const response = await cartAPI.getAllCart(account);
          // console.log("API response:", response);
          // console.log(response.data.cart);
          setCartItems(response.data.cart);
        } else {
          console.log("No account id available");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setError("Failed to load cart items");
      } finally {
        // setLoading(false);
      }
    };

    // Only call API if providerValue exists
      fetchCart();
  });

  // Navigate to Payment Method
  const handlePaymentButton = () => {
    navigation.navigate("PaymentMethod");
  };

  // Increment product quantity
  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement product quantity
  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const removeItem = async (id) => {
    const response = await cartAPI.deleteProductOnCart(id);
    setCartItems(cartItems.filter((item) => item.id !== id));

  }

  // Calculate total price of cart items
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };


  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Cart ({cartItems.length} products)</Text>

      <ScrollView contentContainerStyle={styles.productList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.product.imageUrl }}
                  style={styles.image}
                />
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityBadgeText}>{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.product.name}</Text>
                <Text style={styles.stockText}>
                  Quantities {item.product.stockQuantity}
                </Text>
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
                <TouchableOpacity style={styles.deleteIcon} onPress={() => removeItem(item.id)}> 
                  <Image style={styles.deleteIcon}  source={icons.deleteFuntion}/>
                </TouchableOpacity>
              </View>
            </View>
            
          ))
        )}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total products: {getTotalPrice()} $
        </Text>
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
    position: "relative",
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  summaryText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: colors.dark_blu,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 15,
    width: "70%",
    alignSelf: "center",
  },
  paymentButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginVertical: 20,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 5,
    top: 5    
  },
});

export default Cart;
