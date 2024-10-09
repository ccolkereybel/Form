// explore.tsx
import React from "react";
import { StyleSheet } from "react-native";
import MyResults from "@/components/formresults"; // Adjust the path

export default function ExploreScreen() {
  return (
    <>
      <MyResults />
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
