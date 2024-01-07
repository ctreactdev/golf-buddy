// import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};
export default App;
