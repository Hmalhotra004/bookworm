import styles from "@/assets/styles/login.styles";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  fn: () => void;
  isLoading: boolean;
  label: string;
}

const Button = ({ fn, isLoading, label }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={fn}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
