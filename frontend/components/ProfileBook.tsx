import styles from "@/assets/styles/profile.styles";
import COLORS from "@/constants/colors";
import api from "@/lib/api";
import { Book } from "@/lib/types";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Image } from "expo-image";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileBookProps {
  item: Book;
  setBooks: Dispatch<SetStateAction<Book[]>>;
  books: Book[];
}

const ProfileBook = ({ item, setBooks, books }: ProfileBookProps) => {
  const [loading, setLoading] = useState(false);

  const { token } = useAuthStore();
  function renderRating(rating: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  }

  async function handleDeleteBook(id: string) {
    try {
      setLoading(true);
      const response = await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setBooks(books.filter((b) => b._id !== id));
        Alert.alert("Success", "Recommendation Deleted");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Alert.alert(
          "Error",
          err.response?.data.message || "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function confirmDelete(id: string) {
    Alert.alert(
      "Delete Recommendation",
      "Are you sure you want to delete this recommendation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteBook(id),
        },
      ]
    );
  }

  return (
    <View style={styles.bookItem}>
      <Image
        source={item.image}
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRating(item.rating)}</View>
        <Text style={styles.bookCaption}>{item.caption}</Text>
        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => confirmDelete(item._id)}
        style={styles.deleteButton}
      >
        {loading ? (
          <ActivityIndicator
            size={"small"}
            color={COLORS.primary}
          />
        ) : (
          <Ionicons
            name="trash-outline"
            size={20}
            color={COLORS.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileBook;
