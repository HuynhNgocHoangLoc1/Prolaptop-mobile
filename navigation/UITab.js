import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    EventList,
    NotificationList,
    Menu,
    NewEvent,
    Home,
    Profile,
} from "../screens";
import colors from "../constants/colors";
import icons from "../constants/icons";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
    let iconName;

    if (route.name === "Home") {
        iconName = focused ? icons.homeTab : icons.homeTab2;
    } else if (route.name === "EventList") {
        iconName = icons.searchTab;
    } else if (route.name === "NotificationList") {
        iconName = focused ? icons.notificationTab : icons.notificationTab2;
    } else if (route.name === "NewEvent") {
        iconName = icons.createTab;
    } else if (route.name === "Menu") {
        iconName = focused ? icons.menuTab : icons.menuTab2;
    }
    return (
        <Image
            source={iconName}
            style={{ width: size, height: size, tintColor: color }}
        />
    );
};

const UITab = () => {
    const route = useRoute();
    const user = route.params.user;

    // Redux
    const initialState = {
        user: user,
    };

    const rootReducer = (state = initialState, action) => {
        return state;
    };

    const store = createStore(rootReducer);
    const Tab = createBottomTabNavigator();
    return (
        <Provider store={store}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarIcon: ({ focused, color, size }) =>
                        getTabBarIcon(route, focused, color, size),
                    tabBarLabel: "",
                    tabBarStyle: {
                        paddingTop: 20,
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ user }}
                />
                <Tab.Screen
                    name="EventList"
                    component={EventList}
                    initialParams={{ user }}
                />
                <Tab.Screen
                    name="NewEvent"
                    component={NewEvent}
                    initialParams={{ user }}
                />
                <Tab.Screen
                    name="NotificationList"
                    component={NotificationList}
                    initialParams={{ user }}
                />
                <Tab.Screen
                    name="Menu"
                    component={Menu}
                    initialParams={{ user }}
                />
            </Tab.Navigator>
        </Provider>
    );
};

const styles = StyleSheet.create({});

export default UITab;