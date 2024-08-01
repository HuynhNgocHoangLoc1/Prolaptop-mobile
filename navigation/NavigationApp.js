import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Login } from '../screens/index';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from '../screens/SignUp';
import Home from '../screens/home/Home';

import UITab from './UITab';

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
                <Stack.Screen name="SignUp" component={SignUp} options= {{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options= {{headerShown: false}}/>        
                {/* <Stack.Screen name="UITab" component={UITab} options= {{headerShown: false}}/> */}


            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
