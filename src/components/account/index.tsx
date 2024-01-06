import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Button } from "../../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/RootStackParamList";
interface IAccount {
  session: Session;
  // navigation: StackNavigationProp<RootStackParamList, "Home">;
}
interface IUser {
  firstName: string;
  lastName: string;
  hpc: string;
  age: string;
  gender: string;
}
const Account: React.FC<IAccount> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    if (session) getUser();
  }, [session]);

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
        const transformedUsers: IUser[] = data.map(
          (user: {
            first_name: string;
            last_name: string;
            hpc: string;
            age: string;
            gender: string;
          }) => ({
            firstName: user.first_name,
            lastName: user.last_name,
            hpc: user.hpc,
            age: user.age,
            gender: user.gender,
          })
        );

        setUser(transformedUsers);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  // async function signOut() {
  //   supabase.auth.signOut();
  // }

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     if (!session?.user) throw new Error("No user on the session!");

  //     const { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`first_name, last_name, hpc, age, gender`)
  //       .eq("id", session?.user.id)
  //       .single();
  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUser(data.first_name);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <View style={styles.container}>
      <View>
        {user.map((item) => (
          <View style={styles.profile}>
            <Text>{item.firstName}</Text>
            <Text>{item.lastName}</Text>
            <Text>{item.hpc}</Text>
            <Text>{item.age}</Text>
            <Text>{item.gender}</Text>
          </View>
        ))}
      </View>
      <Button onPress={() => supabase.auth.signOut()}>Sign out</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  profile: {},
});

export default Account;
