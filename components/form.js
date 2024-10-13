// form.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, useColorScheme } from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import logo from "@/assets/images/logo.jpg";

function MyForm() {
  const colorScheme = useColorScheme ();
  const { setSubmittedData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
  };

  const dynamicStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  },

});


  return (
    
      <View styles={staticStyles.container}>
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
            style={dynamicStyles.input}
            placeholder="Your Name"
          />
        )}
        name="name"
        defaultValue=""
        rules={{ required: "You must enter your name" }}
      />
      {errors.name && (
        <Text style={staticStyles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={dynamicStyles.input}
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
        <Text style={staticStyles.errorText}>{errors.email.message}</Text>
      )}
      <TouchableOpacity style={staticStyles.button} onPress={handleSubmit(onSubmit)}>  
      <Text style={staticStyles.text}>Submit</Text>
      </TouchableOpacity>
 
    </View>
   
    
  );
}

const staticStyles = StyleSheet.create({
  container: {
    padding: 20,
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
  extraSpace: {
    height: 200, 
  },
  button: {
    backgroundColor: "#004f71",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,

  }

});

export default MyForm;
