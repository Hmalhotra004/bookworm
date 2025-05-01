import SafeScreen from "@/components/SafeScreen";
import useAuthStore from "@/store/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isLogedIn = user && token;

    if (!isLogedIn && !inAuthScreen) router.replace("/(auth)/login");
    if (isLogedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  // useEffect(() => {
  //   if (router) router.push("/(tabs)/profile");
  // }, [router]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
