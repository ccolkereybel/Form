import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "@/assets/images/banner1.jpg";

function MyForm() {
  const { setSubmittedData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const colorScheme = useColorScheme(); // Detect color scheme (light or dark)
  const isDarkMode = colorScheme === "dark";

  const onSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
  };

  const renderContactFields = (index) => {
    return (
      <View key={index} style={styles(isDarkMode).contactContainer}>
        <Text style={styles(isDarkMode).contactHeader}>
          Contact {index + 1}
        </Text>
        <View style={styles(isDarkMode).inputRow}>
          {/* Contact Name */}
          <View style={styles(isDarkMode).inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles(isDarkMode).input}
                  placeholder={`Contact ${index + 1} Name`}
                  placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                />
              )}
              name={`contactName${index}`}
              defaultValue=""
              rules={{ required: "Contact name is required" }}
            />
            {errors[`contactName${index}`] && (
              <Text style={styles(isDarkMode).errorText}>
                {errors[`contactName${index}`].message}
              </Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles(isDarkMode).inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles(isDarkMode).input}
                  placeholder="Phone Number"
                  placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
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
              <Text style={styles(isDarkMode).errorText}>
                {errors[`phoneNumber${index}`].message}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles(isDarkMode).scrollContainer}
      contentContainerStyle={styles(isDarkMode).contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles(isDarkMode).innerContainer}>
        <Image source={logo} style={styles(isDarkMode).image} />

        {/* Contact Information Header */}
        <View style={styles(isDarkMode).header}>
          <Icon name="person-circle-outline" size={50} color="#004f71" />
          <Text style={styles(isDarkMode).contactText}>
            Contact Information
          </Text>
        </View>

        {/* Render fields for 4 contacts */}
        {[...Array(4)].map((_, index) => renderContactFields(index))}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles(isDarkMode).text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = (isDarkMode) =>
  StyleSheet.create({
    scrollContainer: {
      height: "100%",
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#fff",
    },
    contentContainer: {
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    innerContainer: {
      width: "100%",
      alignItems: "center",
    },
    image: {
      width: "80%",
      height: 200,
      resizeMode: "contain",
      alignSelf: "center",
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
      color: isDarkMode ? "#fff" : "#004f71",
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
      borderColor: isDarkMode ? "#555" : "gray",
      color: isDarkMode ? "#fff" : "#000",
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
