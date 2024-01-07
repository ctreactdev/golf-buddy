import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Button } from "../components";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";

interface IUser {
  firstName: string;
  lastName: string;
  hpc: string;
  age: string;
  gender: string;
}

interface IProfile {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
}

const Profile: React.FC<IProfile> = ({ navigation }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  const signOut = () => {
    supabase.auth.signOut();
    navigation.navigate("Home");
  };

  async function getUser() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, hpc, age, gender");

      if (error) {
        console.error(error.message);
        return;
      }

      if (data) {
        const transformedUsers: IUser[] = data.map((user) => ({
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          hpc: user.hpc || "",
          age: user.age || "",
          gender: user.gender || "",
        }));

        setUser(transformedUsers);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {session && session.user ? (
          <View>
            {user.map((item) => (
              <View style={styles.profile} key={item.firstName}>
                <Text>{item.firstName}</Text>
                <Text>{item.lastName}</Text>
                <Text>{item.hpc}</Text>
                <Text>{item.age}</Text>
                <Text>{item.gender}</Text>
              </View>
            ))}
            <Button onPress={() => signOut()}>Sign out</Button>
          </View>
        ) : (
          <p>not logged in</p>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  profile: {},
});

export default Profile;
