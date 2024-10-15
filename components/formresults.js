import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Image, // Make sure Image is imported for logo
} from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import DraggableFlatList from "react-native-draggable-flatlist";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "@/assets/images/banner1.jpg";

function MyResults() {
  const { submittedData, setSubmittedData } = useFormData();
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [newData, setNewData] = useState({ name: "", email: "" }); // Temporary storage for edited data

  const colorScheme = useColorScheme(); // Detect dark mode

  const handleDragEnd = ({ data }) => {
    setSubmittedData(data); // Update the submittedData with the new order
  };

  const handleDelete = (email) => {
    const updatedData = submittedData.filter((item) => item.email !== email);
    setSubmittedData(updatedData);
  };

  const handleEdit = (item) => {
    setEditingItem(item.email); // Set the current item as editable
    setNewData({ name: item.name, email: item.email }); // Pre-fill the input fields with current data
  };

  const handleSave = () => {
    const updatedData = submittedData.map((item) =>
      item.email === editingItem ? newData : item
    );
    setSubmittedData(updatedData);
    setEditingItem(null); // Reset the editing state
  };

  const isDarkMode = colorScheme === "dark"; // Determine if dark mode is active

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <KeyboardAvoidingView
        style={styles(isDarkMode).innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles(isDarkMode).innerContainer}>
          <Image source={logo} style={styles(isDarkMode).image} />

          {/* Contact Information Header */}
          <View style={styles(isDarkMode).header}>
            <Icon name="people-outline" size={50} color="#004f71" />
            <Text style={styles(isDarkMode).contactText}>
              Emergency Contacts
            </Text>
          </View>

          <View style={styles(isDarkMode).submittedContainer}>
            {submittedData.length === 0 ? (
              <Text>No data submitted yet.</Text>
            ) : (
              <DraggableFlatList
                data={submittedData}
                onDragEnd={handleDragEnd}
                keyExtractor={(item) => `${item.name}-${item.email}`}
                renderItem={({ item, drag, isActive }) => (
                  <TouchableOpacity
                    style={[{ opacity: isActive ? 0.5 : 1 }]}
                    onLongPress={drag}
                  >
                    <View style={styles(isDarkMode).item}>
                      {editingItem === item.email ? (
                        // Show editable input fields if this item is being edited
                        <View style={styles(isDarkMode).editContainer}>
                          <TextInput
                            style={styles(isDarkMode).input}
                            value={newData.name}
                            onChangeText={(text) =>
                              setNewData({ ...newData, name: text })
                            }
                            placeholder="Edit Name"
                            multiline={true} // Allow text to wrap
                            placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
                          />
                          <TextInput
                            style={styles(isDarkMode).input}
                            value={newData.email}
                            onChangeText={(text) =>
                              setNewData({ ...newData, email: text })
                            }
                            placeholder="Edit Email"
                            multiline={true} // Allow text to wrap
                            placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
                          />
                          <TouchableOpacity
                            style={styles(isDarkMode).saveButton}
                            onPress={handleSave}
                          >
                            <Text style={styles(isDarkMode).saveButtonText}>
                              Save
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        // Display the item normally if not in edit mode
                        <View style={styles(isDarkMode).row}>
                          <View style={styles(isDarkMode).textContainer}>
                            <Text style={styles(isDarkMode).text}>
                              Name: {item.name}
                            </Text>
                            <Text style={styles(isDarkMode).text}>
                              Email: {item.email}
                            </Text>
                          </View>
                          <View style={styles(isDarkMode).buttonsContainer}>
                            <TouchableOpacity
                              style={styles(isDarkMode).editButton}
                              onPress={() => handleEdit(item)}
                            >
                              <Text style={styles(isDarkMode).buttonText}>
                                Edit
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles(isDarkMode).deleteButton}
                              onPress={() => handleDelete(item.email)}
                            >
                              <Text style={styles(isDarkMode).buttonText}>
                                Delete
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#f0f0f0", // Dark/Light background
    },
    innerContainer: {
      flex: 1,
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
    submittedContainer: {
      padding: 20,
    },
    submittedTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    item: {
      backgroundColor: isDarkMode ? "#333" : "#f9f9f9", // Dark/Light item background
      padding: 15,
      marginVertical: 8,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
      marginRight: 10, // Add space between text and buttons
    },
    text: {
      color: isDarkMode ? "#ccc" : "#000", // Dark/Light text color
    },
    buttonsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    editButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginRight: 10,
    },
    deleteButton: {
      backgroundColor: "#ff3333",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    editContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    input: {
      backgroundColor: isDarkMode ? "#555" : "#fff", // Dark/Light input background
      color: isDarkMode ? "#fff" : "#000", // Dark/Light input text color
      padding: 10,
      borderRadius: 5,
      borderColor: "#ccc",
      borderWidth: 1,
      marginRight: 10,
      flexGrow: 1,
      maxWidth: "70%", // Ensures the input doesn't take up too much space
      flexShrink: 1, // Allows the input to shrink when necessary
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    saveButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });

export default MyResults;
