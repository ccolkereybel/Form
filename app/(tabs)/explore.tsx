// explore.tsx
import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import MyResults from "@/components/formresults"; // Adjust the path
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ExploreScreen() {
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView>
      <ScrollView>
      <MyResults />
      </ScrollView>
      </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
