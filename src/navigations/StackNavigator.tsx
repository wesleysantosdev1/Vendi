import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Login from "../screens/Auths/Login";
import Register from "../screens/Auths/Register";
import SaleDetails from "../screens/Sales/SaleDetails";


const Stack = createNativeStackNavigator();

export default function StackNavigator(){
    return(
        <Stack.Navigator>
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
        </Stack.Navigator>
    );
}