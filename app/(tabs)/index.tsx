import React from "react";
import { StyleSheet, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import MyForm from "@/components/form";

export default function HomeScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <MyForm />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
