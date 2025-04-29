import useAuthStore from "@/store/authStore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const { user, token, checkAuth, logout } = useAuthStore();
  return (
    <View>
      <Text>{user?.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
