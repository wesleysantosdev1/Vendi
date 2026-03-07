import { NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator" ;

import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { ProductProvider } from "./src/contexts/ProductContext";


export default function App(){
  return (
    <ProductProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </ProductProvider>
  )
}
