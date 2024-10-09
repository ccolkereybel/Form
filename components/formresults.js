// formresults.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import MyForm from "@/components/form";

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

  return (
    <View style={styles.submittedContainer}>
      <Text style={styles.submittedTitle}>Submitted Data:</Text>
      {submittedData.length === 0 ? (
        <Text>No data submitted yet.</Text>
      ) : (
        submittedData.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
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
                <Button title="Save" onPress={handleSave} />
              </>
            ) : (
              <>
                <Text>Name: {entry.name}</Text>
                <Text>Email: {entry.email}</Text>
                <Button title="Edit" onPress={() => handleEdit(index)} />
                <Button title="Delete" onPress={() => handleDelete(index)} />
              </>
            )}
          </View>
        ))
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
  },
  entryContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default MyResults;

