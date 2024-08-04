import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome, Login } from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../screens/index/SignUp";
import Home from "../screens/home";
import Profile from "../screens/profile";

const Stack = createNativeStackNavigator();

export default function NavigationApp(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
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
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
