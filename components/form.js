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
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "@/assets/images/banner1.jpg";

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

  const renderContactFields = (index) => {
    return (
      <View key={index} style={styles.contactContainer}>
        <Text style={styles.contactHeader}>Contact {index + 1}</Text>
        <View style={styles.inputRow}>
          {/* Contact Name */}
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder={`Contact ${index + 1} Name`}
                />
              )}
              name={`contactName${index}`}
              defaultValue=""
              rules={{ required: "Contact name is required" }}
            />
            {errors[`contactName${index}`] && (
              <Text style={styles.errorText}>{errors[`contactName${index}`].message}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />
              )}
              name={`phoneNumber${index}`}
              defaultValue=""
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid phone number (10 digits)",
                },
              }}
            />
            {errors[`phoneNumber${index}`] && (
              <Text style={styles.errorText}>{errors[`phoneNumber${index}`].message}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
 
      <View style={styles.innerContainer}>
        <Image source={logo} style={styles.image} />

        {/* Contact Information Header */}
        <View style={styles.header}>
          <Icon name="person-circle-outline" size={50} color="#004f71" />
          <Text style={styles.contactText}>Contact Information</Text>
        </View>

        {/* Render fields for 4 contacts */}
        {[...Array(4)].map((_, index) => renderContactFields(index))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
   
  // Dynamic styles based on color scheme
  const dynamicStyles = colorScheme === "dark" ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
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
              placeholderTextColor={dynamicStyles.placeholder.color}
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
              placeholderTextColor={dynamicStyles.placeholder.color}
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
  scrollContainer: {
    height: '100%',
    flex: 1, 
  },
  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20, 
  },
  innerContainer: {
    width: '100%',
    alignItems: "center", 
  },
  image: {
    width: '80%', 
    height: 200, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginBottom: 30,
    marginTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  contactText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004f71",
    marginTop: 10,
  },
  contactHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#004f71",
  },
  inputRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    marginBottom: 15, 
  },
  inputWrapper: {
    width: "48%", 
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10, 
    marginBottom: 5, 
    width: "100%",
  },
  contactContainer: {
    marginBottom: 30, 
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10, 
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: -100,
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
    width: "60%",
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
    backgroundColor: "#004f71",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  placeholder: {
    color: "gray",
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
