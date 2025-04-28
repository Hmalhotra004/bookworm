import styles from "@/assets/styles/login.styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuthStore from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, login } = useAuthStore();
  const router = useRouter();

  async function handleLogin() {
    const result = await login(email, password);
    if (result.success) {
      router.dismissTo("/");
    } else {
      Alert.alert("Error", result.error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
          <Image
            source={require("@/assets/images/reading.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            <Input
              label="Email"
              placeholder="Enter your Email"
              iconLabel="mail-outline"
              state={email}
              setState={setEmail}
              isPassword={false}
              keyboardType="default"
            />

            <Input
              label="Password"
              placeholder="******"
              iconLabel="lock-closed-outline"
              state={password}
              setState={setPassword}
              keyboardType="default"
              isPassword
            />

            <Button
              fn={handleLogin}
              isLoading={isLoading}
              label="Login"
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link
                href={"/signup"}
                asChild
              >
                <TouchableOpacity>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;
