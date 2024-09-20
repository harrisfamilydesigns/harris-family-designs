import { Button, Form, Input, Upload, Row, Col } from 'antd';
import React from 'react';
import { summaries, tokenProvider, uploads } from '../../api';

const FinePrintApp = () => {
  const [summary, setSummary] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const { Dragger } = Upload;

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileList[0]);
      const response = await summaries.create({ file: formData })
      setFileList([]);
      setSummary(response.data.summary);
      setUploading(false);
    } catch (err) {
      alert('Failed to upload file');
      console.error(err);
    }
  };


  const handleSubmit = async (values) => {
    try {
      const response = await summaries.create(values);
      setSummary(response.data.summary);
    } catch (err) {
      alert('Failed to submit fine print');
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Read the Fine Print</h1>
      <p>Copy & paste or upload something with legalese and we'll summarize it for you.</p>
      <Row>
        <Col span={12} style={{ paddingRight: 10 }}>
          <Form
            name="fine_print"
            onFinish={handleSubmit}
            initialValues={{text: ''}}
            layout='vertical'
          >
            <Form.Item label="Summarize your fine print" name="text">
              <Input.TextArea rows={4}
              placeholder='Enter your fine print (terms of service, contract, etc.) here'
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={uploading}>Submit</Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12} style={{ paddingLeft: 10 }}>
          <Form
            name="fine_print"
            onFinish={handleUpload}
            initialValues={{file: ''}}
            layout='vertical'
          >
            <Form.Item label="Upload a PDF" name="file">
              <Dragger
                style={{ backgroundColor: 'white' }}
                name="file"
                accept=".pdf"
                multiple={false}
                onRemove={(file) => {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  setFileList(newFileList);
                }}
                beforeUpload={(file) => {
                  setFileList([file]);
                  return false;
                }}
                fileList={fileList}
              >
                <span>
                  Upload PDF
                </span>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={fileList.length === 0 || uploading}>Upload</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          {summary && (
            <div>
              <h2>Summary</h2>
              <p>{summary}</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default FinePrintApp;
