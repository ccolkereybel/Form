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
          // Use a unique property for the key extractor, assuming items have a unique `id` property
          keyExtractor={(item) => `${item.name}-${item.email}`} // Ensure the id is a string
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              style={[{ opacity: isActive ? 0.5 : 1 }]}
              onLongPress={drag} // Enable dragging on long press
            >
              <View style={styles.item}>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
              </View>
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
  clearButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MyResults;


