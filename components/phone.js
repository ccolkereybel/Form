import React from 'react';
import { Linking, Button } from 'react-native';

const PhoneCallButton = () => {
  const phoneNumber = '1234567890'; // Replace with the desired phone number

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <Button
      title={`Call ${phoneNumber}`} // The title shows "Call 1234567890"
      onPress={handlePhoneCall}
    />
  );
};

export default PhoneCallButton;
