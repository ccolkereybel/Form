import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import MyForm from "@/components/form";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <SafeAreaView>
            <MyForm />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
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
});
