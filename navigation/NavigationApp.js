import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Welcome,
  Login,
  SignUp,
  Home,
  Profile,
  Search,
  Cart,
} from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import UITab from "./UITab";
import ProductDetail from "../screens/productDetail";
import UpdateProfile from "../screens/profile/UpdateProfile";
import Brand from "../screens/brand";
import PaymentMethod from "../screens/cart/PaymentMethod";
import ChangePassword from "../screens/profile/ChangePassword";
import ConfirmInformation from "../screens/cart/confirmInformation";
import Order from "../screens/order";
import Chat from "../screens/chat/Chat"

const Stack = createNativeStackNavigator();

export default function NavigationApp(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTintColor: colors.accent,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="UITab"
          component={UITab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: true, title: "Product Detail" }}
        />

        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: true, title: "Update Profile" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
          <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: true, title: "Change password" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
        <Stack.Screen
          name="Brand"
          component={Brand}
          options={{ headerShown: true, title: "Brand" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
         <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{ headerShown: true, title: "Payment" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
        <Stack.Screen
          name="ConfirmInformation"
          component={ConfirmInformation}
          options={{ headerShown: true, title: "Confirm" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
         <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: true, title: "Order" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
         <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: true, title: "Chat" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
