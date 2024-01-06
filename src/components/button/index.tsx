import React, { ReactNode } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

interface IButton {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}
const Button: React.FC<IButton> = ({ children, onPress, disabled }) => (
  <Pressable disabled={disabled} onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.textStyle}>{children}</Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#4e8b1e",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#4e8b1e",
  },
  textStyle: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
