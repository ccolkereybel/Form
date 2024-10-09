import React from 'react';
import { Linking, Button, View, Alert } from 'react-native';

const PhoneCallButton = () => {
  const phoneNumber = '1234567890'; // Replace with the desired phone number

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <Button
      title="Call" // The title shows "Call 1234567890"
      onPress={handlePhoneCall}
    />
  );
};

export default PhoneCallButton;


