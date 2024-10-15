// index.tsx
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MyForm from "@/components/form";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
          <SafeAreaView>
            <MyForm />
          </SafeAreaView>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
