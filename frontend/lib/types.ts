import { Ionicons } from "@expo/vector-icons";

export type User = {
  id: string;
  email: string;
  username: string;
  profileImage: string;
};

export type IoniconNames = React.ComponentProps<typeof Ionicons>["name"];
