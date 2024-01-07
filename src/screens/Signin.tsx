import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { supabase } from "../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { Button, CustomInput, Wrapper } from "../components";
import { StatusBar } from "expo-status-bar";

interface ISignIn {
  navigation: StackNavigationProp<RootStackParamList, "Signin">;
}

const SignIn: React.FC<ISignIn> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
    navigation.navigate("Profile");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Wrapper>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChange={(text) => setEmail(text)}
            />
          </View>
          <View>
            <CustomInput
              isPassword
              placeholder="Password"
              value={password}
              onChange={(text) => setPassword(text)}
            />
          </View>
          <View>
            <Text style={styles.passwordText}>Forgot your password?</Text>
          </View>
        </Wrapper>
        <View style={styles.buttonPosition}>
          <Button disabled={loading} onPress={() => signInWithEmail()}>
            Sign in
          </Button>
        </View>
        <View style={styles.seperatorLine}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  buttonPosition: {
    position: "relative",
    bottom: 130,
    marginLeft: 14,
    marginRight: 14,
  },
  seperatorLine: {
    position: "relative",
    bottom: 110,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
  },
  inputContainer: {
    marginBottom: 18,
  },
  passwordText: {
    textAlign: "right",
  },
});
export default SignIn;
