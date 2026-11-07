import React from "react";
import { createBottomTabNavigator, BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Pressable } from 'react-native';
import { Home, ShoppingBag, Plus, Package, User } from 'lucide-react-native';
import { colors, radius } from "../theme";

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
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="ExpensesList" component={ExpenseList} />
            <Stack.Screen name="Reports" component={Reports} />
        </Stack.Navigator>
    );
}

// Botão central "Nova venda": quadrado lima saltado acima da barra.
const NewSaleTabButton = ({ onPress, accessibilityState }: BottomTabBarButtonProps) => (
    <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Nova venda"
        accessibilityState={accessibilityState}
        style={styles.newSaleWrapper}
    >
        {({ pressed }) => (
            <View style={[styles.newSaleButton, pressed && styles.newSalePressed]}>
                <Plus size={28} color={colors.onLime} strokeWidth={2.75} />
            </View>
        )}
    </Pressable>
);

export default function TabNavigator() {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
                tabBarActiveTintColor: colors.lime,
                tabBarInactiveTintColor: colors.onInkSoft,
                sceneStyle: { backgroundColor: colors.paper },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Início',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => <Home size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Vendas"
                component={SalesList}
                options={{
                    tabBarLabel: 'Vendas',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => <ShoppingBag size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Novo"
                component={AddSales}
                options={{
                    tabBarLabel: '',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarButton: (props) => <NewSaleTabButton {...props} />
                }}
            />

            <Tab.Screen
                name="Produtos"
                component={Productos}
                options={{
                    tabBarLabel: 'Produtos',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => <Package size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarLabel: 'Perfil',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => <User size={22} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.ink,
        borderTopWidth: 0,
        elevation: 0,
        paddingTop: 6,
    },

    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },

    newSaleWrapper: {
        flex: 1,
        alignItems: 'center',
    },

    newSaleButton: {
        top: -18,
        width: 58,
        height: 58,
        borderRadius: radius.lg + 2,
        borderCurve: 'continuous',
        backgroundColor: colors.lime,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: colors.paper,
    },

    newSalePressed: {
        transform: [{ scale: 0.94 }],
    },
});
