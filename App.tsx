// import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};
export default App;
