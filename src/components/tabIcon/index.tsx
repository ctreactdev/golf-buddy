import React from "react";
import { Image, ImageSourcePropType } from "react-native";

interface ITabIcon {
  source: ImageSourcePropType;
  size: number;
}
const TabIcon: React.FC<ITabIcon> = ({ source, size }) => (
  <Image style={{ height: size, width: size }} source={source} />
);

export default TabIcon;
