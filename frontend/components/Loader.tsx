import COLORS from "@/constants/colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = ({ size }: { size: "large" | "small" }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator
        size={size}
        color={COLORS.primary}
      />
    </View>
  );
};

export default Loader;
