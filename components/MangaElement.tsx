import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

export default function MangaElement({ manga }: { manga: any }) {
  const navigation: any = useNavigation();
  const movePage = () => {
    navigation.push("manga", { id: manga["mal_id"] });
  };

  return (
    <TouchableOpacity onPress={movePage}>
      <View
        style={{
          marginVertical: 10,
          justifyContent: "center",
          borderColor: "#333",
          borderWidth: 2,
        }}
      >
        <Image
          source={{
            uri: manga.images.jpg.image_url,
          }}
          style={{
            width: "100%",
            height: 550,
          }}
          contentFit="cover"
        />
        <View
          style={{
            backgroundColor: "#fff166",
            padding: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#333",
              textTransform: "uppercase",
              fontSize: 24,
            }}
          >
            {manga["title"]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
