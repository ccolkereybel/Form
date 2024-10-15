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
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
  );
}

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
  },
  button: {
    backgroundColor: "#004f71",
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

export default MyForm;
