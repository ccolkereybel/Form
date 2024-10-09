import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormDataContext = createContext();

export const useFormData = () => {
  return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);

  // Load data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("submittedData");
        if (storedData) {
          setSubmittedData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load data from storage", error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          "submittedData",
          JSON.stringify(submittedData)
        );
      } catch (error) {
        console.error("Failed to save data to storage", error);
      }
    };
    saveData();
  }, [submittedData]);

  return (
    <FormDataContext.Provider value={{ submittedData, setSubmittedData }}>
      {children}
    </FormDataContext.Provider>
  );
};
