import { StyleSheet, View, TextInput, Text } from "react-native";

interface CustomInputProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isPassword?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isPassword,
}) => {
  const handleChange = (text: string) => {
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        secureTextEntry={isPassword}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        underlineColorAndroid="#FFF"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  input: {
    underlineColorAndroid: "transparent",
    paddingVertical: 0,
    height: 40,
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#4e8b1e",
    justifyContent: "center",
    paddingLeft: 10,
  },
  focusedInput: {
    borderWidth: 0,
  },
});

export default CustomInput;
