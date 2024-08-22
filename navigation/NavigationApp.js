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


const Stack = createNativeStackNavigator();

export default function NavigationApp(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UITab"
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
          options={{ headerShown: false }}
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
          name="Brand"
          component={Brand}
          options={{ headerShown: true, title: "Brand" }}
          listeners={{ focus: () => StatusBar.setBarStyle("dark-content") }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
