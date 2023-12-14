import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

interface IHome {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}

const Home: React.FC<IHome> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  header: {},
});
export default Home;
