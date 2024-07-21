import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Login } from '../screens/index';
import { NavigationContainer } from '@react-navigation/native';

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
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
