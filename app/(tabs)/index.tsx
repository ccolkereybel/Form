// index.tsx
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MyForm from "@/components/form";
import phone from "@/components/phone"
import PhoneCallButton from "@/components/phone";

export default function HomeScreen() {
  return (
    <>
    <SafeAreaView>
      <MyForm />
      <PhoneCallButton/>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
