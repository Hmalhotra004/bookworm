import useAuthStore from "@/store/authStore";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

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
    </View>
  );
}
