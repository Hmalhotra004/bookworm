import styles from "@/assets/styles/signup.styles";
import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type IoniconNames = React.ComponentProps<typeof Ionicons>["name"];

interface InputProps {
  label: string;
  placeholder: string;
  iconLabel: IoniconNames;
  keyboardType: TextInputProps["keyboardType"];
  isPassword?: boolean;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

const Input = ({
  iconLabel,
  keyboardType,
  label,
  placeholder,
  setState,
  state,
  isPassword,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name={iconLabel}
          size={20}
          color={COLORS.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholderText}
          value={state}
          onChangeText={setState}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? !showPassword : false}
          autoCapitalize="none"
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
