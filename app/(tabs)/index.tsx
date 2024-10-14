import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MyForm from "@/components/form"; // Adjust the path as necessary

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MyForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This allows the SafeAreaView to fill the screen
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
