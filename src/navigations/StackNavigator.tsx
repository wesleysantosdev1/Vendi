import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auths/Login";
import Register from "../screens/Auths/Register";
import Home from "../screens/Homes/Home";

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

            <Stack.Screen name="Home" component={Home}
            options={{
                headerShown: false,
            }}
            />
        </Stack.Navigator>
    );
}