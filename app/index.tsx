import { getTopManga } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchMangas = async (requestedPage: number) => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    try {
      const response = await getTopManga(requestedPage);
      const newMangas = response.data;

      setMangas((prev) => [...prev, ...newMangas]);

      // Update page and pagination state
      setHasNextPage(response.pagination.has_next_page);
      setPage(requestedPage + 1); // move to next page for next fetch
    } catch (error) {
      console.log("Failed to fetch manga:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangas(1);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        padding: 12,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={mangas}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={() => fetchMangas(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
        />
      </SafeAreaView>
    </View>
  );
}
