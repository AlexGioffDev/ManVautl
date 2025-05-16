import { useEffect, useRef } from "react";
import { Animated, SafeAreaView, StyleSheet, View } from "react-native";

export default function LoadingComponent() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Animated.Text style={[styles.textStyle, { opacity }]}>
          Loading
        </Animated.Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff166",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
