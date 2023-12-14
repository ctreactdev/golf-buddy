import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { Account, Auth } from "../components";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
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
        {/* <View style={styles.header}></View> */}
        <View>
          {session && session.user ? (
            <Account key={session.user.id} session={session} />
          ) : (
            <Auth />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  header: {},
});
export default Login;
