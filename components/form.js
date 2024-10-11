// form.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import logo from "@/assets/images/logo.jpg";

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
      <View>
        <Image source={logo}/>
      </View>
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
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#516067' : "#004f71",
            paddingVertical: 12,
            alignItems: "center",
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
          }]}>
      <Text style={styles.text}>Submit</Text>
    </Pressable>
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


});

export default MyForm;
