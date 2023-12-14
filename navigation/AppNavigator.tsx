import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Login } from "../src/screens";
import { TabIcon } from "../src/components";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarOptions: {},
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "transparent",
          backgroundColor: "#F7F5F3",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: "#F7F5F3",
          boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.15)",

          height: 85,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <TabIcon
              source={require("../src/assets/icons/Home.png")}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
