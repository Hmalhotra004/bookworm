import styles from "@/assets/styles/home.styles";
import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";
import COLORS from "@/constants/colors";
import api from "@/lib/api";
import { Book, BookRes } from "@/lib/types";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refeshing, setRefeshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user, token } = useAuthStore();

  async function fetchBooks(pageNo = 1, refresh = false) {
    try {
      if (refresh) {
        setRefeshing(true);
      } else if (pageNo === 1) {
        setLoading(true);
      }

      const response = await api.get<BookRes>(`/books?page=${pageNo}&limit=2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const uniqueBooks =
          refresh || pageNo === 1
            ? data.books
            : Array.from(
                new Set(
                  [...books, ...data.books]
                    .map((book) => book._id)
                    .map((id) =>
                      [...books, ...data.books].find((book) => book._id === id)
                    )
                )
              ).filter((book) => book !== undefined);

        setBooks(uniqueBooks);
        setHasMore(pageNo < data.totalPages);
        setPage(pageNo);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Alert.alert(
          "Error",
          err.response?.data.message || "Something went wrong"
        );
      }
    } finally {
      if (refresh) {
        setRefeshing(false);
      } else {
        setLoading(false);
      }
    }
  }

  async function handleLoadMore() {
    if (hasMore && !loading && !refeshing) {
      sleep(1000);
      await fetchBooks(page + 1);
    }
  }

  function sleep(ms: number) {
    new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <Loader size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refeshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        renderItem={({ item }) => (
          <BookCard
            item={item}
            key={item._id}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm</Text>
            <Text style={styles.headerSubtitle}>
              Discover great reads from the community
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>no recommendations yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share a book!
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size={"small"}
              color={COLORS.primary}
            />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}
