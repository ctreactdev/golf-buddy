import { ParamListBase } from "@react-navigation/routers";

export type RootStackParamList = {
  Home: undefined;
  Signin: undefined;
  Signup: undefined;
  Fillout: { inputValues: { firstName: string; lastName: string } };
} & ParamListBase;
