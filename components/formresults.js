// formresults.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";

function MyResults() {
  const { submittedData } = useFormData(); // Access the context

  return (
    <View style={styles.submittedContainer}>
      <Text style={styles.submittedTitle}>Submitted Data:</Text>
      {submittedData.length === 0 ? (
        <Text>No data submitted yet.</Text>
      ) : (
        submittedData.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text>Name: {entry.name}</Text>
            <Text>Email: {entry.email}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  submittedContainer: {
    marginTop: 20,
  },
  submittedTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  entryContainer: {
    marginBottom: 5,
  },
});

export default MyResults;
