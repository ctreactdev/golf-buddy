import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface IWrapper {
  children: ReactNode;
}
const Wrapper: React.FC<IWrapper> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    marginLeft: 14,
    marginRight: 14,
  },
});
