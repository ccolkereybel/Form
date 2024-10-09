// formresults.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFormData } from "@/components/FormDataContext.js";

function MyResults() {
  const { submittedData, setSubmittedData } = useFormData(); // Access context
  const [isEditing, setIsEditing] = useState(null); // Track which entry is being edited
  const [formData, setFormData] = useState({ name: "", email: "" }); // Temporary state to hold edit data

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setFormData(submittedData[index]); // Populate form with existing data
  };

  const handleSave = () => {
    const updatedData = submittedData.map((entry, i) =>
      i === isEditing ? formData : entry
    );
    setSubmittedData(updatedData);
    setIsEditing(null); // Exit editing mode
  };

  // Function to handle drag-and-drop
  const handleDragEnd = ({ data }) => {
    setSubmittedData(data); // Update the list order after drag ends
  };

  const renderItem = ({ item, index, drag }) => {
    return (
      <TouchableOpacity
        onLongPress={drag} // Trigger drag on long press
        style={styles.entryContainer}
      >
        {isEditing === index ? (
          <>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Edit Name"
            />
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Edit Email"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.submittedContainer}>
      <Text style={styles.submittedTitle}>Submitted Data:</Text>
      {submittedData.length === 0 ? (
        <Text>No data submitted yet.</Text>
      ) : (
        <DraggableFlatList
          data={submittedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`} // Unique key for items
          onDragEnd={handleDragEnd}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  submittedContainer: {
    padding: 20,
  },
  submittedTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  entryContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyResults;
