import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import typography, { TypographyKeys } from "@/constants/typography";

export type FontType = TypographyKeys;
interface BaseTextProps extends TextProps {
  ft?: FontType;
  color?: string;
  center?: boolean;
  children: React.ReactNode;
}

const BaseText: React.FC<BaseTextProps> = ({
  ft = "default",
  style,
  color,
  center,
  children,
  ...props
}) => {
  const combinedStyle = [
    typography[ft] || typography.default,
    color && { color },
    center && { textAlign: "center" },
    style,
  ] as TextStyle[];

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export default BaseText;
