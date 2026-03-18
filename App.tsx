import { NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator" ;

import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { ProductProvider } from "./src/contexts/ProductContext";
import { AuthProvider } from "./src/contexts/AuthContext";


export default function App(){
  return (
    <AuthProvider>
      <ProductProvider>
        <ExpenseProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ExpenseProvider>
      </ProductProvider>
    </AuthProvider>
  )
}
