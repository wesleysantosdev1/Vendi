import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

import Login from "../screens/Auths/Login";
import Register from "../screens/Auths/Register";
import SaleDetails from "../screens/Sales/SaleDetails";
import AddExpense from "../screens/Expenses/AddExpense";
import { useAuth } from "../contexts/AuthContext";


const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    const { token, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            BootSplash.hide({ fade: true });
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    return(
        <Stack.Navigator>
            {token ? (
                <>
                    <Stack.Screen name="Home" component={TabNavigator}
                    options={{
                        headerShown: false
                    }}
                    />

                    <Stack.Screen name="SaleDetails" component={SaleDetails}
                    options={{
                        headerShown: false
                    }}
                    />

                    <Stack.Screen name="AddExpenseForm" component={AddExpense} options={{
                        headerShown: true,
                        headerTitle: '',
                        headerTransparent: true
                    }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login}
                    options={{
                        headerShown: false,
                    }}
                    />

                    <Stack.Screen name="Register" component={Register}
                    options={{
                        headerShown: false,
                    }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
