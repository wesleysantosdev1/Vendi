import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from "./src/navigations/StackNavigator" ;

import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { AuthProvider } from "./src/contexts/AuthContext";
import { useOtaUpdates } from "./src/hooks/useOtaUpdates";
import { colors } from "./src/theme";

// Fundo padrão das telas = papel, para não piscar branco nas transições.
const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.ink,
    background: colors.paper,
    card: colors.paper,
    text: colors.ink,
    border: colors.line,
  },
};

export default function App(){
  useOtaUpdates();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <ExpenseProvider>
          <NavigationContainer theme={navigationTheme}>
            <StackNavigator />
          </NavigationContainer>
        </ExpenseProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
