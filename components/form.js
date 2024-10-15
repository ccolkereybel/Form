import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "@/assets/images/banner1.jpg";

function MyForm() {
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
                  value: /^[0-9]{10}$/, // Only allows 10-digit phone numbers
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
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />

        {/* Contact Information Header */}
        <View style={styles.header}>
          <Icon name="person-circle-outline" size={50} color="#004f71" />
          <Text style={styles.contactText}>Contact Information</Text>
        </View>

        {/* Render fields for 4 contacts */}
        {[...Array(4)].map((_, index) => renderContactFields(index))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1, // Ensure the scroll view takes up the full height
  },
  contentContainer: {
    paddingBottom: 20, // Allow some space at the bottom for scrolling
    flexGrow: 1, // Ensure content can grow
    flexDirection: 'column', // Stack content vertically
  },
  container: {
    padding: 100,
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: 200, // Reduce height to avoid cut-off
    resizeMode: 'contain', // Makes the image fit within its bounds
    marginBottom: 50,
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
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space between the two inputs
    width: "100%", // Full width of the container
    marginBottom: 15, // Space between rows
  },
  inputWrapper: {
    width: "48%", // Half width for each input
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 5, // Space between the input and error text
    width: "100%", // Ensure input takes full width within wrapper
  },
  contactContainer: {
    marginBottom: 40,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10, // Space between error text and the next component
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    backgroundColor: "#004f71",
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

export default MyForm;
