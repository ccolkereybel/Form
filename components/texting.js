import React from 'react';
import { Linking, Button, View, Alert } from 'react-native';

const TextMessageButton = () => {
  const phoneNumber = '1234567890'; // Replace with the desired phone number
    const handleSendTextMessage = () => {
      
      const message = 'Hello, this is a test message!'; // Replace with your message
  
      const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert('Error', 'Unable to open SMS app');
          }
        })
        .catch((err) => console.error('An error occurred', err));
    };
  
    return (
      <View>
        <Button title="Send Text Message" onPress={handleSendTextMessage} />
      </View>
    );
  };
  
  export default TextMessageButton;