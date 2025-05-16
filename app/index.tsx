import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import MangaElement from "@/components/MangaElement";
import { getTopManga } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchMangas = async (requestedPage: number, isFirstLoad = false) => {
    if (loading || (!hasNextPage && !isFirstLoad)) return;

    setLoading(true);
    try {
      const response = await getTopManga(requestedPage);
      const newMangas = response.data;

      setMangas((prev) => [...prev, ...newMangas]);

      setHasNextPage(response.pagination.has_next_page);
      setPage(requestedPage + 1);
    } catch (error) {
      console.log("Failed to fetch manga:", error);
    } finally {
      setLoading(false);
      if (isFirstLoad) setFirstLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialMangas = async () => {
      await fetchMangas(1, true);
    };
    loadInitialMangas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (firstLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 10,
            height: 700,
          }}
        >
          <FlatList
            data={mangas}
            keyExtractor={(item, index) => item.mal_id.toString() + "#" + index}
            renderItem={({ item }) => <MangaElement manga={item} />}
            contentContainerStyle={{ gap: 10 }}
            onEndReached={() => fetchMangas(page)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator style={{ marginVertical: 20 }} />
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
