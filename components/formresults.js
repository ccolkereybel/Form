import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import DraggableFlatList from "react-native-draggable-flatlist"; // Ensure this package is installed

function MyResults() {
  const { submittedData, setSubmittedData } = useFormData();

  const handleDragEnd = ({ data }) => {
    setSubmittedData(data); // Update the submittedData with the new order
  };

  return (
    <View style={styles.submittedContainer}>
      <Text style={styles.submittedTitle}>Submitted Data:</Text>
      {submittedData.length === 0 ? (
        <Text>No data submitted yet.</Text>
      ) : (
        <DraggableFlatList
          data={submittedData}
          onDragEnd={handleDragEnd}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          renderItem={({ item, index, drag, isActive }) => (
            <TouchableOpacity
              style={[
                styles.entryContainer,
                { opacity: isActive ? 0.5 : 1 },
              ]}
              onLongPress={drag} // Enable dragging on long press
            >
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
            </TouchableOpacity>
          )}
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
});

export default MyResults;
