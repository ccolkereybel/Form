import { Tabs } from "expo-router";
import React, { PropsWithChildren, useRef } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FormDataProvider } from "@/components/FormDataContext";
import { Keyboard, StyleSheet, View, TextInput } from "react-native"; // Imported TextInput here
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler"; // Import GestureHandlerRootView

// Moved KeyboardDismissPressable outside of TabLayout
const KeyboardDismissPressable = ({ children }: PropsWithChildren) => {
  const isTargetTextInput = useRef(false);

  const tap = Gesture.Tap()
    // Dismiss the keyboard on tap end to avoid being triggered when scrolling
    .onEnd(() => {
      if (!isTargetTextInput.current) {
        Keyboard.dismiss();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={tap}>
      <View
        style={styles.container}
        onStartShouldSetResponderCapture={(e) => {
          // Check if the target is a TextInput by comparing its constructor
          const target = e.target as any;
          isTargetTextInput.current =
            target?._internalFiberInstanceHandleDEV?.elementType === TextInput;
          return false;
        }}
        accessible={false}
      >
        {children}
      </View>
    </GestureDetector>
  );
};

// TabLayout component
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <FormDataProvider>
        <KeyboardDismissPressable>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Form",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: "Results",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "code-slash" : "code-slash-outline"}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </KeyboardDismissPressable>
      </FormDataProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
