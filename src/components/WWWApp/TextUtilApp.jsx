import React from 'react';
import { Input, Form, Row, Col, Layout, Menu, Typography } from 'antd';

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

  React.useEffect(() => {
    // Ensure the output text is updated when the selected function changes
    updateOutputText(inputText);
  }, [selectedFunction, inputText]);

  return (
    <div style={{ textAlign: 'left' }}>
      <Layout>
        <Layout.Sider width={300} style={{ background: 'white' }}>
          <div style={{ margin: 20 }}>
            <Typography.Title level={4}>TextUtil</Typography.Title>
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedFunction]}
              onClick={({ key }) => setSelectedFunction(key)}
            >
              {Object.keys(textManipulationFunctions).map(funcKey => (
                <Menu.Item key={funcKey}>{textManipulationFunctions[funcKey].label}</Menu.Item>
              ))}
            </Menu>
          </div>
        </Layout.Sider>

        <Layout.Content>
          <div style={{margin: 20}}>
            <Row>
              <Col span={24}>
                <Form layout="vertical">
                  <Form.Item label="Input Text" name="inputText">
                    <Input.TextArea
                      value={inputText}
                      onChange={e => processText(e.target.value)}
                      placeholder="Enter text here"
                      style={{ height: 200 }}
                    />
                  </Form.Item>

                  <Form.Item label={selectedFunction} name="outputText">
                    <div style={{ border: '1px solid #d9d9d9', background: 'white', padding: 10, height: 200, overflowY: 'auto' }}>
                      <Typography.Text style={{ color: !outputText ? '#d9d9d9' : 'black' }}>
                        {outputText || 'Output will appear here'}
                      </Typography.Text>
                    </div>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default TextUtilApp;
