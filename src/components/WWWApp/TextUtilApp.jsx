import React from 'react';
import { Input, Form, Row, Col, Layout, Menu, Typography, Select } from 'antd';

const TextUtilApp = () => {
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [selectedFunction, setSelectedFunction] = React.useState('alternateCase');

  const textManipulationFunctions = {
    alternateCase: {
      label: 'aLtErNaTe CaSe',
      func: (text) => {
        const newText = text.split('').map((char, i) => {
          return i % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');
        return newText;
      }
    },
    upperCase: {
      label: 'UPPER CASE',
      func: (text) => {
        const newText = text.toUpperCase();
        return newText;
      }
    },
    lowerCase: {
      label: 'lower case',
      func: (text) => {
        const newText = text.toLowerCase();
        return newText;
      }
    },
    titleCase: {
      label: 'Title Case',
      func: (text) => {
        const newText = text.split(' ').map(word => {
          return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        return newText;
      }
    },
    reverse: {
      label: 'Reverse',
      func: (text) => {
        const newText = text.split('').reverse().join('');
        return newText;
      }
    },
    stripWhitespace: {
      label: 'Strip Whitespace',
      func: (text) => {
        const newText = text.replace(/\s/g, '');
        return newText;
      }
    },
    countWords: {
      label: 'Count Words',
      func: (text) => {
        const newText = text.split(' ').length;
        return newText.toString();  // Ensure it returns a string
      }
    },
    countCharacters: {
      label: 'Count Characters',
      func: (text) => {
        const newText = text.length;
        return newText.toString();  // Ensure it returns a string
      }
    }
  };

  const updateOutputText = (text) => {
    const newText = textManipulationFunctions[selectedFunction].func(text);
    setOutputText(newText);
  }

  const processText = (text) => {
    setInputText(text);
    updateOutputText(text);
  }

  const updateFunction = (funcKey) => {
    setSelectedFunction(funcKey);
    updateOutputText(inputText);
  }

  React.useEffect(() => {
    // Ensure the output text is updated when the selected function changes
    updateOutputText(inputText);
  }, [selectedFunction, inputText]);

  return (
    <div style={{ textAlign: 'left' }}>
      <Select
        defaultValue="alternateCase"
        style={{ width: 200, marginBottom: 20 }}
        onChange={value => updateFunction(value)}
      >
        {Object.keys(textManipulationFunctions).map(funcKey => (
          <Select.Option key={funcKey} value={funcKey}>
            {textManipulationFunctions[funcKey].label}
          </Select.Option>
        ))}
      </Select>
      <div>
        <Typography.Text>Input Text</Typography.Text>
        <Input.TextArea
          value={inputText}
          onChange={e => processText(e.target.value)}
          placeholder="Enter text here"
        />
      </div>

      <div style={{marginTop: 10}}>
        <Typography.Text>Output Text</Typography.Text>
        <Input.TextArea
          value={outputText}
          readOnly
          placeholder="Output text will appear here"
        />
      </div>
    </div>
  );
}

export default TextUtilApp;
