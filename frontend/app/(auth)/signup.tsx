import styles from "@/assets/styles/signup.styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuthStore from "@/store/authStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isLoading, register } = useAuthStore();
  const router = useRouter();

  async function handleSignup() {
    const result = await register(username, email, password);
    if (result.success) {
      router.dismissTo("/");
    }
    if (!result.success) {
      Alert.alert("Error", result.error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              label="Username"
              placeholder="Enter your Username"
              iconLabel="person-outline"
              state={username}
              setState={setUsername}
              isPassword={false}
              keyboardType="default"
            />

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
          </View>
          <Button
            fn={handleSignup}
            isLoading={isLoading}
            label="Signup"
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an Acount?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
