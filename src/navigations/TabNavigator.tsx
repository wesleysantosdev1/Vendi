import React, { Children } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Home, ShoppingBag, Plus, Package, User } from 'lucide-react-native';

//import de telas
import Home from "../screens/Homes/Home";
import SalesList from "../screens/Sales/SalesList";
import AddSales from "../screens/Sales/AddSale";
import Productos from "../screens/Products/Productos";
import Profile from "../screens/Profile/Perfil";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity 
        style={styles.shadow}
        onPress={onPress}
    >
        <View style={styles.View}> {children} </View>
    </TouchableOpacity>
);

export default function TabNavigator() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={Home}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        top: -20, 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 

    View: {
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#4963E4',
    }
})