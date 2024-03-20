import React, { useState } from 'react';
import { InputNumber } from 'antd';

const PhoneNumberInput = () => {
  const [inputValue, setInputValue] = useState('');

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    const phoneNumber = numbers.substring(0, 10); // US phone numbers are 10 digits
    let formatted = '';

    if (phoneNumber.length > 3) {
      formatted = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}`;
      if (phoneNumber.length > 6) {
        formatted += `-${phoneNumber.substring(6, 10)}`;
      }
    } else {
      formatted = `(${phoneNumber}`;
    }

    return formatted;
  };

  const handleValueChange = (value) => {
    // Format the input value
    const formattedInput = formatPhoneNumber(value.toString());
    setInputValue(formattedInput);
  };

  return (
    <InputNumber
      style={{ width: '200px' }}
      placeholder="(123) 456-7890"
      value={inputValue.replace(/[^\d]/g, '')} // Remove non-numeric characters
      onChange={handleValueChange}
      formatter={(value) => formatPhoneNumber(value)}
      parser={(value) => value.replace(/[^\d]/g, '')} // Keep only numeric values
      controls={false}
      maxLength={14}
    />
  );
};

export default PhoneNumberInput;
