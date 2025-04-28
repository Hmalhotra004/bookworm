import styles from "@/assets/styles/create.styles";
import COLORS from "@/constants/colors";
import { IoniconNames } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  fn: () => void;
  isLoading: boolean;
  label: string;
  icon?: IoniconNames;
}

const Button = ({ fn, isLoading, label, icon }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={fn}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={COLORS.white}
              style={styles.buttonIcon}
            />
          )}
          <Text style={styles.buttonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
