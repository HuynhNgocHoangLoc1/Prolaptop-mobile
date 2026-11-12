import colors from "../constants/colors";
import { StyleSheet, Image, View, Text, StatusBar } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile } from "../screens";
import { Search, Cart } from "../screens/index";
import icons from "../constants/icons";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === "Home") {
    iconName = icons.homeTab;
  } else if (route.name === "Search") {
    iconName = icons.searchTab;
  } else if (route.name === "Cart") {
    iconName = icons.cartTab;
  } else if (route.name === "User") {
    iconName = icons.userTab;
  }

  return (
    <Image
      source={iconName}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

const UITab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route, focused, color, size),
        tabBarLabel: "",
        tabBarStyle: styles.tabBar, // Thêm kiểu này
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        listeners={{ focus: () => StatusBar.setBarStyle("light-content") }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  // Không đặt position: "fixed"/"absolute" cho tab bar: nó sẽ nổi đè lên nội dung
  // và che phần dưới của màn hình (ví dụ nút Payment ở Cart).
  tabBar: {
    paddingTop: 5,
  },
  homeTab: {},
});

export default UITab;
