import { NavigationContainer} from "@react-navigation/native"
import StackNavigator from "./src/navigations/StackNavigator" 

import { ExpenseProvider } from './src/contexts/ExpenseContext'

export default function App(){
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ExpenseProvider>
  )
}
