import React from "react";
import { Home, Profile, SignIn, SignUp, Fillout } from "../src/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Fillout" component={Fillout} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
