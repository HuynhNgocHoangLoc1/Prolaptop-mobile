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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import cartAPI from "../../repositories/cartApi";
import useAuth from "../../hooks/userAuth";
import colors from "../../constants/colors";
import icons from "../../constants/icons";

const Cart = () => {
  const navigation = useNavigation();
  const { account } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useFocusEffect(() => {
    const fetchCart = async () => {
      try {
        if (account.id) {
          const response = await cartAPI.getAllCart(account);
          const sortedCart = response.data.cart.sort((a, b) => 
            a.product.name.localeCompare(b.product.name)
          );
          setCartItems(sortedCart);
        } else {
          console.log("No account id available");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setError("Failed to load cart items");
      }
    };
    fetchCart();
  });
  
  const handlePaymentButton = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product before proceeding to payment.");
      return;
    }
    navigation.navigate("PaymentMethod", {
      selectedItems,
      totalPrice: getTotalPrice(),
    });

    // Xoá các sản phẩm đã thanh toán sau khi chuyển hướng
    try {
      await Promise.all(
        selectedItems.map((item) => cartAPI.deleteProductOnCart(item.id))
      );
      setCartItems(cartItems.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to clear paid items:", error);
      setError("Failed to update cart after payment");
    }
  };

  const incrementQuantity = async (id, quantity, stockQuantity) => {
    if (quantity >= stockQuantity) {
      alert("The product quantity has reached the stock limit!");
      return;
    }
  
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  
    try {
      await cartAPI.updateProductQuantity(id, { quantity: quantity + 1 });
    } catch (error) {
      console.error("Failed to increment quantity:", error);
      setError("Failed to update quantity");
    }
  };
  

  const decrementQuantity = async (id, quantity, stockQuantity) => {
    // console.log("Decrement quantity:", id, quantity, stockQuantity);
    if (quantity <= 1) {
      await removeItem(id);
    } else {
      setCartItems((prevItems) => {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      });
      try {
        await cartAPI.updateProductQuantity(id, { quantity: quantity - 1 });
      } catch (error) {
        console.error("Failed to decrement quantity:", error);
        setError("Failed to update quantity");
      }
    }
  };

  const removeItem = async (id) => {
    const response = await cartAPI.deleteProductOnCart(id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems.some((itemSelect) => itemSelect.id === item.id))
      .reduce(
        (totalPrice, item) => totalPrice + item.product.price * item.quantity,
        0
      );
  };

  const toggleSelectItem = ({id, productId, quantity, price, imageUrl, name, totalPrice}) => {
    if (selectedItems.some((item) => item.id === id)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, {id, productId, quantity, price, imageUrl, name, totalPrice}]);
    }
  };

  const isSelected = (id) => selectedItems.some((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Cart</Text>

      <ScrollView contentContainerStyle={styles.productList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={[styles.cartItem]}>
              <TouchableOpacity
                style={styles.selectCircleContainer}
                onPress={() => toggleSelectItem({
                  id: item.id,
                  productId: item.product.id,
                  quantity: item.quantity,
                  price : item.product.price,
                  imageUrl: item.product.imageUrl,
                  name: item.product.name,
                  totalPrice: item.product.price * item.quantity 
                })}
              >
                <View
                  style={[
                    styles.circle,
                    isSelected(item.id) && styles.circleSelected,
                  ]}
                />
              </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => decrementQuantity(item.id, item.quantity, item.product.stockQuantity)}
                  >
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => incrementQuantity(item.id, item.quantity,item.product.stockQuantity)}
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                <Text style={styles.price}>{item.product.price} $</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => removeItem(item.id)}
                >
                  <Image
                    style={styles.deleteIcon}
                    source={icons.deleteFuntion}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.totalText}>
          Total            : {(getTotalPrice() )} $
        </Text>
      </View>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={handlePaymentButton}
      >
        <Text style={styles.paymentButtonText}>
          Payment ({selectedItems.length} products)
        </Text>
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
    marginTop: 40,
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.light_blu
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
    fontWeight: "bold",
    marginTop: 5,
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
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light_blu,
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
    top: 5,
  },
  selectCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  circleSelected: {
    backgroundColor: "#4CAF50", // Màu của dấu chọn
  },
});

export default Cart;
