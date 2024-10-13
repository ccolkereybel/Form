// explore.tsx
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MyResults from "@/components/formresults"; // Adjust the path
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ExploreScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <MyResults />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },
});

