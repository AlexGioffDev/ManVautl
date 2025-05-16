import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import MangaElement from "@/components/MangaElement";
import { getSearchManga } from "@/services/api";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";

export default function Search() {
  const route = useRoute() as { params: { query: string } };
  const { query } = route.params;

  const [mangas, setMangas] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      const res = await getSearchManga(query);
      setMangas(res?.data || []);
      setLoading(false);
    };
    fetchManga();
  }, [query]);

  if (loading) {
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
