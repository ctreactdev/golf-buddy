import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Account } from "../components";

interface IProfiles {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}

const Profile: React.FC<IProfiles> = ({ navigation }) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
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
  header: {},
});
export default Profile;
