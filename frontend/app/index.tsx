import useAuthStore from "@/store/authStore";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();
  console.log(user, token);

  useEffect(() => {
    checkAuth();
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user?.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
      <Link href={"/login"}>Logni</Link>
      <Link
        href={"/signup"}
        style={{ marginTop: 100 }}
      >
        Sign
      </Link>
    </View>
  );
}
