import { Ionicons } from "@expo/vector-icons";
import { ImageSourcePropType } from "react-native";

export type User = {
  id: string;
  email: string;
  username: string;
  profileImage: string;
};

export type Book = {
  _id: string;
  title: string;
  caption: string;
  image: ImageSourcePropType;
  rating: number;
  user: User;
  createdAt: string;
};

export type BookRes = {
  books: Book[];
  currentPage: number;
  totalBooks: number;
  totalPages: number;
};

export type IoniconNames = React.ComponentProps<typeof Ionicons>["name"];
