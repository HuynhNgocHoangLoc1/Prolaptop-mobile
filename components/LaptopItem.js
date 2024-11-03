import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../constants/colors";
import TruncateText from "../utils/helpers/TruncateText";
import { useNavigation } from "@react-navigation/native";

export default function LaptopItem(props) {
  const { item } = props;
  const navigation = useNavigation();

  const handleClickLaptopItem = () => {
    navigation.navigate("ProductDetail", { productItem: item });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClickLaptopItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.img} />
      <View style={styles.main}>
        <Text style={styles.name}>{TruncateText(item.name, 15)}</Text>

        <Text
          style={{
            ...styles.stockTag,
            backgroundColor:
              item.stockQuantity == 0
                ? colors.warning
                : item.stockQuantity == 1
                  ? colors.success
                  : colors.green,
          }}
        >
          {item.stockQuantity == 0
            ? "sold out"
            : item.stockQuantity == 1
              ? "On going"
              : "in stock"}
        </Text>
        <View style={styles.details}>
          <View style={styles.detailItemWrapper}>
            <View style={styles.detailItem}>
              <Image
                source={require("../assets/icons/ui-elements/coin.png")}
                style={styles.coinIcon}
              />
              <Text style={{ color: colors.text }}>{item.price}</Text>
            </View>
            <View style={styles.detailItem}>
              <Image
                source={require("../assets/icons/ui-elements/ram.png")}
                style={styles.ramIcon}
              />
              <Text style={{ color: colors.text }}>
                {TruncateText(item.ram, 5)}
              </Text>
            </View>
          </View>

          <View style={styles.detailItemWrapper}>
            <View style={styles.detailItem}>
              <Image
                source={require("../assets/icons/ui-elements/chip.png")}
                style={styles.cpuIcon}
              />
              <Text style={{ color: colors.text }}>
                {TruncateText(item.chip, 7)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Image
                source={require("../assets/icons/ui-elements/ssd.png")}
                style={styles.ssdIcon}
              />
              <Text style={{ color: colors.text }}>
                {TruncateText(item.hardDrive, 7)}
              </Text>
            </View>
          </View>

          <Text style={styles.quantity}>Quantity: {item.stockQuantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: "row",
    marginVertical: 7,
    borderColor: colors.light_blu,
    borderWidth: 0.3,
    marginHorizontal: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.light_blu,
    overflow: "hidden",
    width: "94%",
  },
  img: {
    width: 110,
    height: 110,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
    borderColor: colors.dark_gray,
    borderWidth: 0.5,
  },
  main: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column", // Change direction to column
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quantity: {
    color: colors.subText,
    fontSize: 16,
    fontWeight: "600",
    // marginBottom: 20
  },
  coinIcon: {
    width: 18,
    height: 18,
    marginEnd: 4,
    tintColor: colors.text,
  },
  detailItem: {
    color: colors.subText,
    flexDirection: "row",
    width: "100%",
    marginBottom: 9,
    // alignItems: "center",
    // marginBottom: 4,
  },
  cpuIcon: {
    width: 28,
    height: 21,
    marginEnd: 4,
    tintColor: colors.text,
  },

  details: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow items to wrap to next line
    justifyContent: "space-between",
  },

  ramIcon: {
    width: 28,
    height: 21,
    marginEnd: 4,
    tintColor: colors.text,
  },

  ssdIcon: {
    width: 28,
    height: 21,
    marginEnd: 4,
    tintColor: colors.text,
    // marginLeft: 23,
  },
  detailItemWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    width: "48%",
    overflow: "hidden",
  },
  stockTag: {
    fontWeight: "500",
    color: colors.white,
    width: 90,
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
