import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "../components";
import "../../styles.css";
interface IHome {
  navigation: StackNavigationProp<RootStackParamList, "">;
}

const Home: React.FC<IHome> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={styles.loginView}>
          <Button onPress={() => navigation.navigate("Signin")}>Sign in</Button>
          <View style={styles.seperatorLine}>
            <View style={styles.leftSeperator}></View>
            <p>Or</p>
            <View style={styles.rightSeperator}></View>
          </View>
          <Button onPress={() => navigation.navigate("Signup")}>Sign up</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  seperatorLine: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    display: "flex",
    flexDirection: "row",
  },
  leftSeperator: {
    backgroundColor: "#000",
    height: 1,
    width: 160,
    marginRight: 10,
  },
  rightSeperator: {
    backgroundColor: "#000",
    height: 1,
    width: 160,
    marginLeft: 10,
  },
  loginView: {
    height: "100%",
    position: "relative",
    top: 450,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default Home;
