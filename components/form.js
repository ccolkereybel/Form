import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import logo from "@/assets/images/logo.jpg";

function MyForm() {
  const colorScheme = useColorScheme();
  const { setSubmittedData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
  };

  // Dynamic styles based on color scheme
  const dynamicStyles = colorScheme === "dark" ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjusted offset for better visibility
      >
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, dynamicStyles.input]}
              placeholder="Your Name"
              placeholderTextColor={dynamicStyles.placeholder.color} // Change placeholder color based on theme
            />
          )}
          name="name"
          defaultValue=""
          rules={{ required: "You must enter your name" }}
        />
        {errors.name && (
          <Text style={dynamicStyles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, dynamicStyles.input]}
              placeholder="Email"
              placeholderTextColor={dynamicStyles.placeholder.color} // Change placeholder color based on theme
            />
          )}
          name="email"
          defaultValue=""
          rules={{
            required: "You must enter your email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          }}
        />
        {errors.email && (
          <Text style={dynamicStyles.errorText}>{errors.email.message}</Text>
        )}
        <TouchableOpacity
          style={[styles.button, dynamicStyles.button]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={dynamicStyles.text}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Common styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // This allows the SafeAreaView to fill the screen
    justifyContent: "center", // Center the inner container vertically
    alignItems: "center", // Center the inner container horizontally
  },
  innerContainer: {
    width: "100%", // Ensure the inner container is full width
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start", // Align items at the top
  },
  imageContainer: {
    marginBottom: 20, // Adjust margin to create space below the image
    marginTop: -100, // Adjusted margin to move the image closer to the top
  },
  image: {
    width: 250,
    height: 250,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 5,
    width: "50%",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

// Light theme styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  input: {
    borderColor: "gray",
  },
  errorText: {
    color: "red",
  },
  button: {
    backgroundColor: "#004f71", // Button color for light theme
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  placeholder: {
    color: "gray", // Placeholder color for light theme
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
  },
  input: {
    borderColor: "lightgray",
    color: "white", // Input text color for dark theme
  },
  errorText: {
    color: "lightcoral", // Error text color for dark theme
  },
  button: {
    backgroundColor: "#005f8a", // Button color for dark theme
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  placeholder: {
    color: "lightgray", // Placeholder color for dark theme
  },
});

export default MyForm;
