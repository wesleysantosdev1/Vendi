import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Home, ShoppingBag, Plus, Package, User } from 'lucide-react-native';

//import de telas
import SalesList from "../screens/Sales/SalesList";
import AddSales from "../screens/Sales/AddSale";
import Productos from "../screens/Products/Productos";
import Profile from "../screens/Profile/Perfil";
import HomeScreen from "../screens/Homes/Home";
import ExpenseList from "../screens/Expenses/ExpenseList";
import Reports from "../screens/Reportss/Reports";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="ExpensesList" component={ExpenseList} />
            <Stack.Screen name="Reports" component={Reports} />
        </Stack.Navigator>
    );
}

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity 
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={styles.View}> 
            {children} 
        </View>
    </TouchableOpacity>
);

export default function TabNavigator() {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true, 
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: Platform.OS === 'ios' ? 90 : 70,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    ...styles.shadow
                },
                tabBarActiveTintColor: '#4963E4',
                tabBarInactiveTintColor: '#8E8E93',
            }}
        >
            <Tab.Screen 
            name="HomeTab" 
            component={HomeStack} 
            options={{
                tabBarLabel: 'Home',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
            }}
        />

            <Tab.Screen 
            name="Vendas" 
            component={SalesList} 
            options={{
                tabBarLabel: 'Vendas',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />
            }}
        />

            <Tab.Screen 
            name="Novo" 
            component={AddSales} 
            options={{
            tabBarLabel: '', 
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: () => <Plus size={32} color="#FFF" style={{ marginLeft: -1 }} />,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarButton: (props) => <CustomTabBarButton {...props} />
            }}
            />

            <Tab.Screen 
            name="Produtos" 
            component={Productos} 
            options={{
                tabBarLabel: 'Produtos',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => <Package size={size} color={color} />
            }}
            />

            <Tab.Screen 
            name="Perfil" 
            component={Profile} 
            options={{
                tabBarLabel: 'Perfil',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => <User size={size} color={color} />
            }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 5
    }, 

    View: {
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#4963E4',
        justifyContent: 'center',   
    alignItems: 'center', 
    }
});