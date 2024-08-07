import { StyleSheet, Image, View, Text, } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile } from "../screens";
import { Search, Cart } from "../screens/index";
import icons from '../constants/icons';

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="User" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "fixed",
  },
  homeTab: {},
});

export default UITab;
