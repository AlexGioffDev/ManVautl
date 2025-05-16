import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigation: any = useNavigation();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigation.push("search", { query });
    setQuery("");
  };

  const goHome = () => {
    setQuery("");
    navigation.navigate("index");
  };

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={goHome}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            fontSize: 40,
          }}
        >
          Manga
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff166",
          padding: 6,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#333",
          width: "45%",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <TextInput
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Text style={{ fontWeight: "bold" }}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
