import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { Button, CustomInput, Wrapper } from "../components";
import { RouteProp } from "@react-navigation/native";
import "../../styles.css";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { StackNavigationProp } from "@react-navigation/stack";

type FilloutScreenRouteProp = RouteProp<RootStackParamList, "Fillout">;

interface IFillout {
  route: FilloutScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "Fillout">;
}

const Fillout: React.FC<IFillout> = ({ route, navigation }) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const inputValues = (
    route.params as { inputValues: { firstName: string; lastName: string } }
  )?.inputValues || { firstName: "", lastName: "" };

  const [info, setInfo] = useState({
    firstName: inputValues.firstName,
    lastName: inputValues.lastName,
    hpc: "",
    age: "",
    gender: "",
  });

  const handleInputChange = (inputName: keyof typeof info, text: string) => {
    setInfo((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: text,
    }));
  };

  async function updateProfile() {
    try {
      setLoading(true);

      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        first_name: info.firstName,
        last_name: info.lastName,
        hpc: info.hpc,
        age: info.age,
        gender: info.gender,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      navigation.navigate("Profile");
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Wrapper>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => handleInputChange("hpc", text)}
              value={info.hpc}
              placeholder="Hpc"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => handleInputChange("age", text)}
              value={info.age}
              placeholder="Age"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              onChange={(text) => handleInputChange("gender", text)}
              value={info.gender}
              placeholder="Gender"
            />
          </View>
        </Wrapper>
        <View style={styles.buttonPosition}>
          <Button disabled={loading} onPress={() => updateProfile()}>
            Create profile
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
  inputContainer: {
    marginBottom: 18,
  },
  buttonPosition: {
    position: "relative",
    bottom: 130,
    marginLeft: 14,
    marginRight: 14,
  },
});
export default Fillout;
