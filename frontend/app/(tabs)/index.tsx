import styles from "@/assets/styles/home.styles";
import BookCard from "@/components/BookCard";
import api from "@/lib/api";
import { Book, BookRes } from "@/lib/types";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

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

      const response = await api.get<BookRes>(`/books?page${pageNo}&limit=5`, {
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

  async function handleLoadMore() {}

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
      />
    </View>
  );
}
