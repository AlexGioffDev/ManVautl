import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import { getFullManga } from "@/services/api";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Manga() {
  const route = useRoute() as { params: { id: number } };
  const { id } = route.params;

  const [manga, setManga] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      const res = await getFullManga(id);
      setManga(res.data || []);
      setLoading(false);
    };

    fetchManga();
  }, [id]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <SafeAreaView>
        <Header />
        <View style={{ height: 700 }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                gap: 10,
              }}
            >
              {/* INFO */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    gap: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#333",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: 30,
                    }}
                  >
                    {manga["title_english"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#333",
                      fontWeight: "light",
                    }}
                  >
                    {manga["title_japanese"]}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff166",
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    borderRadius: 14,
                    borderColor: "#333",
                    borderWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      textTransform: "uppercase",
                      fontWeight: "300",
                    }}
                  >
                    {manga["status"]}
                  </Text>
                </View>
              </View>
              {/* END INFO */}
              {/* COVER */}
              <View
                style={{
                  width: "100%",
                  height: 500,
                  borderWidth: 1,
                  borderColor: "#333",
                  position: "relative",
                }}
              >
                <Image
                  source={{ uri: manga["images"]["jpg"]["large_image_url"] }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#fff166",
                    right: -250,
                    top: -90,
                    width: 80,
                    height: 80,
                    borderRadius: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#333",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {manga["score"]}
                  </Text>
                </View>
              </View>
              {/* END COVER */}
              {/* Authors */}
              <View
                style={{
                  width: "100%",
                }}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  {manga["authors"].map((author) => {
                    return (
                      <View
                        style={{
                          backgroundColor: "#fff166",
                          paddingVertical: 5,
                          paddingHorizontal: 8,
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: "#333",
                        }}
                        key={author["mal_id"]}
                      >
                        <Text>{author["name"]}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              {/* End Authors */}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
