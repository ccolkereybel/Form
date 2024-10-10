// form.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";

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

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="Your Name"
          />
        )}
        name="name"
        defaultValue=""
        rules={{ required: "You must enter your name" }}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="Email"
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
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
  <View style={styles.buttonContainer}>
      <Button  title="Submit" onPress={handleSubmit(onSubmit)} color="#004f71"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },

  buttonContainer: {
    color: "green"
  }
});

export default MyForm;
