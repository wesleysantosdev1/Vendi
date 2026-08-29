import { NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator" ;

import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { AuthProvider } from "./src/contexts/AuthContext";


export default function App(){
  return (
    <AuthProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </AuthProvider>
  )
}
