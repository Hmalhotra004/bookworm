import styles from "@/assets/styles/profile.styles";
import Loader from "@/components/Loader";
import ProfileBook from "@/components/ProfileBook";
import ProfileHeader from "@/components/ProfileHeader";
import COLORS from "@/constants/colors";
import api from "@/lib/api";
import { Book } from "@/lib/types";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profile = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refeshing, setRefeshing] = useState(false);

  const { token, logout, user } = useAuthStore();
  const router = useRouter();

  async function fetchBooks() {
    try {
      setLoading(true);

      const response = await api.get<Book[]>(`/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        setBooks(data);
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

  function confirmLogout() {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "Cancel", style: "cancel" },
      { text: "logout", onPress: () => logout(), style: "destructive" },
    ]);
  }

  async function handleRefresh() {
    setRefeshing(true);
    await fetchBooks();
    setRefeshing(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!user) return null;

  if (loading && !refeshing) {
    return <Loader size="large" />;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={confirmLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color={COLORS.white}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your recommendations</Text>
        <Text style={styles.booksCount}>{books?.length || 0}</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        renderItem={({ item }) => (
          <ProfileBook
            item={item}
            books={books}
            setBooks={setBooks}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refeshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(tabs)/create")}
            >
              <Text style={styles.addButtonText}>Add your first book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default profile;
