import React, { useState } from "react";
import { Alert, StyleSheet, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { Button, CustomInput, Wrapper } from "../components";
interface ISignUp {
  navigation: StackNavigationProp<RootStackParamList, "Signup">;
}
const SignUp: React.FC<ISignUp> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
  });

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);

    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
    navigation.navigate("Fillout", { inputValues });
  }
  const handleInputChange = (
    inputName: keyof typeof inputValues,
    text: string
  ) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: text,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Wrapper>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => setPassword(text)}
              value={password}
              isPassword
              placeholder="Password"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => handleInputChange("firstName", text)}
              value={inputValues.firstName}
              placeholder="First name"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => handleInputChange("lastName", text)}
              value={inputValues.lastName}
              placeholder="Last name"
            />
          </View>
        </Wrapper>
        <View style={styles.buttonPosition}>
          <Button disabled={loading} onPress={() => signUpWithEmail()}>
            Next
          </Button>
        </View>
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
  inputContainer: {
    marginBottom: 18,
  },
  passwordText: {
    textAlign: "right",
  },
});
export default SignUp;
