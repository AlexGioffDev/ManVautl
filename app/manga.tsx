import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import MangaRecomendations from "@/components/MangaRecommendations";
import { getMangaData } from "@/services/api";
import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
export default function Manga() {
  const route = useRoute() as { params: { id: number } };
  const { id } = route.params;

  const [manga, setManga] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      const res = await getMangaData(id);
      setManga(res || []);
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
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View style={{ height: 700 }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              flexGrow: 1,
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
                  gap: 5,
                }}
              >
                <View
                  style={{
                    gap: 3,
                    width: "65%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#333",
                      fontWeight: "light",
                    }}
                  >
                    {manga["details"]["title_japanese"]}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <View
                    style={{
                      backgroundColor: "#fff166",
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 14,
                      borderColor: "#333",
                      borderWidth: 1,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textTransform: "uppercase",
                        fontWeight: "300",
                      }}
                    >
                      {manga["details"]["status"]}
                    </Text>
                  </View>
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
                  source={{
                    uri: manga["details"].images.jpg.image_url,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentFit="cover"
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
                    {manga["details"]["score"]}
                  </Text>
                </View>
              </View>
              {/* END COVER */}
              {/* Title */}
              <View
                style={{
                  width: "100%",
                  gap: 0,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: 25,
                  }}
                >
                  {manga["details"]["title_english"]}
                </Text>
                {/* Authors */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <Text>By</Text>
                  <View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        flexDirection: "row",
                      }}
                    >
                      {manga["details"]["authors"].map((author, index) => {
                        const isLast =
                          index === manga["details"]["authors"].length - 1;

                        return (
                          <Text
                            key={"author" + author["mal_id"]}
                            style={{
                              textTransform: "capitalize",
                              color: "#333",
                            }}
                          >
                            {author["name"]}
                            {!isLast && " & "}
                          </Text>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
                {/* End Authors */}
              </View>
              {/*  END Title*/}

              {/* GENRES */}
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
                  {manga["details"]["genres"].map((genre, index) => {
                    if (index >= 4) return;
                    return (
                      <View
                        key={genre["mal_id"]}
                        style={{
                          backgroundColor: "#fff166",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: "#333",
                        }}
                      >
                        <Text
                          style={{
                            color: "#333",
                          }}
                        >
                          {genre["name"]}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              {/* END GENRES */}
              {/* Divider */}
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#333",
                }}
              />
              {/* End Divider */}
              {/* Plot */}
              <View
                style={{
                  width: "100%",
                  gap: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#333",
                    textTransform: "uppercase",
                  }}
                >
                  Plot
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#333",
                    textAlign: "justify",
                  }}
                >
                  {manga["details"]["synopsis"]
                    ?.split("[Written by MAL Rewrite]")[0]
                    .trim()}
                </Text>
              </View>
              {/* End Plot */}
              {/* Background */}
              <View
                style={{
                  width: "100%",
                  gap: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#333",
                    textTransform: "uppercase",
                  }}
                >
                  Background
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#333",
                    textAlign: "justify",
                  }}
                >
                  {manga["details"]["background"]?.trim()}
                </Text>
              </View>
              {/* End Background */}
              {/* Recommendation */}
              <View
                style={{
                  width: "100%",
                  gap: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#333",
                    textTransform: "uppercase",
                  }}
                >
                  Recommendations
                </Text>
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
                      gap: 20,
                    }}
                  >
                    {manga["recommendations"].map((data) => (
                      <MangaRecomendations
                        manga={data["entry"]}
                        key={"manga-recom-" + data["entry"]["mal_id"]}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
              {/* End Recommendation */}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
